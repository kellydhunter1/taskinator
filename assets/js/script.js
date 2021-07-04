var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();

// .hasAttribute gives true or false for parameter / 
// whether task is new or being updated
  var isEdit = formEl.hasAttribute("data-task-id");

//  if it has data attribute, get ID and call edit function
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }

// if no data attribute, create an object as normal and pass to createTaskEl function
    // package up data as an object
    else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };
    
      // send it as an argument to createTaskEl
      createTaskEl(taskDataObj);
    }
};

var createTaskEl = function(taskDataObj) {
// create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribute 
listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";

// add HTML content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
listItemEl.appendChild(taskInfoEl);

// creates select menu for each task
var taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);


// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

// increase task counter for next unique id
taskIdCounter++;
}
// (taskId) is used to pass a different ID into the function each time to keep track of 
// what is created for each task
var createTaskActions = function(taskId) {
  // creates container for buttons and adds class names to each container created
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

// Select menu to show status of the task
var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEl);

// for loop add options to each task
var statusChoices = ["to Do", "In Progress", "Completed"];

for (var i = 0; i < statusChoices.length; i++) {
  // create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);

  // append to select menu
  statusSelectEl.appendChild(statusOptionEl);
}

return actionContainerEl;
};

// allows edited task to edit object instead of create a new one
var completeEditTask = function(taskName, taskType, taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // takes content from form and replaces the text in the object
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textConent = taskType;

  alert("Task Updated!");

  // resets the form and removes the task ID of the updated task
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};


var taskButtonHandler = function(event) {
  var targetEl = event.target;
// //  reports the element where the event occurs 
//   console.log(event.target);

  // // confirms click event is triggered by correct element
  // if(event.target.matches(".delete-btn")) {
  //   // gets task ID of element clicked
  //   var taskId = event.target.getAttribute("data-task-id");
  //   console.log(taskId);
  // }

  // if edit button was clicked, gets ID and send back to form
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // on the click event, finds the task ID and deletes the task
  else if (targetEl.matches(".delete-btn")) {
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var editTask = function(taskId) {
  // finds task ID
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // query selector of that specific task to get content from task name and type 
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;

  // takes the content from the task and sets it as the content in the form
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // changes the button to SAVE when task is in edit mode
  document.querySelector("#save-task").textContent = "Save Task";

  // includes the task ID so it stays the same after editing
  formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
  // finds task ID
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

// changes the location of task based on status
var taskStatusChangeHandler = function(event) {
// get the task item's id
var taskId = event.target.getAttribute("data-task-id");

// gets the currently selected option's value and converts to lowercase
var statusValue = event.target.value.toLowerCase();

// find the parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// changes location based on selected menu option
if (statusValue === "to do") {
  tasksToDoEl.appendChild(taskSelected);
} 
else if (statusValue === "in progress") {
  tasksInProgressEl.appendChild(taskSelected);
} 
else if (statusValue === "completed") {
  tasksCompletedEl.appendChild(taskSelected);
}
};

// event listeners tell what to listen for, what function to perform
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// Rename the handler function to be a little more specific to the event it's handling.

// Create a new function to take in the task's name and title as arguments and create the HTML elements that get added to the page.

// Move the code that creates and adds HTML elements from the handler function into the newly created function.

// Update the handler function to send the task name and type values from the form to the newly created function.