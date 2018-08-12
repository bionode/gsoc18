'use strict'

const Promise = require('bluebird')
//const fs = require('fs')
const fs = Promise.promisifyAll(require('fs'))
const promise = require('bluebird').resolve()


const { createStore, combineStore } = require('redux')
//const { combineReducers } = require('redux')
//const thunk  = require('redux-thunk')

const matchToFs = require('../matchers/match-to-fs.js')

// Own made combinereducer function for learning the process

function combineReducers(reducers) {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers);

  return function combination(state = {}, action) {
    // This is the object we are going to return.
    const nextState = {}

    // Loop through all the reducer keys
    for (let i = 0; i < reducerKeys.length; i++) {
    // Get the current key name 
    const key = reducerKeys[i];
    // Get the current reducer
    const reducer = reducers[key]
    // Get the the previous state
    const previousStateForKey = state[key]
    // Get the next state by running the reducer
    const nextStateForKey = reducer(previousStateForKey, action)
    // Update the new state for the current reducer
    nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}


const initialState = {
  	desired: {},
  	resolved: {}
}


// Actions Types

const LOAD_INPUTS = 'LOAD_INPUTS'
const RESOLVE_INPUTS =  'RESOLVE_INPUTS'



// Action creators

const loadInputs = (input) => ({
	type: 'LOAD_INPUTS',
	payload: input
})

const resolveInputs = (key, value) => ({
	type: 'RESOLVE_INPUTS',
	payload: { key, value}
})


const loadInputReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_INPUTS':
			return Object.assign({}, state, { desired: input })
	}
	return state
}


const resolveInputReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'RESOLVE_INPUTS':
			const resolved = Object.assign({}, state.resolved, { [action.key]: action.value })
			//console.log(action)
			return Object.assign({}, state, { resolved })
	}
	return state
}




// Next process These processes involve in Loading the input
// resolving the input and giving the absolute paths to the external Input



// This is for loading the external Input
 const input = process.argv[2]

 fs.readFile(input, (data, err) => {
  	if (err) {
  		console.error(err)
  	} else {
  		dispatch({ type: 'LOAD_DESIRED', payload: JSON.parse(data) })
  	}
  })


 // This is for the resolving the input data and it will the resolved
 // data like key and it's value and giving the absolute path
 // for each key
  
const path = process.argv[2]

 function readExternalInput(path) {
	return new Promise((resolve, reject) => {
		//path = process.argv[2]
		fs.readFile(path, (err, data) => {
			if (err) {
				reject(err)
			} else {
				 return resolve(JSON.parse(data))
			}
		})
	})
}


readExternalInput(process.argv[2])
	.then((externalInput) => {
		return Promise.all([externalInput, Promise.all(Object.keys(externalInput).map(key => matchToFs(externalInput[key])))]) 
	})
	.then(([externalInput, results]) => {
		const final = {}
		Object.keys(externalInput).forEach((key, i) => {
			//console.log(i)
			//console.log(results)
			//console.log(key)
			final[key] = results[i]
			console.log(final)
			store.dispatch({ type: 'RESOLVE_INPUTS', resolved: { [payload.key] : [payload.results] }})
		})
	})



const rootreducer = combineReducers({ loadInputReducer ,resolveInputReducer  }) 

console.log(rootreducer)

// store 

const store  = createStore(rootreducer) 

store.subscribe(() => {
	console.log(JSON.stringify(store.getState()))
})


store.dispatch(loadInputs(process.argv[2]))
store.dispatch(resolveInputs(process.argv[2]))


