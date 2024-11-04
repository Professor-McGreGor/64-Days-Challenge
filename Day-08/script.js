// Task Management System
class Task {
    constructor(id, title, description, dueDate, priority = 'medium') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }

    addTask(title, description, dueDate, priority) {
        const task = new Task(this.currentId++, title, description, dueDate, priority);
        this.tasks.push(task);
        return task;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
            return true;
        }
        return false;
    }

    getTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    getAllTasks() {
        return this.tasks;
    }

    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    getPendingTasks() {
        return this.tasks.filter(task => !task.completed);
    }
}

// Example usage
const taskManager = new TaskManager();

// Add some sample tasks
taskManager.addTask(
    'Complete JavaScript Project',
    'Finish the task management system',
    '2024-03-20',
    'high'
);

taskManager.addTask(
    'Buy groceries',
    'Get milk, eggs, and bread',
    '2024-03-15',
    'medium'
);

taskManager.addTask(
    'Call mom',
    'Weekly check-in call',
    '2024-03-16',
    'low'
);

// Demo functions
function displayTasks(tasks) {
    tasks.forEach(task => {
        console.log(`
ID: ${task.id}
Title: ${task.title}
Description: ${task.description}
Due Date: ${task.dueDate}
Priority: ${task.priority}
Status: ${task.completed ? 'Completed' : 'Pending'}
Created: ${task.createdAt.toLocaleDateString()}
------------------------`);
    });
}

// Example operations
console.log('All Tasks:');
displayTasks(taskManager.getAllTasks());

// Complete a task
const taskToComplete = taskManager.getTask(1);
if (taskToComplete) {
    taskToComplete.toggleComplete();
}

console.log('\nHigh Priority Tasks:');
displayTasks(taskManager.getTasksByPriority('high'));

console.log('\nCompleted Tasks:');
displayTasks(taskManager.getCompletedTasks());

console.log('\nPending Tasks:');
displayTasks(taskManager.getPendingTasks());

// Delete a task
taskManager.deleteTask(2);

console.log('\nAfter deleting task #2:');
displayTasks(taskManager.getAllTasks());
