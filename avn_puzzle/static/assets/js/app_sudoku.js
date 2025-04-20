/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app_sudoku.ts":
/*!***************************!*\
  !*** ./src/app_sudoku.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var utils_1 = __webpack_require__(/*! ./ts/utils */ "./src/ts/utils/index.ts");
var sudoku_1 = __webpack_require__(/*! ./ts/sudoku */ "./src/ts/sudoku.ts");
var sudoku_form = document.getElementById("sudoku-form");
var sudoku_answer = document.getElementById("answer");
var container = document.getElementById("container");
sudoku_form === null || sudoku_form === void 0 ? void 0 : sudoku_form.addEventListener("submit", function (event) {
  event.preventDefault();
  var data = (0, utils_1.collectFormData)(sudoku_form);
  if (!data) {
    console.log(data);
    return;
  }
  container.innerHTML = '';
  var grid = data.grid;
  var level = data.level;
  var number_of_page = data.number_of_page;
  if (!number_of_page) {
    number_of_page = 1;
  }
  console.log(data);
  // 960
  for (var page_no = 1; page_no <= number_of_page; page_no++) {
    var sudokuGen = new sudoku_1.SudokuGenerator(grid);
    sudokuGen.generate(level);
    var sudoku_body = document.createElement("div");
    sudoku_body.classList.add("sudoku_container-".concat(grid));
    var header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = "\n            <p class=\"title\">\u0906\u0927\u0941\u0928\u093F\u0915 \u0935\u093F\u0926\u094D\u092F\u093E \u0928\u093F\u0915\u0947\u0924\u0928 \u091F\u094D\u092F\u0942\u0936\u0928 \u0938\u0947\u0902\u091F\u0930</p>\n            <p class=\"name\">\u0928\u093E\u092E :</p>\n        ";
    sudoku_body.appendChild(header);
    sudoku_body.appendChild(sudokuGen.html()); // Assuming html() method exists
    var footer = document.createElement("div");
    footer.classList.add("grid", "grid-cols-2", "py-1");
    footer.innerHTML = "\n            <p class=\"pl-4\">".concat(page_no, "</p>\n            <p class=\"text-right\">avnlearn.com</p>\n        ");
    sudoku_body.appendChild(footer);
    container.appendChild(sudoku_body);
  }
});
sudoku_answer.addEventListener("click", function () {
  document.querySelectorAll(".invisible").forEach(function (element) {
    element.classList.toggle("visible"); // Toggle the "active" class
  });
});

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ts/sudoku.ts":
/*!**************************!*\
  !*** ./src/ts/sudoku.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SudokuGenerator = exports.Difficulty = void 0;
var Difficulty;
(function (Difficulty) {
  Difficulty["Easy"] = "easy";
  Difficulty["Medium"] = "medium";
  Difficulty["Hard"] = "hard";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
var SudokuGenerator = /*#__PURE__*/function () {
  function SudokuGenerator(size) {
    _classCallCheck(this, SudokuGenerator);
    this.size = size;
    this.grid = Array.from({
      length: size
    }, function () {
      return Array(size).fill(0);
    });
  }
  return _createClass(SudokuGenerator, [{
    key: "generate",
    value: function generate(difficulty) {
      this.fillGrid();
      this.removeNumbers(difficulty);
      return this.grid;
    }
  }, {
    key: "fillGrid",
    value: function fillGrid() {
      for (var row = 0; row < this.size; row++) {
        for (var col = 0; col < this.size; col++) {
          if (this.grid[row][col] === 0) {
            var numbers = this.shuffleArray(this.getAvailableNumbers(row, col));
            var _iterator = _createForOfIteratorHelper(numbers),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var num = _step.value;
                if (this.isSafe(row, col, num)) {
                  this.grid[row][col] = num;
                  if (this.fillGrid()) {
                    return true;
                  }
                  this.grid[row][col] = 0; // backtrack
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            return false; // trigger backtracking
          }
        }
      }
      return true; // grid filled
    }
  }, {
    key: "getAvailableNumbers",
    value: function getAvailableNumbers(row, col) {
      var available = new Set();
      for (var i = 1; i <= this.size; i++) {
        available.add(i);
      }
      for (var _i = 0; _i < this.size; _i++) {
        available["delete"](this.grid[row][_i]); // check row
        available["delete"](this.grid[_i][col]); // check column
      }
      var boxSize = Math.sqrt(this.size);
      var boxRowStart = Math.floor(row / boxSize) * boxSize;
      var boxColStart = Math.floor(col / boxSize) * boxSize;
      for (var r = 0; r < boxSize; r++) {
        for (var c = 0; c < boxSize; c++) {
          available["delete"](this.grid[boxRowStart + r][boxColStart + c]); // check box
        }
      }
      return Array.from(available);
    }
  }, {
    key: "isSafe",
    value: function isSafe(row, col, num) {
      for (var i = 0; i < this.size; i++) {
        if (this.grid[row][i] === num || this.grid[i][col] === num) {
          return false;
        }
      }
      var boxSize = Math.sqrt(this.size);
      var boxRowStart = Math.floor(row / boxSize) * boxSize;
      var boxColStart = Math.floor(col / boxSize) * boxSize;
      for (var r = 0; r < boxSize; r++) {
        for (var c = 0; c < boxSize; c++) {
          if (this.grid[boxRowStart + r][boxColStart + c] === num) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: "shuffleArray",
    value: function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [array[j], array[i]];
        array[i] = _ref[0];
        array[j] = _ref[1];
      }
      return array;
    }
  }, {
    key: "removeNumbers",
    value: function removeNumbers(difficulty) {
      var removeCount;
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
      var count = 0;
      while (count < removeCount) {
        var row = Math.floor(Math.random() * this.size);
        var col = Math.floor(Math.random() * this.size);
        if (typeof this.grid[row][col] === "number") {
          var remove_cell = document.createElement("span");
          remove_cell.classList.add("invisible", "text-red-700", 'font-extrabold');
          remove_cell.innerText = String(this.grid[row][col]);
          this.grid[row][col] = remove_cell;
          count++;
        }
      }
    }
  }, {
    key: "html",
    value: function html() {
      var caption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var table = document.createElement("table");
      table.classList.add('sudoku'); // Tailwind classes for table styling
      this.grid.forEach(function (rowData, rowIndex) {
        var row = document.createElement("tr");
        rowData.forEach(function (cellData, colIndex) {
          var cell = document.createElement("td");
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
        var _caption = document.createElement("caption");
        _caption.classList.add("text-center", "py-1");
        _caption.innerText = String(caption);
        table.appendChild(_caption);
      }
      return table;
    }
  }]);
}();
exports.SudokuGenerator = SudokuGenerator;

/***/ }),

/***/ "./src/ts/utils/index.ts":
/*!*******************************!*\
  !*** ./src/ts/utils/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
__exportStar(__webpack_require__(/*! ./random */ "./src/ts/utils/random.ts"), exports);
__exportStar(__webpack_require__(/*! ./server */ "./src/ts/utils/server.ts"), exports);
__exportStar(__webpack_require__(/*! ./utils */ "./src/ts/utils/utils.ts"), exports);

/***/ }),

