var input = document.getElementById("item");
var list = document.getElementById("list");



var submit = () => {
  var div = document.createElement("div");
  var removeBtn = document.createElement("button");
  var editBtn = document.createElement("button");
  var span = document.createElement("span");

  if (input.value) {
    removeBtn.innerHTML = "Remove";
    removeBtn.className = "removeBtn";
    editBtn.innerHTML = "Edit"
    editBtn.className = "editBtn";
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

    editBtn.addEventListener("click", () => {
        var editInput = document.createElement("input");
                
        span.replaceWith(editInput);
    })
    list.append(div);
    console.log(list.childElementCount);
  }
};

