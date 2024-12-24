"use strict";
var gImgs = [];
_createImgs()
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: "I sometimes eat Falafel", size: 20, color: "red" }],
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

function  getTxtValue(elValue) {

     gMeme.lines[gMeme.selectedLineIdx].txt = elValue
     
 
}