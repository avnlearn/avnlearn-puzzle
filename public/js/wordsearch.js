/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!******************************!*\
  !*** ./src/js/wordsearch.ts ***!
  \******************************/


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
/******/ })()
;