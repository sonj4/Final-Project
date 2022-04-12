const modal = document.querySelector('.modalContainer');
const loadMoreButton = document.querySelector('.loadMore');
const closeModalButton = document.querySelector('.closeModal');
const leftSlider = document.querySelector('.sliderLeft');
const rightSlider = document.querySelector('.sliderRight');
const navLinks = document.querySelector(".navLinks");
let slides;
let arraySlides;
let viewport_width = document.documentElement.clientWidth;
let index = 0;

//EVENTS
document.querySelector('.barMenu').addEventListener('click', showMenu);
document.querySelector('.closeBarMenu').addEventListener('click', hideMenu);
document.addEventListener('DOMContentLoaded', renderSlides);

loadMoreButton.addEventListener('click', showModalWindow);
closeModalButton.addEventListener('click',closeModalWindow);
rightSlider.addEventListener('click', slideRight);
leftSlider.addEventListener('click', slideLeft);

function showModalWindow(){
    modal.classList.remove('hide');
    document.querySelector('.container').setAttribute('scroll','no');
    document.querySelector('.container').style.overflow = 'hidden';
}

function closeModalWindow(){
    let div = document.querySelector('.modalWindow');
    div.innerHTML = '';
    modal.classList.add('hide');
    document.querySelector('.container').removeAttribute('scroll','no');
    document.querySelector('.container').style.overflow = '';
}

async function showModalWindowFact(e){
    let name = animeName(e.currentTarget.prop.name);
    let imgSrc = e.currentTarget.prop.image;
    console.log(name)
    let ani = await getFacts(e.currentTarget.prop.name);
    let div = document.querySelector('.modalWindow');
    div.innerHTML += `<p class="title">${name}</p>
                    <img src="${imgSrc}" alt="">
                    <p class="info1">1. ${ani.data[0].fact}</p>
                    <p class="info2">2. ${ani.data[1].fact}</p>
                    <p class="info3">3. ${ani.data[2].fact}</p>
                    <p class="info4">4. ${ani.data[3].fact}</p>`
    console.log(ani.data[0].fact) 
    showModalWindow();
}


async function getFacts(name) {
    let url = `https://anime-facts-rest-api.herokuapp.com/api/v1/${name}`;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function showMenu(){
    navLinks.style.right = "0";
}

function hideMenu(){
    navLinks.style.right = "-200px";
}

async function getSlides() {
    let url = 'https://anime-facts-rest-api.herokuapp.com/api/v1/';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}



function animeName(str){
    const arr = str.split('_');
    const res = arr.join(" ");
    return res.toUpperCase();
}

async function renderSlides() {
    let ani = await getSlides();
    let data = ani.data;
    let slider = document.querySelector('.slider');
    let counter = 0;
    let limit = 0;
    if (viewport_width <= 768) limit = 1;
    else limit = 3;
    data.forEach(el => {
        const div = document.createElement("div");
        div.classList.add("sliderImg");
        if (counter >= 3) div.classList.add('hide');
        const p = document.createElement('p');
        p.innerHTML = animeName(el.anime_name);
        const img= document.createElement('img');
        img.setAttribute('src', el.anime_img);
        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('readMore');
        button.prop = {name: el.anime_name, image:el.anime_img};
        //console.log(button.name)
        button.addEventListener('click',showModalWindowFact)
        button.innerHTML = 'Read More'
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(button);
        slider.appendChild(div);  
        counter++;
    });
    slides = document.getElementsByClassName('sliderImg');
    //console.log(slides)
    arraySlides = Array.from(slides);
}

function removeHide(el){
    if (el.classList.contains('hide')) el.classList.remove('hide');
}

function addHide(el){
    if (!el.classList.contains('hide')) el.classList.add('hide');
}

function slideRight(){
    for (let i = 0; i< arraySlides.length; i++){
        slides[i].classList.add('hide');
    }
    let ind = index+1;
    if (ind === arraySlides.length - 2) ind = 0;
    for (let i = ind; i<ind+3; i++){
        if(slides[i].classList.contains('hide')) slides[i].classList.remove('hide')
    }
    if (index + 1 === arraySlides.length-2) index = 0;
    else index++;
}

function slideLeft(){
    for (let i = 0; i< arraySlides.length; i++){
        slides[i].classList.add('hide');
    }
    let ind = index-1;
    if (index === 0) {
        ind = arraySlides.length-1;
        index = arraySlides.length-1;
    }
    for (let i = ind; i>ind-3; i--){
        if(slides[i].classList.contains('hide')) slides[i].classList.remove('hide')
    }
    if (index - 1 === 2) index = 0;
    else index--;
}

/* 
setInterval(() => {
    slideRight()
}, 3000);   
 */