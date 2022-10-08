let input = document.getElementById("item");
let list = document.getElementById("list");

const submit = () => {
  let div = document.createElement("div");
  let removeBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let span = document.createElement("span");
  let btnContainer = document.createElement("div");
  let radioBtnDone = document.createElement("input");

  if (input.value) {
    removeBtn.innerHTML = "Remove";
    removeBtn.className = "btn";
    editBtn.innerHTML = "Edit";
    editBtn.className = "btn";
    div.className = "taskContainer";
    span.className = "taskItem";

    span.innerHTML = input.value;
    input.value = "";

    radioBtnDone.setAttribute("type", "checkbox");

    removeBtn.addEventListener("click", () => {
      list.removeChild(div);
    });

    radioBtnDone.addEventListener("change", () => {
      checked();
    });

    editBtn.addEventListener("click", () => {
      edit(span, editBtn);
    });

    const checked = () => {
      if (radioBtnDone.checked) {
        span.style.textDecoration = "line-through";
        editBtn.disabled = true;
      } else {
        span.style.textDecoration = "none";
        editBtn.disabled = false;
      }
    };

    radioBtnDone.className = "checkDone";

    div.append(radioBtnDone);

    div.append(span);

    btnContainer.className = "btnContainer";

    btnContainer.append(removeBtn);
    btnContainer.append(editBtn);
    div.append(btnContainer);

    list.append(div);

    const edit = (span, editBtn) => {
      let editInput = document.createElement("input");
      let doneEditBtn = document.createElement("button");

      doneEditBtn.className = "btn";
      doneEditBtn.innerHTML = "Done";
      span.replaceWith(editInput);
      editBtn.replaceWith(doneEditBtn);

      doneEditBtn.addEventListener("click", () => {
        editComplete(editInput, doneEditBtn);
      });
      editInput.value = span.innerHTML;
    };

    let editComplete = (editInput, doneEditBtn) => {
      editInput.replaceWith(span);
      span.innerHTML = editInput.value;
      doneEditBtn.replaceWith(editBtn);
    };
  }
};
