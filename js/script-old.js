const urlApiAllTodos = "http://localhost:4730/todos";

const listTodos = document.querySelector("#listToDos");
const listTodosElements = listTodos.getElementsByTagName("li");
const listTodosElementsInputs = listTodos.getElementsByTagName("input");
const listTodosElementsButtons = listTodos.getElementsByTagName("button");

const buttonRemoveToDo = document.querySelector("#buttonDeleteDoneTodos");
const buttonAddToDo = document.querySelector("#buttonAddTodo");
const inputFieldAddToDo = document.querySelector("#inputFieldAddTodo");
const radioFilter = document.querySelectorAll('input[name="filter"]');

const state = {
  filter: "alle",
  toDos: [],
};
/*
toDos = [
  { todoText: "nummer eins", done: false, id: 1 },
  { todoText: "nummer zwei", done: false, id: 2 },
  { todoText: "Noch eine Todo", done: true, id: 3 },
];
*/

function addTodo() {
  //alert("Neue Todo: " + inputFieldAddToDo.value);
  if (inputFieldAddToDo.value.length > 4) {
    let newToDo = {
      todoText: inputFieldAddToDo.value,
      done: false,
    };
    state.toDos.push(newToDo);
    renderListTodos(state.filter);
    inputFieldAddToDo.value = "";
  } else {
    alert("Die Todo sollte schon aus min. 5 Zeichen bestehen...");
  }
}

function updateFilter(filter) {
  state.filter = filter;
  renderListTodos(filter);
}

function updateTodo() {
  const listItems = listTodos.getElementsByTagName("input");
  for (let i = 0; i < listItems.length; i++) {
    let checkBox = document.getElementById("todo-" + i);
    checkBox.addEventListener("change", function (e) {
      let isDone = false;
      if (e.target.checked) {
        isDone = true;
      } else {
      }
      state.toDos[i].done = isDone;
      renderListTodos(state.filter);
    });
  }
  //renderListTodos(state.filter);
}

// wenn in der Liste was (checkbox) geklickt wird, also done-status upgedated wird...
listTodos.addEventListener("input", function (e) {
  //listTodos.addEventListener("change", function (e) {
  //updateTodo();
  //console.log(e);
  // nur wenn es eine checkbox ist, soll der change-done-status geändert werden
  if (e.target.type === "checkbox") {
    changeTodo(e.target.value, "done");
    //console.log("Type c: ", e.target.type);
  }
  //changeTodo(e.target.value);
  //console.log("Type c: ", e.target.type);
  //getAllInputsOfTodoList(e);
  //console.log("Check", e.target.value);
});

// wenn der Button zum Text-ändern geklickt wurde
listTodos.addEventListener("click", function (e) {
  //console.log("Type b: ", e.target.type);
  //console.log("Type b value: ", e.target.value);
  if (e.target.type === "submit") {
    //console.log("Type b value: ", e.target.value);
    changeTodo(e.target.value, "description");
  }
  //const inputFieldTodo = document.getElementById("input-change-text-todo-" + e.target.value);
  //console.log("Text value: ", inputFieldTodo.value);
});

function getAllInputsOfTodoList(e) {
  console.log("Anzahl inputs: ", listTodosElementsInputs.length);
  console.log("E: ", e);
  console.log("E ua: ", e.target.value);
  for (let i = 0; i < listTodosElementsInputs.length; i++) {
    if (listTodosElementsInputs[i].type === "checkbox") {
      console.log(
        "Value für checkbox ",
        i,
        ": ",
        listTodosElementsInputs[i].value
      );
    }
    if (listTodosElementsInputs[i].type === "text") {
      console.log(
        "Value für Textfeld ",
        i,
        ": ",
        listTodosElementsInputs[i].value
      );
    }
  }
}

function getAllButtonsOfTodList(e) {
  console.log("Anzahl buttons: ", listTodosElementsButtons.length);
  console.log("E: ", e);
  for (let i = 0; i > listTodosElementsButtons.length; i++) {
    console.log(
      "Value für Button ",
      i,
      ": ",
      listTodosElementsButtons[i].value
    );
    console.log("Value Textfeld ", i, ": ");
  }
}

