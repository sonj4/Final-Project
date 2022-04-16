document.querySelector('.dropdown').classList.add('activePage')
document.querySelector('.barMenu').addEventListener('click', showMenu);
document.querySelector('.closeBarMenu').addEventListener('click', hideMenu);
//document.querySelector('.searchBtn').addEventListener('click', startSearch);

const navLinks = document.querySelector(".navLinks");
const inputSearch = document.querySelector('.inputSearch');
const manga = document.querySelector('.mangaLink');
let clickedLink = 0;
manga.addEventListener('click', setUpData);
const anime = document.querySelector('.animeLink');
anime.addEventListener('click', setUpData);
const people = document.querySelector('.peopleLink');
people.addEventListener('click', setUpData);

let clickedNumber = 0;
let dataArray = null;
const myRange = document.querySelector('#myRange');


//inputSearch.addEventListener('keyup', searchFunction);


myRange.addEventListener('input', function(){ showValue(this.value)});
//myRange.addEventListener('change', function(){ showValue(this.value)});

window.addEventListener("DOMContentLoaded", (e) => {
    const btn = document.querySelector(".searchBtn");
    const input = document.querySelector(".inputSearch");
  
    btn.addEventListener("click", e => searchFunction3(input.value, clickedLink));
    //
});

function searchFunction3(inputText, clickedLink) {
    let sliceNum = 0; //from which index to slice
    let checkedInd = 0;

    //which filter is checked
    if (document.querySelector('#filter1').checked) checkedInd = 0;
    else if (document.querySelector('#filter2').checked) checkedInd = 1;
    else if (document.querySelector('#filter3').checked) checkedInd = 2;

    //let text = e.target.value.toString().toLowerCase(); //get search text
    let text = inputText.toLowerCase();
    //filtered data
    let filteredData = [];
    let arr = document.getElementsByClassName('gridElement');
    let items = Array.from(arr);
    let titles = []
    
    //IF MANGA DATA IS SEARCHED
    if (clickedLink == 0) {
        //IF FILTERING BY TITLE
        if (checkedInd == 0){
            sliceNum = 7;
            filteredData = dataArray.filter(e => e.title.toLowerCase().startsWith(text)); 
            for (let j = 0; j< items.length; j++){
                titles.push(items[j].lastChild.children.item(0).innerHTML.slice(sliceNum))
            }

            refreshData();
            for (let i = 0; i< filteredData.length; i++) {
                let ind = titles.indexOf(filteredData[i].title);
                arr[ind].classList.remove('hide');
            }
        }
         
        ////IF FILTERING BY AUTHOR NAME
        else if (checkedInd == 1) {
            sliceNum = 8;
            filteredData = dataArray.filter(e => e.authors[0].name.toLowerCase().startsWith(text)); 
            for (let j = 0; j< items.length; j++){
                titles.push(items[j].lastChild.children.item(1).innerHTML.slice(sliceNum))
            }
            refreshData();
            for (let i = 0; i< filteredData.length; i++) {
                let ind = titles.indexOf(filteredData[i].authors[0].name);
                arr[ind].classList.remove('hide');
            }
        }
        //IF FILTERING BY NUMBER OF CHAPTERS
        else if (checkedInd == 2) {
            sliceNum = 17;
            filteredData = dataArray.filter(e => {
                    return ((e.chapters != null) && e.chapters.toString().startsWith(text));
                }
            ); 
            for (let j = 0; j < items.length; j++){
                titles.push(items[j].lastChild.children.item(2).innerHTML.slice(sliceNum))
            }
            refreshData();
            for (let i = 0; i< filteredData.length; i++) {
                let ind = titles.indexOf(filteredData[i].chapters.toString());
                arr[ind].classList.remove('hide');
            }
        }  
    
    }
    //IF ANIME DATA IS SEARCHED
    else if (clickedLink == 1) {
        //IF FILTERING BY TITLE
        if (checkedInd == 0){
            sliceNum = 7;
            filteredData = dataArray.filter(e => e.title.toLowerCase().startsWith(text)); 
            for (let j = 0; j< items.length; j++){
                titles.push(items[j].lastChild.children.item(0).innerHTML.slice(sliceNum))
            }
            refreshData();
            for (let i = 0; i< filteredData.length; i++) {
                let ind = titles.indexOf(filteredData[i].title);
                arr[ind].classList.remove('hide');
            }
        }
        //IF FILTERING BY TYPE
        else if (checkedInd == 2) {
            sliceNum = 5;
            filteredData = dataArray.filter(e => e.type.toLowerCase().startsWith(text)); 
            for (let j = 0; j< items.length; j++){
                titles.push(items[j].lastChild.children.item(1).innerHTML.slice(sliceNum))
            }
            refreshData();
            for (let j = 0; j< titles.length; j++) {
                titles[j] = titles[j].replace(/\s+/, "");
            }
            console.log(titles)
            let indArray = [];
            for (let i = 0; i<filteredData.length; i++) {
                let ind = titles.indexOf(filteredData[i].type);
                while (indArray.includes(ind)) {
                    ind = titles.indexOf(filteredData[i].type,ind+1);
                }
                indArray.push(ind)
                arr[ind].classList.remove('hide');
            }
            for (let k = 0; k<indArray.length; k++){
                arr[indArray[k]].classList.remove('hide');
            }
        }
        //IF FILTERING BY GENRES
        else if (checkedInd == 1) {
            sliceNum = 8;
            filteredData = dataArray.filter(e => {
                    for (let i = 0; i< e.genres.length; i++) {
                        return (e.genres[i].name.toLowerCase().startsWith(text))
                    }
                }
            ); 
            for (let j = 0; j < items.length; j++){
                titles.push(items[j].lastChild.children.item(2).innerHTML.slice(sliceNum))
            }
            console.log(titles)
            refreshData();
            console.log(filteredData)
            let main = document.querySelector('.main');
            for (let i = 0; i<filteredData.length; i++) {
                main.innerHTML += `<div class='gridElement'> 
                        <img src='${filteredData[i].images.jpg.image_url}'> 
                        <div class='infoWrapper'> 
                        <p>Title: ${filteredData[i].title} </p> 
                        <p>Type: ${filteredData[i].type}</p>
                        <p>Genres: ${filteredData[i].genres[0].name}, ${filteredData[i].genres[1].name}</p> 
                        <p>Score: ${filteredData[i].score}</p>
                        </div> </div>`;
            }
        } 
    }
    //IF PEOPLE DATA IS FILTERED, FILTERING BY ONLY NAME FILTER
    else if (clickedLink == 2) {
        sliceNum = 6;
            filteredData = dataArray.filter(e => e.name.toLowerCase().startsWith(text)); 
            for (let j = 0; j< items.length; j++){
                titles.push(items[j].lastChild.children.item(0).innerHTML.slice(sliceNum))
            }
            refreshData();
            console.log(filteredData)
            console.log(titles)
            for (let i = 0; i< filteredData.length; i++) {
                let ind = titles.indexOf(filteredData[i].name);
                arr[ind].classList.remove('hide');
            }
    }
}

