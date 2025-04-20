/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app_wordsearch.ts":
/*!*******************************!*\
  !*** ./src/app_wordsearch.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var wordlist_json_1 = __importDefault(__webpack_require__(/*! ./ts/dictionary/wordlist.json */ "./src/ts/dictionary/wordlist.json"));
var randunit_1 = __webpack_require__(/*! ./ts/randunit */ "./src/ts/randunit.ts");
var random_1 = __webpack_require__(/*! ./ts/utils/random */ "./src/ts/utils/random.ts");
var wordsearch_1 = __webpack_require__(/*! ./ts/wordsearch */ "./src/ts/wordsearch.ts");
var container = document.getElementById("container");
var generatorBtn = document.getElementById("wordsearch-generator");
var showAnswer = document.getElementById("wordsearch-show_ans");
// Helper function to toggle cell colors
function toggleCellColors(cells, isToggled, originalColors) {
  cells.forEach(function (cell, index) {
    var htmlCell = cell;
    if (isToggled) {
      htmlCell.style.color = "#ffffff"; // Show answer text in white
      htmlCell.style.backgroundColor = htmlCell.getAttribute("data-color") || "#000000"; // Set background to data-color
    } else {
      htmlCell.style.color = "#000000"; // Reset text to black
      htmlCell.style.backgroundColor = originalColors[index]; // Reset to original color
    }
  });
}
// Attach showAnswer functionality dynamically
function attachShowAnswer() {
  var cells = document.querySelectorAll(".cell");
  var originalColors = Array.from(cells).map(function (cell) {
    return cell.style.backgroundColor || "";
  });
  var isToggled = false;
  showAnswer === null || showAnswer === void 0 ? void 0 : showAnswer.addEventListener("click", function () {
    isToggled = !isToggled;
    toggleCellColors(cells, isToggled, originalColors);
  });
}
function words_types() {
  var words_type = document.getElementById("wordsearch-generator_types").value;
  switch (words_type) {
    case "english":
      return [(0, random_1.sample)(wordlist_json_1["default"], 20), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
    // break;
    case "number":
      return [(0, randunit_1.RandomStringNumberListByDigit)(20), "0123456789".split("")];
    default:
      return [(0, random_1.sample)(wordlist_json_1["default"], 20), "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
  }
}
// Event listener for generating word searches
generatorBtn === null || generatorBtn === void 0 ? void 0 : generatorBtn.addEventListener("click", function () {
  container.innerHTML = ""; // Clear the container
  generatorBtn.disabled = true;
  var words = words_types();
  var gridSize = 15;
  container.innerHTML = "Wait"; // Clear the container
  container.innerHTML = ""; // Clear the container
  Array.from({
    length: 64
  }).forEach(function (_, i) {
    var wordSearch = new wordsearch_1.WordSearchGenerator(gridSize, true);
    wordSearch.addWords(words[0], words[1]);
    var wordsearchContainer = document.createElement("div");
    wordsearchContainer.classList.add("wordsearch_pg");
    var header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = "\n      <span class=\"title\">\u0906\u0927\u0941\u0928\u093F\u0915 \u0935\u093F\u0926\u094D\u092F\u093E \u0928\u093F\u0915\u0947\u0924\u0928 \u091F\u094D\u092F\u0942\u0936\u0928 \u0938\u0947\u0902\u091F\u0930</span>\n      <span class=\"page_no\">".concat(i + 1, "</span>\n    ");
    wordsearchContainer.appendChild(header);
    container.appendChild(wordSearch.html(wordsearchContainer));
  });
  generatorBtn.disabled = false;
  // Reattach showAnswer functionality after new cells are added
  attachShowAnswer();
});
// const container = document.getElementById("container") as HTMLElement;
// const wordsearch_form = document.getElementById("sudoku-form") as HTMLFormElement;
// const wordsearch_answer = document.getElementById("show-answer") as HTMLButtonElement;

/***/ }),

