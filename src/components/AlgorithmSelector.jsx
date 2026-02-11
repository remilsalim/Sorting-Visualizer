import React from 'react';
import { ALGORITHM_INFO } from '../utils/arrayUtils';

const AlgorithmSelector = ({ currentAlgorithm, onAlgorithmChange, isDisabled }) => {
    return (
        <div className="control-group">
            <label>Algorithm</label>
            <select
                value={currentAlgorithm}
                onChange={(e) => onAlgorithmChange(e.target.value)}
                disabled={isDisabled}
            >
                {Object.keys(ALGORITHM_INFO).map((key) => (
                    <option key={key} value={key}>
                        {ALGORITHM_INFO[key].name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AlgorithmSelector;
