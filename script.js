// Selectors
const userForm = document.querySelector("#userForm");
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const complete = document.querySelector(".complete");
const removeAll = document.querySelector("#forRemoveBtn");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
all.addEventListener("click", filterTodos);
all.addEventListener("click", () => {
  userForm.style.display = "flex";
});
active.addEventListener("click", filterTodos);
active.addEventListener("click", () => {
  userForm.style.display = "none";
});
complete.addEventListener("click", filterTodos);
complete.addEventListener("click", () => {
  userForm.style.display = "none";
});
todoList.addEventListener("click", deleteTodo);

// Functions

function addTodo(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    alert("please enter something");
    return false;
  }
  if (todoInput.value.trim().length === 0) {
    alert("please enter something");
    return false;
  }
  const removeDiv = document.createElement("div");

  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("class", "todoDiv");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", todoInput.value);
  checkbox.setAttribute("class", "checkbox");
  const label = document.createElement("label");
  label.setAttribute("for", todoInput.value);
  label.setAttribute("class", "label");
  const trash = document.createElement("i");
  trash.setAttribute("class", "fa-solid fa-trash");
  saveLocalTodos(todoInput.value);
  label.innerText = todoInput.value;
  label.value = todoInput.value;
  todoDiv.appendChild(checkbox);
  todoDiv.appendChild(label);
  removeDiv.appendChild(todoDiv);
  todoList.appendChild(removeDiv);
  todoDiv.appendChild(trash);
  checkbox.addEventListener("click", () => {
    label.classList.toggle("completed");
    removeDiv.classList.toggle("pseudo");
  });
  removeAll.addEventListener("click", (e) => {
    removeDiv.remove();
    removeLocalTodos(removeDiv.children[0]);
  });
  todoInput.value = "";
}

function filterTodos(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        userForm.style.display = "flex";
        todo.style.display = "flex";
        break;
      case "active":
        userForm.style.display = "none";
        if (todo.classList.contains("pseudo")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
      case "complete":
        userForm.style.display = "none";
        if (!todo.classList.contains("pseudo")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
    }
  });
}

function deleteTodo(e) {
  const item = e.target;
  const removeItem = item.parentElement;
  removeLocalTodos(removeItem);
  if (item.classList[0] === "fa-solid") {
    removeItem.parentElement.remove();
    console.log(removeItem.parentElement);
  }
}

// storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const removeDiv = document.createElement("div");

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todoDiv");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", todoInput.value);
    checkbox.setAttribute("class", "checkbox");
    const label = document.createElement("label");
    label.setAttribute("for", todoInput.value);
    label.setAttribute("class", "label");
    const trash = document.createElement("i");
    trash.setAttribute("class", "fa-solid fa-trash");
    label.innerText = todo;
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(label);
    removeDiv.appendChild(todoDiv);
    todoList.appendChild(removeDiv);
    todoDiv.appendChild(trash);
    checkbox.addEventListener("click", () => {
      label.classList.toggle("completed");
      removeDiv.classList.toggle("pseudo");
    });
    removeAll.addEventListener("click", (e) => {
      removeDiv.remove();
    });
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].value;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

gsap.registerPlugin(Flip);

const links = document.querySelectorAll(".navItem");
const navActive = document.querySelector(".navActive");

links.forEach((link) => {
  link.addEventListener("click", () => {
    gsap.to(links, { color: "#252525" });
    if (document.activeElement === link) {
      gsap.to(links, { color: "#385ae0" });
    }
    const state = Flip.getState(navActive);
    link.appendChild(navActive);
    Flip.from(state, {
      duration: 1,
      absolute: true,
      ease: "elastic.out(1,0.3)",
    });
  });
});
