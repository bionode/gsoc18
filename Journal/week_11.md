# Week 11 (24 July to 31 July)


- [Summary](#summary)
- [Progress](#progress)


## Summary

This week is dedicated to complete the last week tasks which I was not able to complete. My mentor also advised to implement
`combinereducer` to understand the logic and how it works and better understanding of it.
So, I tried to do this task and other tasks.


## Progress

This week I started working on how I can implement my own version of combineReducer function for my own code.
So, I started finding some blog and start to work on it and I was able to do my own version of combineReducer 
after some attempts.

```javascript

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

```

