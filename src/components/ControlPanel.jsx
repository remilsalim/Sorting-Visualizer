import React from 'react';
import AlgorithmSelector from './AlgorithmSelector';
import StatsPanel from './StatsPanel';
import '../styles/ControlPanel.css';

const ControlPanel = ({
    isSorting,
    isPaused,
    speed,
    size,
    currentAlgorithm,
    stats,
    isSoundEnabled,
    toggleSound,
    setSpeed,
    setSize,
    startSorting,
    pauseSorting,
    reset,
    changeAlgorithm,
    generateNewArray
}) => {

    return (
        <div className="control-panel">
            <h1>Visualizer Pro</h1>

            <AlgorithmSelector
                currentAlgorithm={currentAlgorithm}
                onAlgorithmChange={changeAlgorithm}
                isDisabled={isSorting}
            />

            <div className="control-group">
                <label>Array Size: {size}</label>
                <div className="input-row">
                    <input
                        type="range"
                        min="10"
                        max="500"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        disabled={isSorting}
                    />
                    <input
                        type="number"
                        min="10"
                        max="500"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        disabled={isSorting}
                        className="number-input"
                    />
                </div>
            </div>

            <div className="control-group">
                <label>Speed: {speed}%</label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                />
            </div>

            <div className="control-group">
                <button
                    className={`btn ${isSoundEnabled ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={toggleSound}
                >
                    {isSoundEnabled ? 'Disable Sound' : 'Enable Sound'}
                </button>
            </div>

            <div className="button-group">
                {!isSorting || isPaused ? (
                    <button className="btn btn-primary" onClick={startSorting}>
                        {isPaused ? 'Resume' : 'Start'}
                    </button>
                ) : (
                    <button className="btn btn-warning" onClick={pauseSorting}>
                        Pause
                    </button>
                )}
                <button className="btn btn-secondary" onClick={generateNewArray} disabled={isSorting && !isPaused}>
                    New Array
                </button>
                <button className="btn btn-danger" onClick={reset}>
                    Reset
                </button>
            </div>

            <StatsPanel stats={stats} algorithm={currentAlgorithm} />

            <div className="panel-footer">
                <p>Built for Performance</p>
            </div>
        </div>
    );
};

export default ControlPanel;
