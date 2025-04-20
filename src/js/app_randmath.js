async function RandMath_SubmitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  try {
    const response = await fetch("/randmath", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // console.log(result.length);
    const resultDiv = document.getElementById("container");
    const page = document.createElement();
    if (resultDiv) {
      for (let page_no = 0; page_no < result.length; page_no++) {
        const page = result[page_no];
        for (let q_ = 0; q_ < page.length; q_++) {
          const question = page[q_];
          console.log(question);
        }
      }
      resultDiv.innerHTML = JSON.stringify(result); // Dynamically display the response
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

module.exports = { RandMath_SubmitForm };
