let textarea = document.querySelector('textarea');
let linkOrganiser = document.getElementById('linkOrganiser');
let desription = document.getElementById('desription');
let newButton = document.querySelector('button');
newButton.addEventListener('click', createNewElem);
textarea.addEventListener('keypress', saveChanges);
textarea.addEventListener('change', saveChanges);
returnOurKeys();
let links = document.getElementsByClassName('link');
for (let link of links) link.addEventListener('click', takeTextInArea);

function createElem(stringWithDate) {
	let div = document.createElement('div');
	div.classList.add('link');
	let button = document.createElement('button');
	button.innerText = 'X';
	button.classList.add('removeButton');
	button.addEventListener('click', removeParent);
	div.innerText = stringWithDate;
	div.appendChild(button);
	linkOrganiser.appendChild(div);
}

function removeParent() {
	let parent = this.parentElement;
	let text = parent.innerText.replace(/X/, '');
	localStorage.removeItem(text);
	parent.remove();
}

function createNewElem() {
	let str = createNowDateString();
	let div = document.createElement('div');
	div.classList.add('link');
	let button = document.createElement('button');
	button.innerText = 'X';
	button.classList.add('removeButton');
	button.addEventListener('click', removeParent);
	div.innerText = str;
	div.appendChild(button);
	div.addEventListener('click', takeTextInArea);
	linkOrganiser.insertBefore(
		div,
		linkOrganiser.firstElementChild.nextElementSibling
	);
	let closebuttons = document.getElementsByClassName('removeButton');
	for (let elem of closebuttons) elem.addEventListener('click', removeParent);
	desription.innerText = 'Создано: ' + str;
	textarea.value = '';
	textarea.focus();
}

function createNowDateString() {
	let date = new Date();
	let seconds = addingTheZero(date.getSeconds());
	//let milseconds=date.getUTCMilliseconds();
	let hour = addingTheZero(date.getHours());
	let minute = addingTheZero(date.getMinutes());
	let day = addingTheZero(date.getDate());
	let month = addingTheZero(date.getMonth());
	let year = addingTheZero(date.getFullYear());
	let str =
		hour + ':' + minute + ':' + seconds + ' ' + day + '.' + month + '.' + year;
	return str;
}

function addingTheZero(number) {
	if (number < 10) {
		number = String(number);
		return '0' + number;
	} else return number;
}

function saveChanges() {
	let text = this.value;
	let tmpstr = desription.innerText;
	let date = tmpstr.replace(/[а-яА-ЯЁё]+:\s/g, '');
	localStorage.setItem(date, text);
	console.log(localStorage);
}

function returnOurKeys() {
	let arr = [];
	for (let key in localStorage) {
		if (!localStorage.hasOwnProperty(key)) {
			continue;
		}
		arr.push(key);
	}
	arr.reverse();
	for (let elem of arr) {
		createElem(elem);
	}
}

function takeTextInArea() {
	let key = this.innerText.replace(/X/, '');
	let text = localStorage.getItem(key);
	textarea.value = text;
	desription.innerText = 'Создано: ' + key;
}
