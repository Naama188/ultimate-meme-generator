'use strict';
var gElCanvas
var gCtx
var gCurrImg

function onInit() {
    renderImgs()
    renderCanvas()
    renderMeme()
   
    
}

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
}

function onSelectImg(elImg) {
   

    gCurrImg = elImg

    const elGallry = document.querySelector('.imgs-gallery')
    elGallry.style.display ='none'

    const elEditor = document.querySelector('.editor')
    elEditor.style.display = 'block'
  
    renderMeme()
    
   
}

function renderMeme(){
    // resizeCanvas()
    
    const meme = getMeme()
    const txt = meme.lines[0].txt
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)

    var txtColor = gMeme.lines[gMeme.selectedLineIdx].color

    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    
    drawText(txt,50,50, txtColor,fontSize)
   
}

function drawText(text, x, y,color,size) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
  
    gCtx.fillText(text, gElCanvas.width/2, gElCanvas.height/2)
    gCtx.strokeText(text, gElCanvas.width/2, gElCanvas.height/2)
  }

  function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 2
}

function setLineTxt(elValue) {
    // console.log("elValue", elValue)
    getTxtValue(elValue)
    renderMeme()
}

function setColor(elValue) {
   
    getColor(elValue)
    renderMeme()
}

function setFontSize(elValue) {
    
    getFontSize(elValue)
    renderMeme()
}



function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}



