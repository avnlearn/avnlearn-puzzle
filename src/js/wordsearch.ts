class WordSearchGenerator {
    private grid: string[][];
    private size: number;
    private wordPositions: { [key: string]: { startX: number, startY: number, direction: { x: number, y: number } } } = {};

    constructor(size: number) {
        this.size = size;
        this.grid = this.createEmptyGrid();
    }

    private createEmptyGrid(): string[][] {
        const grid: string[][] = [];
        for (let i = 0; i < this.size; i++) {
            const row: string[] = [];
            for (let j = 0; j < this.size; j++) {
                row.push('');
            }
            grid.push(row);
        }
        return grid;
    }

    public addWord(word: string): boolean {
        const directions = [
            { x: 0, y: 1 },   // Horizontal right
            { x: 0, y: -1 },  // Horizontal left
            { x: 1, y: 0 },   // Vertical down
            { x: -1, y: 0 },  // Vertical up
            { x: 1, y: 1 },   // Diagonal down-right
            { x: -1, y: -1 }, // Diagonal up-left
            { x: 1, y: -1 },  // Diagonal down-left
            { x: -1, y: 1 },  // Diagonal up-right
        ];

        for (let attempt = 0; attempt < 500000; attempt++) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startX = Math.floor(Math.random() * this.size);
            const startY = Math.floor(Math.random() * this.size);

            if (this.canPlaceWord(word, startX, startY, direction)) {
                this.placeWord(word, startX, startY, direction);
                this.wordPositions[word] = { startX, startY, direction }; // Store the position of the word
                return true;
            }
        }
        return false; // Failed to place the word
    }

    private canPlaceWord(word: string, startX: number, startY: number, direction: { x: number, y: number }): boolean {
        let x = startX;
        let y = startY;

        for (const char of word) {
            if (x < 0 || x >= this.size || y < 0 || y >= this.size || (this.grid[y][x] !== '' && this.grid[y][x] !== char)) {
                return false;
            }
            x += direction.x;
            y += direction.y;
        }
        return true;
    }

    private placeWord(word: string, startX: number, startY: number, direction: { x: number, y: number }): void {
        let x = startX;
        let y = startY;

        for (const char of word) {
            this.grid[y][x] = char;
            x += direction.x;
            y += direction.y;
        }
    }

    public fillGrid(): void {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.grid[y][x] === '') {
                    this.grid[y][x] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                }
            }
        }
    }

    public printGrid(): void {
        console.log('Word Search Grid:');
        console.log('-----------------');
        this.grid.forEach(row => console.log(row.join(' ')));
        console.log('-----------------');
    }

    public printWordList(words: string[]): void {
        console.log('Words to Find:');
        console.log('--------------');
        words.forEach(word => console.log(word));
        console.log('--------------');
    }

    public printSolution(): void {
        console.log('Solution:');
        console.log('---------');
        for (const word in this.wordPositions) {
            const { startX, startY, direction } = this.wordPositions[word];
            console.log(`Word: ${word}, Start: (${startX}, ${startY}), Direction: (${direction.x}, ${direction.y})`);
        }
        console.log('---------');
    }
    public getMatrix(): string[][] {
        return this.grid;
    }
}


function createSvgTable(data: string[][]): string {
    const cellWidth = 100;
    const cellHeight = 30;
    const xOffset = 10;
    const yOffset = 10;

    // Start building the SVG string
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${data[0].length * cellWidth + 20}" height="${data.length * cellHeight + 20}">`;

    // Draw the table
    data.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = xOffset + colIndex * cellWidth;
            const y = yOffset + rowIndex * cellHeight;

            // Draw a rectangle for the cell
            svgContent += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="lightgrey" stroke="black"/>`;

            // Add text to the cell
            svgContent += `<text x="${x + 5}" y="${y + cellHeight / 2 + 5}" fill="black" font-size="12" dominant-baseline="middle">${cell}</text>`;
        });
    });

    svgContent += `</svg>`;
    return svgContent;
}

function arrayToTable(data: any[][]): string {
    let tableHTML = '<table border="1">'; // Start the table with a border

    for (const row of data) {
        tableHTML += '<tr>'; // Start a new row
        for (const cell of row) {
            tableHTML += `<td>${cell}</td>`; // Add each cell to the row
        }
        tableHTML += '</tr>'; // End the row
    }

    tableHTML += '</table>'; // End the table
    return tableHTML;
}

function createTable(data: any[][]): HTMLTableElement {
    const table = document.createElement("table");
    table.border = "1"; // Optional: Add border to the table

    data.forEach((rowData) => {
        const row = document.createElement("tr");
        rowData.forEach((cellData) => {
            const cell = document.createElement("td");
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    return table;
}

// // Example usage
// const gridSize = 15; // You can change this to any size you want
// const wordSearch = new WordSearchGenerator(gridSize);
// const words = ['TYPE', 'SCRIPT', 'JAVASCRIPT', 'CODE', 'GENERATOR', 'TEST', 'EXAMPLE', 'SEARCH', 'COMPLEX', 'PROGRAMMING', "Game", "BROWSER", "provided", "function", "uppercase", "originally", "Projects", "application", "configuration"];

// words.forEach(word => {
//     word = word.toUpperCase()
//     if (!wordSearch.addWord(word)) {
//         console.log(`Failed to add word: ${word} - ${word.length}`);
//     }
// });


// const wordsearch_val = wordSearch.getMatrix()
// var h = document.getElementById("container");
// console.log(wordsearch_val[0].length, wordsearch_val.length)
// if (h) {
//     h?.appendChild(
//         createTable(wordsearch_val)
//     )

// }
