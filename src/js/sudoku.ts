enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

class SudokuGenerator {
    private size: number;
    private grid: any[][];

    constructor(size: number) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(0));

    }

    public generate(difficulty: Difficulty): number[][] {
        this.fillGrid();
        this.removeNumbers(difficulty);
        return this.grid;
    }

    private fillGrid(): boolean {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === 0) {
                    const numbers = this.shuffleArray(this.getAvailableNumbers(row, col));
                    for (const num of numbers) {
                        if (this.isSafe(row, col, num)) {
                            this.grid[row][col] = num;
                            if (this.fillGrid()) {
                                return true;
                            }
                            this.grid[row][col] = 0; // backtrack
                        }
                    }
                    return false; // trigger backtracking
                }
            }
        }
        return true; // grid filled
    }

    private getAvailableNumbers(row: number, col: number): number[] {
        const available = new Set<number>();
        for (let i = 1; i <= this.size; i++) {
            available.add(i);
        }

        for (let i = 0; i < this.size; i++) {
            available.delete(this.grid[row][i]); // check row
            available.delete(this.grid[i][col]); // check column
        }

        const boxSize = Math.sqrt(this.size);
        const boxRowStart = Math.floor(row / boxSize) * boxSize;
        const boxColStart = Math.floor(col / boxSize) * boxSize;

        for (let r = 0; r < boxSize; r++) {
            for (let c = 0; c < boxSize; c++) {
                available.delete(this.grid[boxRowStart + r][boxColStart + c]); // check box
            }
        }

        return Array.from(available);
    }

    private isSafe(row: number, col: number, num: number): boolean {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[row][i] === num || this.grid[i][col] === num) {
                return false;
            }
        }

        const boxSize = Math.sqrt(this.size);
        const boxRowStart = Math.floor(row / boxSize) * boxSize;
        const boxColStart = Math.floor(col / boxSize) * boxSize;

        for (let r = 0; r < boxSize; r++) {
            for (let c = 0; c < boxSize; c++) {
                if (this.grid[boxRowStart + r][boxColStart + c] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    private shuffleArray(array: number[]): number[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    private removeNumbers(difficulty: Difficulty): void {

        let removeCount: number;

        switch (difficulty) {
            case Difficulty.Easy:
                removeCount = this.size === 4 ? 2 : 36; // Adjust for 4x4 and 9x9
                break;
            case Difficulty.Medium:
                removeCount = this.size === 4 ? 4 : 40; // Adjust for 4x4 and 9x9
                break;
            case Difficulty.Hard:
                removeCount = this.size === 4 ? 6 : 44; // Adjust for 4x4 and 9x9
                break;
            default:
                removeCount = 0;
        }

        let count = 0;

        while (count < removeCount) {
            const row = Math.floor(Math.random() * this.size);
            const col = Math.floor(Math.random() * this.size);
            if (typeof this.grid[row][col] === "number") {
                var remove_cell = document.createElement("span")
                remove_cell.classList.add("invisible", "text-red-700", 'font-extrabold')
                remove_cell.innerText = String(this.grid[row][col])
                this.grid[row][col] = remove_cell;
                count++;
            }
        }
    }
    public html(caption: String = ""): HTMLTableElement {
        const table = document.createElement("table") as HTMLTableElement;
        table.classList.add(`sudoku_table-${this.size}`); // Tailwind classes for table styling
        this.grid.forEach((rowData, rowIndex) => {
            const row = document.createElement("tr");
            rowData.forEach((cellData, colIndex) => {
                const cell = document.createElement("td");
                if (typeof cellData === "number") {
                    cell.textContent = String(cellData);
                } else {
                    cell.appendChild(cellData);
                }
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        if (caption) {
            const _caption = document.createElement("caption") as HTMLTableCaptionElement;
            _caption.classList.add("text-center", "py-1");
            _caption.innerText = String(caption);
            table.appendChild(_caption);

        }
        return table;
    }
}

const container = document.getElementById("container") as HTMLElement;
const generator_btn = document.getElementById("sudoku-generator");
const show_answer = document.getElementById("sudoku-show_ans") as HTMLButtonElement;
show_answer.addEventListener("click", () => {
    document.querySelectorAll(".invisible").forEach(element => {
        element.classList.toggle("visible"); // Toggle the "active" class
    });
});
generator_btn?.addEventListener("click", () => {
    const size = Number((document.getElementById("sudoku-generator_options") as HTMLSelectElement).value);
    const level = (document.getElementById("sudoku-generator_level") as HTMLSelectElement).value as Difficulty;



    container.innerHTML = ""; // Clear previous Sudoku
    for (var page_no = 1; page_no <= 960; page_no++) {
        // var page_no = 1;
        const sudokuGen = new SudokuGenerator(size);
        sudokuGen.generate(level);
        const sudoku_body = document.createElement("div");
        sudoku_body.classList.add("border-2", "w-[74mm]", 'h-[100mm]', 'px-2', "print:border-0");
        sudoku_body.classList.add("sudoku_template");
        const header = document.createElement("div");
        header.innerHTML = `
            <p class="text-center font-extrabold">आधुनिक विद्या निकेतन ट्यूशन सेंटर</p>
            <p class="font-extrabold py-1">नाम :</p>
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

