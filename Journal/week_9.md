# Week 8 (10 July to 16 July)


- [Summary](#summary)
- [Progress](#progress)
    - [Process](#process)



## Summary

This week is dedicated to work on `input-staging` in Bionode-Watermill. So, We are using redux to implement the
`input-staging`. We are using redux here because with the help of redux we are able store the key and values in store
which can be used again and again. For this whole process I used `Redux-Saga` so that the process will efficent but
it is little confusing to use this. The issue which is targeted for completing this task is [Issue91](https://github.com/bionode/bionode-watermill/issues/95).


## Progress

The process which I'm trying is acheive is something like this. Basically taking the values and key from the `inputs`
and then storing key and values. Key will be the name of the name of the input and values will be the the absolute path
after resoving it. It is something like this

```javascript

inputs.json => { reads: 'reads.bam', reference: 'genome.fastq.' } 
=> { reads: '/data/reads.bam', reference: '/full/path/genome.fastq' }

```

Here reads is the key and 'reads.bam' is the values associated with it. 

### Process

I've tried to code the whole process in Redux-Saga so I've tried to make the code base clear and easy to understand.
The code is broken into seprate paarts so that it will be easy to read and to run. The problem with redux-saga I was
getting too many error and it hard to test. 

The code is divided according to the two parts
* Load the inputs
* Resolve the input so that they will resolve it 

####   * Load-Inputs :- 

This part basically I've tried to load the inputs into the store.

```javascript
const LOAD_INPUTS = 'LOAD_INPUTS'
const RESOLVE_INPUTS = 'RESOLVE_INPUTS'
const LOAD_FAIL = 'LOAD_FAIL'


// reducers

const defaultState = {}

const reducer = (state = defaultState, action) => {   

	switch(action.type) {
		case 'LOAD_INPUTS':
			return Object.assign({}, state, { desired: action.data })
		case 'RESOLVE_INPUTS' :
			return Object.assign({}, state, { desired: action.path })
		case 'LOAD_FAIL' :
			return Object.assign({}, state )
		default :
			return state
	}
}

// Action 

const loadExternalInputs = (data) => ({
	type: 'LOAD_INPUTS',
	payload: data
})

const resolveInput = (path) => ({
	type: 'RESOLVE_INPUTS',
	payload: path
})

const loadFail = (err) => {
	type: 'LOAD_FAIL'
	//payload: err,
	//error : true
}


function getpath(path) {
	return new Promise((resolve, reject) => {
		path = process.argv[2]
		fs.readFile(path, (err, data) => {
			if (err) {
				reject(err)
			} else {
				resolve(data)
			}
		})
	})
}


function* loadInputs() {

	const action = yield take(LOAD_INPUTS)
	const  path   = process.argv[2]

	try {
		const result = yield call(getpath, path)
		const { data } = result

		yield put(loadExternalInputs(data))
	}
	catch (err) {
		yield put(loadFail(err))
	}

}

store.dispatch(loadExternalInputs())

```

#### * Resolve-Input :-

Here, In this task I've tried to resolve the load-inputs which is coming from the above task. 

```javascript

const LOAD_INPUTS = 'LOAD_INPUTS'
const RESOLVE_INPUTS = 'RESOLVE_INPUTS'
const LOAD_FAIL = 'LOAD_FAIL'


// reducers

const defaultState = {}

const reducer = (state = defaultState, action) => {   

	switch(action.type) {
		case 'LOAD_INPUTS':
			return Object.assign({}, state, { desired: action.data })
		case 'RESOLVE_INPUTS' :
			return Object.assign({}, state, { desired: action.path })
		case 'LOAD_FAIL' :
			return Object.assign({}, state )
		default :
			return state
	}
}

// Action 

const loadExternalInputs = (data) => ({
	type: 'LOAD_INPUTS',
	payload: data
})

const resolveInput = (path) => ({
	type: 'RESOLVE_INPUTS',
	payload: path
})

const loadFail = (err) => {
	type: 'LOAD_FAIL'
	//payload: err,
	//error : true
}


function readExternalInput(path) {
	return new Promise((resolve, reject) => {
		path = process.argv[2]
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				reject(err)
			} else {
				try {
				 const results = resolve(JSON.parse(data))
				} catch(err) {
					reject (err)
				}
			}
		})
	})
}


function* resolveExternalInput() {

	const logEmitter = new EventEmitter2({ wildcard: true })

	
	try {
// I've wrapped almost evrything in one try statement
		const action = yield take(RESOLVE_INPUTS)
		//const externalInput = yield call(readExternalInput, process.argv[2])

	readExternalInput(process.argv[2])
		.then((externalInput) => {
			return Promise.all(Object.keys(externalInput).map(key => matchToFs(externalInput[key])))
		})
		.then((results) => {
			console.log(results)
		})

		
// maybe this is also not running 
	return yield put(resolveInput(path))
		
	} catch (err) {
		yield put(loadFail(err))
	}
}

store.dispatch(resolveInput())

```

#### Results :-

I've tested this code and it takes very difficult to debug and understand it so My mentor advised me to do this with the
vanilla redux. Because the code is hard to understand and showing lot's of error and hard to understand for any new person
. So basically I will try to refactor the code to vanilla redux.

