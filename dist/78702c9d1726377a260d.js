import "./style.css";
import starImportant from "./star-svg.svg";
import deleteImg from "./delete-svg.svg";
import editImg from "./edit-svg.svg";
import starImportantFill from "./star-svg-yellow.svg";
import { isThisWeek, isToday } from "date-fns";
import { th } from "date-fns/locale";


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
let divImportant = document.querySelector("#important");
let todayBtn = document.getElementById("today");
let thisWeekBtn=document.getElementById("week");
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
let getObj;
let curretnPage=0; 
let theDay;
let theMonth;
let theYear;
let theNewestArr=[];

function newToDo(){
    this.newTitle;
    this.newDesc;
    this.newDate;
    this.id;
    this.important=false;
};

function dateDeconstruct(length, zeArr, ind){
    let newArr=[];
    for(let i=0; i<length; i++ ){
        newArr[i]=zeArr[ind];
        ind++
    };
    return parseInt(newArr.join(''));
}

/*newToDo.prototype.dateManipulation = function(){
    this.dateToInt = this.newDate.split('');
    this.dateThing = this.dateToInt.filter(dt=>dt!=="-");
    theYear = dateDeconstruct(4, this.dateThing, 0);
    theMonth = dateDeconstruct(2, this.dateThing, 4) - 1;
    theDay = dateDeconstruct(2, this.dateThing, 6);
};*/

function dateManipulation(theDate){
    let dateToInt = theDate.split('');
    let dateThing = dateToInt.filter(dt=>dt!=="-");
    theYear = dateDeconstruct(4, dateThing, 0);
    theMonth = dateDeconstruct(2, dateThing, 4) - 1;
    theDay = dateDeconstruct(2, dateThing, 6);
};


function createNewProject(){
    this.id;
    this.name;
    this.arrToDo=[];
};


function createAndAppendImg(prntNode,srcImg){

    if(curretnPage==2 && srcImg==starImportant){
        srcImg=starImportantFill;
    }
    let theImg = document.createElement("img");
    theImg.src = srcImg;
    theImg.classList.add('divBtns');
    prntNode.appendChild(theImg);
    return theImg;
};

function eventListImportant(imp){
    imp.addEventListener('click', (e)=>{
        let ttarget=e.target;
        getParent=imp.parentElement;
        getObj=getParent.id;
        
        if(curretnPage!=3){
            arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
            if(todos.id===getObj){
                getProj=proj;
            }
        })
    })
}

        todoWork = getProj.arrToDo.find(todoo=>todoo.id===getObj);
        if(todoWork.important==false && curretnPage!=2){
            imp.innerHTML='';
            createAndAppendImg(imp,starImportantFill);
            todoWork.important=true;
        }
        else if(todoWork.important==true && curretnPage!=2){
            imp.innerHTML='';
            createAndAppendImg(imp,starImportant);
            todoWork.important=false;
        }
        else if(todoWork.important==true && curretnPage==2){
            getParent.remove();
            todoWork.important=false;
        };
        localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));
    });

}


function eventListBtnEdit(theBtn){

    theBtn.addEventListener('click', (e)=>{
        e.stopPropagation();

        getParent = theBtn.parentElement;
        getObj = getParent.id;
        
        if(curretnPage!=3){
            arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
            if(todos.id===getObj){
                getProj=proj;   
            }
        })
    })
}

        ProjArrToDo=getProj.arrToDo;
        todoWork=ProjArrToDo.find(todo=>todo.id===getObj);

        objToNum=parseInt(getObj);

        editTask.style.overflow = 'visible';
        editTask.style.height = 'auto';
        editTask.style.width = 'auto';


        document.getElementById('titleEdit').value = todoWork.newTitle;
        document.getElementById('detailsEdit').value = todoWork.newDesc;
        document.getElementById('dateEdit').value = todoWork.newDate;

        editElement = getParent;

        localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));
    })
};

