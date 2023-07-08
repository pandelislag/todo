// general variables
const button = document.querySelector(".btn");
const inputBox = document.querySelector(".inputBox");
const familyList = document.querySelector(".family-list");
const businessList = document.querySelector(".business-list");
const msg = document.querySelector(".message");
const btnFamily = document.querySelector(".btn-family");
const btnBusiness = document.querySelector(".btn-business");
let selectedCategory = "";

// Events Listeners
button.addEventListener("click", addItem);
familyList.addEventListener("mousedown", removeItem);
businessList.addEventListener("mousedown", removeItem);
btnFamily.addEventListener("click", () => selectCategory("family"));
btnBusiness.addEventListener("click", () => selectCategory("business"));

// Add Tasks
function addItem() {
  if (inputBox.value.trim() === "" || selectedCategory === "") {
    return formValidation();
  }

  let li = document.createElement("LI");
  li.append(inputBox.value);
  saveData();
  // clear the input
  inputBox.value = "";
  let span = document.createElement("span");
  li.appendChild(span);
  li.classList.add("list-item");
  let text = document.createTextNode("X");
  span.appendChild(text);
  span.classList.add("spany");

  // category

  if (selectedCategory === "family") {
    familyList.appendChild(li);
    saveData();
  } else if (selectedCategory === "business") {
    businessList.appendChild(li);

    saveData();
  }
}

// Remove li with Span Tag
function removeItem(e) {
  // put a line to make it checked
  if (e.target.classList.contains("list-item")) {
    e.target.classList.toggle("check");
    saveData();
  } else if (e.target.classList.contains("spany")) {
    e.target.parentElement.remove();
    saveData();
  }
}

// Form warning
let formValidation = () => {
  let errorMsg = "";

  if (inputBox.value === "" || null || undefined) {
    errorMsg += "Field cannot be blank. ";
  }
  if (selectedCategory === "" || null || undefined) {
    errorMsg += "Please select a category. ";
  }

  if (errorMsg !== "") {
    msg.textContent = errorMsg;
    setTimeout(() => {
      msg.style.display = "none";
    }, 2000);
  } else {
    msg.innerHTML = "";
  }
};

// Select category
function selectCategory(category) {
  selectedCategory = category;
}

// Local storage
function saveData() {
  localStorage.setItem("data", familyList.innerHTML);
  localStorage.setItem("data1", businessList.innerHTML);
}

function recallData() {
  familyList.innerHTML = localStorage.getItem("data");
  businessList.innerHTML = localStorage.getItem("data1");
}

recallData();
