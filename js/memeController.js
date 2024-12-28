"use strict";
var gElCanvas;
var gCtx;
var gCurrImg;

function onInit() {
  renderImgs();
  renderCanvas();
  renderMeme();

  // gElCanvas.addEventListener('click',onCanvasClick)
  

}


function onCanvasClick(ev) {
  const clickX = ev.offsetX;
  const clickY = ev.offsetY;

  // Find the clicked line
  const clickedLineIdx = getClickedLineIdx(clickX, clickY);

  console.log("clickedLineIdx", clickedLineIdx)

  if (clickedLineIdx !== -1) {
      gMeme.selectedLineIdx = clickedLineIdx;
        // Update the color picker to match the selected line's color
        const selectedLine = gMeme.lines[clickedLineIdx];
        const colorPicker = document.getElementById('color');
        colorPicker.value = selectedLine.color;

        console.log("selectedLine.color", selectedLine.color)

        const fontSize = document.getElementById('size');
        fontSize.value = selectedLine.size

        const textBox = document.querySelector('input[type="text"]');
        textBox.value = selectedLine.txt;



      renderMeme(); // Re-render to show the selected line
}
}

function getClickedLineIdx(x, y) {
  for (let i = 0; i < gMeme.lines.length; i++) {
      const line = gMeme.lines[i];
      const textMetrics = gCtx.measureText(line.txt);

      const textWidth = textMetrics.width;
      const textHeight = line.size ; // Approximate text height

      // Check if the click is within the line's bounding box
      const isWithinX = x >= (line.x - textWidth / 2) && x <= (line.x + textWidth / 2);
      const isWithinY = y >= (line.y - textHeight / 2) && y <= (line.y + textHeight / 2);

      if (isWithinX && isWithinY) {
          return i; // Return the index of the clicked line
      }
  }
  return -1; // No line clicked
}


function renderCanvas() {
  gElCanvas = document.querySelector("canvas");
  gCtx = gElCanvas.getContext("2d");
}

function onSelectImg(elImg) {
  gCurrImg = elImg;

  const elGallry = document.querySelector(".imgs-gallery");
  elGallry.style.display = "none";

  const elEditor = document.querySelector(".editor");
  elEditor.style.display = "block";

  renderMeme();
}

function renderMeme() {
//   resizeCanvas()

  const meme = getMeme();
  // const txt = meme.lines[0].txt
  gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);

  var txtColor = gMeme.lines[gMeme.selectedLineIdx].color;

  var fontSize = gMeme.lines[gMeme.selectedLineIdx].size;

  meme.lines.forEach((line, idx) => {
    drawText(line.txt, line.size, line.color, line.x, line.y,line.font);
    if (idx === meme.selectedLineIdx) {
      drawRect(line.txt, line.size, line.x, line.y,line.align);
    }
  });

}

function drawText(text, size, color, x, y,font) {
  gCtx.lineWidth = 1;
  gCtx.strokeStyle = "black";
  gCtx.fillStyle = color;
  gCtx.font = `${size}px ${font}`;
  gCtx.textAlign = "center";
  gCtx.textBaseline = "middle";

  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);

  // gCtx.fillText(text, gElCanvas.width/2, gElCanvas.height/2)
  // gCtx.strokeText(text, gElCanvas.width/2, gElCanvas.height/2)
}

function drawRect(text, size, x, y, align) {
  const textWidth = gCtx.measureText(text).width; // Measure text width
  const padding = 20; // Add some padding around the text

console.log("size", size)

  gCtx.strokeStyle = "black"; // Color for the frame
var srX;
switch(align){
  case 'left': srX = x - textWidth / 2; break;
  case 'center': srX = x - textWidth / 2 - padding; break;
  case 'right': srX = x - textWidth / 2 - padding * 2; break;
}
console.log('srX',srX)

// var srX = x - textWidth / 2 - padding
var srY = y - size / 2 - padding
var srWidth = textWidth + padding * 2
var srHeight = (size + (padding * 2))

gCtx.strokeRect(srX, srY, srWidth, srHeight)

}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container");
  // Changing the canvas dimension clears the canvas
  gElCanvas.width = elContainer.clientWidth - 2;
}

function setLineTxt(elValue) {
  // console.log("elValue", elValue)
  getTxtValue(elValue);
  renderMeme();
}

function setColor(elValue) {
  getColor(elValue);
  renderMeme();
}

function setFontSize(elValue) {
  getFontSize(elValue);
  renderMeme();
}

function onDownloadImg(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg");
  elLink.href = imgContent;
}

function onFontChange(elValue) {
  gMeme.lines[gMeme.selectedLineIdx].font = elValue
  renderMeme()
  console.log(" gMeme.lines[gMeme.selectedLineIdx].font",  gMeme.lines[gMeme.selectedLineIdx].font)
}

function onSetTxtAlign(align) {
  const meme = getMeme();
  meme.lines[meme.selectedLineIdx].align = align;
  switch (align){
    case 'left': meme.lines[meme.selectedLineIdx].x = gElCanvas.width / 2 - 20; break;
    case 'right': meme.lines[meme.selectedLineIdx].x = gElCanvas.width / 2 + 20; break;
    case 'center': meme.lines[meme.selectedLineIdx].x = gElCanvas.width / 2; break;
  }
  console.log("meme.lines[meme.selectedLineIdx].x", meme.lines[meme.selectedLineIdx].x)
  

  // selectedLine.align = align;

  // // Update the x-coordinate based on the alignment
  // if (align === 'left') {
  //     selectedLine.x = 50; // Align to the left edge
  // } else if (align === 'right') {
  //     selectedLine.x = gElCanvas.width - 50; // Align to the right edge
  // } else if (align === 'center') {
  //     selectedLine.x = gElCanvas.width / 2; // Align to the center
  // }

  renderMeme(); // Re-render the canvas
}

