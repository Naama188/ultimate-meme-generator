'use strict'
var gElCanvas
var gCtx
var gCurrImg
var gDlMode = false
const gPadding = 20

function onInit() {
  renderImgs()
  renderCanvas()
  renderMeme()

}


function onCanvasClick(ev) {
  const clickX = ev.offsetX
  const clickY = ev.offsetY

  const clickedLineIdx = getClickedLineIdx(clickX, clickY)

  if (clickedLineIdx !== -1) {
      gMeme.selectedLineIdx = clickedLineIdx
      updateSelectedLine()
       
  }
}

function updateSelectedLine(){
  const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
  const colorPicker = document.getElementById('color')
  colorPicker.value = selectedLine.color
  
  updateTextEditor()
  renderMeme()
}

function getClickedLineIdx(x, y) {
  for (let i = 0; i < gMeme.lines.length; i++) {
      const line = gMeme.lines[i]
      const textMetrics = gCtx.measureText(line.txt)

      const textWidth = textMetrics.width
      const textHeight = line.size

      const isWithinX = x >= (line.x - textWidth / 2) && x <= (line.x + textWidth / 2)
      const isWithinY = y >= (line.y - textHeight / 2) && y <= (line.y + textHeight / 2)

      if (isWithinX && isWithinY) {
          return i
      }
  }
  return -1 
}


function renderCanvas() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")

  gMeme.lines[0].x = gElCanvas.width / 2
  updateTextEditor()
}

function onSelectImg(elImg) {
  gCurrImg = elImg

  const elGallry = document.querySelector(".imgs-gallery")
  elGallry.style.display = "none"

  const elH1 = document.querySelector('h1')
  elH1.style.display = "none"

  const elEditor = document.querySelector(".editor")
  elEditor.style.display = "block"

  renderMeme()
}

function onClickGallery() {

  const elGallry = document.querySelector(".imgs-gallery")
  elGallry.style.display = "block"

  const elH1 = document.querySelector('h1')
  elH1.style.display = "block"

  const elEditor = document.querySelector(".editor")
  elEditor.style.display = "none"

  renderMeme()
  
}

function renderMeme() {
  const meme = getMeme()
  gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height)
  var txtColor = gMeme.lines[gMeme.selectedLineIdx].color
  var fontSize = gMeme.lines[gMeme.selectedLineIdx].size

  meme.lines.forEach((line, idx) => {
    drawText(line.txt, line.size, line.color, line.x, line.y,line.font, line.align)
    if (idx === meme.selectedLineIdx && !gDlMode) {
            drawRect(line.txt, line.size, line.x, line.y,line.align)
    }
  })

}

function drawText(text, size, color, x, y,font, align) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = "black"
  gCtx.fillStyle = color
  gCtx.font = `${size}px ${font}`
  gCtx.textAlign = "center"
  gCtx.textBaseline = "middle"

  switch (align){
    case 'left':  gCtx.fillText(text, x - gPadding, y)
                  gCtx.strokeText(text, x - gPadding, y); break
    case 'center':  gCtx.fillText(text, x, y)
                  gCtx.strokeText(text, x, y); break
    case 'right':  gCtx.fillText(text, x + gPadding, y)
                  gCtx.strokeText(text, x + gPadding, y); break
  }

}

function drawRect(text, size, x, y, align) {
  const textWidth = gCtx.measureText(text).width

  gCtx.strokeStyle = "black"

  var srX = x - textWidth / 2 - gPadding
  var srY = y - size / 2 - gPadding
  var srWidth = textWidth + gPadding * 2
  var srHeight = (size + (gPadding * 2))

  gCtx.strokeRect(srX, srY, srWidth, srHeight)

}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container")
  gElCanvas.width = elContainer.clientWidth - 2
}

function setLineTxt(elValue) {
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

function onDownloadImg() {
  gDlMode = true
  renderMeme()

  const imgContent = gElCanvas.toDataURL("image/jpg")
  const link = document.createElement("a")
  link.href = imgContent
  link.download = "mymeme.jpg"
  link.click()

  gDlMode = false
  renderMeme()
}

function onFontChange(elValue) {
  gMeme.lines[gMeme.selectedLineIdx].font = elValue
  renderMeme()
}

function onSetTxtAlign(align) {
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].align = align

  renderMeme()
}