function showValue(value){
    console.log(value)
    document.querySelector('.result').innerHTML = value
    searchFunction2(value);
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

function refreshData() {
    let arr = document.getElementsByClassName('gridElement');
    for (let i =0; i<arr.length; i++){
        arr[i].classList.add('hide');
    }
    
}

async function setUpData(e){
    clickedNumber++;
    if (clickedNumber > 1) refreshData();
    let data = null;
    let temp;
    if (e.target.classList.contains('mangaLink')){ data = await getData('https://api.jikan.moe/v4/top/manga'); temp = 0; clickedLink = 0} 
    else if (e.target.classList.contains('animeLink')){ data = await getData('https://api.jikan.moe/v4/top/anime'); temp = 1; clickedLink = 1}
    else if (e.target.classList.contains('peopleLink')){ data = await getData('https://api.jikan.moe/v4/top/people'); temp = 2; clickedLink = 2}
    updateFilters(temp);
    dataArray = data.data;
    showData(dataArray, temp);
}

function showData(arr, temp){
    refreshData()
    let main = document.querySelector('.main');
    for (let i = 0; i<arr.length; i++){
        let div = document.createElement('div');
        div.classList.add('gridElement');
        let img = document.createElement('img');
        img.setAttribute('src',arr[i].images.jpg.image_url);
        let div1 = document.createElement('div');
        div1.classList.add('infoWrapper');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');

        if (temp == 0) {
            p1.innerHTML = 'Title: ' + arr[i].title
            p2.innerHTML = 'Author: ' + arr[i].authors[0].name;
            p3.innerHTML ='No. of Chapters: ' + arr[i].chapters;
            p4.innerHTML ='Score: '+ arr[i].score;
        } else if (temp == 1){
            p1.innerHTML = 'Title: ' + arr[i].title
            p2.innerHTML = 'Type: ' + arr[i].type
            p3.innerHTML = 'Genres: ';
            for (let j = 0; j < arr[i].genres.length; j++){
                if (j == arr[i].genres.length - 1)  p3.innerHTML += arr[i].genres[j].name
                else p3.innerHTML += arr[i].genres[j].name + ', '
            }
            p4.innerHTML ='Score: '+ arr[i].score;
            
        } else if (temp == 2) {
            p1.innerHTML = 'Name: ' + arr[i].name
        }
        div1.appendChild(p1);
        div1.appendChild(p2);
        div1.appendChild(p3);
        div1.appendChild(p4);
        div.appendChild(img);
        div.appendChild(div1);
        main.appendChild(div);
        //if (counter >= limit)  div.classList.add('hide');
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

function searchFunction2(value){
    let filteredData = [];
    filteredData = dataArray.filter(e =>{return (e.score!=null && e.score == value)}); 
    console.log(filteredData)
    let arr = document.getElementsByClassName('gridElement');
    let items = Array.from(arr);
    let scores = []
    for (let j = 0; j< items.length; j++){
        scores.push(items[j].lastChild.children.item(3).innerHTML.slice(7))
    }
    console.log(scores)
    refreshData();
    for (let i = 0; i< filteredData.length; i++) {
        if (dataArray.includes(filteredData[i])) {
            let ind = scores.indexOf(filteredData[i].score.toString());
            console.log(ind, ' ', arr[ind])
            arr[ind].classList.remove('hide');
        }
    }
}

