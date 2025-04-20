export function join(input: string[] | string): string {
  return Array.isArray(input) ? input.join("") : input;
}
export function wrapStringInSpans(
  input: string | string[],
  color: string,
  elementName: string = "span"
): HTMLElement[] {
  // If the input is a string, convert it to an array of characters
  const characters = typeof input === "string" ? [...input] : input;

  // Create an array of elements wrapping each character in the specified element
  const wrappedElements = characters.map((char) => {
    const element = document.createElement(elementName);
    element.classList.add("cell");
    element.setAttribute("data-color", color);
    // element.style.color = color;
    element.textContent = char; // Set the text content to the character
    return element;
  });

  return wrappedElements; // Return the array of wrapped elements
}

export function createSvgTable(data: string[][]): string {
  const cellWidth = 100;
  const cellHeight = 30;
  const xOffset = 10;
  const yOffset = 10;

  // Start building the SVG string
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${
    data[0].length * cellWidth + 20
  }" height="${data.length * cellHeight + 20}">`;

  // Draw the table
  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const x = xOffset + colIndex * cellWidth;
      const y = yOffset + rowIndex * cellHeight;

      // Draw a rectangle for the cell
      svgContent += `<rect x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}" fill="lightgrey" stroke="black"/>`;

      // Add text to the cell
      svgContent += `<text x="${x + 5}" y="${
        y + cellHeight / 2 + 5
      }" fill="black" font-size="12" dominant-baseline="middle">${cell}</text>`;
    });
  });

  svgContent += `</svg>`;
  return svgContent;
}

export function arrayToTable(
  data: (string | HTMLElement | number | boolean)[][]
): HTMLElement {
  const table = document.createElement("table"); // Create a table element
  table.style.border = "1px solid black"; // Optional: Add a border style

  for (const row of data) {
    const tableRow = document.createElement("tr"); // Create a new row
    for (const cell of row) {
      const tableCell = document.createElement("td"); // Create a new cell
      // Convert each cell to a string representation
      const cellContent =
        typeof cell === "boolean"
          ? cell
            ? "True"
            : "False"
          : cell instanceof HTMLElement
          ? cell.outerHTML
          : String(cell);
      tableCell.innerHTML = cellContent; // Set the cell content
      tableRow.appendChild(tableCell); // Add the cell to the row
    }
    table.appendChild(tableRow); // Add the row to the table
  }

  return table; // Return the table element
}
export function generateHtmlList(inputs: (number | string | HTMLElement)[]): HTMLUListElement {
  const ul = document.createElement("ul");

  inputs.forEach(input => {
      if (typeof input === "string") {
          // If input is a string, create a list with that string as an item
          const li = document.createElement("li");
          li.textContent = input; // Set the text content of the <li>
          ul.appendChild(li); // Append the <li> to the <ul>
      } else if (typeof input === "number") {
          // If input is a number, create a list item for that number
          const li = document.createElement("li");
          li.textContent = `Item ${input}`; // Set the text content of the <li>
          ul.appendChild(li); // Append the <li> to the <ul>
      } else if (input instanceof HTMLElement) {
          // If input is an HTMLElement, create a list item with its outerHTML
          const li = document.createElement("li");
          li.innerHTML = input.outerHTML; // Set the inner HTML of the <li> to the HTMLElement's outerHTML
          ul.appendChild(li); // Append the <li> to the <ul>
      } else {
          throw new Error("Invalid input type. Expected a number, a string, or an HTMLElement.");
      }
  });

  return ul; // Return the created <ul> element
}
export function createTable(data: any[][]): HTMLTableElement {
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
