
// type CounterAction = { type: 'INCREMENT' } | { type: 'DECREMENT' };
export const increment = () => {
    return {
        type: 'INCREMENT'
        
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT',
    };
};
