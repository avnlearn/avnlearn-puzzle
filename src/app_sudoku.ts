import { collectFormData, FormDataObject } from "./ts/utils"
import { SudokuGenerator, Difficulty } from "./ts/sudoku"

const sudoku_form = document.getElementById("sudoku-form") as HTMLFormElement;
const sudoku_answer = document.getElementById("answer") as HTMLButtonElement;
const container = document.getElementById("container") as HTMLDivElement;
sudoku_form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = collectFormData(sudoku_form) as FormDataObject;
    if (!data) {
        console.log(data)
        return
    }
    container.innerHTML = '';
    const grid = data.grid as number;
    const level = data.level as Difficulty;
    let number_of_page = data.number_of_page as number;
    if (!number_of_page) {
        number_of_page = 1
    }
    console.log(data)
    // 960
    for (var page_no = 1; page_no <= number_of_page; page_no++) {
        const sudokuGen = new SudokuGenerator(grid);
        sudokuGen.generate(level);
        const sudoku_body = document.createElement("div");
        sudoku_body.classList.add(`sudoku_container-${grid}`);
        const header = document.createElement("div");
        header.classList.add("header");
        header.innerHTML = `
            <p class="title">आधुनिक विद्या निकेतन ट्यूशन सेंटर</p>
            <p class="name">नाम :</p>
        `;
        sudoku_body.appendChild(header);
        sudoku_body.appendChild(sudokuGen.html()); // Assuming html() method exists
        const footer = document.createElement("div");
        footer.classList.add("grid", "grid-cols-2", "py-1")
        footer.innerHTML = `
            <p class="pl-4">${page_no}</p>
            <p class="text-right">avnlearn.com</p>
        `;
        sudoku_body.appendChild(footer)
        container.appendChild(sudoku_body);
    }
});

sudoku_answer.addEventListener("click", () => {
    document.querySelectorAll(".invisible").forEach(element => {
        element.classList.toggle("visible"); // Toggle the "active" class
    });
});