/***/ "./src/ts/dictionary/wordlist.json":
/*!*****************************************!*\
  !*** ./src/ts/dictionary/wordlist.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('["ability","able","about","above","accept","according","account","across","act","action","activity","actually","add","address","administration","admit","adult","affect","after","again","against","age","agency","agent","ago","agree","agreement","ahead","air","all","allow","almost","alone","along","already","also","although","always","American","among","amount","analysis","and","animal","another","answer","any","anyone","anything","appear","apply","approach","area","argue","arm","around","arrive","art","article","artist","ask","assume","attack","attention","attorney","audience","author","authority","available","avoid","away","baby","back","bad","bag","ball","bank","bar","base","beat","beautiful","because","become","bed","before","begin","behavior","behind","believe","benefit","best","better","between","beyond","big","bill","billion","bit","black","blood","blue","board","body","book","born","both","box","boy","break","bring","brother","budget","build","building","business","but","buy","call","camera","campaign","can","cancer","candidate","capital","car","card","care","career","carry","case","catch","cause","cell","center","central","century","certain","certainly","chair","challenge","chance","change","character","charge","check","child","choice","choose","church","citizen","city","civil","claim","class","clear","clearly","close","coach","cold","collection","college","color","come","commercial","common","community","company","compare","computer","concern","condition","conference","Congress","consider","consumer","contain","continue","control","cost","could","country","couple","course","court","cover","create","crime","cultural","culture","cup","current","customer","cut","dark","data","daughter","day","dead","deal","death","debate","decade","decide","decision","deep","defense","degree","Democrat","democratic","describe","design","despite","detail","determine","develop","development","die","difference","different","difficult","dinner","direction","director","discover","discuss","discussion","disease","doctor","dog","door","down","draw","dream","drive","drop","drug","during","each","early","east","easy","eat","economic","economy","edge","education","effect","effort","eight","either","election","else","employee","end","energy","enjoy","enough","enter","entire","environment","environmental","especially","establish","even","evening","event","ever","every","everybody","everyone","everything","evidence","exactly","example","executive","exist","expect","experience","expert","explain","face","fact","factor","fail","fall","family","far","fast","father","fear","federal","feel","feeling","few","field","fight","figure","fill","film","final","finally","financial","find","fine","finger","finish","fire","firm","first","fish","five","floor","fly","focus","follow","food","foot","for","force","foreign","forget","form","former","forward","four","free","friend","from","front","full","fund","future","game","garden","gas","general","generation","get","girl","give","glass","goal","good","government","great","green","ground","group","grow","growth","guess","gun","guy","hair","half","hand","hang","happen","happy","hard","have","head","health","hear","heart","heat","heavy","help","her","here","herself","high","him","himself","his","history","hit","hold","home","hope","hospital","hot","hotel","hour","house","how","however","huge","human","hundred","husband","idea","identify","image","imagine","impact","important","improve","include","including","increase","indeed","indicate","individual","industry","information","inside","instead","institution","interest","interesting","international","interview","into","investment","involve","issue","item","its","itself","job","join","just","keep","key","kid","kill","kind","kitchen","know","knowledge","land","language","large","last","late","later","laugh","law","lawyer","lay","lead","leader","learn","least","leave","left","leg","legal","less","let","letter","lie","life","light","like","likely","line","list","listen","little","live","local","long","look","lose","loss","lot","love","low","machine","magazine","main","maintain","major","majority","make","man","manage","management","manager","many","market","marriage","material","matter","may","maybe","mean","measure","media","medical","meet","meeting","member","memory","mention","message","method","middle","might","military","million","mind","minute","miss","mission","model","modern","moment","money","month","more","morning","most","mother","mouth","move","movement","movie","Mrs","much","music","must","myself","name","nation","national","natural","nature","near","nearly","necessary","need","network","never","new","news","newspaper","next","nice","night","none","nor","north","not","note","nothing","notice","now","n\'t","number","occur","off","offer","office","officer","official","often","oil","old","once","one","only","onto","open","operation","opportunity","option","order","organization","other","others","our","out","outside","over","own","owner","page","pain","painting","paper","parent","part","participant","particular","particularly","partner","party","pass","past","patient","pattern","pay","peace","people","per","perform","performance","perhaps","period","person","personal","phone","physical","pick","picture","piece","place","plan","plant","play","player","point","police","policy","political","politics","poor","popular","population","position","positive","possible","power","practice","prepare","present","president","pressure","pretty","prevent","price","private","probably","problem","process","produce","product","production","professional","professor","program","project","property","protect","prove","provide","public","pull","purpose","push","put","quality","question","quickly","quite","race","radio","raise","range","rate","rather","reach","read","ready","real","reality","realize","really","reason","receive","recent","recently","recognize","record","red","reduce","reflect","region","relate","relationship","religious","remain","remember","remove","report","represent","Republican","require","research","resource","respond","response","responsibility","rest","result","return","reveal","rich","right","rise","risk","road","rock","role","room","rule","run","safe","same","save","say","scene","school","science","scientist","score","sea","season","seat","second","section","security","see","seek","seem","sell","send","senior","sense","series","serious","serve","service","set","seven","several","sex","sexual","shake","share","she","shoot","short","shot","should","shoulder","show","side","sign","significant","similar","simple","simply","since","sing","single","sister","sit","site","situation","six","size","skill","skin","small","smile","social","society","soldier","some","somebody","someone","something","sometimes","son","song","soon","sort","sound","source","south","southern","space","speak","special","specific","speech","spend","sport","spring","staff","stage","stand","standard","star","start","state","statement","station","stay","step","still","stock","stop","store","story","strategy","street","strong","structure","student","study","stuff","style","subject","success","successful","such","suddenly","suffer","suggest","summer","support","sure","surface","system","table","take","talk","task","tax","teach","teacher","team","technology","television","tell","ten","tend","term","test","than","thank","that","the","their","them","themselves","then","theory","there","these","they","thing","think","third","this","those","though","thought","thousand","threat","three","through","throughout","throw","thus","time","today","together","tonight","too","top","total","tough","toward","town","trade","traditional","training","travel","treat","treatment","tree","trial","trip","trouble","true","truth","try","turn","two","type","under","understand","unit","until","upon","use","usually","value","various","very","victim","view","violence","visit","voice","vote","wait","walk","wall","want","war","watch","water","way","weapon","wear","week","weight","well","west","western","what","whatever","when","where","whether","which","while","white","who","whole","whom","whose","why","wide","wife","will","win","wind","window","wish","with","within","without","woman","wonder","word","work","worker","world","worry","would","write","writer","wrong","yard","yeah","year","yes","yet","you","young","your","yourself"]');

/***/ }),

