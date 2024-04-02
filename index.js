console.clear()

const redux = require('redux')
const createStore = redux.createStore

// action
const ORDER_CAKE = 'ORDER_CAKE'
const ADD_CAKE = 'ADD_CAKE'
// action creater

const orderCake = () => {
    return {
        type: ORDER_CAKE,
    }
}

const addCake = () => {
    return {
        type: ADD_CAKE,
    }
}

const initialState = {
    numOfCakes: 10,
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case ORDER_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        case ADD_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes + 1
            }

        default:
            return state
    }
}

// createStore takes reducer function as argument
const store = createStore(reducer)

// we will subscribe to store with the help of a function 
// so that whenever any state change happens the subscribed method is callled
store.subscribe( () => console.log(store.getState()) )  

// changing the state with the help of dispatch function call
// on dispatch we will send the action
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

store.dispatch(addCake())
store.dispatch(addCake())
store.dispatch(addCake())