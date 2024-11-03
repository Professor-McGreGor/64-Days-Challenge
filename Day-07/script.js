const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const tasksContainer = document.getElementById('tasks-container');
const themeToggle = document.getElementById('theme-toggle');
const clearAll = document.getElementById('clear-all');
const filterButtons = document.querySelectorAll('.filter-btn');

// Task Management
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.draggedTask = null;
        this.filter = 'all';
        this.init();
    }

    init() {
        this.loadTheme();
        this.renderTasks();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Clear all tasks
        clearAll.addEventListener('click', () => this.clearAllTasks());

        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filter = button.dataset.filter;
                this.updateActiveFilter();
                this.renderTasks();
            });
        });
    }

    addTask() {
        const taskText = taskInput.value.trim();
        const priority = taskPriority.value;

        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                priority: priority,
                completed: false,
                createdAt: new Date().toISOString()
            };

            this.tasks.unshift(task);
            this.saveTasks();
            this.renderTasks();
            taskInput.value = '';
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.priority} ${task.completed ? 'completed' : ''}`;
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;

        taskElement.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <span class="task-date">${new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="task-actions">
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        // Event listeners for task elements
        taskElement.addEventListener('dragstart', () => this.dragStart(task.id));
        taskElement.addEventListener('dragend', () => this.dragEnd());
        taskElement.addEventListener('dragover', (e) => this.dragOver(e));
        taskElement.addEventListener('drop', (e) => this.drop(e, task.id));

        const checkbox = taskElement.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => this.toggleTaskStatus(task.id));

        const deleteBtn = taskElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        return taskElement;
    }

    renderTasks() {
        tasksContainer.innerHTML = '';
        let filteredTasks = this.tasks;

        // Apply filters
        if (this.filter !== 'all') {
            filteredTasks = this.tasks.filter(task => {
                if (this.filter === 'completed') return task.completed;
                if (this.filter === 'active') return !task.completed;
                return task.priority === this.filter;
            });
        }

        filteredTasks.forEach(task => {
            tasksContainer.appendChild(this.createTaskElement(task));
        });
    }

    // Drag and Drop functionality
    dragStart(taskId) {
        this.draggedTask = taskId;
    }

    dragEnd() {
        this.draggedTask = null;
    }

    dragOver(e) {
        e.preventDefault();
    }

    drop(e, targetId) {
        e.preventDefault();
        if (this.draggedTask !== null && this.draggedTask !== targetId) {
            const draggedIndex = this.tasks.findIndex(task => task.id === this.draggedTask);
            const targetIndex = this.tasks.findIndex(task => task.id === targetId);
            
            const [draggedTask] = this.tasks.splice(draggedIndex, 1);
            this.tasks.splice(targetIndex, 0, draggedTask);
            
            this.saveTasks();
            this.renderTasks();
        }
    }

    // Theme Management
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // Filter Management
    updateActiveFilter() {
        filterButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.filter === this.filter);
        });
    }

    // Storage Management
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to delete all tasks?')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
        }
    }
}

const taskManager = new TaskManager(); 