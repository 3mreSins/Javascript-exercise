//* Bu kodların tamamı enes bayram javascript derslerinden alınmıştır.

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];
runEvents();

//* eventleri seçer.
function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageloaded);
    secondCardBody.addEventListener("click", removeTodo);
    clearButton.addEventListener("click", clearTodos);
    filterInput.addEventListener("keyup", filter)
}
//* todolar arası filtreleme işlemi.
function filter(e) {
    const filterValue = e.target.value.toUpperCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item")

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if (todo.textContent.toUpperCase().trim().includes(filterValue)){
                todo.setAttribute("style", "display : block");
            }
            else{
                todo.setAttribute("style", "display : none !important");
            }
        })
    }

}
//* tüm todoları temizler.
function clearTodos() {
    const todoListesi = document.querySelectorAll(".list-group-item")
    if (todoListesi.length > 0) {
        todoListesi.forEach(function (todo) {
            todo.remove();
        })
        alertMessage("success", "Tüm Todolar Silindi")
        todos = [];
    }
    else {
        alertMessage("warning", "Todo Listesi Zaten Boş")
    }


}
//* istenen todoyu temizler.
function removeTodo(e) {
    //* UI dan silme
    const todo = e.target.parentElement.parentElement;
    if (e.target.className == "fa fa-remove") {
        todo.remove();
        alertMessage("success", "Todo Başarıyla Silindi");
    }
    //* Storageden silme
    removeTodoSt(todo.textContent);
}
//* local storageden todo siler.
function removeTodoSt(removeTodo) {
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}
//* sayfa açıldığında tüm todoları önyüze aktarır.
function pageloaded() {
    CheckTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}
//* todo ekleme işlemlerini çağırmak için.
function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        alertMessage("warning", "Boş Todo Eklenmez!")
    }
    else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        alertMessage("success", "Todo Başarıyla Eklendi")
    }
    e.preventDefault();
}
//* önyüze todo ekler.
function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.className = "delete-item";
    a.href = "#"

    const i = document.createElement("i");
    i.className = "fa fa-remove"

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);
    addInput.value = "";

}
//*local storageye todo ekler.
function addTodoToStorage(newTodo) {
    CheckTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
//* todoları kontrol eder.
function CheckTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
//* kullanılan uyarı mesajları.
function alertMessage(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`
    div.textContent = message;
    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2000);
}