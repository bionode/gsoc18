# Week 5 (15 June to 21 June)


- [Summary](#summary)
- [Progress](#progress)
     - [Understanding lifecycle.js](#understanding-lifecycle.js-)
     - [Doubts](#doubts)


## Summary

This week I majorly focused on understanding the codebase basically `lifecycle.js` and `shell.js` apart from this I've
worked on `Pull request` [#93](https://github.com/bionode/bionode-watermill/pull/93) in which I was working on error. In which
we have to provide the `absolute path` to the run a file using `child-process` so , if we provide `relative path` it gives the 
error `Cannot find the module`. For rectifying this error I've worked on understanding the [shell.js](https://github.com/evoxtorm/bionode-watermill/blob/master/lib/utils/shell.js) and [lifecycle.js](https://github.com/evoxtorm/bionode-watermill/blob/master/lib/sagas/lifecycle.js) .


## Progress

This week I've basically working on `Pull request` [#93](https://github.com/bionode/bionode-watermill/pull/93) so basically 
for understanding the error I learned `redux-saga` which is a library of `redux` and used in `Bionode-Watermill`. For better
understanding of the `child-process` in `bionode-Watermill` I started to understand the code of `shell.js`. In starting 
it seems to tough but with the help of `debugger` which is provided by node itself I started understanding the code
very well. For this task I've taken around **6 to 8 hours** but finally I was able to understand the code.

The command can be written as :-

```js
REDUX_LOGGER=1 node --inspect pipeline.js
```

### Understanding lifecycle.js

The `lifecycle.js` consists of main functions, these functions helps to regulate the lifecycle of the pipeline. So, I started 
understanding the codebase so that I know how every task happened when we run a pipeline. From creating a action to 
dispatching a action. So, this can be explained with the help of simple flow diagram which is explained as:

```javascript

                                        (if resumable) ↘︎
  resolveInput -> (!resumable) ->      operationSaga -> resolveOutput -> validateOutput
            ↖︎ (if resumable and output cannot be resolved) 
```

This flow diagram basically expalins everything how it is able to do the various functions but one more important things 
because if it functions like that it will run `infinite times` so to prevent this situation not to occur so, we set the 
setting of `resumable = false` lets us avoid an infinite loop when output cannot be resolved.


### Doubts

While working on `Pull request` [#93](https://github.com/bionode/bionode-watermill/pull/93). I was getting the error which
is because it is not able find the module. So, what I observe and what I have solution for it:

* Observation

While running the pipelines first it creates the directory :

```js
Made dir: /home/evoxtorm/Desktop/Bionode-watermill/bionode-watermill/test/workflow-status/data/bc4b43d
```
and while on execting the pipeline the node is not able to fiind the module

```js
Cannot find module '/home/evoxtorm/Desktop/Bionode-watermill/bionode-watermill/test/workflow-status/data/bc4b43d/test/workflow-status/wait-error.js'
```
The path is different so that's why it is not able to find this

* Solution 

So, my proposed solution is that if we will remove these `data` and `uid` from the path . So , this way the problem can be solved.








