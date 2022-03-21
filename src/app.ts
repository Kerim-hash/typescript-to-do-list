const formToAddItemsID = document.getElementById('form') as HTMLFormElement;
const listOfItemsID = document.getElementById('tasklist') as HTMLElement;
const input = document.getElementById('input') as HTMLInputElement;

interface Todo {
	itemText: string;
	checkedOff: boolean,
	deleted: boolean,
}

const parsingLocalStorageItems = JSON.parse(localStorage.getItem('items')  || "[]") ;

function addNewTask(this: any, e: any,) {

	 e.preventDefault();

	 const item = {
		  itemText: input.value,
		  checkedOff: false,
		  deleted: false
     };

   	 parsingLocalStorageItems.push(item);

	 populateList(parsingLocalStorageItems, listOfItemsID);

	 localStorage.setItem('items', JSON.stringify(parsingLocalStorageItems));

	 this.reset();
}



function populateList(itemArray : Array<Todo>,  itemList: HTMLElement) {
	 itemList.innerHTML = itemArray.map((item, i: number) => {
	 return `
		  <li>
		  <div>
		  <input type="checkbox" data-index=${i} id="item${i}" ${item.checkedOff ? 'checked' : ''} />
		  <label class="label" data-content="${item.itemText}" for="item${i}">${item.itemText}</label>
		  </div>
		  <span class="close" data-index=${i}  id="removed${i}" ${item.deleted ? true : false}>✖</span>
		  </li>
	 `;
	 }).join('');
}

function checkedOffFn(e: any) {
	 if (!e.target.matches('input')) return;
	 const el = e.target;
	 const index = el.dataset.index;
	 parsingLocalStorageItems[index].checkedOff = !parsingLocalStorageItems[index].checkedOff;
	 localStorage.setItem('items', JSON.stringify(parsingLocalStorageItems));
	 populateList(parsingLocalStorageItems, listOfItemsID);
}

function removeItemFn(e: any) {
    if (!e.target.matches('span')) return;
    const element = e.target;
    const ind = element.dataset.index;
    parsingLocalStorageItems[ind].deleted = !parsingLocalStorageItems[ind].deleted;
    console.log(parsingLocalStorageItems[ind].deleted);
    parsingLocalStorageItems.splice([ind],1);
    localStorage.setItem('items', JSON.stringify(parsingLocalStorageItems));
    populateList(parsingLocalStorageItems, listOfItemsID);
}

formToAddItemsID.addEventListener('submit', addNewTask);
listOfItemsID.addEventListener('click', checkedOffFn);
listOfItemsID.addEventListener('click', removeItemFn);

populateList(parsingLocalStorageItems, listOfItemsID);