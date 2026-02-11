# Sorting Algorithm Visualizer Pro ❤️

A high-performance, interactive React application that visually demonstrates the internal mechanics of various sorting algorithms. Designed for precision, clarity, and portfolio presentation.

## 🚀 Features

- **7 Core Algorithms**: 
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
  - Counting Sort
- **Comparison Mode**: Run two different algorithms side-by-side on identical datasets to compare efficiency in real-time.
- **Dynamic Controls**: 
  - Adjustable array size (10 to 500 elements) via slider or manual input.
  - Variable animation speed (1% to 100%).
  - Pause, Resume, and Reset functionality.
- **Harmonic Sound Effects**: Integrated Web Audio API to play tones on swaps and comparisons (toggleable).
- **Real-Time Statistics**: Tracks comparisons, swaps, and execution time.
- **Premium UI**: Modern dark theme with glassmorphism, responsive layout, and smooth animations.

## 🛠️ Tech Stack

- **Frontend**: React 19 (Functional Components & Hooks)
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom Grid & Flexbox)
- **Animation**: `requestAnimationFrame` and controlled `setTimeout` via custom hooks.
- **Audio**: Web Audio API

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/remilsalim/sorting-visualizer.git
   ```
2. **Navigate to the directory**:
   ```bash
   cd sorting-visualizer
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🧠 Technical Implementation

- **Algorithm Recording**: Algorithms are implemented as static functions that return a sequence of "animation steps" rather than sorting in-place. This allows for precise control over the visualization timeline and easy pause/resume.
- **Performance Optimization**: 
  - `React.memo` is used extensively for the vertical bars to prevent unnecessary re-renders when only a few elements change.
  - `useSortingVisualizer` custom hook encapsulates all animation logic, keeping the UI components clean and focused.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Made with coffee and love ❤️ by [remilsalim](https://github.com/remilsalim)
