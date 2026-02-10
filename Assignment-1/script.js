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