function eventListBtnDelete(theBtn, Prj){

    theBtn.addEventListener('click', (e)=>{
        e.stopPropagation();

        getParent = theBtn.parentElement;
        getParent.remove();

        if(Prj){
            arrOfNewProj=arrOfNewProj.filter(project=>project!==Prj);
            listOfTasks.innerHTML='';
            counter--;
            localStorage.setItem("counter", counter);
            localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));
        }
        localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));
    })
};

function BtnDeleteToDo(theBtn){

    theBtn.addEventListener('click', (e)=>{
        e.stopPropagation();

        getParent = theBtn.parentElement;
        let getParentId = getParent.id;

        if(curretnPage!=3){
            arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
            if(todos.id===getParentId){
                getProj=proj;
            }
        })
    })
}

        let crntToDo = getProj.arrToDo;
        getParent.remove();

        getProj.arrToDo=getProj.arrToDo.filter(toDo=>toDo.id!==getParentId);
        toDoCntr--;

        localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));
    })
};

function createAndAppend(parentNde, type){
    let addNewDiv = document.createElement(`${type}`);
    parentNde.appendChild(addNewDiv);
    return addNewDiv;
}

function createTaskDiv(title, details, dated, id, isImportant){
    let liContainer = createAndAppend(listOfTasks, "li");
    let titleAndDetails = createAndAppend(liContainer, "div");
    let titless=createAndAppend(titleAndDetails, "div");
    let detailsss=createAndAppend(titleAndDetails, "div");
    let data = createAndAppend(liContainer, "div");
    let edit = createAndAppend(liContainer, "div");
    let del = createAndAppend(liContainer, "div");
    let importantt = createAndAppend(liContainer, "div");

    if(typeof isImportant==="boolean"){
        if(isImportant==true){
            createAndAppendImg(importantt, starImportantFill);
        }
        else if(isImportant==false){
            createAndAppendImg(importantt, starImportant);
        }
    }
    else{
        createAndAppendImg(importantt, starImportant);
    }
    createAndAppendImg(edit, editImg);
    createAndAppendImg(del, deleteImg);


    liContainer.classList.add("flex");
    del.classList.add('flex');
    importantt.classList.add('flex');
    edit.classList.add('flex');



    titleAndDetails.style.display="flex";
    titleAndDetails.style.flexDirection="column";
    titleAndDetails.classList.add ("title-details");

    titless.classList.add("taskTitles");

    detailsss.classList.add("taskDetails");

    data.classList.add('datee');

    eventListBtnEdit(edit);
    BtnDeleteToDo(del);
    eventListImportant(importantt);

    if(dated=='' && !dated){
        data.textContent="No due date"
    }else{
        data.textContent = dated;
    }
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
    currentToDo.newDate = document.getElementById('date').value; 

    createTaskDiv(currentToDo.newTitle, currentToDo.newDesc,currentToDo.newDate);
        addTask.style.overflow = 'hidden';
        addTask.style.height = '0px';
        addTask.style.width = '0px';
        document.getElementById('titlet').value = '';
        document.getElementById('details').value='';
        document.getElementById('date').value='';
        console.log(cntr);
        cntr++;
        console.log(cntr);
        toDoCntr++;

        localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));
        localStorage.setItem("cntr", cntr);

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
    todoWork.newDate = document.getElementById('dateEdit').value;

    let currentElement = editElement;
    let firstChildOfCurrentElement = currentElement.firstChild;
    let elTitle = firstChildOfCurrentElement.firstChild;
    let elDesc = elTitle.nextElementSibling;
    let elDate = firstChildOfCurrentElement.nextElementSibling;

    elTitle.textContent = todoWork.newTitle;
    elDesc.textContent = todoWork.newDesc;
    elDate.textContent = todoWork.newDate;

    editTask.style.overflow = 'hidden';
    editTask.style.height = '0px';
    editTask.style.width = '0px';
    localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));

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

function createDivNewProj(id, index, name){
formNewProj.style.overflow='hidden';
formNewProj.style.height='0px';
formNewProj.style.width='0px';

let addProject=document.createElement("div");
let projTitle=createAndAppend(addProject, "div");
let delBtn=createAndAppend(addProject, "div");
createAndAppendImg(delBtn, deleteImg);


projTitle.classList.add("title-proj");


addProject.classList.add("pro");
addProject.setAttribute('id', id);

let currentProj = arrOfNewProj[index];

eventListBtnDelete(delBtn, currentProj);


allProjects.insertBefore(addProject, formNewProj);

projTitle.textContent=name;


};

