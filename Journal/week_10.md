# Week 10 (17 July to 23 July)


- [Summary](#summary)
- [Progress](#progress)
    - [Process](#process)



## Summary

This week is dedicated to complete the last week worrk and issues which I'm previously working on so last week I was
working om `input-staging` with the help of Redux-Sagas but it makes process to complicated and difficult to do. So, my
Mentor advised me to do it with the help of vanilla redux. So I tried to do the same process with the help of redux.


## Progress

The procedure of doing this task is same just using vanilla redux insetad of redux-sagas. Storing the key and values in 
store so that it can be used again and again for other tasks also. Simple flow chart which describes it.



```javascript

inputs.json => { reads: 'reads.bam', reference: 'genome.fastq.' } 
=> { reads: '/data/reads.bam', reference: '/full/path/genome.fastq' }

```

### Process

The approach is same as the previous week. The codebase is divided into two parts like, first for the loading the inputs
and then second for making a key and values for every input present in the input file. So, I've coded for both the steps


####   * Load-Inputs :- 

In this part the input.json file which contains the input values is loaded into the store so that it can be reused again
and again. The code is almost same like the last week code but now it more readable and easier to read and execute.

* Code:-

```javascript

const initialState = {
  	desired: {},
  	resolved: {}
}


// Actions Types

const LOAD_INPUTS = 'LOAD_INPUTS'


// Action creators

const loadInputs = (input) => ({
	type: 'LOAD_INPUTS',
	payload: input
})

// Reducers  

const loadInputReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_INPUTS':
			return Object.assign({}, state, { desired: input })
	}
	return state
}

// This is for loading the external Input

const input = process.argv[2]

 fs.readFile(input, (data, err) => {
  	if (err) {
  		console.error(err)
  	} else {
  		dispatch({ type: 'LOAD_DESIRED', payload: JSON.parse(data) })
  	}
  })

store.dispatch(loadInputs(process.argv[2]))
```



