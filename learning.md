- [Summary](#summary)
- [Intial Steps](#intial-steps)
- [Getting started with Docker](#getting-started-with-docker)
- [Getting started with Redux](#getting-started-with-redux)   
        - [Redux Saga](#redux-saga)
- [Getting started with bionode-watermill code](#getting-started-with-bionode-watermill-code)
- [Comparision with other softwares](#comparision-with-other-softwares)



## Summary

This guide contains all the things which is required to start for contribution in this project. I've started most of things 
which I learn is from basic so, maybe you will also face the same problems like I've encountered while learning and for
contribution. I try to explain most of the things for a beginner which has basic knowledge of **JavaScript**. So, this will
help the developers who want to get started with development of this project or want to start contribute to this project.


## Intial Steps

The first step is to fork the `Bionode-Watermill` [repo](https://github.com/bionode/bionode-watermill), the extra information 
about it's requirement and other things are explained in main repo page. The important information what is does and how you
can use `Bionode-Watermill` is there in [guide](https://bionode.gitbooks.io/bionode-watermill/content/). Here you can basic examples and how you can make your `example-pipelines`. This will give atleast basic knowledge of `Bionode-Watermill`.


## Getting started with Docker
 
 
For running the big pipelines we have used docker so that all the things can present in docker conatiner. Docker is a 
containerization platform which packages an application & all its dependencies into a container. So, installing all the tools
and other depedencies can be done in a single go. Docker is little tricky for beginners. So, learning from their [docs](https://docs.docker.com/)
will be little difficult. This project is based on `node.js` so I started with the guide of docker which is provided in 
**node** [documentation](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/). This docs was easy to read and help to 
how I can write a basic dockerfile image for my project. For more practise you can search for `Dockerfiles` in github you can
get a lot'of example which will help you.

A other major problem I faced during using other dockerfile images or pulling a dockerized project is because of `sudo` .
For pulling or any other process I've to use `sudo` basic giving the permissions everytime but it solves my problem.

It will look something like this.

```dockerfile
# DOCKERFILE for bionode-watermill two-mappers example
FROM ubuntu:18.04

# INSTALL DEPENDENCIES

RUN apt-get update
RUN apt-get -y install unzip gzip wget gcc g++ libtbb-dev bzip2 make zlib1g-dev sudo curl zsh
RUN apt-get -y install git npm

# INSTALL node.js version 7
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get install -y nodejs

### BOWTIE2 INSTALL ###

WORKDIR /bin/
RUN wget https://downloads.sourceforge.net/project/bowtie-bio/bowtie2/2.3.2/bowtie2-2.3.2-linux-x86_64.zip
RUN unzip bowtie2-2.3.2-linux-x86_64.zip
RUN rm -rf bowtie2-2.3.2-linux-x86_64.zip

# ADD BOWTIE TO PATH
ENV PATH="/bin/bowtie2-2.3.2:${PATH}"

### BWA INSTALL ###

RUN wget https://sourceforge.net/projects/bio-bwa/files/bwa-0.7.15.tar.bz2
RUN tar jxf bwa-0.7.15.tar.bz2
RUN rm -rf bwa-0.7.15.tar.bz2
WORKDIR /bin/bwa-0.7.15/
RUN make

# ADD BWA TO PATH
ENV PATH="/bin/bwa-0.7.15:${PATH}"

### DOWNLOAD FASTQ-DUMP ###

WORKDIR /bin/
RUN wget https://ftp-trace.ncbi.nlm.nih.gov/sra/sdk/2.8.2-1/sratoolkit.2.8.2-1-ubuntu64.tar.gz

# EXTRACT THE FOLDER
RUN tar -zxvf sratoolkit.2.8.2-1-ubuntu64.tar.gz
RUN rm -rf sratoolkit.2.8.2-1-ubuntu64.tar.gz

# PUT STA-TOOLKIT IN PATH
ENV PATH="/bin/sratoolkit.2.8.2-1-ubuntu64/bin:${PATH}"


### INSTALL SAMTOOLS ###

RUN wget https://sourceforge.net/projects/samtools/files/samtools/1.4.1/samtools-1.4.1.tar.bz2
RUN tar jxf samtools-1.4.1.tar.bz2
RUN rm -rf samtools-1.4.1.tar.bz2
WORKDIR /bin/samtools-1.4.1/
RUN ./configure --without-curses --disable-bz2 --disable-lzma
RUN make
ENV PATH="/bin/samtools-1.4.1:${PATH}"


### FINAL BLOCK ###

WORKDIR /bin/

# CLONE BIONODE-WATERMILL FROM GIT HUB
RUN git clone https://github.com/bionode/bionode-watermill.git

# CHANGE DIRECTORY TO BIONODE-WATERMILL
WORKDIR /bin/bionode-watermill
RUN npm install
RUN npm install bionode-ncbi -g

# START zsh before using iteractive mode
RUN zsh
```

The above dockerfile is for `two-mappers pipeline` which is present in `Bionode-watermill` examples.


## Getting started with Redux

We have used `redux` in `Bionode-Watermill` because it help's to debug various process and it also helps to make various
process easy. If you are new to redux then you may find `redux` little challenging while using with `node`. For learning
`redux` you can refer to offical [docs](https://redux.js.org/basics) and other then from that you can also do a course
on redux by [egghead](https://egghead.io/courses/getting-started-with-redux), this course will help you clearing your doubts
and helping you to understand our codebase.

You can try a simple todo app with the help of redux. If you know react then it will plus point for you because mostly the 
redux tutorials are explain with react. So, you can learn more easily but if you don't know react then it is ok
to try a example with plain HTML.

You can learn a little basic of it and it will help you in understanding the codebase. In `bionode-watermill` we have reducer functions which helps to do some tasks. You can find all these reducers [here](https://github.com/evoxtorm/bionode-watermill/tree/master/lib/reducers).


### Redux-Saga

It is a library of redux which helps to make the complex action more easier and help to do various tasks in a easy way. This
library use **Generators**. You can learn about `generator` [here](https://www.youtube.com/watch?v=ategZqxHkz4&t=1274s)
. This videos is good and I learned the basics and how we can use in our project. For `redux-saga` you can refer to it's
offical [docs](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html). If you find difficulty reading docs then
you can get lot's of resolurces online and in youtube too. One video which helped me in better understanding is [here](https://www.youtube.com/watch?v=o3A9EvMspig).
For understanding where it is used in `bionode-watermill` you can find it in [lifecycle.js](https://github.com/evoxtorm/bionode-watermill/blob/master/lib/sagas/lifecycle.js#L116).


## Getting started with bionode-watermill code

Basically when I first sees the code I was unable to understand it on my own but with the guidance of my mentors I was able
to understand the code and how it is actually working. The functional code is present in `lib` folder and in `lib` there are
many sub-folders so it is difficult to find where to start. So, basically most of the important code is present in [lifecycle.js](https://github.com/evoxtorm/bionode-watermill/blob/master/lib/sagas/lifecycle.js) 
where it explain about the lifecycle of **Bionode-Watermill**. So, if you trying to understand `lifecycle` it will make
easy to understand how it is executing the tasks. `Lifecycle.js` is very well commented and reading throughly helps
you understand more easily. A little idea about lifecycle can be explained from this diagram:-

```js
                                      (if resumable) ↘︎
  resolveInput -> (!resumable) ->      operationSaga -> resolveOutput -> validateOutput
           ↖︎ (if resumable and output cannot be resolved)    ⏎
           
```
I've tried to explain this [here](https://github.com/bionode/gsoc18/blob/master/Journal/week_6.md#understanding-lifecyclejs)
hope it can to better understanding.

Apart from this there are various important things are present but it cannot solely understand here. So, just try to read the code and if anything is not clear you can ask any question regarding the code in [gitter](https://gitter.im/bionode/bionode).


## Comparision with other softwares

I have compared the efficency of bionode-watermill with some of other softwares and comapared it. If you want to read this 
you can refer to [week3](https://github.com/bionode/gsoc18/blob/master/Journal/week_3.md) for `nextflow` and for `cwl` you 
can find this in [week4](https://github.com/bionode/gsoc18/blob/master/Journal/week_4.md). If you want a more detailed guide 
then you can read [this](https://jmazz.me/blog/NGS-Workflows). This blog will help you understanding the comparision between 
all these.
