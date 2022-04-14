document.addEventListener('DOMContentLoaded', producersList);

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
    console.log(uniqueProducers);
    let list = document.querySelector('.producers');
    
    
}