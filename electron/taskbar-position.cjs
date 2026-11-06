// The desktop work area excludes a visible taskbar. Return null when no edge
// is reserved, including the common auto-hide configuration.
function taskbarClockBounds(display, offset, width=84, height=30) {
  const b=display.bounds, w=display.workArea
  const edges=[['bottom',b.y+b.height-(w.y+w.height)],['top',w.y-b.y],['right',b.x+b.width-(w.x+w.width)],['left',w.x-b.x]].filter(([,size])=>size>0).sort((a,b)=>b[1]-a[1])
  if(!edges.length)return null
  const [edge,size]=edges[0], gap=Math.max(0,Math.min(Number(offset)||0,500))
  if(edge==='bottom'||edge==='top'){
    const h=Math.min(height,size),x=Math.max(b.x,Math.min(b.x+b.width-width,b.x+b.width-gap-width))
    return {x:Math.round(x),y:Math.round(edge==='bottom'?w.y+w.height+(size-h)/2:b.y+(size-h)/2),width,height:Math.round(h)}
  }
  // A vertical taskbar has no space beside a horizontal clock; place the
  // compact display at its bottom, keeping it within the taskbar itself.
  const h=Math.min(height,b.height),usable=Math.min(width,size)
  return {x:Math.round(edge==='right'?w.x+w.width+(size-usable)/2:b.x+(size-usable)/2),y:Math.round(b.y+b.height-h),width:Math.round(usable),height:Math.round(h)}
}
module.exports={taskbarClockBounds}
