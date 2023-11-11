//Elements
const addExercise = document.querySelector(".add-ex");
const muscleInput = document.querySelector(".muscle-input");
const exerciseInput = document.querySelector(".exercise-input");
const repsInput = document.querySelector(".reps-input");
const setsInput = document.querySelector(".sets-input");
const weightsInput = document.querySelector(".weights-input");
const submitBtn = document.querySelector(".submit-btn");
const closeAddBox = document.querySelector(".close-add-box");
const addBoxDiv = document.querySelector(".add-box");
const container = document.querySelector(".container");
const deleteExercise = document.querySelector(".delete-ex");
//We use JSON.parse because it's a String and we want it back as an Array
const localStorageExercises = JSON.parse(localStorage.getItem("exercises"));

//Array of Objects
let allExcercises = [];

if (localStorageExercises) {
  allExcercises = localStorageExercises;
  runApp(allExcercises);
}
function clearInputFields() {
  muscleInput.value = "";
  exerciseInput.value = "";
  repsInput.value = "";
  setsInput.value = "";
  weightsInput.value = "";
}
//Toggle function
function toggleAddBox() {
  addBoxDiv.classList.toggle("hidden");
}

let exerciseObject = {};

//Event Listeners
addExercise.addEventListener("click", toggleAddBox);

deleteExercise.addEventListener("click", function () {
  localStorage.clear();
  allExcercises = [];
  runApp(allExcercises);
});
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  exerciseObject = {
    muscle: muscleInput.value,
    exercise: exerciseInput.value,
    reps: repsInput.value,
    sets: setsInput.value,
    weight: [weightsInput.value],
  };
  allExcercises.push(exerciseObject);
  localStorage.setItem("exercises", JSON.stringify(allExcercises));
  runApp(allExcercises);
  clearInputFields();
  toggleAddBox();
});

closeAddBox.addEventListener("click", toggleAddBox);

//Running the app

function runApp(exercises) {
  if (exercises) {
    const errorText = document.createElement("p");
    errorText.textContent = "";
    const chestDiv = document.createElement("div");
    const backDiv = document.createElement("div");
    const shouldersDiv = document.createElement("div");
    const legsDiv = document.createElement("div");
    const armsDiv = document.createElement("div");
    chestDiv.classList.add("chest");
    backDiv.classList.add("back");
    shouldersDiv.classList.add("shoulder");
    legsDiv.classList.add("legs");
    armsDiv.classList.add("arms");
    const allDivs = [chestDiv, backDiv, shouldersDiv, legsDiv, armsDiv];
    allDivs.forEach(function (div) {
      container.appendChild(div);
    });

    exercises.forEach(function (ex) {
      let type = ex.muscle.toLowerCase();

      const hrElement = document.createElement("hr");
      const hiddenDiv = document.createElement("div");
      const muscleText = document.createElement("h3");
      muscleText.textContent = `${ex.muscle.toUpperCase()}`;
      const exerciseText = document.createElement("p");
      exerciseText.textContent = `Exercise: ${ex.exercise}`;
      const repsText = document.createElement("p");
      repsText.textContent = `Reps: ${ex.reps}`;
      const toggleHidden = document.createElement("button");
      toggleHidden.textContent = "↓";
      toggleHidden.classList.add("toggle-hidden");

      const setsText = document.createElement("p");

      setsText.textContent = `Sets: ${ex.sets}`;
      const weightText = document.createElement("p");

      weightText.textContent = `Weights: ${ex.weight.join(" ")}`;

      hiddenDiv.append(exerciseText, repsText, setsText, weightText, hrElement);

      hiddenDiv.classList.add(`exercise-${type}`);
      hiddenDiv.classList.add("hidden");

      if (type === "chest" && chestDiv.innerHTML === "") {
        chestDiv.append(muscleText, toggleHidden, hiddenDiv);
      } else if (type === "chest" && chestDiv.innerHTML !== "") {
        chestDiv.append(toggleHidden, hiddenDiv);
      } else if (type === "back" && backDiv.innerHTML === "") {
        backDiv.append(muscleText, toggleHidden, hiddenDiv);
      } else if (type === "back" && backDiv.innerHTML !== "") {
        backDiv.append(toggleHidden, hiddenDiv);
      } else if (type === "shoulders" && shouldersDiv.innerHTML === "") {
        shouldersDiv.append(muscleText, toggleHidden, hiddenDiv);
      } else if (type === "shoulders" && shouldersDiv.innerHTML !== "") {
        shouldersDiv.append(toggleHidden, hiddenDiv);
      } else if (type === "arms" && armsDiv.innerHTML === "") {
        armsDiv.append(muscleText, toggleHidden, hiddenDiv);
      } else if (type === "arms" && armsDiv.innerHTML !== "") {
        armsDiv.append(toggleHidden, hiddenDiv);
      } else if (type === "legs" && legsDiv.innerHTML === "") {
        legsDiv.append(muscleText, toggleHidden, hiddenDiv);
      } else if (type === "legs" && legsDiv.innerHTML !== "") {
        legsDiv.append(toggleHidden, hiddenDiv);
      }
      const exerciseContainer = document.querySelectorAll(`.exercise-${type}`);
      toggleHidden.addEventListener("click", function () {
        exerciseContainer.forEach(function (div) {
          div.classList.toggle("hidden");
          if (div.classList.contains("hidden")) {
            toggleHidden.textContent = "↓";
          } else {
            toggleHidden.textContent = "↑";
          }
        });
      });
    });
  }
}
