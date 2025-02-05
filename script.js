const tasks = [];

// Function to add a task
function addTask(title, dueTime, priority) {
    try {
        if (!title || isNaN(dueTime) || isNaN(priority)) {
            throw new Error("All fields (title, dueTime, priority) are required.");
        }
        const task = { title, dueTime, priority, addedAt: new Date() };
        tasks.push(task);
        displayTasks();
        scheduleReminder(task);
        alert(`✅ Task "${title}" added successfully!`);
    } catch (error) {
        console.error(`❌ Error adding task: ${error.message}`);
    }
}

// Function to sort tasks by priority
function sortTasks() {
    tasks.sort((a, b) => a.priority - b.priority);
}

// Function to display tasks due within a certain timeframe (e.g., next 10 minutes)
function getUpcomingTasks(minutes = 10) {
    const now = new Date();
    return tasks.filter(task => {
        const taskDue = new Date(task.addedAt.getTime() + task.dueTime * 60000);
        return (taskDue - now) / 60000 <= minutes;
    });
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Function to get all tasks
function getTasks() {
    return tasks;
}

// Function to schedule reminders
function scheduleReminder(task) {
    setTimeout(() => {
        alert(`🔔 Reminder: Task '${task.title}' is due now!`);
    }, task.dueTime * 60000);
}

// Function to update UI
function displayTasks() {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";
    sortTasks();
    
    getTasks().forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${task.title} - Due in ${task.dueTime} min - Priority: ${task.priority} 
                        <button class="delete-btn" data-index="${index}">❌</button>`;
        taskList.appendChild(li);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteTask(index);
            displayTasks();
        });
    });
}

// Form event listener
document.getElementById("task-form").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("task-title").value;
    const dueTime = parseInt(document.getElementById("task-time").value);
    const priority = parseInt(document.getElementById("task-priority").value);

    addTask(title, dueTime, priority);
});
