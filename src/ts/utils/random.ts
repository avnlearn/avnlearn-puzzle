export function randrange(
  start: number,
  stop?: number,
  step: number = 1
): number {
  if (stop === undefined) {
    [start, stop] = [0, start]; // Swap if only one argument is provided
  }

  if (start >= stop || step <= 0) {
    throw new Error("Invalid range or step.");
  }

  const range = Math.floor((stop - start) / step);
  if (range <= 0) {
    throw new Error("Invalid range with the given step.");
  }

  return start + Math.floor(Math.random() * range) * step; // Return the random number
}

// Function to shuffle an array using the Fisher-Yates algorithm
export function shuffle<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError("Expected an array to shuffle.");
  }

  const shuffled = [...array]; // Create a copy of the array to avoid modifying the original
  const n = shuffled.length;

  // If the array is empty or has one element, return it as is
  if (n <= 1) {
    return shuffled;
  }

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get a random index from 0 to i
    // Swap elements at indices i and j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled; // Return the shuffled array
}

// Function to sample a specified number of unique random elements from an array
export function sample<T>(array: T[], count: number): T[] {
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
export function choice<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined; // Handle empty array case
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Function to select multiple random elements from an array (with replacement)
export function choices<T>(array: T[], count: number): T[] {
  const selected: T[] = [];
  const maxCount = Math.min(count, array.length); // Ensure we don't exceed the array length

  for (let i = 0; i < maxCount; i++) {
    selected.push(choice(array)!); // Use the choice function
  }

  return selected;
}

export function randColor(
  format: "rgb" | "hex",
  color_array: string[] = [],
  shade: "light" | "dark" = "dark" // New parameter to specify light or dark color
): string {
  const colorSet = new Set(color_array); // Use a Set for O(1) lookups
  let color: string;

  do {
    let red: number, green: number, blue: number;

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
    color =
      format === "hex"
        ? `#${((1 << 24) + (red << 16) + (green << 8) + blue)
            .toString(16)
            .slice(1)}`
        : `rgb(${red}, ${green}, ${blue})`;
  } while (colorSet.has(color)); // Continue until a unique color is found

  return color; // Return the unique color
}

