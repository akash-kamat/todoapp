plusbtn = document.querySelector('img');
todoInput = document.getElementById("todo");
submitBtn = document.getElementById("addbtn");
todoContainer = document.getElementsByClassName("todos")[0];
mainBox = document.getElementsByClassName("main")[0];
clearbtn = document.getElementById("clearall");


submitBtn.addEventListener("click", addTodo);
plusbtn.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        addTodo();
    }
})

todoInput.addEventListener("input", function () {
    if (todoInput.value === '') {
        submitBtn.disabled = true;
    }
    else {
        submitBtn.disabled = false;
    }
})

// todoContainer.addEventListener("hover",function(){
//     if(todoContainer.innerHTML===""){
//         document.getElementById("clearall").disabled=true;
//     }
//     else{
//         document.getElementById("clearall").disabled=false;
//     }
// })

store = localStorage.getItem("Todo");
if (store == null) {
    storelist = [];
}
else {
    storelist = JSON.parse(store);
}
load();




i = 0;
function addTodo() {
    todo = todoInput.value;
    if (todo === "") {
        alert("Enter Something");
        todoInput.focus()
    }
    else if (storelist.includes(todo)) {
        alert("Already Exists");
        todoInput.focus()
    }
    else {

        let newtodo = document.createElement("div")
        let doneBtn = document.createElement("button");
        let removeBtn = document.createElement("button");
        let todoh1 = document.createElement("h1")

        doneBtn.addEventListener("click", doneTodo);
        removeBtn.addEventListener("click", removeTodo);

        newtodo.id = "todoList" + (i.toString());
        newtodo.className = "todoblocks";
        doneBtn.id = "donebtn" + (i.toString());
        doneBtn.className = "donebtn";
        removeBtn.id = "removebtn" + (i.toString());
        removeBtn.className = "removebtn";

        newtodo.appendChild(document.createTextNode(todo));
        doneBtn.innerHTML = "✔";
        removeBtn.innerHTML = "❌";

        todoContainer.appendChild(newtodo);
        newtodo.appendChild(doneBtn);
        newtodo.appendChild(removeBtn);

        storelist.push(todo)
        localStorage.setItem("Todo", JSON.stringify(storelist));
        todoInput.value = '';
        i++
    }
}


function doneTodo() {
    let num = this.id.slice(7, 8);
    document.getElementById("todoList" + num).classList.toggle("checkedTodo");
    document.getElementById(this.id).classList.toggle("checkedBtn");
}

function removeTodo() {
    let num = this.id.slice(9, 10);
    document.getElementById("todoList" + num).remove();
    store = localStorage.getItem("Todo");
    storelist = JSON.parse(store);
    storelist.splice(num, 1);
    localStorage.setItem("Todo", JSON.stringify(storelist));
    // localStorage.removeItem(Number(this.id.slice(9, 10)))
}


function load() {
    data = "";
    storelist.forEach((element, index) => {
        let newtodo = document.createElement("div")
        let doneBtn = document.createElement("button");
        let removeBtn = document.createElement("button");

        doneBtn.addEventListener("click", doneTodo);
        removeBtn.addEventListener("click", removeTodo);

        newtodo.id = "todoList" + (index);
        newtodo.className = "todoblocks";
        doneBtn.id = "donebtn" + (index);
        doneBtn.className = "donebtn";
        removeBtn.id = "removebtn" + (index);
        removeBtn.className = "removebtn";

        newtodo.appendChild(document.createTextNode(element));
        doneBtn.innerHTML = "✔";
        removeBtn.innerHTML = "❌";

        todoContainer.appendChild(newtodo);
        newtodo.appendChild(doneBtn);
        newtodo.appendChild(removeBtn);
    });
}

function clearall() {
    todoContainer.innerHTML = "";
    localStorage.clear()
    location.reload()
}