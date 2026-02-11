import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import ArrayDisplay from './components/ArrayDisplay';
import ComparisonView from './components/ComparisonView';
import useSortingVisualizer from './hooks/useSortingVisualizer';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'comparison'
  const [algCompare1, setAlgCompare1] = useState('bubble');
  const [algCompare2, setAlgCompare2] = useState('quick');

  const visualizer = useSortingVisualizer();

  const handleModeToggle = () => {
    visualizer.reset();
    setViewMode(prev => prev === 'single' ? 'comparison' : 'single');
  };

  return (
    <div className="app-container">
      <ControlPanel
        {...visualizer}
        generateNewArray={visualizer.reset}
      />

      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h2>{viewMode === 'single' ? 'Standard Visualization' : 'Comparison Mode'}</h2>
          </div>
          <div className="header-right">
            {viewMode === 'comparison' && (
              <div className="comparison-selectors">
                <select value={algCompare1} onChange={(e) => setAlgCompare1(e.target.value)} disabled={visualizer.isSorting}>
                  <option value="bubble">Bubble</option>
                  <option value="selection">Selection</option>
                  <option value="insertion">Insertion</option>
                  <option value="merge">Merge</option>
                  <option value="quick">Quick</option>
                  <option value="heap">Heap</option>
                  <option value="counting">Counting</option>
                </select>
                <span>vs</span>
                <select value={algCompare2} onChange={(e) => setAlgCompare2(e.target.value)} disabled={visualizer.isSorting}>
                  <option value="bubble">Bubble</option>
                  <option value="selection">Selection</option>
                  <option value="insertion">Insertion</option>
                  <option value="merge">Merge</option>
                  <option value="quick">Quick</option>
                  <option value="heap">Heap</option>
                  <option value="counting">Counting</option>
                </select>
              </div>
            )}
            <button className="btn-mode-toggle" onClick={handleModeToggle}>
              {viewMode === 'single' ? 'Switch to Comparison' : 'Switch to Single'}
            </button>
          </div>
        </header>

        <section className="visualization-area">
          {viewMode === 'single' ? (
            <ArrayDisplay
              array={visualizer.array}
              activeIndices={visualizer.activeIndices}
              sortedIndices={visualizer.sortedIndices}
              pivotIndices={visualizer.pivotIndices}
            />
          ) : (
            <ComparisonView
              initialArray={visualizer.array}
              size={visualizer.size}
              speed={visualizer.speed}
              alg1={algCompare1}
              alg2={algCompare2}
              isGlobalSorting={visualizer.isSorting}
              onStop={() => visualizer.reset()}
            />
          )}
        </section>

        <footer className="main-footer">
          <div className="legend">
            <div className="legend-item"><span className="square active"></span> Comparison/Swap</div>
            <div className="legend-item"><span className="square pivot"></span> Pivot</div>
            <div className="legend-item"><span className="square sorted"></span> Sorted</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