newProjBtn.addEventListener('click', (e)=>{


e.preventDefault();

formNewProj.style.overflow='hidden';
formNewProj.style.height='0px';
formNewProj.style.width='0px';

let addProject=document.createElement("div");
let projTitle=createAndAppend(addProject, "div");
let delBtn=createAndAppend(addProject, "div");
createAndAppendImg(delBtn, deleteImg);


projTitle.classList.add("title-proj");


addProject.classList.add("pro");
addProject.setAttribute('id', `0${counterForId}`);

arrOfNewProj[counter]=new createNewProject();
let theNewProj = arrOfNewProj[counter];
arrOfNewProj[counter].id = `0${counterForId}`;

eventListBtnDelete(delBtn, theNewProj);


allProjects.insertBefore(addProject, formNewProj);
theNewProj.name = inputName.value;
projTitle.textContent=inputName.value;

inputName.value='';

counter++;
counterForId++;

localStorage.setItem("counter", counter);
localStorage.setItem("counterForId", counterForId);
localStorage.setItem("arrOfProj", JSON.stringify(arrOfNewProj));

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
    listOfTasks.innerHTML='';
    addTodo.style.visibility="visible";
    curretnPage=3;
    getProj.arrToDo.forEach(todo => {
        createTaskDiv(todo.newTitle, todo.newDesc, todo.newDate, todo.id,todo.important);
    });
    toDoCntr = getProj.arrToDo.length;
}

});

allTasks.addEventListener('click', ()=>{

    curretnPage=1;
    listOfTasks.innerHTML='';
    addTodo.style.visibility='hidden';
    arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
        createTaskDiv(todos.newTitle, todos.newDesc,todos.newDate,todos.id, todos.important);
        })
    })
});

divImportant.addEventListener('click', ()=>{

    curretnPage=2;
    listOfTasks.innerHTML='';
    addTodo.style.visibility='hidden';
    arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
            if(todos.important==true){
        createTaskDiv(todos.newTitle, todos.newDesc, todos.newDate, todos.id);
    };
        })
    })
});

    todayBtn.addEventListener('click', ()=>{
        curretnPage=5;
        listOfTasks.innerHTML='';
        addTodo.style.visibility="hidden";
arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
            dateManipulation(todos.newDate);
            if(isToday(new Date(theYear, theMonth, theDay))==true){
        createTaskDiv(todos.newTitle, todos.newDesc, todos.newDate, todos.id, todos.important);
    };
        })
    })
    });

    thisWeekBtn.addEventListener('click', ()=>{
        curretnPage=6;
        listOfTasks.innerHTML='';
        addTodo.style.visibility="hidden";
        arrOfNewProj.forEach(proj => {
        proj.arrToDo.forEach(todos=>{
            dateManipulation(todos.newDate);
            if(isThisWeek(new Date(theYear, theMonth, theDay))==true){
        createTaskDiv(todos.newTitle, todos.newDesc, todos.newDate, todos.id, todos.important);
    };
        })
    })
    });

    document.addEventListener('DOMContentLoaded',() => {
        //resetLocal();
        arrOfNewProj = JSON.parse(localStorage.getItem('arrOfProj'));
        console.log(arrOfNewProj);
        counter = parseInt(localStorage.getItem("counter"));
        counterForId=parseInt(localStorage.getItem("counterForId"));
        cntr = parseInt(localStorage.getItem("cntr"));

        arrOfNewProj.forEach((element, index)=>{
            createDivNewProj(element.id, index, element.name);
        });

        console.log(`counter: ${counter}`);
        console.log(`cntr: ${cntr}`);
        console.log(`counterForId: ${counterForId}`);
});

function resetLocal(){
    localStorage.setItem("arrOfProj", '');
    localStorage.setItem("cntr", '');
    localStorage.setItem("counter", '');
    localStorage.setItem("counterForId", '');
}