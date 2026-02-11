import React, { useEffect } from 'react';
import ArrayDisplay from './ArrayDisplay';
import useSortingVisualizer from '../hooks/useSortingVisualizer';
import { ALGORITHM_INFO } from '../utils/arrayUtils';

const ComparisonView = ({ initialArray, size, speed, alg1, alg2, isGlobalSorting, onStop }) => {
    const visualizer1 = useSortingVisualizer(size, speed);
    const visualizer2 = useSortingVisualizer(size, speed);

    useEffect(() => {
        // Sync initial arrays
        visualizer1.setArray([...initialArray]);
        visualizer2.setArray([...initialArray]);
    }, [initialArray]);

    useEffect(() => {
        if (isGlobalSorting) {
            visualizer1.changeAlgorithm(alg1);
            visualizer2.changeAlgorithm(alg2);
            visualizer1.startSorting();
            visualizer2.startSorting();
        } else {
            visualizer1.reset();
            visualizer2.reset();
        }
    }, [isGlobalSorting, alg1, alg2]);

    return (
        <div className="comparison-container">
            <div className="visualizer-box">
                <h4>{ALGORITHM_INFO[alg1].name}</h4>
                <ArrayDisplay
                    array={visualizer1.array}
                    activeIndices={visualizer1.activeIndices}
                    sortedIndices={visualizer1.sortedIndices}
                    pivotIndices={visualizer1.pivotIndices}
                />
                <div className="mini-stats">
                    <span>Comparisons: {visualizer1.stats.comparisons}</span>
                    <span>Swaps: {visualizer1.stats.swaps}</span>
                    <span>Time: {visualizer1.stats.executionTime}ms</span>
                </div>
            </div>
            <div className="visualizer-box">
                <h4>{ALGORITHM_INFO[alg2].name}</h4>
                <ArrayDisplay
                    array={visualizer2.array}
                    activeIndices={visualizer2.activeIndices}
                    sortedIndices={visualizer2.sortedIndices}
                    pivotIndices={visualizer2.pivotIndices}
                />
                <div className="mini-stats">
                    <span>Comparisons: {visualizer2.stats.comparisons}</span>
                    <span>Swaps: {visualizer2.stats.swaps}</span>
                    <span>Time: {visualizer2.stats.executionTime}ms</span>
                </div>
            </div>
        </div>
    );
};

export default ComparisonView;
