/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/sudoku.ts":
/*!**************************!*\
  !*** ./src/js/sudoku.ts ***!
  \**************************/
/***/ (() => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SudokuGenerator = /*#__PURE__*/function () {
  function SudokuGenerator(size) {
    _classCallCheck(this, SudokuGenerator);
    this.size = size;
    this.grid = Array.from({
      length: size
    }, function () {
      return Array(size).fill(0);
    });
    this.subgridSize = Math.sqrt(size);
  }
  return _createClass(SudokuGenerator, [{
    key: "getMatrix",
    value: function getMatrix() {
      return this.grid;
    }
  }, {
    key: "isSafe",
    value: function isSafe(row, col, num) {
      // Check if the number is not in the current row and column
      for (var x = 0; x < this.size; x++) {
        if (this.grid[row][x] === num || this.grid[x][col] === num) {
          return false;
        }
      }
      // Check the subgrid
      var startRow = row - row % this.subgridSize;
      var startCol = col - col % this.subgridSize;
      for (var i = 0; i < this.subgridSize; i++) {
        for (var j = 0; j < this.subgridSize; j++) {
          if (this.grid[i + startRow][j + startCol] === num) {
            return false;
          }
        }
      }
      return true;
    }
  }, {
    key: "solve",
    value: function solve() {
      var empty = this.findEmptyLocation();
      if (!empty) {
        return true; // Puzzle solved
      }
      var _empty = _slicedToArray(empty, 2),
        row = _empty[0],
        col = _empty[1];
      for (var num = 1; num <= this.size; num++) {
        if (this.isSafe(row, col, num)) {
          this.grid[row][col] = num;
          if (this.solve()) {
            return true;
          }
          this.grid[row][col] = 0; // Backtrack
        }
      }
      return false;
    }
  }, {
    key: "findEmptyLocation",
    value: function findEmptyLocation() {
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          if (this.grid[i][j] === 0) {
            return [i, j];
          }
        }
      }
      return null;
    }
  }, {
    key: "fillGrid",
    value: function fillGrid() {
      this.solve();
    }
  }, {
    key: "removeNumbers",
    value: function removeNumbers(level) {
      var numToRemove;
      switch (level) {
        case 'easy':
          numToRemove = 4; // Adjust for 4x4
          break;
        case 'medium':
          numToRemove = 6; // Adjust for 4x4
          break;
        case 'hard':
          numToRemove = 8; // Adjust for 4x4
          break;
        default:
          throw new Error("Level must be 'easy', 'medium', or 'hard'.");
      }
      if (this.size === 9) {
        switch (level) {
          case 'easy':
            numToRemove = 40;
            break;
          case 'medium':
            numToRemove = 50;
            break;
          case 'hard':
            numToRemove = 60;
            break;
        }
      }
      var count = numToRemove;
      while (count > 0) {
        var i = Math.floor(Math.random() * this.size);
        var j = Math.floor(Math.random() * this.size);
        if (this.grid[i][j] !== 0) {
          this.grid[i][j] = 0;
          count--;
        }
      }
    }
  }, {
    key: "generateSudoku",
    value: function generateSudoku(level) {
      this.fillGrid();
      this.removeNumbers(level);
    }
  }]);
}();
function sudokuTable(data, parentElement) {
  // Validate the input data
  if (!Array.isArray(data) || !data.every(Array.isArray)) {
    throw new Error("Invalid data format. Expected an array of arrays.");
  }
  var table = document.createElement("table");
  table.classList.add("border-collapse", "border", "border-gray-800", "m-4"); // Tailwind classes for table styling
  data.forEach(function (rowData, rowIndex) {
    var row = document.createElement("tr");
    rowData.forEach(function (cellData, colIndex) {
      var cell = document.createElement("td");
      cell.textContent = cellData !== null && cellData !== undefined ? String(cellData) : ""; // Handle null/undefined
      cell.classList.add("border", "border-gray-300", "w-12", "h-12", "text-center", "text-lg", "font-bold"); // Tailwind classes for cell styling
      // Add thicker borders for the 3x3 blocks
      if (rowIndex % 3 === 0 && colIndex % 3 === 0) {
        cell.classList.add("border-2", "border-gray-800");
      }
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  // Append the table to the specified parent element
  parentElement.appendChild(table);
  return table;
}
var container = document.getElementById("container");
var generator_btn = document.getElementById("sudoku-generator");
generator_btn === null || generator_btn === void 0 ? void 0 : generator_btn.addEventListener('click', function () {
  var sudoku_generator_options = document.getElementById('sudoku_generator_options');
  var index = sudoku_generator_options === null || sudoku_generator_options === void 0 ? void 0 : sudoku_generator_options.options.selectedIndex;
  var size = Number(sudoku_generator_options === null || sudoku_generator_options === void 0 ? void 0 : sudoku_generator_options.options[index].value);
  var sudoku_generator_level = document.getElementById('sudoku_generator_level');
  var level_index = sudoku_generator_level === null || sudoku_generator_level === void 0 ? void 0 : sudoku_generator_level.options.selectedIndex;
  var level = sudoku_generator_level === null || sudoku_generator_level === void 0 ? void 0 : sudoku_generator_level.options[level_index].value;
  console.log(size, level);
  var sudokuGen = new SudokuGenerator(size);
  sudokuGen.generateSudoku(level);
  container.innerHTML = '';
  sudokuTable(sudokuGen.getMatrix(), container);
});

/***/ }),

/***/ "./src/js/wordsearch.ts":
/*!******************************!*\
  !*** ./src/js/wordsearch.ts ***!
  \******************************/
/***/ (() => {



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WordSearchGenerator = /*#__PURE__*/function () {
  function WordSearchGenerator(size) {
    _classCallCheck(this, WordSearchGenerator);
    this.wordPositions = {};
    this.size = size;
    this.grid = this.createEmptyGrid();
  }
  return _createClass(WordSearchGenerator, [{
    key: "createEmptyGrid",
    value: function createEmptyGrid() {
      var grid = [];
      for (var i = 0; i < this.size; i++) {
        var row = [];
        for (var j = 0; j < this.size; j++) {
          row.push('');
        }
        grid.push(row);
      }
      return grid;
    }
  }, {
    key: "addWord",
    value: function addWord(word) {
      var directions = [{
        x: 0,
        y: 1
      },
      // Horizontal right
      {
        x: 0,
        y: -1
      },
      // Horizontal left
      {
        x: 1,
        y: 0
      },
      // Vertical down
      {
        x: -1,
        y: 0
      },
      // Vertical up
      {
        x: 1,
        y: 1
      },
      // Diagonal down-right
      {
        x: -1,
        y: -1
      },
      // Diagonal up-left
      {
        x: 1,
        y: -1
      },
      // Diagonal down-left
      {
        x: -1,
        y: 1
      } // Diagonal up-right
      ];
      for (var attempt = 0; attempt < 500000; attempt++) {
        var direction = directions[Math.floor(Math.random() * directions.length)];
        var startX = Math.floor(Math.random() * this.size);
        var startY = Math.floor(Math.random() * this.size);
        if (this.canPlaceWord(word, startX, startY, direction)) {
          this.placeWord(word, startX, startY, direction);
          this.wordPositions[word] = {
            startX: startX,
            startY: startY,
            direction: direction
          }; // Store the position of the word
          return true;
        }
      }
      return false; // Failed to place the word
    }
  }, {
    key: "canPlaceWord",
    value: function canPlaceWord(word, startX, startY, direction) {
      var x = startX;
      var y = startY;
      var _iterator = _createForOfIteratorHelper(word),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _char = _step.value;
          if (x < 0 || x >= this.size || y < 0 || y >= this.size || this.grid[y][x] !== '' && this.grid[y][x] !== _char) {
            return false;
          }
          x += direction.x;
          y += direction.y;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return true;
    }
  }, {
    key: "placeWord",
    value: function placeWord(word, startX, startY, direction) {
      var x = startX;
      var y = startY;
      var _iterator2 = _createForOfIteratorHelper(word),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _char2 = _step2.value;
          this.grid[y][x] = _char2;
          x += direction.x;
          y += direction.y;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "fillGrid",
    value: function fillGrid() {
      var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var y = 0; y < this.size; y++) {
        for (var x = 0; x < this.size; x++) {
          if (this.grid[y][x] === '') {
            this.grid[y][x] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          }
        }
      }
    }
  }, {
    key: "printGrid",
    value: function printGrid() {
      console.log('Word Search Grid:');
      console.log('-----------------');
      this.grid.forEach(function (row) {
        return console.log(row.join(' '));
      });
      console.log('-----------------');
    }
  }, {
    key: "printWordList",
    value: function printWordList(words) {
      console.log('Words to Find:');
      console.log('--------------');
      words.forEach(function (word) {
        return console.log(word);
      });
      console.log('--------------');
    }
  }, {
    key: "printSolution",
    value: function printSolution() {
      console.log('Solution:');
      console.log('---------');
      for (var word in this.wordPositions) {
        var _this$wordPositions$w = this.wordPositions[word],
          startX = _this$wordPositions$w.startX,
          startY = _this$wordPositions$w.startY,
          direction = _this$wordPositions$w.direction;
        console.log("Word: ".concat(word, ", Start: (").concat(startX, ", ").concat(startY, "), Direction: (").concat(direction.x, ", ").concat(direction.y, ")"));
      }
      console.log('---------');
    }
  }, {
    key: "getMatrix",
    value: function getMatrix() {
      return this.grid;
    }
  }]);
}();
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
  var tableHTML = '<table border="1">'; // Start the table with a border
  var _iterator3 = _createForOfIteratorHelper(data),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var row = _step3.value;
      tableHTML += '<tr>'; // Start a new row
      var _iterator4 = _createForOfIteratorHelper(row),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var cell = _step4.value;
          tableHTML += "<td>".concat(cell, "</td>"); // Add each cell to the row
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      tableHTML += '</tr>'; // End the row
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  tableHTML += '</table>'; // End the table
  return tableHTML;
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/******/ 			"/public/js/puzzle": 0,
/******/ 			"public/css/style": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkavnlearn_wordsearch"] = self["webpackChunkavnlearn_wordsearch"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/style"], () => (__webpack_require__("./src/js/wordsearch.ts")))
/******/ 	__webpack_require__.O(undefined, ["public/css/style"], () => (__webpack_require__("./src/js/sudoku.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/style"], () => (__webpack_require__("./src/css/style.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;