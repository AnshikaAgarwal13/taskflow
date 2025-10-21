// Select DOM elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = [];

// Load tasks from localStorage
window.onload = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = storedTasks;
    renderTasks();
};

// Render tasks to DOM
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if(task.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('task-buttons');

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Done';
        toggleBtn.onclick = () => toggleTask(index);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);

        btnContainer.append(toggleBtn, editBtn, deleteBtn);
        li.appendChild(btnContainer);

        taskList.appendChild(li);
    });
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if(text === '') return;
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
});

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Edit task
function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if(newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    if(confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}