/***/ "./src/ts/utils/random.ts":
/*!********************************!*\
  !*** ./src/ts/utils/random.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {



function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.randrange = randrange;
exports.shuffle = shuffle;
exports.sample = sample;
exports.choice = choice;
exports.choices = choices;
exports.randColor = randColor;
function randrange(start, stop) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (stop === undefined) {
    // Swap if only one argument is provided
    var _ref = [0, start];
    start = _ref[0];
    stop = _ref[1];
  }
  if (start >= stop || step <= 0) {
    throw new Error("Invalid range or step.");
  }
  var range = Math.floor((stop - start) / step);
  if (range <= 0) {
    throw new Error("Invalid range with the given step.");
  }
  return start + Math.floor(Math.random() * range) * step; // Return the random number
}
// Function to shuffle an array using the Fisher-Yates algorithm
function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array to shuffle.");
  }
  var shuffled = _toConsumableArray(array); // Create a copy of the array to avoid modifying the original
  var n = shuffled.length;
  // If the array is empty or has one element, return it as is
  if (n <= 1) {
    return shuffled;
  }
  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
    // Swap elements at indices i and j
    var _ref2 = [shuffled[j], shuffled[i]];
    shuffled[i] = _ref2[0];
    shuffled[j] = _ref2[1];
  }
  return shuffled; // Return the shuffled array
}
// Function to sample a specified number of unique random elements from an array
function sample(array, count) {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array to sample from.");
  }
  if (count < 0) {
    throw new Error("Sample count cannot be negative.");
  }
  if (count > array.length) {
    throw new Error("Sample count cannot be greater than the array length.");
  }
  return shuffle(array).slice(0, count); // Shuffle and return the first 'count' elements
}
// Function to select a single random element from an array
function choice(array) {
  if (array.length === 0) return undefined; // Handle empty array case
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
// Function to select multiple random elements from an array (with replacement)
function choices(array, count) {
  var selected = [];
  var maxCount = Math.min(count, array.length); // Ensure we don't exceed the array length
  for (var i = 0; i < maxCount; i++) {
    selected.push(choice(array)); // Use the choice function
  }
  return selected;
}
function randColor(format) {
  var color_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var shade = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "dark";
  var colorSet = new Set(color_array); // Use a Set for O(1) lookups
  var color;
  do {
    var red = void 0,
      green = void 0,
      blue = void 0;
    if (shade === "light") {
      // Generate lighter colors
      red = Math.floor(Math.random() * 128) + 128; // Range: 128-255
      green = Math.floor(Math.random() * 128) + 128; // Range: 128-255
      blue = Math.floor(Math.random() * 128) + 128; // Range: 128-255
    } else {
      // Generate darker colors
      red = Math.floor(Math.random() * 128); // Range: 0-127
      green = Math.floor(Math.random() * 128); // Range: 0-127
      blue = Math.floor(Math.random() * 128); // Range: 0-127
    }
    // Format the color based on the specified format
    color = format === "hex" ? "#".concat(((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)) : "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
  } while (colorSet.has(color)); // Continue until a unique color is found
  return color; // Return the unique color
}

/***/ }),

