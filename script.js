const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value.trim();
  const date = document.getElementById('taskDate').value;
  const time = document.getElementById('taskTime').value;

  if (!title || !date || !time) return;

  const newTask = {
    id: Date.now(),
    title,
    date,
    time,
    completed: false
  };

  tasks.push(newTask);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `
      <strong class="${task.completed ? 'completed' : ''}">${task.title}</strong><br>
      ${task.date} ${task.time}
    `;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Done';
    completeBtn.onclick = () => toggleComplete(task.id);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(task.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(task.id);

    actions.append(completeBtn, editBtn, deleteBtn);
    li.append(taskInfo, actions);
    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newTitle = prompt('Edit task title:', task.title);
  const newDate = prompt('Edit date:', task.date);
  const newTime = prompt('Edit time:', task.time);

  if (newTitle && newDate && newTime) {
    task.title = newTitle;
    task.date = newDate;
    task.time = newTime;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
