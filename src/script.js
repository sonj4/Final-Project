const modal = document.querySelector('.modalContainer');
const loadMoreButton = document.querySelector('.loadMore');
const closeModalButton = document.querySelector('.closeModal');
const leftSlider = document.querySelector('.sliderLeft');
const rightSlider = document.querySelector('.sliderRight');
const navLinks = document.querySelector(".navLinks");
let slides;
let arraySlides;
let animeData;
let viewport_width = document.documentElement.clientWidth;
let index = 0;
let isOnDiv;
let limit;
window.addEventListener('resize', setLimit);
window.addEventListener('DOMContentLoaded', setLimit);
document.querySelector('.homePage').classList.add('activePage')

//EVENTS
document.querySelector('.barMenu').addEventListener('click', showMenu);
document.querySelector('.closeBarMenu').addEventListener('click', hideMenu);
document.addEventListener('DOMContentLoaded', renderSlides);
document.addEventListener('DOMContentLoaded', topRated);
document.addEventListener('DOMContentLoaded',sidebarLoad)
loadMoreButton.addEventListener('click', loadMoreFunction);
closeModalButton.addEventListener('click',closeModalWindow);
rightSlider.addEventListener('click', slideRight);
leftSlider.addEventListener('click', slideLeft);
document.querySelector('.sliderWrapper').addEventListener("mouseenter",bindKeyDownListener);
document.querySelector('.sliderWrapper').addEventListener("mouseout", bindKeyDownListenerBlock);

function setLimit(){
    viewport_width = document.documentElement.clientWidth;
    if (viewport_width >= 1140) limit = 3;
    else if (viewport_width >= 768 && viewport_width < 1140) limit = 2;
    else if (viewport_width < 768 )limit = 1;
    console.log(limit)
}


function dropdownMenu(){
   let menu =  document.querySelector('.dropdownContent');
   menu.style.display = 'block';
}

function dropdownMenuHide(){
    let menu =  document.querySelector('.dropdownContent');
    menu.style.display = 'none';
    console.log('out')
}


function handleKeyboardNav(e) {
    if (!e) e = window.event;
    var kc = e.keyCode;
    if (kc == 37) slideLeft();
    if (kc == 39) slideRight();  
}

function bindKeyDownListener() {
    isOnDiv = true;
    if (isOnDiv) document.addEventListener("keydown", handleKeyboardNav);
    /*  if (document.attachEvent)
        el.attachEvent("onkeydown", handleKeyboardNav);  */
}

function bindKeyDownListenerBlock(){
    isOnDiv = false;
    
}

async function sidebarLoad(){
    let data = await getData('https://api.jikan.moe/v4/top/characters');
    data = data.data;
    console.log(data[0])
    const bestSidebar = document.querySelector('.bestSidebar');
    const title = document.createElement('p');
    title.innerHTML = 'TOP RATED CHARACTERS'
    bestSidebar.appendChild(title)
    
    for (let i = 0; i < 3; i++){
        const div = document.createElement('div');
        div.classList.add('firstBest');
        const img = document.createElement('img');
        img.setAttribute('src',data[i].images.jpg.image_url);
        img.addEventListener('click',modalSidebar)
        let aboutText = (data[i].about).slice(0, 500) + '...';
        img.prop = {name: data[i].name, name_kanji: data[i].name_kanji, about: aboutText, image: data[i].images.jpg.image_url}
        const p = document.createElement('p');
        div.appendChild(img);
        div.appendChild(p);
        bestSidebar.appendChild(div);
    }
}

function modalSidebar(e){
    let name = e.currentTarget.prop.name;
    let imgSrc = e.currentTarget.prop.image;
    let nameKanji = e.currentTarget.prop.name_kanji;
    let about = e.currentTarget.prop.about;
    let div = document.querySelector('.modalWindow');
    div.innerHTML += `<p class="title">${name}</p>
                    <img src="${imgSrc}" alt="">
                    <p class="info1"> ${nameKanji}</p>
                    <p class="info2"> ${about}</p>
                    `
    showModalWindow();
}

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

function showModalWindowFact(e){
    let name = e.currentTarget.prop.name;
    let imgSrc = e.currentTarget.prop.image;
    let year = e.currentTarget.prop.year;
    let jp = e.currentTarget.prop.japanese;
    let status = e.currentTarget.prop.status;
    let div = document.querySelector('.modalWindow');
    div.innerHTML += `<p class="title">${name}</p>
                    <img src="${imgSrc}" alt="">
                    <p class="info1"> ${year}</p>
                    <p class="info2"> ${jp}</p>
                    <p class="info3"> ${status}</p>
                    `
    showModalWindow();
}

function loadMoreFunction(){
    let counter = 0;
    const grid = document.getElementsByClassName('gridElement');
    for (let i = 0; i<grid.length; i++){
        if (grid[i].classList.contains('hide') && counter < limit){
            grid[i].classList.remove('hide');
            counter++
        } 
        if (counter >= limit) break;
    }
}

