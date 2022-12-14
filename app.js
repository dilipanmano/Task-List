const form = document.querySelector('form');
const ulList = document.querySelector('.collection');
const inputVal = document.querySelector('#task');
const clearAll = document.querySelector('.clear-tasks');
const filterText = document.querySelector('#filter');


loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', loadTaskFromLS);
    form.addEventListener('submit', addTask);
    ulList.addEventListener('click', removeTask);
    clearAll.addEventListener('click', clearTasks);
    filterText.addEventListener('input', filterTasks);
}


function loadTaskFromLS() {
    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));

        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            //li.textContent = inputVal.value;
            li.appendChild(document.createTextNode(task));


            const del = document.createElement('a');
            del.className = "delete-item secondary-content";
            del.innerHTML = '<i class="ri-close-line"></i>';


            li.appendChild(del);
            ulList.appendChild(li);
        });
    }
}

function storeInLocalStorage(newTask) {
    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }
    tasks.push(newTask);
    localStorage.setItem('Tasks', JSON.stringify(tasks));

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
        del.innerHTML = '<i class="ri-close-line"></i>';


        li.appendChild(del);
        ulList.appendChild(li);

        storeInLocalStorage(inputVal.value);

        inputVal.value = '';

    }

    e.preventDefault();
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item') && confirm("Are you sure?")) {
        e.target.parentElement.parentElement.remove();
        deleteTaskfromLS(e.target.parentElement.parentElement);
    }
}

function deleteTaskfromLS(data) {

    let tasks;
    if (localStorage.getItem('Tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('Tasks'));
    }

    tasks.forEach(function(task, index){
        if(data.textContent === task){
            tasks.splice(index,1);
        }
    })

    /*var index = tasks.indexOf(data.textContent);

    if (index !== -1) {
        tasks.splice(index, 1);
        console.log(tasks);
    } */

    localStorage.setItem('Tasks',JSON.stringify(tasks));
}

function clearTasks(e) {
    //ulList.innerHTML = '';
    if (confirm("Are you sure?"))
        while (ulList.firstChild) {
            ulList.firstChild.remove();
            localStorage.clear();
        }
}

function filterTasks(e) {
    text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task) {

            item = task.textContent.toLowerCase();

            if (item.indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }

        }
    )
}