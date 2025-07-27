import "./style.css";
import starImportant from "./star-svg.svg";
console.log("Webpack is working!"); 

let addTodo = document.querySelector("#addt");
let addTask = document.querySelector("#add-task");
let editTask = document.querySelector("#edit-task");
let addNewTaskBtn = document.querySelector("#new-task");
let listOfTasks = document.querySelector("#tasks");
let cancelButton = document.querySelector("#cancel");
let editCancelBtn = document.querySelector("#edit-cancel");
let editTaskBtn = document.querySelector("#edit-task-btn");
let newProj = document.querySelector("#add");
let allProjects = document.querySelector("#allProj");
let formNewProj=document.querySelector("#new-projects");
let newProjBtn = document.querySelector("#green");
let inputName= document.querySelector("#name-new-project");
let cancelNewProj = document.querySelector("#red");
let allTasks = document.querySelector("#all-tasks");
star.style.width="20px";
star.style.height="20px";
let arrOfNewProj=[];
let cntr=0;
let objToNum;
let arrOfElements=[];
let getParent;
let counter=0;
let getElementId;
let getProj;
let toDoCntr=0;
let currentToDo;
let ProjArrToDo;
let todoWork;
let editElement;
let counterForId=0;

function newToDo(){
    this.newTitle=0;
    this.newDesc=0;
    this.newDate=0;
    this.id;
};


function createNewProject(){
    this.id;
    this.arrToDo=[];
};

function eventListBtnEdit(theBtn){

    theBtn.addEventListener('click', (e)=>{
        e.stopPropagation();

        getParent = theBtn.parentElement;
        let getObj = getParent.id;   

        ProjArrToDo=getProj.arrToDo;
        todoWork=ProjArrToDo.find(todo=>todo.id===getObj);

        objToNum=parseInt(getObj);

        editTask.style.overflow = 'visible';
        editTask.style.height = 'auto';
        editTask.style.width = 'auto';

        console.log(objToNum);

        document.getElementById('titleEdit').value = todoWork.newTitle;
        document.getElementById('detailsEdit').value = todoWork.newDesc;

        editElement = getParent;


    })
};

function eventListBtnDelete(theBtn, Prj){

    theBtn.addEventListener('click', (e)=>{
        e.stopPropagation();

        getParent = theBtn.parentElement;
        getParent.remove();

        if(Prj){
            console.log(arrOfNewProj);
            arrOfNewProj=arrOfNewProj.filter(project=>project!==Prj);
            console.log(arrOfNewProj);
            listOfTasks.innerHTML='';
            counter--;
        }

    })
};

function BtnDeleteToDo(theBtn){

    theBtn.addEventListener('click', (e)=>{
        e.stopPropagation();

        let crntToDo = getProj.arrToDo;

        getParent = theBtn.parentElement;
        let getParentId = getParent.id;
        getParent.remove();

        console.log(crntToDo);
        getProj.arrToDo=getProj.arrToDo.filter(toDo=>toDo.id!==getParentId);
        console.log('----------------');
        console.log(crntToDo);
        toDoCntr--;


    })
};

function createAndAppend(parentNde, type){
    let addNewDiv = document.createElement(`${type}`);
    parentNde.appendChild(addNewDiv);
    return addNewDiv;
}

function createTaskDiv(title, details, id){
    let liContainer = createAndAppend(listOfTasks, "li");
    let titleAndDetails = createAndAppend(liContainer, "div");
    let titless=createAndAppend(titleAndDetails, "div");
    let detailsss=createAndAppend(titleAndDetails, "div");
    let data = createAndAppend(liContainer, "div");
    let edit = createAndAppend(liContainer, "button");
    let del = createAndAppend(liContainer, "button");

    liContainer.style.display="flex";

    //liContainer.appendChild(star);

    titleAndDetails.style.display="flex";
    titleAndDetails.style.flexDirection="column";
    titleAndDetails.classList.add ("title-details");

    titless.classList.add("taskTitles");

    detailsss.classList.add("taskDetails");

    eventListBtnEdit(edit);
    BtnDeleteToDo(del);

    titless.textContent = title;
    detailsss.textContent = details;

    if(id){
        liContainer.setAttribute('id', id);
    }
    else if (!id){
    liContainer.setAttribute('id', `${cntr}`);}
    arrOfElements[cntr] = liContainer;
    //data.value = date;
};



function checkOverflow(domVar){
    if(domVar.style.overflow == "hidden"){
        domVar.style.overflow = 'visible';
        domVar.style.height = 'auto';
        domVar.style.width = 'auto';
        return 1;
    }
    else if(domVar.style.overflow == "visible"){
        domVar.style.overflow = 'hidden';
        domVar.style.height = '0px';
        domVar.style.width = '0px';
        return 0;
    };
}

        addTask.style.overflow = 'hidden';
        addTask.style.height = '0px';
        addTask.style.width = '0px';



