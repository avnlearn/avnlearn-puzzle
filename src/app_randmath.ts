const operation_option = document.getElementById(
  "operation"
) as HTMLSelectElement;
const randmath_level = document.getElementById("level") as HTMLSelectElement;
let is_operation_option = false;


operation_option.addEventListener("change", (event) => {
  if (operation_option.value === "<<" && !is_operation_option) {
    randmath_level.options.item(1);
    randmath_level.options.remove(0);
    is_operation_option = true;
  } else if (operation_option.value !== "<<" && is_operation_option) {
    const option_0 = document.createElement("option");
    option_0.textContent = "0";
    if (randmath_level.options.item(0) !== option_0) {
      randmath_level.options.add(option_0, randmath_level.options.item(0));
    }
    is_operation_option = false;
  }
});

const randmath_name_of_number = document.getElementById(
  "name_of_number"
) as HTMLSelectElement;
operation_option.addEventListener("change", (event) => {
  switch (randmath_name_of_number.value) {
    case "":
      break;

    default:
      break;
  }
});
