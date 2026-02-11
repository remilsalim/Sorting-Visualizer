import { useState, useEffect, useRef, useCallback } from 'react';
import { generateRandomArray } from '../utils/arrayUtils';
import * as algorithms from '../algorithms/sortingAlgorithms';

import { soundManager } from '../utils/soundUtils';


const useSortingVisualizer = (initialSize = 50, initialSpeed = 50) => {
    const [array, setArray] = useState(() => generateRandomArray(initialSize));
    const [isSorting, setIsSorting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(initialSpeed);
    const [size, setSize] = useState(initialSize);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [currentAlgorithm, setCurrentAlgorithm] = useState('bubble');
    const [stats, setStats] = useState({
        comparisons: 0,
        swaps: 0,
        executionTime: 0,
    });
    const [activeIndices, setActiveIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState(new Set());
    const [pivotIndices, setPivotIndices] = useState([]);

    const stepsRef = useRef([]);
    const currentStepRef = useRef(0);
    const animationRef = useRef(null);
    const startTimeRef = useRef(0);

    const reset = useCallback(() => {
        stopAnimation();
        const newArray = generateRandomArray(size);
        setArray(newArray);
        setSteps([]);
        setStats({ comparisons: 0, swaps: 0, executionTime: 0 });
        setActiveIndices([]);
        setSortedIndices(new Set());
        setPivotIndices([]);
        setIsSorting(false);
        setIsPaused(false);
    }, [size]);

    const setSteps = (steps) => {
        stepsRef.current = steps;
        currentStepRef.current = 0;
    };

    const stopAnimation = () => {
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }
    };

    const startSorting = useCallback(() => {
        if (isSorting && !isPaused) return;

        if (isPaused) {
            setIsPaused(false);
            animate();
            return;
        }

        const steps = algorithms[currentAlgorithm + 'Sort'](array);
        setSteps(steps);
        setIsSorting(true);
        setIsPaused(false);
        setSortedIndices(new Set());
        setPivotIndices([]);
        startTimeRef.current = performance.now();
        animate();
    }, [array, currentAlgorithm, isSorting, isPaused]);

    const pauseSorting = useCallback(() => {
        setIsPaused(true);
        stopAnimation();
    }, []);

    const animate = useCallback(() => {
        if (currentStepRef.current >= stepsRef.current.length) {
            setIsSorting(false);
            setActiveIndices([]);
            setPivotIndices([]);
            return;
        }

        const step = stepsRef.current[currentStepRef.current];
        const { type, indices, array: newArray, value } = step;

        if (type === 'compare') {
            setActiveIndices(indices);
            setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
            if (isSoundEnabled) soundManager.playTone(array[indices[0]]);
        } else if (type === 'swap') {
            setActiveIndices(indices);
            setArray(newArray);
            setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
            if (isSoundEnabled) soundManager.playTone(newArray[indices[0]]);
        } else if (type === 'overwrite') {
            setActiveIndices(indices);
            setArray(newArray);
        } else if (type === 'pivot') {
            setPivotIndices(indices);
        } else if (type === 'sorted') {
            setSortedIndices(prev => new Set([...prev, ...indices]));
        }

        // Update execution time
        setStats(prev => ({
            ...prev,
            executionTime: Math.floor(performance.now() - startTimeRef.current)
        }));

        currentStepRef.current++;

        const delay = Math.max(1, 101 - speed);
        animationRef.current = setTimeout(animate, delay);
    }, [speed]);

    const changeAlgorithm = (alg) => {
        stopAnimation();
        setCurrentAlgorithm(alg);
        setIsSorting(false);
        setIsPaused(false);
        setStats({ comparisons: 0, swaps: 0, executionTime: 0 });
        setActiveIndices([]);
        setSortedIndices(new Set());
        setPivotIndices([]);
    };

    const toggleSound = () => {
        setIsSoundEnabled(prev => {
            const newValue = !prev;
            soundManager.toggle(newValue);
            return newValue;
        });
    };

    useEffect(() => {
        return () => stopAnimation();
    }, []);

    useEffect(() => {
        reset();
    }, [size]);

    return {
        array,
        setArray,
        isSorting,
        isPaused,
        stats,

        activeIndices,
        sortedIndices,
        pivotIndices,
        currentAlgorithm,
        speed,
        size,
        isSoundEnabled,
        setSpeed,
        setSize,
        toggleSound,
        startSorting,
        pauseSorting,
        reset,
        changeAlgorithm,
        generateNewArray: reset,
    };
};

export default useSortingVisualizer;
