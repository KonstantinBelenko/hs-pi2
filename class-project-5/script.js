document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const priorityInput = document.getElementById('priorityInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskContainer = document.getElementById('taskContainer');
    const form = document.getElementById('taskForm');

    // Function to load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskContainer.appendChild(taskElement);
        });
    };

    // Function to create a task element
    const createTaskElement = (task) => {
        const newTask = document.createElement("div");
        newTask.className = "task";
        newTask.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
        `;
        return newTask;
    };

    // Load existing tasks from local storage
    loadTasks();

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const task = {
            title: taskInput.value,
            description: descriptionInput.value,
            dueDate: dueDateInput.value,
            priority: priorityInput.value
        };

        // Save the new task in local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Append the new task to the container
        const taskElement = createTaskElement(task);
        taskContainer.appendChild(taskElement);

        form.reset(); // clears the form inputs after submit
    });
});
