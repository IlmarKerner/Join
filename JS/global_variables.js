//register_login.js
let users = [];
let currentUser = [];
let loggedUser;
let counter = 0;

// addtask.js
let contactSectionOpen = false;
let selectTaskBoxOpen = false;
let urgentImage = false;
let mediumImage = false;
let lowImage = false;
let newTask = false;
let newCategory = false;
let prio;
let taskProgress = 'toDo';
let mediaforBoard = window.matchMedia("(max-width: 992px)");
let subtask = [];
let assignedPersons = [];
let globalIdForTaskCard = 0;
let initialsForTaskCard = [];

//board.js
let urgent = false;
let medium = false;
let low = false;
let currentDraggedItem;

// hello.js
let greetingTime;
let activeUser;