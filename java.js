



const taskInput = document.getElementById('taskInput');
const errorMessage = document.getElementById('errorMessage');
const tasksList = document.getElementById('tasksList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function isValidTask(task) {
  if (!task.trim()) return "Task cannot be empty.";
  if (!isNaN(task.trim().charAt(0))) return "Task does not have to start with a number.";
  if (task.trim().length < 6) return "Task must be more than 5 letters.";
  return "";
}
document.getElementById('add-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const validationMessage = isValidTask(task);
  if (validationMessage) {
    errorMessage.textContent = validationMessage;
    return;
  }
  errorMessage.textContent = "";
  todos.push({ todo: task.trim(), isUpdating: false, completed: false });
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
  taskInput.value = "";
});

function displayTodos() {
  tasksList.innerHTML = "";
  todos.forEach((item, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item d-flex justify-content-between align-items-center border p-2 my-2';

    let contentHTML = item.isUpdating
      ? `<input type="text" class="form-control me-2" data-index="${index}" value="${item.todo}"/>`
      : `<span style="${item.completed ? 'text-decoration: line-through; color: red;' : ''}">
            ${item.todo}
         </span>`;

    const buttonsHTML = `
      <div class="d-flex align-items-center gap-2">
        <input type="checkbox" onchange="toggleCompleted(${index})" ${item.completed ? 'checked' : ''}>
        ${item.isUpdating
          ? `<button class="btn btn-sm btn-success" onclick="saveTodo(${index})">
               <i class="bi bi-check-circle"></i>
             </button>`
          : `<button class="btn btn-sm btn-warning" onclick="setUpdating(${index})">
               <i class="bi bi-pencil"></i>
             </button>`}
        <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;

    taskDiv.innerHTML = `
      <div class="d-flex align-items-center w-100 justify-content-between">
        ${contentHTML}
        ${buttonsHTML}
      </div>
    `;
    tasksList.appendChild(taskDiv);
  });
}

