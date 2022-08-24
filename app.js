const form = document.querySelector('form');
const ulList = document.querySelector('.collection');
const inputVal = document.querySelector('#task');
const clearAll = document.querySelector('.clear-tasks');
const filterText = document.querySelector('#filter');


loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    ulList.addEventListener('click', removeTask);
    clearAll.addEventListener('click', clearTasks);
    filterText.addEventListener('input',filterTasks);
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


        inputVal.value = '';

    }

    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item') && confirm("Are you sure?")){
        e.target.parentElement.parentElement.remove();
    }
}

function clearTasks(e){
    //ulList.innerHTML = '';
    if(confirm("Are you sure?"))
    while(ulList.firstChild){
        ulList.firstChild.remove();
    }
}

function filterTasks(e){
    text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){

            item = task.textContent.toLowerCase();

            if(item.indexOf(text) != -1){
                task.style.display = 'block'; 
            }   
            else{
                task.style.display = 'none';
            }

        }
    )
}