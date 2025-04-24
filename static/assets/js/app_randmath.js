/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*****************************!*\
  !*** ./src/app_randmath.ts ***!
  \*****************************/


var operation_option = document.getElementById("operation");
var randmath_level = document.getElementById("level");
var is_operation_option = false;
operation_option.addEventListener("change", function (event) {
  if (operation_option.value === "<<" && !is_operation_option) {
    randmath_level.options.item(1);
    randmath_level.options.remove(0);
    is_operation_option = true;
  } else if (operation_option.value !== "<<" && is_operation_option) {
    var option_0 = document.createElement("option");
    option_0.textContent = "0";
    if (randmath_level.options.item(0) !== option_0) {
      randmath_level.options.add(option_0, randmath_level.options.item(0));
    }
    is_operation_option = false;
  }
});
var randmath_name_of_number = document.getElementById("name_of_number");
operation_option.addEventListener("change", function (event) {
  switch (randmath_name_of_number.value) {
    case "":
      break;
    default:
      break;
  }
});
/******/ })()
;