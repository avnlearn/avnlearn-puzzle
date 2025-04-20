// import * as wordlist from "./dictionary/wordlist.json";
import {
  join,
  wrapStringInSpans,
  arrayToTable,
  generateHtmlList,
} from "./utils/utils";
import { shuffle, randColor, choice } from "./utils/random";

export class WordSearchGenerator {
  private grid: string[][];
  private size: number;
  private wordslist: any[] = [];
  private color_array: any[] = [];
  private fill_alphabet: any[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  private wordPositions: {
    [key: string]: {
      startX: number;
      startY: number;
      direction: { x: number; y: number };
    };
  } = {};
  private html_format: boolean;
  private maxAttempts : number = 50000;

  constructor(size: number, html_format: boolean = false) {
    this.size = size;
    this.html_format = html_format;
    this.maxAttempts = Math.max(1000, this.size * this.size * 1000)
    this.grid = this.createEmptyGrid();
  }

  private createEmptyGrid(): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < this.size; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push("");
      }
      grid.push(row);
    }
    return grid;
  }
  public addWords(words: any[], _filldata: any[]): void {
    this.fill_alphabet= _filldata || this.fill_alphabet;
    words = shuffle(words);
    words.forEach((word) => {
      word = word.toUpperCase();
      if (!this.addWord(word)) {
        console.log(`Failed to add word: ${word} - ${word.length}`);
      }
    });
  }
  public addWord(word: any): boolean {
    const directions = [
      { x: 0, y: 1 }, // Horizontal right (→)
      { x: 0, y: -1 }, // Horizontal left (←)
      { x: 1, y: 0 }, // Vertical down (↓)
      { x: -1, y: 0 }, // Vertical up (↑)
      { x: 1, y: 1 }, // Diagonal down-right (↘)
      { x: -1, y: -1 }, // Diagonal up-left (↖)
      { x: 1, y: -1 }, // Diagonal down-left (↙)
      { x: -1, y: 1 }, // Diagonal up-right (↗)
    ];

    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const direction =
        directions[Math.floor(Math.random() * directions.length)];
      const startX = Math.floor(Math.random() * this.size);
      const startY = Math.floor(Math.random() * this.size);

      if (this.canPlaceWord(word, startX, startY, direction)) {
        if (this.html_format) {
          const rand_color = randColor("hex", this.color_array);
          this.color_array.push(rand_color);
          const word_span = document.createElement("span");
          word_span.textContent = join(word);
          let color = "#fffff";
          if (this.color_array.length > 0) {
            color = this.color_array.at(-1);
            word_span.classList.add("cell");
            word_span.setAttribute("data-color", color);
          }
          this.wordslist.push(word_span);
          word = wrapStringInSpans(word, color);
        } else {
          this.wordslist.push(word);
        }
        this.placeWord(word, startX, startY, direction);
        this.wordPositions[word] = { startX, startY, direction }; // Store the position of the word
        return true;
      }
    }
    return false; // Failed to place the word
  }

  private canPlaceWord(
    word: string,
    startX: number,
    startY: number,
    direction: { x: number; y: number }
  ): boolean {
    let x = startX;
    let y = startY;

    for (const char of word) {
      if (
        x < 0 ||
        x >= this.size ||
        y < 0 ||
        y >= this.size ||
        (this.grid[y][x] !== "" && this.grid[y][x] !== char)
      ) {
        return false;
      }
      x += direction.x;
      y += direction.y;
    }
    return true;
  }

  private placeWord(
    word: string,
    startX: number,
    startY: number,
    direction: { x: number; y: number }
  ): void {
    let x = startX;
    let y = startY;

    for (const char of word) {
      this.grid[y][x] = char;
      x += direction.x;
      y += direction.y;
    }
  }

  public fillGrid(): void {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.grid[y][x] === "") {
          this.grid[y][x] = choice(this.fill_alphabet);
        }
      }
    }
  }
  public html(container: HTMLElement): HTMLElement {
    this.fillGrid();
    const wordlist_ul = generateHtmlList(this.wordslist);
    wordlist_ul.classList.add("wordlist");
    // this.printWordList(this.wordslist);
    const grid_table = arrayToTable(this.grid);
    grid_table.classList.add("wordsearch_table");
    container.appendChild(grid_table);
    container.appendChild(wordlist_ul);
    return container;
  }

  public get_wordlist(): String[] {
    return this.wordslist;
  }

  public printSolution(): void {
    console.log("Solution:");
    console.log("---------");
    for (const word in this.wordPositions) {
      const { startX, startY, direction } = this.wordPositions[word];
      console.log(
        `Word: ${word}, Start: (${startX}, ${startY}), Direction: (${direction.x}, ${direction.y})`
      );
    }
    console.log("---------");
  }
  public getMatrix(): string[][] {
    return this.grid;
  }
}
