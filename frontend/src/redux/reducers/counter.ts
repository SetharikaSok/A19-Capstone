
type CounterAction = { type: 'INCREMENT' } | { type: 'DECREMENT'} ;

export const counterReducer = (state = 0, action: CounterAction) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return  state - 1 ;
        default:
            return state;
    }
}