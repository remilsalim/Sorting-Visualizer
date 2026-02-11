import React, { useMemo } from 'react';
import '../styles/ArrayDisplay.css';

const Bar = React.memo(({ value, index, isActive, isSorted, isPivot, size }) => {
    const barStyle = {
        height: `${(value / 500) * 100}%`,
        width: `${100 / size}%`,
    };

    let className = 'bar';
    if (isActive) className += ' active';
    if (isSorted) className += ' sorted';
    if (isPivot) className += ' pivot';

    return (
        <div className={className} style={barStyle}>
            {size <= 20 && <span className="bar-value">{value}</span>}
        </div>
    );
});

const ArrayDisplay = ({ array, activeIndices, sortedIndices, pivotIndices }) => {
    const size = array.length;

    return (
        <div className="array-display">
            {array.map((value, index) => (
                <Bar
                    key={index}
                    value={value}
                    index={index}
                    isActive={activeIndices.includes(index)}
                    isSorted={sortedIndices.has(index)}
                    isPivot={pivotIndices.includes(index)}
                    size={size}
                />
            ))}
        </div>
    );
};

export default React.memo(ArrayDisplay);
