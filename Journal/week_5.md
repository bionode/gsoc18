# Week 5 (7 June to 14 June)


- [Summary](#summary)
- [Progress](#progress)
	-[Creating a WorkFlow State](#creating-a-workflow-state)



 ## Summary
 
 This week is dedicated to rectifying the `unhandled rejection` and `uncaught -error`. So basically I've used redux to test
 the failure of `child-process` which is due to `unhanddled rejection` and `uncaught-error`. In this test I've made a testpipeline which does a simple `task` and using `child-process` to perform other other tasks.
 
 
 ## Progress
 
 Since this week is started by learning the fundamental concepts of `redux` which I learned from the [docs](https://redux.js.org/basics).
 While doing some of the task and example pipeline we find out that there is `unhandled-rejection` and `child-process` exits
 and rest of the task is also existed so we have taken the example of `CWL` for workflow failure and success. WHich is
 explained [here](https://www.commonwl.org/v1.0/Workflow.html#Workflow).
 
 I also made a [Pull Request-92](https://github.com/bionode/bionode-watermill/pull/91) in which I've included all the changes 
 which is done to catch the `uncaught-errors` which occurs while running a pipeline with child-process. Various changes are
 suggested by the mentor so I've closed this Pull Request and made a new pull request [#93](https://github.com/bionode/bionode-watermill/pull/93)
 which contains all the chnages and currently working on this Pull request.
 
### Creating a WorkFlow State

In this i've created a `workflowState` file which will tell the state of the process whether is `PermanentFailed`,
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
reducer.PERMANENT_FAILURE = 'PERMANENT_FAILURE'

reducer.TEMPORARY_FAILURE = 'TEMPORARY_FAILURE'

reducer.SUCCESS = 'SUCCESS'

```
This will help to test the workflow status of the process. 