/***/ "./src/ts/randunit.ts":
/*!****************************!*\
  !*** ./src/ts/randunit.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RandomStringNumberListByDigit = exports.generateRandomStringNumberByDigits = void 0;
exports.generateRandomDigits = generateRandomDigits;
function generateRandomDigits(digits) {
  if (digits <= 0 || !Number.isInteger(digits)) {
    throw new Error("The number of digits must be a positive integer.");
  }
  // Directly calculate the range without using intermediate variables
  return Math.floor(Math.random() * (Math.pow(10, digits) - Math.pow(10, digits - 1))) + Math.pow(10, digits - 1);
}
var generateRandomStringNumberByDigits = function generateRandomStringNumberByDigits(digits) {
  return Array.from({
    length: digits
  }, function () {
    return Math.floor(Math.random() * 10);
  }).join("");
};
exports.generateRandomStringNumberByDigits = generateRandomStringNumberByDigits;
var RandomStringNumberListByDigit = function RandomStringNumberListByDigit(count) {
  var digitList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [7, 8];
  return Array.from({
    length: count
  }, function () {
    return (0, exports.generateRandomStringNumberByDigits)(digitList[Math.floor(Math.random() * digitList.length)]);
  });
};
exports.RandomStringNumberListByDigit = RandomStringNumberListByDigit;
// Example usage
// console.log(generateRandomStringNumberListByDigit(10));

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

/***/ }),

