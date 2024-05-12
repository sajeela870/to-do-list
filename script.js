
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const mainContainer = document.getElementById('main-container');
const todoListLink = document.getElementById('todo-list-link');
const todoListContainer = document.getElementById('todo-list');

function loginValidate(checkSuccess) {
  const username = usernameInput.value;
  const password = passwordInput.value;
  checkSuccess(username,password);
} 
function onSuccess(username,password) {
  if (username === 'admin' && password === '12345') {
    
    document.querySelector("form").action = "./todolist.html";
  } else {
    alert('Invalid username or password');
  }
}
function loginpage() {
  loginValidate(onSuccess);
} 




function handleLogout() {
  document.querySelector("form").action = "./index.html";
}

function fetchTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json());
}

function createTodoList(todos) {
  let completedCount = 0;

  const todoList = document.createElement('ul');

  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      completedCount += checkbox.checked ? 1 : -1;
      checkCompletedTodos(completedCount);
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(document.createTextNode(todo.title));
    todoList.appendChild(todoItem);
  });

  todoListContainer.appendChild(todoList);
}

const completedTodosPromise = new Promise((resolve, reject) => {
 
  checkCompletedTodos = (count) => {
    if (count === 5) {
      resolve('Congrats, 5 Tasks have been Successfully Completed ');
    }
  };
});

completedTodosPromise.then(message => {
  alert(message);
});

todoListLink.addEventListener('click', () => {
  fetchTodos()
    .then(todos => {
      todoListContainer.innerHTML = ''; 
      createTodoList(todos);
    })
    .catch(error => console.error(error));
});

loginForm.addEventListener('submit', loginValidate);

document.getElementById('logout-link').addEventListener('click', handleLogout);
