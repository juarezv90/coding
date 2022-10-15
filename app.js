const input = document.getElementById("item");
const list = document.getElementById("list");
const submitButton = document.getElementById("submitButton");
const clrDone = document.getElementById("clearDone");
const storage = localStorage;

/*Add event listener for user pressing Enter and 
will call the submit button click event*/
input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    submitButton.click();
  }
});

/**
 * Will be called when input from user is entered
 * will populate object and forward to populate list
 * function, validates data is in input before sending
 */
const userInput = () => {
  if (input.value) {
    const dataInput = {
      task: input.value,
      isChecked: false,
    };

    populateList(dataInput);
  }
};

/**function to check if there is any data save in clients
 * device then will load data into list. Make list persist even
 * after use.
 */
 if (storage.length > 0) {
  for (let i = 0; i < storage.length; i++) {
    const dataInput = JSON.parse(storage.getItem(storage.key(i)));
    populateList(dataInput);
  }
}

//clear function for clear list
const clr = () => {
  localStorage.clear();
  list.innerHTML = "";
};

/**
 * Fills task list by taking in object and 
 * loading data from object into list.
 * @param {*} myTask 
 */
function populateList(myTask) {
  const taskContainer = document.createElement("div");
  const removeBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const span = document.createElement("span");
  const btnContainer = document.createElement("div");
  const radioBtnDone = document.createElement("input");
  const editInput = document.createElement("input");
  const doneEditBtn = document.createElement("button");

  /* Adds the click event listeners to the remove button
    assign innerHTML and class name, onclick will remove task */
  removeBtn.innerHTML = "Remove";
  removeBtn.className = "btn";
  removeBtn.id = "remove";
  removeBtn.addEventListener("click", () => {
    localStorage.removeItem(myTask.task);
    list.removeChild(taskContainer);
  });

  /* Adds the click event listeners to the edit button
    assign innerHTML and class name, calls edit function*/
  editBtn.innerHTML = "Edit";
  editBtn.className = "btn";
  editBtn.addEventListener("click", () => {
    edit();
  });

  span.className = "taskItem";
  span.innerHTML = myTask.task;
  localStorage.setItem(myTask.task, JSON.stringify(myTask));
  input.value = "";

  /**Click event for task text that will check item off for
   * if user clicks on text.
   */
  span.addEventListener("click", () => {
    radioBtnDone.click();
  });

  /* Set attributes for radio button, then assigned classnames
    and adds event listener to catch property changes.*/
  radioBtnDone.setAttribute("type", "checkbox");
  radioBtnDone.className = "checkDone";
  radioBtnDone.addEventListener("change", () => {
    checked();
  });

  btnContainer.className = "btnContainer";
  btnContainer.append(removeBtn);
  btnContainer.append(editBtn);

  /* Disable edit button if task is checked and completed,
    will re-enable task if unchecked */
  const checked = () => {
    if (radioBtnDone.checked) {
      span.style.textDecoration = "line-through";
      editBtn.disabled = true;
      myTask.isChecked = true;
    } else {
      span.style.textDecoration = "none";
      editBtn.disabled = false;
      myTask.isChecked = false;
    }

    localStorage.setItem(myTask.task, JSON.stringify(myTask));
  };

  if (myTask.isChecked){
    radioBtnDone.checked = true;
    checked();
  }

  /* Converts the task to an input that can be edited and will
    replace the edit button with a done button for when user is done completing
    their edit*/
  const edit = () => {
    doneEditBtn.className = "btn";
    doneEditBtn.innerHTML = "Done";
    localStorage.removeItem(myTask.task);
    span.replaceWith(editInput);
    editBtn.replaceWith(doneEditBtn);
    editInput.value = myTask.task;

    /** put focus on input edit to put user directly
     * into edit input */
    editInput.focus();

    /**Add event listener for input to check if user pressed enter */
    editInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        doneEditBtn.click();
      }
    });

    /**Event listener for done key */
    doneEditBtn.addEventListener("click", () => {
      editComplete();
    });
  };

  /** Clear done event that will remove task that are done
   * will also remove the listener that applied to specific
   * task that was created.
   */
  clrDone.addEventListener("click", function clearDone(event) {
    if (radioBtnDone.checked) {
      removeBtn.click();
      clrDone.removeEventListener("click", clearDone);
    }
  });

  /**
   * function for when user done editing their task
   */
  const editComplete = () => {
    editInput.replaceWith(span);
    myTask.task = editInput.value;
    span.innerHTML = myTask.task;
    localStorage.setItem(myTask.task, JSON.stringify(myTask));
    doneEditBtn.replaceWith(editBtn);
  };

  taskContainer.className = "taskContainer";
  taskContainer.append(radioBtnDone);
  taskContainer.append(span);
  taskContainer.append(btnContainer);
  list.append(taskContainer);
}
