document.addEventListener('DOMContentLoaded', producersList);

const modal = document.querySelector('.modalContainer');
const closeModalButton = document.querySelector('.closeModal');

closeModalButton.addEventListener('click',closeModalWindow);

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

    uniqueProducers.forEach(el => {
        let div = document.createElement('div');
        let p = document.createElement('p');
        let loadMore = document.createElement('button');
        loadMore.innerHTML = `See more`;
        loadMore.classList.add('btn');
        loadMore.addEventListener('click', about)
        div.classList.add('producer');
        p.innerHTML = el;
        p.classList.add('producerName');
        div.appendChild(p);
        div.appendChild(loadMore);
        list.appendChild(div);
        
    });
    //console.log(producers[0].producers);
    /*console.log(topRated)
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
    })*/
}

function showModalWindow(){
    modal.classList.remove('hide');
    document.querySelector('.container').setAttribute('scroll','no');
    document.querySelector('.container').style.overflow = 'hidden';
}

function about(e){

    let div = document.querySelector('.modalWindow');
    div.innerHTML += `<p class="title">Title</p>
                    `
    showModalWindow();
}

function closeModalWindow(){
    let div = document.querySelector('.modalWindow');
    div.innerHTML = '';
    modal.classList.add('hide');
    document.querySelector('.container').removeAttribute('scroll','no');
    document.querySelector('.container').style.overflow = '';
}