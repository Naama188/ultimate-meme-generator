'use strict';
var gElCanvas
var gCtx

function onInit() {
    renderCanvas()
    renderMeme()
    
}

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    
}

function renderMeme(){
    
    const meme = getMeme()
    const txt = meme.lines[0].txt
    resizeCanvas()
    console.log("txt", txt)
    console.log("meme", meme)
    drawText(txt,50,50)
    


}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
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