'use strict'

function renderImgs()  {
    const elGallry = document.querySelector('.imgs-gallery')
    const imgs = getImgs()
    console.log("imgs", imgs)
  
        const strHtml = imgs.map(img => `
       <img src="${img.url}" onclick="onSelectImg(this)" class="gallery-item"/>`)

        elGallry.innerHTML = strHtml.join('')

    }

