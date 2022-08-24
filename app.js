const form = document.querySelector('form');
const ulList = document.querySelector('.collection');
const inputVal = document.querySelector('#task');
const clearAll = document.querySelector('.clear-tasks');
//console.log(inputVal);


loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    ulList.addEventListener('click', removeTask);
    clearAll.addEventListener('click', clearTasks);
}

function addTask(e) {
    if (inputVal.value === '') {
        alert("Enter a value");
    }
    else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        //li.textContent = inputVal.value;
        li.appendChild(document.createTextNode(inputVal.value));
        

        const del = document.createElement('a');
        del.className = "delete-item secondary-content";
        del.innerHTML='<i class="ri-close-line"></i>';
        
    
        li.appendChild(del);
        ulList.appendChild(li);

        //console.log(ulList);

        inputVal.value = ' ';

    }

    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }
}

function clearTasks(e){
    //ulList.innerHTML = '';
    while(ulList.firstChild){
        ulList.firstChild.remove();
    }
}