const modal = document.querySelector('.modalContainer');
const loadMoreButton = document.querySelector('.loadMore');
const closeModalButton = document.querySelector('.closeModal');
const slides = document.getElementsByClassName('sliderImg');
const leftSlider = document.querySelector('.sliderLeft');
const rightSlider = document.querySelector('.sliderRight');
const readMoreBtns = Array.from(document.querySelectorAll('.readMore'));
const menuNavBar = document.querySelector('.menuNavBar');
let arraySlides = Array.from(slides);
let slideRightIndex = 0;

for (let i =0; i<readMoreBtns.length; i++) readMoreBtns[i].addEventListener('click',showModalWindow);

loadMoreButton.addEventListener('click', showModalWindow);
closeModalButton.addEventListener('click',closeModalWindow);
leftSlider.addEventListener('click',slideLeft1);
document.addEventListener('DOMContentLoaded', slideShow)
rightSlider.addEventListener('click',slideRight1);
menuNavBar.addEventListener('click', showNavBar);



function showModalWindow(){
    modal.classList.remove('hide');
    document.querySelector('.container').setAttribute('scroll','no');
    document.querySelector('.container').style.overflow = 'hidden';
}

function closeModalWindow(){
    modal.classList.add('hide');
    document.querySelector('.container').removeAttribute('scroll','no');
    document.querySelector('.container').style.overflow = '';
}

function slideShow(){
    const arr = Array.from(slides);
    //console.log(arr);
    let counter = 0;
    while(counter != 3) {
        arr[counter].classList.remove('hide');
        counter++;
    }
}

function slideLeft(){
    const arr = Array.from(slides);

}

function rotateRight(arr){
    let last = arr.pop(); //zadnji mice
    arr.unshift(last); //dodaje na pocetak
    return arr;
}

function rotateLeft(arr){
    let first = arr.shift();//mice prvi
    arr.push(first); //dodaje na kraj
    return arr;
}


function removeHide(el){
    if (el.classList.contains('hide')){
        el.classList.remove('hide');
    }
}

function addHide(el){
    if (!el.classList.contains('hide')){
        el.classList.add('hide');
    }
}

function slideRight1() {
    arraySlides = rotateLeft(arraySlides);
    console.log(arraySlides)
    removeHide(arraySlides[0]); removeHide(arraySlides[1]); removeHide(arraySlides[2]);
    for (let i=3; i<arraySlides.length; i++){
        addHide(arraySlides[i])
    }
}

function slideLeft1() {
    arraySlides = rotateRight(arraySlides);

    removeHide(arraySlides[0]); removeHide(arraySlides[1]); removeHide(arraySlides[2]);
    for (let i=3; i<arraySlides.length; i++){
        addHide(arraySlides[i])
    }
}

function slideRight(){
    for (let i = slideRightIndex; i<arr.length; i++){
        if (!arr[i].classList.contains('hide')) {
            arr[i].classList.add('hide');
            if (i+3 > arr.length) {
                arr[(i+3)%arr.length].classList.remove('hide');
            }
            else arr[i+3].classList.remove('hide');
            break;
        }
    }
}

 setInterval(() => {
    slideRight1()
  }, 3000);  


