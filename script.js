//TOGGLE THEME ON CLICKING SWAP THEMES BUTTON
document.querySelector(".theme-toggle-button").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// SELECT THE DOM ELEMENTS
const confirm = document.querySelector(".save-confirmed");
const btn = document.querySelector("#add-btn");
const list = document.querySelector("#list");
const todoInput = document.querySelector("#todo-input");
const summaryOfTodos = document.querySelector(".summary");
const total = document.getElementById("total");
const completed = document.getElementById("completed");
const remaining = document.getElementById("remaining");

//ADD THE EVENT LISTNEE ON ADD TODO BUTTON
btn.addEventListener("click", addTodo);

//object to contain all todo item
let todos = [];

//ADD A TODO
function addTodo(e) {
  e.preventDefault();
  const todo = todoInput.value;

  // ALERT THE USER IF THERE IS NO TODO INPUT
  if (!todo) {
    return alert("Please fill out the todo");
  } else {
    //add todo to todos
    const newTodo = { id: new Date().getTime(), completed: false, text: todo };
    todos.push(newTodo);

    //add item to list
    addTodoItem(newTodo);

    //RESET TO DEFAULT
    todoInput.value = "";
    todoInput.focus();
    //UPDATE IN SUMMARY
    update();
    //ADDED TODO NOTIFICATION
    confirm.classList.remove("hidden");
    setTimeout(() => {
      confirm.classList.add("hidden");
    }, 2000);
  }
}

//CREATING A TODO LIST ITEM DOM ELEMENT AND APPENDING IT TO TODO LIST
function addTodoItem(todo) {
  const listItem = document.createElement("li");
  listItem.innerHTML = ` 
  <p>${todo.text}</p>
   <button class="delete">
      <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
        />
      </svg>
    </button>
  `;

  // TOGGLE BETWEEN DONE AND UNDONE TODO
  listItem.addEventListener("click", function () {
    this.classList.toggle("done");
    //toggle the complete key in give todo object
    todo.completed = !todo.completed;

    //UPDATE IN SUMMARY
    update();
  });

  //LISTENING TO CLICK ON DELETE BTN AND DELETING THAT TODO ITEM BY REMOVING IT FROM THE TODO LIST
  listItem.querySelector(".delete").addEventListener("click", function () {
    listItem.remove();
    //remove the todo from todos
    const updated_todos = todos.filter((todoItem) => todoItem.id !== todo.id);
    todos = updated_todos;
    //UPDATE MIN SUMMARY
    update();
  });

  //APPEND THE TODO LIST ITEM TO TODO LIST
  list.appendChild(listItem);
}

//SHOW THE UPDATED SUMMARY
function update() {
  total.innerHTML = `Total todos : ${todos.length}`;
  const completed_todos = todos.reduce((acc, todo) => {
    if (todo.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);

  completed.innerHTML = `Completed : ${completed_todos}`;
  const remaining_todos = todos.length - completed_todos;
  remaining.innerHTML = `Remaining : ${remaining_todos}`;
}
