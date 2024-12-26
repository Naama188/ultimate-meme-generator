"use strict";
var gImgs = [];
_createImgs()
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: "I sometimes eat Falafel", size: 20, color: "red",x:225,y:50},],
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

  const xLine = gMeme.lines[gMeme.lines.length-1].x
  const yLine = gMeme.lines[gMeme.lines.length-1].y
  const newLine = _createLine('AAA',40,'red',xLine,yLine+100)

  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length-1
  renderMeme()
  console.log("gMeme", gMeme)

}

function _createLine(txt,size,color,x,y) {
  return {
    txt:txt,
    size:size,
    color:color,
    x:x,
    y:y,
    
  }
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

