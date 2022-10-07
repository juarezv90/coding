var input = document.getElementById("item");
var list = document.getElementById("list");



var submit = () => {
  var div = document.createElement("div");
  var removeBtn = document.createElement("button");
  var editBtn = document.createElement("button");
  var span = document.createElement("span");

  if (input.value) {
    removeBtn.innerHTML = "Remove";
    removeBtn.className = "Btn";
    editBtn.innerHTML = "Edit"
    editBtn.className = "Btn";
    div.className = "taskContainer";
    span.className = "taskItem";

    span.innerHTML = input.value;
    input.value = "";
    removeBtn.addEventListener("click", () => {
      list.removeChild(div);
      console.log(`There is now ${list.childElementCount}`);
    });

    div.append(span);
    div.appendChild(removeBtn);
    div.appendChild(editBtn);

    editBtn.addEventListener("click", () => {edit(span,editBtn)})

    list.append(div);
    console.log(list.childElementCount);


    var edit = (span, editBtn) => {
        var editInput = document.createElement("input");
        var doneEditBtn = document.createElement("button");
    
        doneEditBtn.className = "btn";
        doneEditBtn.innerHTML = "Done";
        span.replaceWith(editInput);
        editBtn.replaceWith(doneEditBtn);
    
        doneEditBtn.addEventListener("click", () => {editComplete(editInput,doneEditBtn)});
        editInput.value = span.innerHTML;
    }
    
    var editComplete = (editInput, doneEditBtn) => {
        editInput.replaceWith(span);
        span.innerHTML = editInput.value;
        doneEditBtn.replaceWith(editBtn);
    }


  }
};

