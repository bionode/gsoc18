# Week 3 (22 May to 29 May)

- [Summary](#summary)
- [Getting familar with nextflow](#getting-familar-with-nextflow)
- [Twomappers example in nextflow](#twomappers-example-in-nextflow)
- [Comparison between nextflow and bionode-watermill](#comparison-between-nextflow-and-bionode-watermill)


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
 
 
 ## Twomappers example in nextflow
 
 In bionode-watermill on example named as [two-mappers](https://github.com/bionode/bionode-watermill/tree/dev/examples/pipelines/two-mappers) so I tried to try this example in nextflow to compare the efficency.
 But I find with the help of channels taking input/output to other processes is easy and fast.
 
 ```nextflow
 #!/usr/bin/env nextflow

species = [
  'Streptococcus pneumoniae': [
    'referenceURL': 'http://ftp.ncbi.nlm.nih.gov/genomes/all/GCF/000/007/045/GCF_000007045.1_ASM704v1/GCF_000007045.1_ASM704v1_genomic.fna.gz',
    'sraAccession': 'ERR045788'
  ]
]


BASE_PATH = System.getProperty('user.dir') + '/'
BIN = BASE_PATH + '../bin'
ADAPTERS = BASE_PATH + '../adapters'
TMPDIR = 'kmc-temp'

KMERSIZE = 20
PLOTXMAX = 60
PLOTYMAX = 1200000
MINCOVERAGE = 5

THREADS = 20
MEMORYGB = 4

echo true

// ==== Download ====

process downloadReference {
  container true

  input: val referenceURL from species.collect { it.value.referenceURL }
  output: file 'reference.genomic.fna.gz' into referenceGenomeGz

  """
  appropriate/curl $referenceURL -o reference.genomic.fna.gz
  """
}

referenceGenomeGz.into { referenceGenomeGz1;
                         referenceGenomeGz2;
                         referenceGenomeGz3;
                         referenceGenomeGz4 }


process downloadSRA {
  container 'bionode/bionode-ncbi'

  input: val sraAccession from species.collect { it.value.sraAccession }
  output: file '**/*.sra' into reads

  """
  bionode-ncbi download sra $sraAccession > tmp
  """
}

// === EXTRACT/DECOMPRESS ===

process fastaqDump {
	container 'bionode/bionode-watermill:dev'

	input: file read from reads
	output: file '*.fastq.gz' into samples

	"""
	fastq-dump --split-files --skip-technical --gzip $read
	"""

}

( samples1,
  samples2 ) = samples.into(2)


process gunzipit {
	container 'bionode/bionode-watermill:dev'

	input: file referenceGenome from referenceGenomeGz1
	output: file 'reference.genomic.fna' into referenceGenomes

	"""
	gunzip -c $referenceGenome > reference.genomic.fna
	"""
}

( referenceGenomes1,
  referenceGenomes2 ) = referenceGenomes.into(2)

// // index using first bwa

process indexReferenceBwa {
	container 'bionode/bionode-watermill:dev'

	input: file reference from referenceGenomeGz2
	output: file '*.gz.*' into referenceIndexes

	"""
	bwa index $reference -p bwa_index
	"""
}

( referenceIndexes1,
  referenceIndexes2 ) = referenceIndexes.into(2)


// Bowtie 2
 process indexReferenceBowtie2 {

 	container 'bionode/bionode-watermill:dev'

 	input: file reference from referenceGenomeGz3
 	output: file '*.gz.*' into referenceIndexes

 	"""
 	bowtie2-build -q $reference $referenceIndexes
 	"""
 }

 //Mappers with bwa

 process bwaMapper {
 	container 'bionode/bionode-watermill:dev'

 	input:
    	file reference from referenceGenomeGz3
    	file referenceIndex from referenceIndexes1
    	file sample from reads_kmc
  	output: file 'bwa_output.sam' into readsUnsorted_kmc


  	"""
	bwa mem -t ${THREADS} bwa_index ${input.reference} ${input.sample} > $bwa_output.sam
	"""
 }

 // with bowtie2

 process bowtieMapper {
 	container 'bionode/bionode-watermill:dev'

 	input: 
 		referenceGenomes1 from referenceGenomes
 		referenceGenomes2 from  referenceGenomes
 	output: file 'bowtie2_output.sam' into readsUnsorted_kmc

 	"""
 	bowtie2 -p ${THREADS} -x bowtie_index -1 ${input.referenceGenomes1} -2 ${input.referenceGenomes2} -S $bowtie2_output.sam
 	"""
 }

 // === PIPELINE ===

 process pipeline {
 	container 'bionode/bionode-watermill:dev'

 	"""
 	#!/usr/bin/env node

 		junction(
      	getReference,
      	join(getSamples,fastqDump)
  	),
  	gunzipIt,
  	fork(
    	join(indexReferenceBwa, bwaMapper),
    	join(indexReferenceBowtie2, bowtieMapper)
  	)
	)

	pipeline().then(results => console.log('PIPELINE RESULTS: ', results))
	"""
 }
```

## Comparison between nextflow and bionode-watermill

Nextflow and bionode-watermill has lot's of similarity like code redusability and automated input/output handling.
While doing some of the examples in nextflow the use of channels makes the process easy.

* In nextflow we can use input of one process with channels so that it can be reused again like this
   
   ` ( samples1, samples2, ... , samplesN ) = samples.into(N)` 

* In nextflow `input` block defines which `channels` the **process** is expecting to receive inputs data from and output 
  allows to define the `channels` used by the **process** to send out the results produced. With the help of `channels` 
  `output` can be reused in different **processes** and this s one of the major advantage to use [nextflow](https://www.nextflow.io/).
  
 * Bionode-watermill and nextflow can use various scripting language just you have to do
 
     ``` python
     !#/usr/bin/env python
     ```
 
* In watermill `Input/Output`can be a **string glob pattern**, or a plain object of them. The glob will be **resolved to an
absolute path** when it is passed to the `operationCreator`. Bionode-watermill manages input and output files and folders
run by a `task`. All inputs and outputs are saved within data folder (generated by running bionode-watermill) in the
current working directory. It is difficult to design which **outputs** go to what **inputs** in watermill because it just 
goes up `DAG(Directed Acyclic Graph)` until found an output matching desired input pattern, so it can be ambiguous.

![alt text](https://github.com/bionode/gsoc18/blob/master/Images/Screenshot-from-2018-05-26-13-25-52.png "DAG")

  ```cypher 
     CREATE
   (a:Task { label: 'A'}), (b:Task { label: 'B'}), (c:Task { label: 'C'}), (d:Task { label: 'D'}),
   (a1:File { label: 'a1'}), (a2:File { label: 'a2'}), (a3:File { label: 'a3'}), 
   (b1:File { label: 'b1'}), (b2:File { label: 'b2'}),

   (a)-[:Output]->(a1),
   (a)-[:Output]->(a2),
   (a)-[:Output]->(a3),

   (a1)-[:Input]->(b),
   (a2)-[:Input]->(c),
   (a3)-[:Input]->(c),

   (b)-[:Output]->(b1),
   (b)-[:Output]->(b2),

   (b1)-[:Input]->(d) 
 ```


