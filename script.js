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
        let aboutText = data[i].about;
        img.prop = {name: data[i].name, name_kanji: data[i].name_kanji, about: data[i].about, image: data[i].images.jpg.image_url}
        const p = document.createElement('p');
        //p.innerHTML = data[i].name; dont like it
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
    let limit = 0;
    let counter = 0;
    if (viewport_width >= 1140) limit = 3;
    else if (viewport_width >= 768 && viewport_width < 1140) limit = 2;
    else if (viewport_width < 768 )limit = 1;
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
    let synopsis = anime.synopsis;
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
   // console.log(animeData)
   // console.log(data)
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


setInterval(() => {
    slideRight()
}, 3000);   
