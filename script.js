const modal = document.querySelector('.modalContainer');
const loadMoreButton = document.querySelector('.loadMore');
const closeModalButton = document.querySelector('.closeModal');
const slides = document.getElementsByClassName('sliderImg');
const leftSlider = document.querySelector('.sliderLeft');
const rightSlider = document.querySelector('.sliderRight');
const readMoreBtns = Array.from(document.querySelectorAll('.readMore'));
const navLinks = document.querySelector(".navLinks");


let viewport_width = document.documentElement.clientWidth;
let arraySlides = Array.from(slides);
let slideRightIndex = 0;


for (let i =0; i<readMoreBtns.length; i++) readMoreBtns[i].addEventListener('click',showModalWindow);

loadMoreButton.addEventListener('click', showModalWindow);
closeModalButton.addEventListener('click',closeModalWindow);
leftSlider.addEventListener('click',slideLeft1);

rightSlider.addEventListener('click',slideRight1);
document.querySelector('.barMenu').addEventListener('click', showMenu);
document.querySelector('.closeBarMenu').addEventListener('click', hideMenu);

if (viewport_width <= 768) {
    document.addEventListener('DOMContentLoaded', slideShowMobile)
} else document.addEventListener('DOMContentLoaded', slideShow)

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
    let counter = 0;
    while(counter != 3) {
        removeHide(arraySlides[counter]);
        counter++;
    }
}

function slideShowMobile(){
    
    for (let i = 0; i< arraySlides.length; i++){
        if (i==0) removeHide(arraySlides[i]);
        else addHide(arraySlides[i]);
    }
    console.log(arraySlides)
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
    if (el.classList.contains('hide')) el.classList.remove('hide');
}

function addHide(el){
    if (!el.classList.contains('hide')) el.classList.add('hide');
}

function slideRight1() {
    arraySlides = rotateLeft(arraySlides);
    if (viewport_width <= 768) slideRightMobile(arraySlides);
    else {
        removeHide(arraySlides[0]); removeHide(arraySlides[1]); removeHide(arraySlides[2]);
    for (let i=3; i<arraySlides.length; i++){
        addHide(arraySlides[i])
    }
}
}

function slideRightMobile(){
    for (let i=0; i< arraySlides.length; i++){
        if (i==0) removeHide(arraySlides[i]);
        else addHide(arraySlides[i]);
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

function showMenu(){
    navLinks.style.right = "0";
}

function hideMenu(){
    navLinks.style.right = "-200px";
}
