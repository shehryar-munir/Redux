console.clear()

const redux = require('redux')
const createStore = redux.createStore
const actionBinder = redux.bindActionCreators
const combineReducers = redux.combineReducers
const produce = require('immer').produce

// initial states
const initialCakeState = {
    noOfCakes: 20
}

const initialIceCreamState = {
    noOfIceCreams: 10
}

const personInfo = {
    name: 'Burak',
    address: {
        street: '2',
        city: 'Lahore',
        country: "Pakistan"
    }
}

// action
const ORDER_CAKE = 'ORDER_CAKE'
const RESTOKE_CAKE = 'RESTOKE_CAKE'
const ORDER_ICECREAM = 'ORDER_ICECREAM'
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM'
const UPDATE_STREET = 'UPDATE_STREET'

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

const updateStreet = (newStreet) => {
    return {
        type: UPDATE_STREET,
        street: newStreet
    }
}

// reducers
const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type){
        case ORDER_ICECREAM:
            return produce(state, (draft) => {
                draft.noOfIceCreams = draft.noOfIceCreams - 1
            })
            break;

        case RESTOCK_ICECREAM:
            return produce (state, (draft) => {
                draft.noOfIceCreams = draft.noOfIceCreams + action.qty
            })
            break;
        
        default:
            return state
    }
    
}

const cakeReducer = ( state = initialCakeState, action ) => {
    switch (action.type) {
        case ORDER_CAKE:
            return produce(state, (draft) => {
                draft.noOfCakes = draft.noOfCakes - 1
            })
            break;
        
        case RESTOKE_CAKE:
            return produce (state, (draft) => {
                draft.noOfCakes = draft.noOfCakes + action.qty
            })
            break;
        
        default:
            return state
    }
} 

const streetReducer = (state = personInfo, action ) => {
    switch (action.type) {
        case UPDATE_STREET:
            return produce (state, (draft) => {
                draft.address.street = action.street
            })
            break;
    
        default: {
            return state
        }
            break;
    }
}

const rootReducer = combineReducers({
    cake : cakeReducer,
    icecreame: iceCreamReducer,
    address: streetReducer
})

// createStore takes reducer function as argument
const store = createStore(rootReducer)

// we will subscribe to store with the help of a function 
// so that whenever any state change happens the subscribed method is callled
store.subscribe( () =>  
    console.log(store.getState()) 
)  



// using actionBindCreator to bind all the reducers
const actions = actionBinder({orderCake, restokeCake, orderIceCream, restokeIceCream, updateStreet}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restokeCake(10)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.updateStreet('3')