/***/ "./src/ts/utils/server.ts":
/*!********************************!*\
  !*** ./src/ts/utils/server.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.collectFormData = collectFormData;
/**
 * Collects form data from the given HTMLFormElement.
 * @param form - The form element to collect data from.
 * @returns An object containing the form data.
 */
function collectFormData(form) {
  var data = {};
  new FormData(form).forEach(function (value, key) {
    var stringValue = value.toString();
    var inputElement = form.elements.namedItem(key);
    // Handle checkbox inputs
    if (inputElement && inputElement.type === "checkbox") {
      data[key] = inputElement.checked; // Store as boolean
      return;
    }
    // Handle radio inputs
    if (inputElement && inputElement.type === "radio" && inputElement.checked) {
      data[key] = stringValue; // Store selected radio value
      return;
    }
    // Attempt to parse the value as an integer
    var parsedValue = parseInt(stringValue, 10);
    if (!isNaN(parsedValue)) {
      data[key] = parsedValue; // Store as number
    } else {
      data[key] = stringValue; // Store as string
    }
  });
  return data; // Return the collected data
}

/***/ }),

/***/ "./src/ts/utils/utils.ts":
/*!*******************************!*\
  !*** ./src/ts/utils/utils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.join = join;
exports.wrapStringInSpans = wrapStringInSpans;
exports.createSvgTable = createSvgTable;
exports.arrayToTable = arrayToTable;
exports.generateHtmlList = generateHtmlList;
exports.createTable = createTable;
function join(input) {
  return Array.isArray(input) ? input.join("") : input;
}
function wrapStringInSpans(input, color) {
  var elementName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "span";
  // If the input is a string, convert it to an array of characters
  var characters = typeof input === "string" ? _toConsumableArray(input) : input;
  // Create an array of elements wrapping each character in the specified element
  var wrappedElements = characters.map(function (_char) {
    var element = document.createElement(elementName);
    element.classList.add("cell");
    element.setAttribute("data-color", color);
    // element.style.color = color;
    element.textContent = _char; // Set the text content to the character
    return element;
  });
  return wrappedElements; // Return the array of wrapped elements
}
function createSvgTable(data) {
  var cellWidth = 100;
  var cellHeight = 30;
  var xOffset = 10;
  var yOffset = 10;
  // Start building the SVG string
  var svgContent = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(data[0].length * cellWidth + 20, "\" height=\"").concat(data.length * cellHeight + 20, "\">");
  // Draw the table
  data.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      var x = xOffset + colIndex * cellWidth;
      var y = yOffset + rowIndex * cellHeight;
      // Draw a rectangle for the cell
      svgContent += "<rect x=\"".concat(x, "\" y=\"").concat(y, "\" width=\"").concat(cellWidth, "\" height=\"").concat(cellHeight, "\" fill=\"lightgrey\" stroke=\"black\"/>");
      // Add text to the cell
      svgContent += "<text x=\"".concat(x + 5, "\" y=\"").concat(y + cellHeight / 2 + 5, "\" fill=\"black\" font-size=\"12\" dominant-baseline=\"middle\">").concat(cell, "</text>");
    });
  });
  svgContent += "</svg>";
  return svgContent;
}
function arrayToTable(data) {
  var table = document.createElement("table"); // Create a table element
  table.style.border = "1px solid black"; // Optional: Add a border style
  var _iterator = _createForOfIteratorHelper(data),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      var tableRow = document.createElement("tr"); // Create a new row
      var _iterator2 = _createForOfIteratorHelper(row),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var cell = _step2.value;
          var tableCell = document.createElement("td"); // Create a new cell
          // Convert each cell to a string representation
          var cellContent = typeof cell === "boolean" ? cell ? "True" : "False" : cell instanceof HTMLElement ? cell.outerHTML : String(cell);
          tableCell.innerHTML = cellContent; // Set the cell content
          tableRow.appendChild(tableCell); // Add the cell to the row
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      table.appendChild(tableRow); // Add the row to the table
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return table; // Return the table element
}
function generateHtmlList(inputs) {
  var ul = document.createElement("ul");
  inputs.forEach(function (input) {
    if (typeof input === "string") {
      // If input is a string, create a list with that string as an item
      var li = document.createElement("li");
      li.textContent = input; // Set the text content of the <li>
      ul.appendChild(li); // Append the <li> to the <ul>
    } else if (typeof input === "number") {
      // If input is a number, create a list item for that number
      var _li = document.createElement("li");
      _li.textContent = "Item ".concat(input); // Set the text content of the <li>
      ul.appendChild(_li); // Append the <li> to the <ul>
    } else if (input instanceof HTMLElement) {
      // If input is an HTMLElement, create a list item with its outerHTML
      var _li2 = document.createElement("li");
      _li2.innerHTML = input.outerHTML; // Set the inner HTML of the <li> to the HTMLElement's outerHTML
      ul.appendChild(_li2); // Append the <li> to the <ul>
    } else {
      throw new Error("Invalid input type. Expected a number, a string, or an HTMLElement.");
    }
  });
  return ul; // Return the created <ul> element
}
function createTable(data) {
  var table = document.createElement("table");
  table.border = "1"; // Optional: Add border to the table
  data.forEach(function (rowData) {
    var row = document.createElement("tr");
    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  return table;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app_sudoku": 0,
/******/ 			"css/style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkavnlearn_puzzle"] = self["webpackChunkavnlearn_puzzle"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./src/app_sudoku.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./src/css/style.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;