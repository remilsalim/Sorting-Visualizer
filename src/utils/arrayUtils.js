export const generateRandomArray = (size, min = 5, max = 500) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1) + min));
};

export const ALGORITHM_INFO = {
  bubble: {
    name: "Bubble Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  selection: {
    name: "Selection Sort",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  insertion: {
    name: "Insertion Sort",
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  merge: {
    name: "Merge Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },
  quick: {
    name: "Quick Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
  },
  heap: {
    name: "Heap Sort",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },
  counting: {
    name: "Counting Sort",
    best: "O(n+k)",
    average: "O(n+k)",
    worst: "O(n+k)",
  },
};