function showMenu(){
    navLinks.style.right = "0";
}

function hideMenu(){
    navLinks.style.right = "-200px";
}

async function getData(url){
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function gridImageModal(e){
    let id = e.currentTarget.id;
    let anime = await getData(`https://api.jikan.moe/v4/anime/${id}`)
    anime = anime.data;
    let title = anime.title_japanese;
    let synopsis = anime.synopsis.slice(0,200) + '...';
    let img = anime.images.jpg.image_url;
    let div = document.querySelector('.modalWindow');
    div.innerHTML += `<p class="title">${title}</p>
                    <img src="${img}" alt="">
                    <p class="info1"> ${synopsis}</p>
                    `
    showModalWindow();
}

async function topRated(){
    let topRated = await getData('https://api.jikan.moe/v4/top/anime');
    //console.log(topRated)
    topRated = topRated.data;
    let grid = document.querySelector('.grid');
    let counter = 0;
    let limit = 5;
    topRated.forEach(el => {
        let div = document.createElement('div');
        div.classList.add('gridElement');
        let img = document.createElement('img');
        img.setAttribute('src',el.images.jpg.image_url);
        img.addEventListener('click', gridImageModal)
        img.id = el.mal_id;
        let div1 = document.createElement('div');
        div1.classList.add('infoWrapper');
        let p1 = document.createElement('p');
        p1.innerHTML = `Title: ${el.title}`
        let p2 = document.createElement('p');
        p2.innerHTML = `Type: ${el.type}`
        let p3 = document.createElement('p');
        p3.innerHTML = `Score: ${el.score}`
        div1.appendChild(p1);
        div1.appendChild(p2);
        div1.appendChild(p3);
        div.appendChild(img);
        div.appendChild(div1);
        grid.appendChild(div);
        if (counter > limit) div.classList.add('hide')
        counter++;
    })
}

async function renderSlides() {
    let ani = await getData('https://api.jikan.moe/v4/anime');
    let data = ani.data;
    data = data.sort((a, b) => a.popularity < b.popularity ? -1 : 1);
    animeData = ani.data;
    let slider = document.querySelector('.slider');
    let counter = 0;
    let limit = 0;
    if (viewport_width >= 1140) limit = 3;
    else if (viewport_width >= 768 && viewport_width < 1140) limit = 2;
    else if (viewport_width < 768) limit = 1;
    data.forEach(el => {
        const div = document.createElement("div");
        div.classList.add("sliderImg");
        if (counter >= limit) div.classList.add('hide');
        const p = document.createElement('p');
        p.innerHTML = el.title;
        const img= document.createElement('img');
        img.setAttribute('src', el.images.jpg.large_image_url);
        const button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('readMore');
        button.prop = {name: el.title, japanese: el.title_japanese,image: el.images.jpg.image_url, year: el.year, status: el.status};
        button.addEventListener('click',showModalWindowFact)
        button.innerHTML = 'Read More'
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(button);
        slider.appendChild(div);  
        counter++;
    });
    slides = document.getElementsByClassName('sliderImg');
    arraySlides = Array.from(slides);
}

function removeHide(el){
    if (el.classList.contains('hide')) el.classList.remove('hide');
}

function addHide(el){
    if (!el.classList.contains('hide')) el.classList.add('hide');
}

function slideRight(){
    let temp = 2;
    viewport_width = document.documentElement.clientWidth;
    if (viewport_width >= 1140) temp = 2;
    else if (viewport_width >= 768 && viewport_width < 1140) temp = 1;
    else if (viewport_width < 768 )temp = 0;
    for (let i = 0; i< arraySlides.length; i++){
        slides[i].classList.add('hide');
    }
    let ind = index+1;
    if (ind === arraySlides.length - temp) ind = 0;
    for (let i = ind; i<ind+temp+1; i++){
        if(slides[i].classList.contains('hide')) slides[i].classList.remove('hide')
    }
    if (index + 1 === arraySlides.length-temp) index = 0;
    else index++;
}

function slideLeft(){
    let temp = 2;
    viewport_width = document.documentElement.clientWidth;
    if (viewport_width >= 1140) temp = 2;
    else if (viewport_width >= 768 && viewport_width < 1140) temp = 1;
    else if (viewport_width < 768 )temp = 0;
    for (let i = 0; i< arraySlides.length; i++){
        slides[i].classList.add('hide');
    }
    let ind = index-1;
    if (index === 0) {
        ind = arraySlides.length-temp-1;
    }
    for (let i = ind; i<ind+temp+1; i++){
        if(slides[i].classList.contains('hide')) slides[i].classList.remove('hide');
    }
    index = ind;
}

setInterval(() => {
    slideRight()
}, 3000);   
