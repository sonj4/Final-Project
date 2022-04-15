document.addEventListener('DOMContentLoaded', producersList);

const popup = document.querySelector('.modalContainer');
const closePopupButton = document.querySelector('.closeModal');

closePopupButton.addEventListener('click',closePopupWindow);

async function getData(url){
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function producersList(){
    let all = await getData('https://api.jikan.moe/v4/top/anime');
    all = all.data;
    let producers = [];
    all.forEach(el => {
        el.producers.forEach(producer => {
            producers.push(producer.name);
        });
        
    });
    let uniqueProducers = [...new Set(producers)];
    //console.log(uniqueProducers);
    let list = document.querySelector('.producers');

    uniqueProducers.forEach(producer => {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let loadMore = document.createElement('button');
        loadMore.innerHTML = `See more`;
        loadMore.classList.add('btn');
        loadMore.classList.add('readMore');
        loadMore.addEventListener('click', about);
        all.forEach(el => {
            el.producers.forEach(prod => {
                if (producer === prod.name){
                    loadMore.prop = {name: prod.name, type: prod.type, more: prod.url};
                }
            });
            
        });
        div.classList.add('producer');
        p.innerHTML = producer;
        p.classList.add('producerName');
        div.appendChild(p);
        div.appendChild(loadMore);
        list.appendChild(div);
        
    });
}

function showPopupWindow(){
    popup.classList.remove('hide');
    document.querySelector('.container').setAttribute('scroll','no');
    document.querySelector('.container').style.overflow = 'hidden';
}

function about(e){
    let name = e.currentTarget.prop.name;
    let type = e.currentTarget.prop.type;
    let url = e.currentTarget.prop.more;
    let div = document.querySelector('.modalWindow');
    div.innerHTML += `<h3 class = "modalWindowTitle">Name:</h3> <p class="modalWindowText">${name}</p>
    <h3 class = "modalWindowTitle">Type:</h3> <p class="modalWindowText">${type}</p>
    <a href="${url}" class = "seeMoreLink">See more</a></p>
                    `
    showPopupWindow();
}

function closePopupWindow(){
    let div = document.querySelector('.modalWindow');
    div.innerHTML = '';
    popup.classList.add('hide');
    document.querySelector('.container').removeAttribute('scroll','no');
    document.querySelector('.container').style.overflow = '';
}

/*let str = "Hello \world";
str = str.replace(/[{\}]/g, '');
console.log(str);*/