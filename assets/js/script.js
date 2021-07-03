var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) { 
	event.preventDefault();

  var listItemEl = document.createElement("li"); 
  listItemEl.className = "task-item"; 
  listItemEl.textContent = "This is a new task."; 
  tasksToDoEl.appendChild(listItemEl); 
  }; 

formEl.addEventListener("submit", createTaskHandler)

// Add task to the list when “add task” button is clicked

// Capture user form field values

// reset form after user clicks “add task”

