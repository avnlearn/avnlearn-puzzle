// Define an interface for the form data
export interface FormDataObject {
    [key: string]: string | number | boolean; // Removed redundant 'Number' type
}

/**
 * Collects form data from the given HTMLFormElement.
 * @param form - The form element to collect data from.
 * @returns An object containing the form data.
 */
export function collectFormData(form: HTMLFormElement): FormDataObject {
    const data: FormDataObject = {};

    new FormData(form).forEach((value, key) => {
        const stringValue = value.toString();
        const inputElement = form.elements.namedItem(key) as HTMLInputElement;

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
        const parsedValue = parseInt(stringValue, 10);
        if (!isNaN(parsedValue)) {
            data[key] = parsedValue; // Store as number
        } else {
            data[key] = stringValue; // Store as string
        }
    });

    return data; // Return the collected data
}
