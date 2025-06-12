



const taskInput = document.getElementById('taskInput');
const errorMessage = document.getElementById('errorMessage');
const tasksList = document.getElementById('tasksList');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

