export const bubbleSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ type: 'compare', indices: [j, j + 1] });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ type: 'swap', indices: [j, j + 1], array: [...arr] });
            }
        }
        steps.push({ type: 'sorted', indices: [n - i - 1] });
    }
    steps.push({ type: 'sorted', indices: [0] });
    return steps;
};

export const selectionSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({ type: 'compare', indices: [minIdx, j] });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({ type: 'swap', indices: [i, minIdx], array: [...arr] });
        }
        steps.push({ type: 'sorted', indices: [i] });
    }
    steps.push({ type: 'sorted', indices: [n - 1] });
    return steps;
};

export const insertionSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        steps.push({ type: 'compare', indices: [j, i] });
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            steps.push({ type: 'overwrite', indices: [j + 1], value: arr[j], array: [...arr] });
            j--;
            if (j >= 0) steps.push({ type: 'compare', indices: [j, i] });
        }
        arr[j + 1] = key;
        steps.push({ type: 'overwrite', indices: [j + 1], value: key, array: [...arr] });
    }
    for (let i = 0; i < n; i++) {
        steps.push({ type: 'sorted', indices: [i] });
    }
    return steps;
};

export const mergeSort = (array) => {
    const steps = [];
    const arr = [...array];

    const merge = (start, mid, end) => {
        let left = arr.slice(start, mid + 1);
        let right = arr.slice(mid + 1, end + 1);
        let i = 0, j = 0, k = start;

        while (i < left.length && j < right.length) {
            steps.push({ type: 'compare', indices: [start + i, mid + 1 + j] });
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                steps.push({ type: 'overwrite', indices: [k], value: left[i], array: [...arr] });
                i++;
            } else {
                arr[k] = right[j];
                steps.push({ type: 'overwrite', indices: [k], value: right[j], array: [...arr] });
                j++;
            }
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            steps.push({ type: 'overwrite', indices: [k], value: left[i], array: [...arr] });
            i++;
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            steps.push({ type: 'overwrite', indices: [k], value: right[j], array: [...arr] });
            j++;
            k++;
        }
    };

    const sort = (start, end) => {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            sort(start, mid);
            sort(mid + 1, end);
            merge(start, mid, end);
        }
    };

    sort(0, arr.length - 1);
    for (let i = 0; i < arr.length; i++) {
        steps.push({ type: 'sorted', indices: [i] });
    }
    return steps;
};

export const quickSort = (array) => {
    const steps = [];
    const arr = [...array];

    const partition = (low, high) => {
        let pivot = arr[high];
        steps.push({ type: 'pivot', indices: [high] });
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({ type: 'compare', indices: [j, high] });
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ type: 'swap', indices: [i, j], array: [...arr] });
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({ type: 'swap', indices: [i + 1, high], array: [...arr] });
        return i + 1;
    };

    const sort = (low, high) => {
        if (low < high) {
            let pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        } else if (low === high) {
            // steps.push({ type: 'sorted', indices: [low] });
        }
    };

    sort(0, arr.length - 1);
    for (let i = 0; i < arr.length; i++) {
        steps.push({ type: 'sorted', indices: [i] });
    }
    return steps;
};

export const heapSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    const heapify = (size, i) => {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < size) {
            steps.push({ type: 'compare', indices: [left, largest] });
            if (arr[left] > arr[largest]) largest = left;
        }

        if (right < size) {
            steps.push({ type: 'compare', indices: [right, largest] });
            if (arr[right] > arr[largest]) largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            steps.push({ type: 'swap', indices: [i, largest], array: [...arr] });
            heapify(size, largest);
        }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push({ type: 'swap', indices: [0, i], array: [...arr] });
        steps.push({ type: 'sorted', indices: [i] });
        heapify(i, 0);
    }
    steps.push({ type: 'sorted', indices: [0] });
    return steps;
};

export const countingSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    if (n === 0) return steps;

    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    for (let i = 0; i < n; i++) {
        count[arr[i]]++;
        steps.push({ type: 'compare', indices: [i] });
    }

    let k = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[k] = i;
            steps.push({ type: 'overwrite', indices: [k], value: i, array: [...arr] });
            count[i]--;
            k++;
        }
    }

    for (let i = 0; i < n; i++) {
        steps.push({ type: 'sorted', indices: [i] });
    }
    return steps;
};
