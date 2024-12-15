const inputBox = document.getElementById("inputBox");
const listContainer = document.getElementById("listContainer");

function addTask() {
  //  when button clicked first check whether there is content
  if (inputBox.value === "") {
    alert("You Must Enter Something !!!");
  } else {
    // create li to document
    let li = document.createElement("li");

    // create span for task-content and assign input value to it
    let taskContent = document.createElement("span");
    taskContent.innerHTML = inputBox.value;
    // create trash-icon
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");
    // append all to li
    li.appendChild(taskContent);
    li.appendChild(trashIcon);
    // append li to ul
    listContainer.appendChild(li);
  }
  inputBox.value = "";
  saveTask();
}
listContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "SPAN") {
    // switch between checked 
    event.target.classList.toggle("checked");
    saveTask();
  } else if (event.target.classList.contains("trash")) {
    event.target.parentElement.remove();
    saveTask();
  }
});
// function to save tasks on local storage
// call sveTask() on each updation (When adding new item,when cheked,and delete)
function saveTask() {
  // console.log(listContainer.innerHTML);
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// function to retrive data from local storage and display in listcontainer
function showTask() {
  listContainer.innerHTML = localStorage.getItem("tasks");
}
// will load data from local storage when page load
showTask();

// when all button clicked
function showAllTask() {
  listContainer.innerHTML = localStorage.getItem("tasks");
}

// when completed button clicked
function showCompletedTask() {
  // console.log("completd button clicked");
  let savedTasks = localStorage.getItem("tasks");

  // create a temp div to save the savedtasks as html elements
  let tempContainer = document.createElement("div");
  tempContainer.innerHTML = savedTasks;

  // select only span with class checked
  let checkedTasks = tempContainer.querySelectorAll("span.checked");
  listContainer.innerHTML = "";

  // append the checkedTasks to listcontainer
  checkedTasks.forEach((element) => {
    // console.log("for each method",element);
    // listContainer.appendChild(element);
    // console.log("span :", element);
    // console.log("span awith  its parent li : ",element.closest("li"))
    listContainer.appendChild(element.closest("li"));
  });
}

// when active button clicked
function showActiveTask() {
  let savedTasks = localStorage.getItem("tasks");

  let tempContainer = document.createElement("div");
  tempContainer.innerHTML = savedTasks;


    // select only span with class other than checked
    let unCheckedTasks = tempContainer.querySelectorAll("span:not(.checked)");
    listContainer.innerHTML = "";
    console.log("unCheckedTasks : ",unCheckedTasks);
    unCheckedTasks.forEach(element => {
      console.log("Uncheckedtasks element : ",element);
      listContainer.appendChild(element.closest("li"));
    });

}
