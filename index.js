console.clear()

const redux = require('redux')
const createStore = redux.createStore
const actionBinder = redux.bindActionCreators
const combineReducers = redux.combineReducers

// initial states
const initialCakeState = {
    noOfCakes: 20
}

const initialIceCreamState = {
    noOfIceCreams: 10
}

// action
const ORDER_CAKE = 'ORDER_CAKE'
const RESTOKE_CAKE = 'RESTOKE_CAKE'
const ORDER_ICECREAM = 'ORDER_ICECREAM'
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM'


// action creaters
const orderIceCream = () => {
    return {
        type: ORDER_ICECREAM
    }
}

const restokeIceCream = (quantity) => {
    return {
        type: RESTOCK_ICECREAM,
        qty: quantity
    }
}

const orderCake = () => {
    return {
        type: ORDER_CAKE,
    }
}

const restokeCake = (quantity) => {
    return {
        type: RESTOKE_CAKE,
        qty: quantity
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type){
        case ORDER_ICECREAM:
            return {
                ...state,
                noOfIceCreams: state.noOfIceCreams - 1
            }
            break;

        case RESTOCK_ICECREAM:
            return {
                ...state,
                noOfIceCreams: state.noOfIceCreams + action.qty
            }
            break;
        
        default:
            return state
    }
    
}

const cakeReducer = ( state = initialCakeState, action ) => {
    switch (action.type) {
        case ORDER_CAKE:
            return {
                noOfCakes: state.noOfCakes - 1
            }
            break;
        
        case RESTOKE_CAKE:
            return {
                noOfCakes: state.noOfCakes + action.qty
            }
            break;
        
        default:
            return state
    }
} 

const rootReducer = combineReducers({
    cake : cakeReducer,
    icecreame: iceCreamReducer
})

// createStore takes reducer function as argument
const store = createStore(rootReducer)

// we will subscribe to store with the help of a function 
// so that whenever any state change happens the subscribed method is callled
store.subscribe( () => console.log(store.getState()) )  



// using actionBindCreator to bind all the reducers
const actions = actionBinder({orderCake, restokeCake, orderIceCream, restokeIceCream}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restokeCake(10)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()


