document.querySelector('.dropdown').classList.add('activePage')
document.querySelector('.barMenu').addEventListener('click', showMenu);
document.querySelector('.closeBarMenu').addEventListener('click', hideMenu);
//document.querySelector('.searchBtn').addEventListener('click', startSearch);

const navLinks = document.querySelector(".navLinks");
const inputSearch = document.querySelector('.inputSearch');
const manga = document.querySelector('.mangaLink');
manga.temp = 0;
manga.addEventListener('click', setUpData);
const anime = document.querySelector('.animeLink');
anime.addEventListener('click', setUpData);
anime.temp = 1;
const people = document.querySelector('.peopleLink');
people.addEventListener('click', setUpData);
people.temp = 2;

let clickedNumber = 0;
let dataArray = null;
const myRange = document.querySelector('#myRange');


inputSearch.addEventListener('keyup', searchFunction);


myRange.addEventListener('input', function(){ showValue(this.value)});
//myRange.addEventListener('change', function(){ showValue(this.value)});


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
    if (e.target.classList.contains('mangaLink')){ data = await getData('https://api.jikan.moe/v4/top/manga'); temp = 0} 
    else if (e.target.classList.contains('animeLink')){ data = await getData('https://api.jikan.moe/v4/top/anime'); temp = 1}
    else if (e.target.classList.contains('peopleLink')){ data = await getData('https://api.jikan.moe/v4/top/people'); temp = 2}
    updateFilters(temp);
    dataArray = data.data;
    showData(dataArray, temp);
    
}

function showData(arr, temp){
    refreshData()
    let counter = 0;
    let limit = 4;
    
    let main = document.querySelector('.main');
    for (let i = 0; i<arr.length; i++){
        //console.log(arr[i].title)
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
    let sliceNum = 0; //from which index to slice
    let checkedInd = 0;
    let temp; //if it is manga/anime/people

    if (e.target.classList.contains('mangaLink')) temp = 0;
    else if (e.target.classList.contains('animeLink')) temp = 1;
    else if (e.target.classList.contains('peopleLink')) temp = 2;

    //which filter is checked
    if (document.querySelector('#filter1').checked) checkedInd = 0;
    else if (document.querySelector('#filter2').checked) checkedInd = 1;
    else if (document.querySelector('#filter3').checked) checkedInd = 2;

    let text = e.target.value.toString().toLowerCase(); //get search text

    //filtered data
    let filteredData = [];
    let arr = document.getElementsByClassName('gridElement');
    let items = Array.from(arr);
    let titles = []
    

    if (checkedInd == 0){
        sliceNum = 7;
        filteredData = dataArray.filter(e => e.title.toLowerCase().startsWith(text)); 
        for (let j = 0; j< items.length; j++){
            titles.push(items[j].lastChild.children.item(0).innerHTML.slice(sliceNum))
        }
    }
     
    else if (checkedInd == 1) {
        sliceNum = 8;
        filteredData = dataArray.filter(e => e.authors[0].name.toLowerCase().startsWith(text)); 
        for (let j = 0; j< items.length; j++){
            titles.push(items[j].lastChild.children.item(1).innerHTML.slice(sliceNum))
        }
    }
     
    else if (checkedInd == 2) {
        sliceNum = 17;
        filteredData = dataArray.filter(e => {
                return ((e.chapters != null) && e.chapters.toString().startsWith(text));
            }
        ); 
        for (let j = 0; j < items.length; j++){
            titles.push(items[j].lastChild.children.item(2).innerHTML.slice(sliceNum))
        }
    }  

    refreshData();

    console.log(filteredData)
    console.log(titles)
    for (let i = 0; i< filteredData.length; i++) {
        if (dataArray.includes(filteredData[i])) {
            let ind;
            if (checkedInd == 0) ind = titles.indexOf(filteredData[i].title)
            else if (checkedInd == 1) ind = titles.indexOf(filteredData[i].authors[0].name)
            else if (checkedInd == 2) ind = titles.indexOf(filteredData[i].chapters.toString())
            arr[ind].classList.remove('hide');
        }
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

