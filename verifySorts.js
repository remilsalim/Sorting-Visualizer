import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort, countingSort } from './src/algorithms/sortingAlgorithms.js';

const testSort = (name, sortFn) => {
    const input = [5, 3, 8, 1, 2, 7, 4, 6];
    const expected = [...input].sort((a, b) => a - b);
    const steps = sortFn(input);
    const result = steps[steps.length - 1].array || steps[steps.findLastIndex(s => s.array)].array;

    const isCorrect = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`${name}: ${isCorrect ? 'PASSED' : 'FAILED'}`);
    if (!isCorrect) {
        console.log(`  Input: ${input}`);
        console.log(`  Expected: ${expected}`);
        console.log(`  Got: ${result}`);
    }
};

console.log('Verifying Sorting Algorithms...');
testSort('Bubble Sort', bubbleSort);
testSort('Selection Sort', selectionSort);
testSort('Insertion Sort', insertionSort);
testSort('Merge Sort', mergeSort);
testSort('Quick Sort', quickSort);
testSort('Heap Sort', heapSort);
testSort('Counting Sort', countingSort);