function removeTodo() {
  let cleanedToDoList = [];
  cleanedToDoList = state.toDos.filter(
    (isDoneOrNot) => isDoneOrNot.done === false
  );
  state.toDos = cleanedToDoList;
}

buttonRemoveToDo.addEventListener("click", function (e) {
  removeTodo();
  renderListTodos(state.filter);
});

// render fresh todo-list in dom
function renderListTodos() {
  const filter = state.filter;
  let filteredToDoList;
  listTodos.innerHTML = "";

  //if (filter === "alle") {
  if (state.filter === "alle") {
    filteredToDoList = state.toDos;
  } else if (state.filter === "erledigt") {
    filteredToDoList = state.toDos.filter((todo) => todo.done === true);
  } else if (state.filter === "nicht-erledigt") {
    filteredToDoList = state.toDos.filter((todo) => todo.done === false);
  }
  //console.log(filteredToDoList.length);
  //console.log(state.filter);
  for (let i = 0; i < filteredToDoList.length; i++) {
    let newContainerTodo = document.createElement("li");
    let textDone = " checked";
    if (!filteredToDoList[i].done === true) {
      textDone = "";
    }
    //console.log(i);
    /*
    newContainerTodo.innerHTML =
      '<input type="checkbox" value="' +
      filteredToDoList[i].id +
      '" id="todo-' +
      filteredToDoList[i].id +
      '" ' +
      textDone +
      ' /><label for="todo-' +
      filteredToDoList[i].id +
      '">' +
      filteredToDoList[i].todoText +
      "</label><span>ID: " +
      filteredToDoList[i].id +
      "</span>";
    listTodos.appendChild(newContainerTodo);
*/

    newContainerTodo.innerHTML =
      '<input type="checkbox" value="' +
      filteredToDoList[i].id +
      '" id="todo-' +
      filteredToDoList[i].id +
      '" ' +
      textDone +
      ' /><label for="todo-' +
      filteredToDoList[i].id +
      '">' +
      filteredToDoList[i].todoText +
      "</label><span>ID: " +
      filteredToDoList[i].id +
      '</span><input type="text" value="' +
      filteredToDoList[i].todoText +
      '" id="input-change-text-todo-' +
      filteredToDoList[i].id +
      '"><button id="btn-change-text-todo-' +
      filteredToDoList[i].id +
      '" value="' +
      filteredToDoList[i].id +
      '">Text ändern</button>';
    listTodos.appendChild(newContainerTodo);
  }
}

buttonAddToDo.addEventListener("click", function (e) {
  //addTodo();
  addTodoToApi();
});

// den Filter (radio-buttons) im dom durchgehen, wenn da geklickt wird, state aktualisieren
for (let i = 0; i < radioFilter.length; i++) {
  radioFilter[i].addEventListener("change", function () {
    let val = this.value; // this == the clicked radio,
    updateFilter(val);
  });
}

// bei start der Seite: alles frisch aus state holen, also im dom den filter (radio) checken, der laut state gecheckt sein soll
function initState() {
  for (let i = 0; i < radioFilter.length; i++) {
    if (state.filter === radioFilter[i].value) {
      radioFilter[i].checked = true;
    }
  }
}

function getAllTodosFromApi() {
  listTodos.innerHTML = "";
  state.toDos = [];
  const allTodosFromApi = fetch(urlApiAllTodos);
  const allTodosFromApi2 = allTodosFromApi.then((antwort) => {
    //console.log(antwort.status); // 200
    //console.log(antwort.ok); // true
    if (antwort.ok) {
      return antwort.json(); // returns a promise with the actual resource
    }
  });

  allTodosFromApi2.then((dataComplete) => {
    //console.log(dataComplete.length);
    dataComplete.forEach((todo) => {
      let newToDo = {
        todoText: todo.description,
        done: todo.done,
        id: todo.id,
      };
      state.toDos.push(newToDo);
      //renderListTodos(state.filter);
      /*
      newTodoContainerAll.classList.add("xxx");
      newTodoContainerAll.appendChild(todoText);
      listTodos.appendChild(newTodoContainerAll);
      */
    });
    renderListTodos(state.filter);
  });
}

