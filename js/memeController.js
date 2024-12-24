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
    
    drawText(txt,50,50)
    
}

function drawText(text, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'blueviolet'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
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
    console.log("elValue", elValue)
    getTxtValue(elValue)
    renderMeme()
}



