import React from 'react';
import { ALGORITHM_INFO } from '../utils/arrayUtils';

const StatsPanel = ({ stats, algorithm }) => {
    const info = ALGORITHM_INFO[algorithm];

    return (
        <div className="stats-panel">
            <h3>Algorithm Stats</h3>
            <div className="complexity-info">
                <p><strong>Best Case:</strong> {info.best}</p>
                <p><strong>Average Case:</strong> {info.average}</p>
                <p><strong>Worst Case:</strong> {info.worst}</p>
            </div>
            <hr />
            <div className="real-time-stats">
                <div className="stat">
                    <label>Comparisons:</label>
                    <span>{stats.comparisons}</span>
                </div>
                <div className="stat">
                    <label>Swaps:</label>
                    <span>{stats.swaps}</span>
                </div>
                <div className="stat">
                    <label>Time:</label>
                    <span>{stats.executionTime}ms</span>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