addTodo.addEventListener('click', ()=>{
    checkOverflow(addTask);
});


editTask.style.overflow = 'hidden';
        editTask.style.height = '0px';
        editTask.style.width = '0px';

addNewTaskBtn.addEventListener('click', (event)=>{

    event.preventDefault();
    getProj.arrToDo[toDoCntr]= new newToDo();
    currentToDo = getProj.arrToDo[toDoCntr];
    currentToDo.id = `${cntr}`;
    currentToDo.newTitle = document.getElementById('titlet').value;
    currentToDo.newDesc = document.getElementById('details').value;
    //const titles = document.getElementById('titlet').value;
    //const detailss = document.getElementById('details').value;
    //const dates = document.getElementById('date').value;
    //createTaskDiv(titles, detailss);

    createTaskDiv(currentToDo.newTitle, currentToDo.newDesc);
        addTask.style.overflow = 'hidden';
        addTask.style.height = '0px';
        addTask.style.width = '0px';
        document.getElementById('titlet').value = '';
        document.getElementById('details').value='';
        cntr++;
        toDoCntr++;

});

cancelButton.addEventListener('click', (event)=>{

        addTask.style.overflow = 'hidden';
        addTask.style.height = '0px';
        addTask.style.width = '0px';
        document.getElementById('titlet').value = '';
        document.getElementById('details').value='';
});


editTaskBtn.addEventListener('click', (e)=>{

    e.preventDefault();

    ProjArrToDo=getProj.arrToDo;

    todoWork.newTitle = document.getElementById('titleEdit').value;
    todoWork.newDesc = document.getElementById('detailsEdit').value;

    let currentElement = editElement;
    let firstChildOfCurrentElement = currentElement.firstChild;
    let elTitle = firstChildOfCurrentElement.firstChild;
    let elDesc = elTitle.nextElementSibling;

    elTitle.textContent = todoWork.newTitle;
    elDesc.textContent = todoWork.newDesc;

    editTask.style.overflow = 'hidden';
    editTask.style.height = '0px';
    editTask.style.width = '0px';

});

editCancelBtn.addEventListener('click', ()=>{
    
    editTask.style.overflow = 'hidden';
    editTask.style.height = '0px';
    editTask.style.width = '0px';  

});

newProj.addEventListener('click', ()=>{

formNewProj.style.overflow='visible';
formNewProj.style.height='auto';
formNewProj.style.width='auto';



});

newProjBtn.addEventListener('click', (e)=>{


e.preventDefault();


formNewProj.style.overflow='hidden';
formNewProj.style.height='0px';
formNewProj.style.width='0px';

let addProject=document.createElement("div");
let projTitle=createAndAppend(addProject, "div");
let delBtn=createAndAppend(addProject, "button");


projTitle.style.marginRight="auto";


addProject.classList.add("pro");
addProject.setAttribute('id', `0${counterForId}`);

arrOfNewProj[counter]=new createNewProject();
let theNewProj = arrOfNewProj[counter];
arrOfNewProj[counter].id = `0${counterForId}`;

eventListBtnDelete(delBtn, theNewProj);


allProjects.insertBefore(addProject, formNewProj);

projTitle.textContent=inputName.value;

inputName.value='';

toDoCntr=0;
counter++;
counterForId++;


});

cancelNewProj.addEventListener('click', (e)=>{
    
    e.preventDefault();

inputName.value='';
formNewProj.style.overflow='hidden';
formNewProj.style.height='0px';
formNewProj.style.width='0px';

});

allProjects.addEventListener('click', (e)=>{

let target = e.target;

if(target.matches(".pro")){

    getElementId = target.id;
    getProj=arrOfNewProj.find(proj=>proj.id===getElementId);
    console.log(getProj);
    listOfTasks.innerHTML='';
    addTodo.style.visibility="visible";
    getProj.arrToDo.forEach(todo => {
        createTaskDiv(todo.newTitle, todo.newDesc, todo.id);
    });
    toDoCntr = getProj.arrToDo.length;
}

});

allTasks.addEventListener('click', ()=>{

    listOfTasks.innerHTML='';
    addTodo.style.visibility='hidden';
    arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
        createTaskDiv(todos.newTitle, todos.newDesc, todos.id);
        })
    })
    listOfTasks.appendChild(star);
});



/// posledno se zanimava s tova da dobavish event delegation kum vsichki new project elemeneti dobaveni s "New Project"

///emi posledno otnovo s tva se zanimava    







