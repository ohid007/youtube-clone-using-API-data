// calling data from API as per category
const categoryHandler = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categoryContainer = document.getElementById('category-container');
    data.data?.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
    <button onclick="loadCategoryData('${category.category_id}')" class="btn btn-active mx-4">${category.category}</button>
    `
        categoryContainer.appendChild(div);
    });
};
/*1. calling data from api by category Id 
 2. creating a global variable Array*/
let sortArray=[];
const loadCategoryData = async (param1) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${param1}`);
    const data = await response.json();
   sortArray=[...data?.data];
   displayData(sortArray);
};
/* 1.looping through the global variable and get the data
2.set the data in html
3.show the default text and image for the empty category */

function displayData(sortArray){
    const cardContainer = document.getElementById('main-container');
    cardContainer.innerHTML = '';
    const img = `<img class="w-10 m-0 p-0" src="./Facebook-Verified.png" alt=""></img>`
    if (sortArray.length === 0 || sortArray === []) {
        defaultOperator(true);
    }
    else {
        defaultOperator(false);
    }
    sortArray.forEach(card => {
        const div = document.createElement('div');
        const seconds = card?.others?.posted_date
        div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow-xl h-60">
                
                    <figure><img src="${card?.thumbnail}" alt="Shoes" /></figure>
                    <p class="absolute top-24 right-0 bg-black rounded text-white" >${seconds ? timeCalculation(seconds) : ''}</p>
                    <div class="card-body">
                        <div class="flex">
                            <img class="w-10 h-10 rounded-full mr-2" src="${card?.authors[0].profile_picture}" alt="">
                            <div>
                                <h2 class="card-title">${card.title}</h2>
                                <div class="flex justify-start">
                                <p>${card?.authors[0].profile_name}</p>
                                <p>${card?.authors[0].verified ? img : ""}</p>
                            </div>
                                <p>${card?.others.views}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
        cardContainer.appendChild(div);
    });
};
/* sorting function for the sort by view button */
const arraySortingFun=()=>{
sortArray.sort((a,b)=>{
    viewA= parseFloat(a.others.views);
    viewB=parseFloat(b.others.views);
    console.log(viewA);
    return viewB-viewA;
})
displayData(sortArray);

};
// time calculation from second for the posted date
const timeCalculation = (seconds) => {
    const hour = parseInt(seconds / 3600);
    const minute = parseInt((seconds % 3600) / 60);
    return (hour + "hrs " + minute + "min" + " ago")
};
// function for setting default message for empty category
const defaultOperator = (para) => {
    const defaultContainer = document.getElementById('default-data');
    if (para == true) {
        defaultContainer.classList.remove('hidden');
    }
    else {
        defaultContainer.classList.add('hidden');
    }

};

loadCategoryData(1000);
categoryHandler();