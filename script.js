//Pop-up modal://

let openModal = document.querySelector('.addItem');
openModal.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'flex';
})

let closeModal = document.querySelector('.closeModal');
closeModal.addEventListener('click', () => {
    document.querySelector('.overlay').style.display = 'none';
})

//Movie/show card://

/*let starButtons = document.querySelectorAll('.rating input');
let stars = document.querySelectorAll('.rating label');

let watchStatus = document.querySelector('.watchStatus');
watchStatus.addEventListener('click', () => {
    if (watchStatus.textContent === 'Not Watched') {
        watchStatus.textContent = 'Watching';
    } else if (watchStatus.textContent === 'Watching') {
        watchStatus.textContent = 'Watched';
    } else {
        watchStatus.textContent = 'Not Watched';
        starButtons.forEach(starButton => starButton.checked = false);
    }
})

starButtons.forEach(starButton => starButton.addEventListener('click', () => {
    watchStatus.textContent = 'Watched';
}))*/

/*let deleteItem = document.querySelector('.closeButton');
deleteItem.addEventListener('click', () => {

})*/


//Adding objects to watchlist://

let watchList = [];

function item(name,status,rating) {
    this.name = name;
    this.status = status;
    this.rating = rating;
}

function addItemToList(media) {
    watchList.push(media);
}

let itemFormat = document.querySelector('[data-arrayIndex="-1"]');
let allCards = document.querySelector('.allCards');

function initiateClose() {
    let removeItemButtons = document.querySelectorAll('.closeButton');
    removeItemButtons.forEach(button => button.addEventListener('click', (e) => {
        console.log(e.target.parentElement.parentElement.parentElement.dataset.arrayindex);
        let arrayIndex = Number(e.target.parentElement.parentElement.parentElement.dataset.arrayindex);
        watchList.splice(arrayIndex, 1);
        allCards.children[arrayIndex+1].remove();
        updateIndex();
    }))
}

initiateClose();

function updateIndex() {
    if (watchList.length === allCards.childElementCount - 1) {
        for (let i=allCards.childElementCount-1; i > 0; i--) {
            allCards.children[i].dataset.arrayindex = i-1;
        }
    }
}

function removeAllItems() {
    for (let i=allCards.childElementCount-1; i > 0; i--) {
        allCards.children[i].remove();
    }
}

function displayItems() {
    for (let i=0; i < watchList.length; i++) {
        let cloneItem = itemFormat.cloneNode(true);
        cloneItem.dataset.arrayindex = i;
        cloneItem.children[0].children[1].textContent = watchList[i].name;
        cloneItem.children[2].children[0].children[0].textContent = watchList[i].status;
        allCards.appendChild(cloneItem);
    }
}

let submit = document.querySelector('.submit');
submit.addEventListener('click', () => {
    let newItem = new item(document.forms['newItemForm']['itemName'].value, document.querySelector('input[name="watchStat"]:checked').nextElementSibling.textContent, document.querySelector('input[name="rate"]:checked').getAttribute('id').slice(-1));
    addItemToList(newItem);
    document.querySelector('.overlay').style.display = 'none';
    removeAllItems();
    displayItems();
    initiateClose();
})