const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const {spawn} = require('node:child_process')
const {Readable, Transform} = require('node:stream')
const {pipeline} = require('node:stream/promises')

const releaseUrl = 'https://api.github.com/repos/Lilb1tty/Floatime/releases/latest'
const maxSize = 250 * 1024 * 1024
function versionParts(value) {
  const match = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(value)
  return match && match.slice(1).map(Number)
}
function newer(a, b) {
  const left = versionParts(a), right = versionParts(b)
  if (!left || !right) return false
  for (let i = 0; i < 3; i++) if (left[i] !== right[i]) return left[i] > right[i]
  return false
}

function createUpdater({app, publish, request = fetch, launch = spawn}) {
  let state = {status:'idle', currentVersion:app.getVersion()}, asset, busy = false, downloaded
  const set = patch => { state = {...state, ...patch}; publish(state) }
  async function check() {
    if (busy) return state
    if (!app.isPackaged) { set({status:'unsupported', message:'开发模式无法安装更新。'}); return state }
    busy = true
    set({status:'checking', message:''})
    try {
      const response = await request(releaseUrl, {headers:{'User-Agent':'Floatime', 'Accept':'application/vnd.github+json'}, signal:AbortSignal.timeout(15000)})
      if (!response.ok) throw new Error(`检查更新失败（HTTP ${response.status}）。`)
      const release = await response.json(), version = release.tag_name
      if (!versionParts(version)) throw new Error('发布版本号格式无效。')
      if (!newer(version, app.getVersion())) { asset = null; set({status:'current', version}); return state }
      // GitHub renames uploaded assets: spaces become dots.
      const name = `Floatime.Setup.${version.replace(/^v/, '')}.exe`
      asset = release.assets?.find(item => item.name?.replace(/ /g, '.') === name && item.state === 'uploaded')
      if (!asset || !Number.isSafeInteger(asset.size) || asset.size <= 0 || asset.size > maxSize || !/^sha256:[a-f0-9]{64}$/i.test(asset.digest || '')) throw new Error('更新包不存在，或缺少有效的 SHA-256 校验值。')
      const url = new URL(asset.browser_download_url)
      if (url.protocol !== 'https:' || url.hostname !== 'github.com' || !url.pathname.startsWith('/Lilb1tty/Floatime/releases/download/')) throw new Error('更新包地址无效。')
      downloaded = null
      set({status:'available', version, message:''})
    } catch (error) { asset = null; set({status:'error', message:error.message || '检查更新失败。'}) }
    finally { busy = false }
    return state
  }
  async function install() {
    if (busy || !asset) return state
    busy = true
    const dir = path.join(app.getPath('userData'), 'updates'), temporary = path.join(dir, 'download.tmp'), destination = path.join(dir, 'Floatime-Update.exe')
    try {
      if (!downloaded) {
        set({status:'downloading', progress:0, message:''})
        await fs.promises.mkdir(dir, {recursive:true})
        const response = await request(asset.browser_download_url, {headers:{'User-Agent':'Floatime'}, signal:AbortSignal.timeout(10 * 60 * 1000)})
        if (!response.ok || !response.body) throw new Error(`下载更新失败（HTTP ${response.status}）。`)
        const hash = crypto.createHash('sha256'); let size = 0, progress = -1
        const verify = new Transform({transform(chunk, encoding, callback) {
          size += chunk.length
          if (size > asset.size || size > maxSize) return callback(new Error('更新包大小无效。'))
          hash.update(chunk)
          const next = Math.floor(size * 100 / asset.size)
          if (next !== progress) { progress = next; set({progress}) }
          callback(null, chunk)
        }})
        await pipeline(Readable.fromWeb(response.body), verify, fs.createWriteStream(temporary))
        if (size !== asset.size || `sha256:${hash.digest('hex')}`.toLowerCase() !== asset.digest.toLowerCase()) throw new Error('更新包校验失败。')
        await fs.promises.rm(destination, {force:true})
        await fs.promises.rename(temporary, destination)
        downloaded = destination
      }
      set({status:'installing', message:''})
      const child = launch(downloaded, [`--floatime-update-dir=${path.dirname(app.getPath('exe'))}`], {detached:true, stdio:'ignore', windowsHide:false})
      await new Promise((resolve, reject) => { child.once('spawn', resolve); child.once('error', reject) })
      child.unref()
      app.quit()
    } catch (error) {
      await fs.promises.rm(temporary, {force:true}).catch(()=>{})
      set({status:'error', message:error.message || '无法安装更新。'})
    } finally { busy = false }
    return state
  }
  return {check, install, getState:()=>state}
}
module.exports = {createUpdater, versionParts, newer}
