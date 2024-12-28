"use strict";
var gImgs = [];
_createImgs()
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: "I sometimes eat Falafel", size: 20,font:'Arial', align: 'center', color: "#FF0000",x:225,y:50},],
};

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 };

function getMeme() {
  return gMeme;
}

function getImgs() {
  return gImgs;
}

function _createImg(i) {
  return {
    id: makeId,
    url: `imgs/${i}.jpg`,
    keywords: ["funny", "cat"],
  };
}

function _createImgs(){
     for (var i = 0; i < 18; i++) {    
      gImgs.push( _createImg(i+1))

     }

}

function switchLine(){

 if (gMeme.selectedLineIdx === gMeme.lines.length-1) {
  gMeme.selectedLineIdx = 0
 } else {
  gMeme.selectedLineIdx++
 }

 renderMeme()

 console.log("gMeme.selectedLineIdx", gMeme.selectedLineIdx)
}


function addLine(){
  
  const xLine = gElCanvas.width / 2
  // const xLine = gMeme.lines[gMeme.lines.length-1].x
  const yLine = gMeme.lines[gMeme.lines.length-1].y
  const newLine = _createLine('ADD TEXT HERE',40,'Arial','center','#FF0000',xLine,yLine+50)

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length-1
  renderMeme()
  console.log("gMeme", gMeme)

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
if(gMeme.lines.length===1) return;
  const lineIdx = gMeme.selectedLineIdx

gMeme.lines.splice(lineIdx,1)

if(gMeme.selectedLineIdx>=gMeme.lines.length){
  gMeme.selectedLineIdx = gMeme.lines.length-1;
}

renderMeme()
}

function  getTxtValue(elValue) {

     gMeme.lines[gMeme.selectedLineIdx].txt = elValue

 
}

function  getColor(elValue) {

     gMeme.lines[gMeme.selectedLineIdx].color = elValue

 
}

function  getFontSize(elValue) {

     gMeme.lines[gMeme.selectedLineIdx].size = +elValue

 
}



