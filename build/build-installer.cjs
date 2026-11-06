const {spawnSync}=require('node:child_process')
const cli=require.resolve('electron-builder/cli.js')
for(const args of [['--win','nsis','--config.directories.output=release/engine'],['--win','portable','--config','build/installer-config.cjs']]){const result=spawnSync(process.execPath,[cli,...args],{stdio:'inherit',env:process.env});if(result.error){console.error(result.error);process.exit(1)}if(result.status!==0)process.exit(result.status??1)}
