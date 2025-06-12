



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