/***/ "./src/ts/wordsearch.ts":
/*!******************************!*\
  !*** ./src/ts/wordsearch.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



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
exports.WordSearchGenerator = void 0;
// import * as wordlist from "./dictionary/wordlist.json";
var utils_1 = __webpack_require__(/*! ./utils/utils */ "./src/ts/utils/utils.ts");
var random_1 = __webpack_require__(/*! ./utils/random */ "./src/ts/utils/random.ts");
var WordSearchGenerator = /*#__PURE__*/function () {
  function WordSearchGenerator(size) {
    var html_format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    _classCallCheck(this, WordSearchGenerator);
    this.wordslist = [];
    this.color_array = [];
    this.fill_alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.wordPositions = {};
    this.maxAttempts = 50000;
    this.size = size;
    this.html_format = html_format;
    this.maxAttempts = Math.max(1000, this.size * this.size * 1000);
    this.grid = this.createEmptyGrid();
  }
  return _createClass(WordSearchGenerator, [{
    key: "createEmptyGrid",
    value: function createEmptyGrid() {
      var grid = [];
      for (var i = 0; i < this.size; i++) {
        var row = [];
        for (var j = 0; j < this.size; j++) {
          row.push("");
        }
        grid.push(row);
      }
      return grid;
    }
  }, {
    key: "addWords",
    value: function addWords(words, _filldata) {
      var _this = this;
      this.fill_alphabet = _filldata || this.fill_alphabet;
      words = (0, random_1.shuffle)(words);
      words.forEach(function (word) {
        word = word.toUpperCase();
        if (!_this.addWord(word)) {
          console.log("Failed to add word: ".concat(word, " - ").concat(word.length));
        }
      });
    }
  }, {
    key: "addWord",
    value: function addWord(word) {
      var directions = [{
        x: 0,
        y: 1
      },
      // Horizontal right (→)
      {
        x: 0,
        y: -1
      },
      // Horizontal left (←)
      {
        x: 1,
        y: 0
      },
      // Vertical down (↓)
      {
        x: -1,
        y: 0
      },
      // Vertical up (↑)
      {
        x: 1,
        y: 1
      },
      // Diagonal down-right (↘)
      {
        x: -1,
        y: -1
      },
      // Diagonal up-left (↖)
      {
        x: 1,
        y: -1
      },
      // Diagonal down-left (↙)
      {
        x: -1,
        y: 1
      } // Diagonal up-right (↗)
      ];
      for (var attempt = 0; attempt < this.maxAttempts; attempt++) {
        var direction = directions[Math.floor(Math.random() * directions.length)];
        var startX = Math.floor(Math.random() * this.size);
        var startY = Math.floor(Math.random() * this.size);
        if (this.canPlaceWord(word, startX, startY, direction)) {
          if (this.html_format) {
            var rand_color = (0, random_1.randColor)("hex", this.color_array);
            this.color_array.push(rand_color);
            var word_span = document.createElement("span");
            word_span.textContent = (0, utils_1.join)(word);
            var color = "#fffff";
            if (this.color_array.length > 0) {
              color = this.color_array.at(-1);
              word_span.classList.add("cell");
              word_span.setAttribute("data-color", color);
            }
            this.wordslist.push(word_span);
            word = (0, utils_1.wrapStringInSpans)(word, color);
          } else {
            this.wordslist.push(word);
          }
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
          if (x < 0 || x >= this.size || y < 0 || y >= this.size || this.grid[y][x] !== "" && this.grid[y][x] !== _char) {
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
      for (var y = 0; y < this.size; y++) {
        for (var x = 0; x < this.size; x++) {
          if (this.grid[y][x] === "") {
            this.grid[y][x] = (0, random_1.choice)(this.fill_alphabet);
          }
        }
      }
    }
  }, {
    key: "html",
    value: function html(container) {
      this.fillGrid();
      var wordlist_ul = (0, utils_1.generateHtmlList)(this.wordslist);
      wordlist_ul.classList.add("wordlist");
      // this.printWordList(this.wordslist);
      var grid_table = (0, utils_1.arrayToTable)(this.grid);
      grid_table.classList.add("wordsearch_table");
      container.appendChild(grid_table);
      container.appendChild(wordlist_ul);
      return container;
    }
  }, {
    key: "get_wordlist",
    value: function get_wordlist() {
      return this.wordslist;
    }
  }, {
    key: "printSolution",
    value: function printSolution() {
      console.log("Solution:");
      console.log("---------");
      for (var word in this.wordPositions) {
        var _this$wordPositions$w = this.wordPositions[word],
          startX = _this$wordPositions$w.startX,
          startY = _this$wordPositions$w.startY,
          direction = _this$wordPositions$w.direction;
        console.log("Word: ".concat(word, ", Start: (").concat(startX, ", ").concat(startY, "), Direction: (").concat(direction.x, ", ").concat(direction.y, ")"));
      }
      console.log("---------");
    }
  }, {
    key: "getMatrix",
    value: function getMatrix() {
      return this.grid;
    }
  }]);
}();
exports.WordSearchGenerator = WordSearchGenerator;

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app_wordsearch.ts");
/******/ 	
/******/ })()
;