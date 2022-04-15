document.querySelector('.dropdown').classList.add('activePage')
document.querySelector('.barMenu').addEventListener('click', showMenu);
document.querySelector('.closeBarMenu').addEventListener('click', hideMenu);
const navLinks = document.querySelector(".navLinks");
const inputSearch = document.querySelector('.inputSearch');
document.querySelector('.mangaLink').addEventListener('click', showData);
document.querySelector('.animeLink').addEventListener('click', showData);
document.querySelector('.peopleLink').addEventListener('click', showData);
inputSearch.addEventListener('keyup', searchFunction);
let clickedNumber = 0;
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

function refreshData() {
    console.log(clickedNumber)
    if (clickedNumber > 1) {
        let arr = document.getElementsByClassName('gridElement');
        for (let i =0; i<arr.length; i++){
            arr[i].classList.add('hide');
        }
    }
}

async function showData(e){
    clickedNumber++;
    console.log(clickedNumber)
    refreshData();
    let data = null;
    let temp;
    if (e.target.classList.contains('mangaLink')){ data = await getData('https://api.jikan.moe/v4/top/manga'); temp = 0} 
    else if (e.target.classList.contains('animeLink')){ data = await getData('https://api.jikan.moe/v4/top/anime'); temp = 1}
    else if (e.target.classList.contains('peopleLink')){ data = await getData('https://api.jikan.moe/v4/top/people'); temp = 2}
    updateFilters(temp);
    data = data.data;
    console.log(data)
    let counter = 0;
    let limit = 4;
    let main = document.querySelector('.main');
     for (let i = 0; i<data.length; i++){
        let div = document.createElement('div');
        div.classList.add('gridElement');
        let img = document.createElement('img');
        img.setAttribute('src',data[i].images.jpg.image_url);
        let div1 = document.createElement('div');
        div1.classList.add('infoWrapper');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');

        if (temp == 0) {
            p1.innerHTML = 'Title: ' + data[i].title
            p2.innerHTML = 'Author: ' + data[i].authors[0].name;
            p3.innerHTML ='No. of Chapters: ' + data[i].chapters;
            p4.innerHTML ='Score: '+ data[i].score;
        } else if (temp == 1){
            p1.innerHTML = 'Title: ' + data[i].title
            p2.innerHTML = 'Type: ' + data[i].type
            p3.innerHTML = 'Genres: ';
            for (let j = 0; j < data[i].genres.length; j++){
                if (j == data[i].genres.length - 1)  p3.innerHTML += data[i].genres[j].name
                else p3.innerHTML += data[i].genres[j].name + ', '
            }
            p4.innerHTML ='Score: '+ data[i].score;
        } else if (temp == 2) {
            p1.innerHTML = 'Name: ' + data[i].name
        }
        div1.appendChild(p1);
        div1.appendChild(p2);
        div1.appendChild(p3);
        div1.appendChild(p4);
        div.appendChild(img);
        div.appendChild(div1);
        main.appendChild(div);
        //if (counter >= limit)  div.classList.add('hide');
        counter++;
    }  
}

function updateFilters(temp){
    if (temp == 0) {
        document.querySelector('.filter1Label').innerHTML = 'Title';
        document.querySelector('.filter2Label').innerHTML = 'Author';
        document.querySelector('.filter3Label').innerHTML = 'No. of Chapters';
    }
    else if (temp == 1) {
        document.querySelector('.filter1Label').innerHTML = 'Title';
        document.querySelector('.filter2Label').innerHTML = 'Genres';
        document.querySelector('.filter3Label').innerHTML = 'Type';
    }

    else if (temp == 2) {
        document.querySelector('.filter1Label').innerHTML = 'Name';
    }

}

function searchFunction(e){
    let text = e.target.value.toLowerCase();
    console.log(text)
    let items = document.getElementsByClassName('gridElement');
    Array.from(items).forEach(el => {
        let title = (el.childNodes[1].firstChild.innerHTML).slice(7);
        //console.log(title)
        if (!(title.toLowerCase().startsWith(text))){
            el.classList.add('hide')
        }
    })

}

