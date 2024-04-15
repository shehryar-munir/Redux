const createrSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    noOfCakes: 10
}

const cakeSlice = createrSlice({
    name:'cake',
    initialState,
    reducers: {
        ordered: (state) => {
            state.noOfCakes--
        },
        restocked: (state, action) => {
            state.noOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer

module.exports.cakeActions = cakeSlice.actions