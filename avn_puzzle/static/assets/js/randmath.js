function design_printable(fatch_data, data, element) {
  console.log(data);
  const title = data["title"] || "url";
  const name_tag = data["name_tag"] || "Name :";
  const header_added_option = data["header_added_option"];
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < fatch_data.length; i++) {
    const page_design = document.createElement("div");
    page_design.classList.add("page-a7");

    // Create header
    const header = document.createElement("div");
    header.classList.add("header");
    const shouldAddHeader =
      (i % 2 === 0 && header_added_option === "even") ||
      (i % 2 !== 0 && header_added_option === "odd") ||
      header_added_option === "all" ||
      !header_added_option;

    if (shouldAddHeader) {
      header.innerHTML = `
        <h2>${title}</h2>
        <span class="name-tag">${name_tag}</span>`;
      page_design.appendChild(header);
    }

    // Create ordered list for questions
    const question_ol = document.createElement("ol");
    if (fatch_data[i].length) {
      for (let j = 0; j < fatch_data[i].length; j++) {
        const question_li = document.createElement("li");
        const question = katex.renderToString(fatch_data[i][j][0], {
          throwOnError: false,
        });
        const answer = fatch_data[i][j][1]
          ? katex.renderToString(fatch_data[i][j][1], { throwOnError: false })
          : "None";

        question_li.innerHTML = `
          <span class="question">${question}</span>
          <span class="equal">=</span>
          <span class="ans">${answer}</span>`;
        question_ol.appendChild(question_li);
      }
      page_design.appendChild(question_ol);
    }

    fragment.appendChild(page_design);
  }

  element.appendChild(fragment);
}

async function RandMath_SubmitForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const submitButton = event.target.querySelector('input[type="submit"]');

  // Ensure the submit button exists before proceeding
  if (submitButton) {
    console.log("Button found, disabling...");
    submitButton.disabled = true;
    document.body.style.cursor = "wait";
  } else {
    console.error("Submit button not found.");
    return; // Exit if the button is not found
  }

  try {
    const response = await fetch("/randmath", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Parse the response and update the container
    const randmath_data = await response.json();
    const container_div = document.getElementById("container");

    if (container_div) {
      container_div.innerHTML = "";
      design_printable(randmath_data, data, container_div);
    } else {
      console.error("Error: Container element not found.");
    }
  } catch (error) {
    // Log errors for debugging
    console.error("Error:", error);
  } finally {
    // Reset the state after processing
    if (submitButton) {
      submitButton.disabled = false;
      console.log("Button enabled again.");
    }
    document.body.style.cursor = "default";
  }
}
