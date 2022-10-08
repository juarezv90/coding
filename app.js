const input = document.getElementById("item");
const list = document.getElementById("list");
const submitButton = document.getElementById("submitButton");

/*Add event listener for user pressing Enter and 
will call the submit button click event*/
input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    submitButton.click();
  }
});

const submit = () => {
  const taskContainer = document.createElement("div");
  const removeBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const span = document.createElement("span");
  const btnContainer = document.createElement("div");
  const radioBtnDone = document.createElement("input");

  /* First validates that the user has submitted input else will do nothing. */
  if (input.value) {
    /* Adds the click event listeners to the remove button
    assign innerHTML and class name, onclick will remove task */
    removeBtn.innerHTML = "Remove";
    removeBtn.className = "btn";
    removeBtn.addEventListener("click", () => {
      list.removeChild(taskContainer);
    });

    /* Adds the click event listeners to the edit button
    assign innerHTML and class name, calls edit function*/
    editBtn.innerHTML = "Edit";
    editBtn.className = "btn";
    editBtn.addEventListener("click", () => {
      edit(span, editBtn);
    });

    span.className = "taskItem";
    span.innerHTML = input.value;
    input.value = "";

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
      } else {
        span.style.textDecoration = "none";
        editBtn.disabled = false;
      }
    };

    /* Converts the task to an input that can be edited and will
    replace the edit button with a done button for when user is done completing
    their edit*/
    const edit = (span, editBtn) => {
      const editInput = document.createElement("input");
      const doneEditBtn = document.createElement("button");
      doneEditBtn.className = "btn";
      doneEditBtn.innerHTML = "Done";

      span.replaceWith(editInput);
      editBtn.replaceWith(doneEditBtn);
      editInput.value = span.innerHTML;

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
        editComplete(editInput, doneEditBtn);
      });

    };

    /**function for when user done editing their task */
    const editComplete = (editInput, doneEditBtn) => {
      editInput.replaceWith(span);
      span.innerHTML = editInput.value;
      doneEditBtn.replaceWith(editBtn);
    };

    taskContainer.className = "taskContainer";
    taskContainer.append(radioBtnDone);
    taskContainer.append(span);
    taskContainer.append(btnContainer);
    list.append(taskContainer);
  }
};
