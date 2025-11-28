document.addEventListener('DOMContentLoaded', () => {
    const taskTitleInput = document.getElementById('task-title-input');
    const taskDescInput = document.getElementById('task-desc-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            const titleSpan = document.createElement('span');
            titleSpan.className = 'task-title';
            titleSpan.textContent = task.title;
            titleSpan.addEventListener('click', () => editField(index, 'title'));
            const descSpan = document.createElement('span');
            descSpan.className = 'task-desc';
            descSpan.textContent = task.desc || ''; 
            descSpan.addEventListener('click', () => editField(index, 'desc'));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            li.appendChild(titleSpan);
            li.appendChild(descSpan);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
    addBtn.addEventListener('click', () => {
        const title = taskTitleInput.value.trim();
        const desc = taskDescInput.value.trim();
        if (title) { 
            tasks.push({ title, desc });
            taskTitleInput.value = '';
            taskDescInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    function editField(index, field) {
        const li = taskList.children[index];
        const span = li.querySelector(`.task-${field}`);
        const input = document.createElement(field === 'desc' ? 'textarea' : 'input');
        input.value = span.textContent;
        input.rows = field === 'desc' ? 2 : 1; 
        input.className = 'edit-input'; 
        const saveEdit = () => {
            tasks[index][field] = input.value.trim();
            saveTasks();
            renderTasks();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && field !== 'desc') { 
                input.blur();
            }
        });
        span.replaceWith(input);
        input.focus();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    renderTasks();
});