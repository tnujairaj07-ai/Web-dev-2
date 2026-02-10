// Assignment-1/script.js
let formObj = {
  title: "",
  date: "",
  cotagory: "",
  Discription: ""
};

const eventForm = document.getElementById("eventForm");
const eventsContainer = document.getElementById("eventsContainer");

function showPlaceholderIfEmpty() {
  if (eventsContainer.children.length === 0) {
    const p = document.createElement("p");
    p.classList.add("placeholder");
    p.textContent = "No events yet. Add your first event!";
    eventsContainer.appendChild(p);
  }
}

function removePlaceholder() {
  const ph = eventsContainer.querySelector(".placeholder");
  if (ph) ph.remove();
}

showPlaceholderIfEmpty();

function createEventCard(obj) {
  const eachCard = document.createElement("div");
  eachCard.classList.add("eachCard");

  eachCard.innerHTML = `
    <div class="eachCardTitle">${obj.title}</div>
    <div class="eachCardDate">Date: ${obj.date}</div>
    <div class="eachCardCategory">Category: ${obj.cotagory}</div>
    <div class="eachCardDesc">${obj.Discription}</div>
    <button class="deleteBtn">Delete</button>
  `;

  const deleteBtn = eachCard.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", function () {
    eachCard.remove();
    if (eventsContainer.children.length === 0) {
      showPlaceholderIfEmpty();
    }
  });

  return eachCard;
}

function eventSubmitHandler(event) {
  event.preventDefault();

  formObj.title = event.target.title.value;
  formObj.date = event.target.date.value;
  formObj.cotagory = event.target.catogary.value;
  formObj.Discription = event.target.discription.value;

  const card = createEventCard(formObj);
  removePlaceholder();
  eventsContainer.appendChild(card);

  event.target.reset();
}

eventForm.addEventListener("submit", eventSubmitHandler);

const addSampleBtn = document.getElementById("addSampleBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// DOM demo elements
const originalHtml = document.getElementById("originalHtml");
const innerHTMLDemo = document.getElementById("innerHTMLDemo");
const innerTextDemo = document.getElementById("innerTextDemo");
const textContentDemo = document.getElementById("textContentDemo");
const keyPressInfo = document.getElementById("keyPressInfo");

addSampleBtn.addEventListener("click", function () {
  formObj = {
    title: "Sample Event",
    date: "2026-02-20",
    cotagory: "Workshop",
    Discription: "This is a sample event created with basic DOM."
  };

  const card = createEventCard(formObj);
  removePlaceholder();
  eventsContainer.appendChild(card);
});

clearAllBtn.addEventListener("click", function () {
  eventsContainer.innerHTML = "";
  showPlaceholderIfEmpty();
});

function initDomDemo() {
  innerHTMLDemo.innerHTML = originalHtml.innerHTML;
  innerTextDemo.innerText = originalHtml.innerHTML;
  textContentDemo.textContent = originalHtml.innerHTML;
}

document.addEventListener("keydown", function (e) {
  keyPressInfo.textContent = "You pressed: " + e.key;
});

initDomDemo();

