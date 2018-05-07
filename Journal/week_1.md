# Week 1 (29 April to 6 May)

- [Summary](#summary)
- [Getting familiar with bionode-watermill](#getting-familiar-with-bionode-watermill)




## Summary

During this week basically I've done small tasks like getting familiar with the [bionode-watermill](https://github.com/bionode/bionode-watermill)
by doing it's [examples](https://github.com/bionode/bionode-watermill/blob/master/examples). In this learning about task and
orchestrators (join, junction and fork).I'm also able to setup [bionode-watermill](https://github.com/bionode/bionode-watermill) with the help of docker using this [docker-tutorial](https://github.com/bionode/bionode-watermill-tutorial/tree/master/docker-watermill-tutorial) but this was only used for two-mapper example. I'm also able to setup [nextflow](https://www.nextflow.io/docs/latest/index.html) with the help of docs.


## Getting familiar with bionode-watermill

For getting familiar with [bionode-watermill](https://github.com/bionode/bionode-watermill). I started working on existing examples which is their in project itself for better understanding. I learn how to make task and use of orchestrators (join, junction and fork). I also made a small pipeline which basically takes fasta file as input and concat all these files and then it will Capitalize all the output file which is came from Concat task. This task is combination of first and second examples present in existing example [MyPipeline](https://github.com/evoxtorm/watermill_examples/blob/master/Newtry.js).


I was able to setup docker and used docker to run [two-mappers](https://github.com/bionode/bionode-watermill/tree/master/examples/pipelines/two-mappers/pipeline.js). I encounter various difficulty in running this example in local machine(ubuntu 18.04). Then after lot of research I was able to rectify the probelem. So, we can edit docker documentation and add some more points in it. Like In my case I have to login docker before pulling image and have to use sudo before in every command because it's allow to access as a root user. In building docker-image in my local machine I face lot's of difficulty but with the help of mentor I was able to make one but that image is not working as I thought so for new devs I think we have to make a good guide so that this work can be easily done or that developer which have no previous experience of docker like me.

For comparing other pipeline like nextflow with Watermill. I've installed nextflow but I encounter lot's of problem and made a [isssue](https://github.com/nextflow-io/nextflow/issues/677) as well. Then after lot's of research I finally installed nextflow but it's not working because path is not given. So Jullian(mentor) helped me in this and finallly it worked.