function addTodoToApi() {
  if (inputFieldAddToDo.value.length > 4) {
    const newToDo = {
      //todoText: inputFieldAddToDo.value,
      description: inputFieldAddToDo.value,
      done: false,
    };
    const newTodoReadyToFetch = fetch(urlApiAllTodos, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToDo),
    });

    const newTodoReadyToFetch2 = newTodoReadyToFetch
      .then((antwort) => {
        //console.log(antwort.status); // 200
        //console.log(antwort.ok); // true
        if (antwort.ok) {
          return antwort.json(); // returns a promise with the actual resource
        }
      })
      .then((newToDo) => {
        console.log("Hurra!");
        getAllTodosFromApi();
        //renderListTodos(state.filter);
      });

    //state.toDos.push(newToDo);
    //renderListTodos(state.filter);
    inputFieldAddToDo.value = "";
  } else {
    alert("Die Todo sollte schon aus min. 5 Zeichen bestehen...");
  }
}

function changeTodo(id, key) {
  console.log("ID: ", id);
  let inputToChangeText = document.querySelector(
    "#input-change-text-todo-" + id
  );
  //inputToChangeText = inputToChangeText.value;
  //console.log("Text: " + inputToChangeText);
  const urlTogether = urlApiAllTodos + "/" + id;
  const todoTobeChangedToApi = fetch(urlTogether);
  let toDoToBeChanged;
  //const todoTobeChangedToApi = fetch(urlApiAllTodos);
  const todoTobeChangedToApi2 = todoTobeChangedToApi.then((antwort) => {
    //console.log(antwort.status); // 200
    //console.log(antwort.ok); // true
    if (antwort.ok) {
      return antwort.json(); // returns a promise with the actual resource
    }
  });

  // erstmal Daten holen um zu schauen was da drin steht
  todoTobeChangedToApi2
    .then((dataComplete) => {
      let todoNewStatusDone;
      let todoNewTextDescription;
      // wenn es um done-status geht der geändert werden soll
      if (key === "done") {
        todoNewStatusDone = false;
        if (dataComplete.done === true) {
          todoNewStatusDone = false;
        } else {
          todoNewStatusDone = true;
        }
      } else {
        todoNewStatusDone = dataComplete.done;
      }
      // wenn es um die description geht, die geändert werden soll
      if (key === "description") {
        let inputFieldTodo = document.getElementById(
          "input-change-text-todo-" + id
        );
        let inputFieldTodoValue = inputFieldTodo.value;
        console.log("Text: ", inputFieldTodoValue);
        todoNewTextDescription = inputFieldTodoValue;
      } else {
        todoNewTextDescription = dataComplete.description;
      }

      //todoNewStatusDone = false;
      //console.log("New: ", todoNewStatusDone);

      toDoToBeChanged = {
        //description: dataComplete.description,
        description: todoNewTextDescription,
        done: todoNewStatusDone,
        id: Number(id),
      };
      console.log("Data old: ", dataComplete);
      //console.log("Data 2: ", toDoToBeChanged);
    })
    .then((antwort2) => {
      console.log("Data 2: ", toDoToBeChanged);
      const newTodoReadyToFetch = fetch(urlTogether, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDoToBeChanged),
      });

      const newTodoReadyToFetch2 = newTodoReadyToFetch
        .then((antwort3) => {
          //console.log(antwort.status); // 200
          //console.log(antwort.ok); // true
          if (antwort3.ok) {
            return antwort3.json(); // returns a promise with the actual resource
          }
        })
        .then((todoUpdated) => {
          console.log("Hurra update!");
          getAllTodosFromApi();
        });
    });
}

// bei Laden der Seite: frischen state holen (welcher filter status gesetzt sein soll, radio)
// Liste wird auch neu gerendert, gibt allerdings anfangs keine, könnte aber ja sein, wenn man was in den state bw. todo-array rein schreibt
window.onload = function () {
  initState();
  getAllTodosFromApi();

  //console.log(state);
  //renderListTodos(state.filter);
};
