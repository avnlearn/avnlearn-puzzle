import wordlist from "./ts/dictionary/wordlist.json";
import { RandomStringNumberListByDigit } from "./ts/randunit";
import { sample } from "./ts/utils/random";
import { WordSearchGenerator } from "./ts/wordsearch";

const container = document.getElementById("container") as HTMLElement;
const generatorBtn = document.getElementById("wordsearch-generator") as HTMLButtonElement;
const showAnswer = document.getElementById("wordsearch-show_ans") as HTMLButtonElement;

// Helper function to toggle cell colors
function toggleCellColors(cells: NodeListOf<HTMLElement>, isToggled: boolean, originalColors: string[]) {
  cells.forEach((cell, index) => {
    const htmlCell = cell as HTMLElement;
    if (isToggled) {
      htmlCell.style.color = "#ffffff"; // Show answer text in white
      htmlCell.style.backgroundColor = htmlCell.getAttribute("data-color") || "#000000"; // Set background to data-color
    } else {
      htmlCell.style.color = "#000000"; // Reset text to black
      htmlCell.style.backgroundColor = originalColors[index]; // Reset to original color
    }
  });
}

// Attach showAnswer functionality dynamically
function attachShowAnswer() {
  const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;
  const originalColors = Array.from(cells).map((cell) => cell.style.backgroundColor || "");
  let isToggled = false;

  showAnswer?.addEventListener("click", () => {
    isToggled = !isToggled;
    toggleCellColors(cells, isToggled, originalColors);
  });
}

function words_types(){
  const words_type = (document.getElementById("wordsearch-generator_types") as HTMLSelectElement).value;
  switch (words_type) {
    case "english":
      return [sample(wordlist, 20), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
      // break;
    case "number":
      return [RandomStringNumberListByDigit(20), "0123456789".split("")];
    default:
      return [sample(wordlist, 20), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  }
}

// Event listener for generating word searches
generatorBtn?.addEventListener("click", () => {
  container.innerHTML = ""; // Clear the container
  generatorBtn.disabled = true;

  const words = words_types();
  const gridSize = 15;
  container.innerHTML = "Wait"; // Clear the container
  container.innerHTML = ""; // Clear the container
  Array.from({ length: 64 }).forEach((_, i) => {
    const wordSearch = new WordSearchGenerator(gridSize, true);
    wordSearch.addWords(words[0], words[1]);

    const wordsearchContainer = document.createElement("div");
    wordsearchContainer.classList.add("wordsearch_pg");

    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
      <span class="title">आधुनिक विद्या निकेतन ट्यूशन सेंटर</span>
      <span class="page_no">${i + 1}</span>
    `;
    wordsearchContainer.appendChild(header);

    container.appendChild(wordSearch.html(wordsearchContainer));
  });

  generatorBtn.disabled = false;

  // Reattach showAnswer functionality after new cells are added
  attachShowAnswer();
});

// const container = document.getElementById("container") as HTMLElement;
// const wordsearch_form = document.getElementById("sudoku-form") as HTMLFormElement;
// const wordsearch_answer = document.getElementById("show-answer") as HTMLButtonElement;