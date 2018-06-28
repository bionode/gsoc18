# Week 7 (22 June to 28 June)


- [Summary](#summary)
- [Progress](#progress)
    - [Input-Staging](#input-staging)



## Summary

This week is dedicated to working on `input staging` which is inspired from [CWL](https://www.commonwl.org/), this will help 
in creating a working directory for inputs so that it can be used easily. This week we also discussed about refactoring the 
code like removing that part of code which hard to understand. So, basically all these things are in development phase if 
it will be feasible then it will changed. This week I also worked on `learning.md` which is basically a guide which helps to 
give the direction to the new devlopers who want to learn and contribue to `bionode-watermill`.


## Progress

This week is majorly dedicated to **input staging** which is inspired from [CWL](https://www.commonwl.org/), which helps in
creating a working directory for inputs. For more information you can refer [here](https://www.commonwl.org/user_guide/15-staging/).

Key points for Staging Input Files are :-

* Input files are normally kept in a read-only directory
* Use `InitialWorkDirRequirement` to stage input files in the working directory

For better undertsanding of it I also tried a example of using input-staging with the help of cwl to run a `node file`.
Here's the code for it.

```cwl
#!/usr/bin/env cwl-runner

cwlVersion: v1.0
class: CommandLineTool
hints:
  DockerRequirement:
    dockerPull: node:latest


baseCommand: node

requirements:
  InitialWorkDirRequirement:
    listing:
      - $(inputs.src)

inputs:
  src:
    type: File
    inputBinding:
      position: 1
      valueFrom: $(self.basename)

outputs:
  classfile:
    type: File
    outputBinding:
      glob: "*.js"

```

Here in this `cwl` code I've provided `InitialWorkDirRequirement` to stage input files into the output directory. It also 
takes another `yml` filw which basically tells the path of the file.

### Input-Staging

The basics of input staging is already covered above. So, To apply this on `bionode-watermill`. I've tried to make a 
prototype basically which does something same like this.Basically I've divided this process in four steps. I will try to 
understand the four steps one by one.

* Reading the `input.json` :- The first step is to read the `json` file which contains the path of the input file and 
with the help of json file we are able to make the `working directory` so that input can be taken easily. Here's the code sinppet for it.

```js
// Input path of JSON file
const input = path.resolve(__dirname, 'input.json')

// Reading the json file
readFile(input, {encoding: 'utf8'})
	.then(contents => {
		const data = JSON.parse(contents)
		console.log(data)
	})
	.catch(error => {
		throw error
	})
```

* Resolving the input file:- This part is still in devlopment phase as I've various doubts regarding this steps. So, I've 
written about this on doubts section.

* Creating a working directory :- In this step I will create a working directory for the input path provide in the `json file`.
Here's the code snippet of it

```js
mkdirp(path, function (err) {
    if (err) console.error(err)
     else console.log('pow!')
 })
 ```
This will basically create a working directory where the input's can be kept.


*  Copying the `json file` in the directory:- This step basically includes the copying of input.json to the working directory.

```js
function copyFile(source, target) {
  let readir = fs.createReadStream(source)
  let wrdir = fs.createWriteStream(target)
  return new Promise(function(resolve, reject) {
    readir.on('error', reject)
    wrdir.on('error', reject)
    wrdir.on('finish', resolve)
    readir.pipe(wrdir)
  }).catch(function(error) {
    readir.destroy()
    wrdir.end()
    throw error
  })
}
```
