class MagicSquare {
    private size: number;
    private magicSquare: number[][]; // Correctly defined as a 2D array

    constructor(size: number) {
        this.size = size;
        this.magicSquare = Array.from({ length: size }, () => Array(size).fill(0));
    }

    public generate(): number[][] {
        if (this.size % 2 === 1) {
            this.generateOddMagicSquare();
        } else if (this.size % 4 === 0) {
            this.generateEvenMagicSquare();
        } else {
            throw new Error("Only odd and doubly even sizes (multiples of 4) are supported.");
        }
        return this.magicSquare;
    }

    private generateOddMagicSquare(): void {
        let row = 0;
        let col = Math.floor(this.size / 2);

        for (let num = 1; num <= this.size * this.size; num++) {
            this.magicSquare[row][col] = num;
            row--;
            col++;

            if (num % this.size === 0) {
                row += 2; // Move down two rows
                col--;   // Move left one column
            } else {
                if (col === this.size) {
                    col -= this.size; // Wrap around to the first column
                }
                if (row < 0) {
                    row += this.size; // Wrap around to the last row
                }
            }
        }
    }

    private generateEvenMagicSquare(): void {
        let num = 1;

        // Fill the magic square with numbers 1 to size*size
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.magicSquare[i][j] = num++;
            }
        }

        // Swap the values in the magic square
        const swapPositions = (i: number, j: number) => {
            const temp = this.magicSquare[i][j];
            this.magicSquare[i][j] = this.magicSquare[this.size - 1 - i][this.size - 1 - j];
            this.magicSquare[this.size - 1 - i][this.size - 1 - j] = temp;
        };

        for (let i = 0; i < this.size / 2; i++) {
            for (let j = 0; j < this.size / 2; j++) {
                if ((i + j) % 2 === 0) {
                    swapPositions(i, j);
                }
            }
        }
    }

    public getMagicSum(): number {
        return (this.size * (this.size * this.size + 1)) / 2;
    }

    public printMagicSquare(): void {
        for (const row of this.magicSquare) {
            console.log(row.join('\t'));
        }
    }
}

// Example usage:
const oddMagicSquare = new MagicSquare(5);
oddMagicSquare.generate();
console.log("Odd Magic Square (5x5):");
oddMagicSquare.printMagicSquare();
console.log("Magic Sum:", oddMagicSquare.getMagicSum());

const evenMagicSquare = new MagicSquare(4);
evenMagicSquare.generate();
console.log("\nEven Magic Square (4x4):");
evenMagicSquare.printMagicSquare();
console.log("Magic Sum:", evenMagicSquare.getMagicSum());
