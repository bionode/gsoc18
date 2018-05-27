# Week 3 (22 May to 29 May)

- [Summary](#summary)
- [Getting familar with nextflow](#getting-familar-with-nextflow)
- [Comparison between nextflow and bionode-watermill](#comparision-between-nextflow-and-bionode-watermill)


## Summary

During this week I've mostly worked on [nextflow](https://www.nextflow.io/) which is Domain Specific language and helps to
make the adaptation of pipelines written in the most common scripting languages. So, I started learning nextflow and able to
do various [examples](https://github.com/evoxtorm/watermill_examples/tree/master/nextflow%20tutorial). Then I compared nextflow
with bionode-watermill because both these helps to make bioinformatic pipelines but some processes are well handled by 
nextflow.



## Getting familar with nextflow

I started working on nextflow with the help of [docs](https://www.nextflow.io/docs/latest/index.html) and [nf example repo](https://github.com/nextflow-io/examples).
 Afterwards I started comparing nextflow with bionode-watermill and both of them help to make the pipeline but some 
 processes is well easily handled in nextflow like use of channels. I also made two mappers example in nextflow but face lot's
 of difficulity while doing it like sometime docker issues and sometimes tool issue which is a real pain for a new person.
 


## Comparison between nextflow and bionode-watermill

Nextflow and bionode-watermill has lot's of similarity like code redusability and automated input/output handling.
While doing some of the examples in nextflow the use of channels makes the process easy.

* In nextflow we can use input of one process with channels so that it can be reused again like this
   ``` ( samples1, samples2, ... , samplesN ) = samples.into(N)```


