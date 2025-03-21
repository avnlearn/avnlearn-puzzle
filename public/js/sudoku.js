/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!**************************!*\
  !*** ./src/js/sudoku.ts ***!
  \**************************/


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Difficulty;
(function (Difficulty) {
  Difficulty["Easy"] = "easy";
  Difficulty["Medium"] = "medium";
  Difficulty["Hard"] = "hard";
})(Difficulty || (Difficulty = {}));
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
      table.classList.add("sudoku_table-".concat(this.size)); // Tailwind classes for table styling
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
var container = document.getElementById("container");
var generator_btn = document.getElementById("sudoku-generator");
var show_answer = document.getElementById("sudoku-show_ans");
show_answer.addEventListener("click", function () {
  document.querySelectorAll(".invisible").forEach(function (element) {
    element.classList.toggle("visible"); // Toggle the "active" class
  });
});
generator_btn === null || generator_btn === void 0 ? void 0 : generator_btn.addEventListener("click", function () {
  var size = Number(document.getElementById("sudoku-generator_options").value);
  var level = document.getElementById("sudoku-generator_level").value;
  container.innerHTML = ""; // Clear previous Sudoku
  for (var page_no = 1; page_no <= 960; page_no++) {
    // var page_no = 1;
    var sudokuGen = new SudokuGenerator(size);
    sudokuGen.generate(level);
    var sudoku_body = document.createElement("div");
    sudoku_body.classList.add("border-2", "w-[74mm]", 'h-[100mm]', 'px-2', "print:border-0");
    sudoku_body.classList.add("sudoku_template");
    var header = document.createElement("div");
    header.innerHTML = "\n            <p class=\"text-center font-extrabold\">\u0906\u0927\u0941\u0928\u093F\u0915 \u0935\u093F\u0926\u094D\u092F\u093E \u0928\u093F\u0915\u0947\u0924\u0928 \u091F\u094D\u092F\u0942\u0936\u0928 \u0938\u0947\u0902\u091F\u0930</p>\n            <p class=\"font-extrabold py-1\">\u0928\u093E\u092E :</p>\n        ";
    sudoku_body.appendChild(header);
    sudoku_body.appendChild(sudokuGen.html()); // Assuming html() method exists
    var footer = document.createElement("div");
    footer.classList.add("grid", "grid-cols-2", "py-1");
    footer.innerHTML = "\n            <p class=\"pl-4\">".concat(page_no, "</p>\n            <p class=\"text-right\">avnlearn.com</p>\n        ");
    sudoku_body.appendChild(footer);
    container.appendChild(sudoku_body);
  }
});
/******/ })()
;