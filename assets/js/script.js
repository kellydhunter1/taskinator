var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

var createFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };
    
      // send it as an argument to createTaskEl
      createTaskEl(taskDataObj);
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
var statusChoices = ["to Do", "In Progress", "Complete"];

for (var i = 0; i < statusChoices.length; i++) {
  // create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textcontent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);

  // append to select menu
  statusSelectEl.appendChild(statusOptionEl);
}

return actionContainerEl;
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

formEl.addEventListener("submit", createFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
// Rename the handler function to be a little more specific to the event it's handling.

// Create a new function to take in the task's name and title as arguments and create the HTML elements that get added to the page.

// Move the code that creates and adds HTML elements from the handler function into the newly created function.

// Update the handler function to send the task name and type values from the form to the newly created function.