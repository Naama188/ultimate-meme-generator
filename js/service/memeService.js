'use strict'
var gImgs = []
_createImgs()
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: "ADD TEXT HERE", size: 40,font:'Arial', align: 'center', color: "#FFFFFF",x:225,y:50},],
}

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function getImgs() {
  return gImgs
}

function _createImg(i) {
  return {
    id: makeId,
    url: `imgs/${i}.jpg`,
    keywords: ["funny", "cat"],
  }
}

function _createImgs(){
     for (var i = 0; i < 18; i++) {    
      gImgs.push( _createImg(i+1))

     }

}

function updateTextEditor() {
  const textEditor = document.getElementById("textEditor")

  textEditor.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function switchLine(){

 if (gMeme.selectedLineIdx === gMeme.lines.length-1) {
  gMeme.selectedLineIdx = 0
 } else {
  gMeme.selectedLineIdx++
 }
 updateSelectedLine()
 updateTextEditor()
 renderMeme()

}

function addLine(){
  
  const xLine = gElCanvas.width / 2
  const yLine = gMeme.lines[gMeme.lines.length-1].y
  const newLine = _createLine('ADD TEXT HERE',40,'Arial','center','#FFFFFF',xLine,yLine+50)

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length-1
  updateSelectedLine()
  updateTextEditor()
  renderMeme()

}

function _createLine(txt,size,font,align,color,x,y) {
  return {
    txt:txt,
    size:size,
    font:font,
    align:align,
    color:color,
    x:x,
    y:y,
    
  }
}

function deleteLine() {
if(gMeme.lines.length===1) return
  const lineIdx = gMeme.selectedLineIdx

gMeme.lines.splice(lineIdx,1)

if(gMeme.selectedLineIdx>=gMeme.lines.length){
  gMeme.selectedLineIdx = gMeme.lines.length-1
}
updateSelectedLine()
updateTextEditor()
renderMeme()
}

function getTxtValue(elValue) {

     gMeme.lines[gMeme.selectedLineIdx].txt = elValue
 
}

function  getColor(elValue) {

     gMeme.lines[gMeme.selectedLineIdx].color = elValue

}

function changeFontSize(changeType) {
  if(changeType == 'increase') gMeme.lines[gMeme.selectedLineIdx].size +=10
  else if(changeType == 'decrease') gMeme.lines[gMeme.selectedLineIdx].size -=10
  renderMeme()
}




