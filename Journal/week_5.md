# Week 5 (7 June to 14 June)


- [Summary](#summary)
- [Progress](#progress)
	- [Creating a WorkFlow State](#creating-a-workflow-state)



 ## Summary
 
 This week is dedicated to rectifying the `unhandled rejection` and `uncaught -error`. So basically I've used redux to test
 the failure of `child-process` which is due to `unhanddled rejection` and `uncaught-error`. In this test I've made a testpipeline which does a simple `task` and using `child-process` to perform other other tasks.
 
 
 ## Progress
 
 Since this week is started by learning the fundamental concepts of `redux` which I learned from the [docs](https://redux.js.org/basics).
 While doing some of the task and example pipeline we find out that there is `unhandled-rejection` and `child-process` exits
 and rest of the task is also existed so we have taken the example of `CWL` for workflow failure and success. WHich is
 explained [here](https://www.commonwl.org/v1.0/Workflow.html#Workflow).
 
 I also made a [Pull Request-93](https://github.com/bionode/bionode-watermill/pull/93) in which I've included all the changes 
 which is done to catch the `uncaught-errors` which occurs while running a pipeline with child-process and it also helps to 
 know the Workflow status of the process.
 
### Creating a WorkFlow State

In this i've created a `workflowState` file which will tell the state of the wotkflow whether it is `PermanentFailed`,
`TemporaryFailed` or `Success`. Here I've used Redux because we can debug with the redux very easily and code can be written
easily. 

```javascript

const PERMANENT_FAILURE = 'PERMANENT_FAILURE'
const TEMPORARY_FAILURE = 'TEMPORARY_FAILURE'
const SUCCESS = 'SUCCESS'

const defaultState = 'starting' // find what conforms to CWL spec..

// Reducer
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case PERMANENT_FAILURE:
      return 'permanentFailure'
    case TEMPORARY_FAILURE:
      return 'temporaryFailure'
    case SUCCESS:
      return 'success'	 
   default:
      return state
  }
}

// Action creators
reducer.setWorkflowStatusPermanentFailure = () => ({
  type: PERMANENT_FAILURE
})

reducer.setWorkflowStatusTemporaryFailure = () => ({
	type: TEMPORARY_FAILURE
})

reducer.setWorkflowStatusSuccess = () => ({
	type: SUCCESS
})
// Also make action types importable elsewhere
reducer.PERMANENT_FAILURE = PERMANENT_FAILURE

reducer.TEMPORARY_FAILURE = TEMPORARY_FAILURE

reducer.SUCCESS = SUCCESS

```
This will help to test the workflow status of the process. 

While testing the pipeline for Workflow status. I encountered one more problem while runing the testpipeline which is 
node is not able to find the file which is used to test the `child-process`. So this problem is rectified by two method :

* Hardcode relative to the current directory of node process running pipeline

```javascript
const anotherTask = task({
  name: 'Run a JS file',
  output: 'ran.txt'
}, () => `node /home/evoxtorm/Desktop/Bionode-watermill/bionode-watermill/test/workflow-status/wait-error.js && touch ran.txt`)
```
* Set the working directory of the child process 
