# Week 4 (30 May to 6 June)

- [Summary](#summary)
- [Working with CWL](#working-with-cwl)



## Summary

This week starting days is dedicated to the [common workflow language](https://www.commonwl.org/) which allows for easier design and manipulation of tools in a workflow.CWL is well suited for describing large-scale workflows in cluster, cloud and 
high performance computing environments where tasks are scheduled in parallel across many nodes.


## Working with CWL

I started working with CWL with the help of [docs](http://www.commonwl.org/user_guide/) and working on the example 
which is there in the docs guide and some from [CWl-example-repo](https://github.com/common-workflow-language/workflows).
Then I started working on simple example like `fastq-dump` tool which is the intial step of the [two-mappers-example](https://github.com/bionode/bionode-watermill/blob/46499966a41c5977941ba4b617298aa64192b2c3/examples/pipelines/two-mappers/pipeline.js#L58).

For running CWL tool for fastq-dumb we have to make two files

* fastq.cwl :- This file contains the workflow. This file will be provided with `input` and `output` and some base commands
which will help to execute the process. The `docker` is required in most of the process where this tool is installed
or you can install the tool locally on your machine.

```cwl

#!/usr/bin/env cwl-runner
cwlVersion: v1.0
class: CommandLineTool

hints:
  DockerRequirement:
    dockerPull: inutano/sra-toolkit

inputs:
  sraFile:
    type: File
    inputBinding:
      position: 1


baseCommand: [fastq-dump, --split-files, --skip-technical, --gzip]

outputs:
  fastq:
    type: stdout

stdout: $(inputs.out_fastq_prefix).fastq
```
* A yml file which have the path to the input or it can also have commands etc. So, I've given the path of the sra file
for the `fastq-dump` process to occur.

```yml
sraFile:
  class: File
  path: data/ERR045788.sra

out_fastq_prefix: _OUT_FASTQ_PREFIX_
 ```
 


