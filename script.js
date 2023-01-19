/*  Variables */
let staurate = document.getElementById("saturate") ;
let Contrast = document.getElementById("Contrast") ;
let Brightness = document.getElementById("Brightness") ;
let sepia = document.getElementById("sepia") ;
let grayscale = document.getElementById("grayscale") ;
let blur = document.getElementById("blur") ;
let huerotate = document.getElementById("hue-rotate") ;

let upload = document.getElementById("upload") ;
let download = document.getElementById("download");
let img = document.getElementById("img") ;

let reset = document.querySelector('span') ;
let imgbox = document.querySelector('.img_box') ;

let canvas = document.getElementById("canvas") ;
const contextv = canvas.getContext("2d" , )



/*** RESET BUTTON****/
function resetValue(){
  contextv.filter ='none' ;
  staurate.value ='100' ;
  Contrast.value ='100' ;
  Brightness.value ='100' ;
  sepia.value ='0' ;
  grayscale.value ='0' ;
  huerotate.value ='0' ;
  blur.value ='0' ;
  contextv.drawImage(img ,0,0, canvas.width , canvas.height ) ;
}


/****** PAGE IN RELOAD *****/
window.onload = function() {
    download.style.display = 'none' ;
    reset.style.display = 'none' ;
    imgbox.style.display = 'none' ;
}
/**** UPLOAD *****/
upload.onchange = function(){
    resetValue() ; // reset 
    download.style.display = 'block' ;
    reset.style.display = 'block' ;
    imgbox.style.display = 'block' ;
    let file = new FileReader() ;
    file.readAsDataURL(upload.files[0]) ;
    file.onload = function(){
        img.src = file.result ;
    }
    img.onload = function(){ // replace img by canvas so we can download it
        canvas.width = img.width ;
        canvas.height = img.height ;
        contextv.drawImage(img ,0, 0, canvas.width , canvas.height ) ;
        img.style.display =' none' ; // img we have in website in canvas not real img
    }
}
/**** FILTERS ****/
let filters = document.querySelectorAll("ul li input") ;
filters.forEach( filter => {
    filter.addEventListener('input' , function(){
        contextv.filter = `
          saturate(${staurate.value}%)
          contrast(${Contrast.value}%)
          brightness(${Brightness.value}%)
          sepia(${sepia.value}%)
          grayscale(${grayscale.value})
          blur(${blur.value}px)
          hue-rotate(${huerotate.value}deg)
        `
        contextv.drawImage(img ,0,0, canvas.width , canvas.height ) ;
          
    })
})


/*** DOWNLOAD ****/
download.onclick = function(){
  download.href = canvas.toDataURL('image/jpeg')
    // toDataURL() : png by default
}