//hello
var genetic = require('genetic');
var Task = genetic.Task
  , options = { getRandomSolution : getRandomSolution
            , popSize : 500
            , stopCriteria : stopCriteria
            , fitness : fitness
            , minimize : false
            , mutateProbability : 0.05
            , mutate : mutate
            , crossoverProbability : 0.5
            , crossover : crossover
            }
    , util = require('util')

var workers = [[10,11],[7,8,9,10,11],[7,8,9,10,11],[1,2]];

var j  = [[7],[7],[8,9],[8],[11],[10,11],[11]];
var duration = [1,1,2,1,1,2,1];
var predecessor = [0,1,0,0,2,1,1];

var j1 = [3];
var j2 = [4];
var j3 = [8,9];
var j4 = [8];
var j5 = [11];
var j6 = [10,11];
var j7 = [11];

var priority = [1.5, 0.5, 1, 0.5 ,1.5, 0.5, 0.5]
var workerTimes = []


for(var i =0;i<workers.length;i++){
  workerTimes.push(workers[i].length);
}

console.log(j.typeOf);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getSimilarTimes(arr1, arr2){
  var returnArray = []
  var unrepArr = []


  arr1.forEach((e1)=> {
    if(arr1.some(e1 => arr2.includes(e1)) == true){
  returnArray.push(e1);
    }
  })


  return returnArray[getRandomInt(0,returnArray.length-1)]
  }



function getRandomSolution(callback) {
  var solution = {
     a: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     aT: [],
     b: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     bT: [],
      c: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     cT:[],
     d: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     dT:[],
     e: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     eT:[],
     f: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     fT: [],
     g: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     gT: []

   }

   solution.aT = getSimilarTimes(workers[solution.a], j1)
   solution.bT = getSimilarTimes(workers[solution.b], j2)
   solution.cT = getSimilarTimes(workers[solution.c], j3)
   solution.dT = getSimilarTimes(workers[solution.d], j4)
   solution.eT = getSimilarTimes(workers[solution.e], j5)
   solution.fT = getSimilarTimes(workers[solution.f], j6)
   solution.gT = getSimilarTimes(workers[solution.g], j7)

  callback(solution)
}
function fitness(solution, callback) {
//  console.log(solution);
  var score = 0;
  if(workers[solution.a].some(ele => j1.includes(ele)) == true){
    score = score+1;
  }
  if(workers[solution.b].some(ele => j2.includes(ele)) == true){
    score = score+1;
  }
  if(workers[solution.c].some(ele => j3.includes(ele)) == true){
    score = score+1;
  }
  if(workers[solution.d].some(ele => j4.includes(ele)) == true){
    score = score+1;
  }
  if(workers[solution.e].some(ele => j5.includes(ele)) == true){
    score = score+1;
  }
  if(workers[solution.f].some(ele => j6.includes(ele)) == true){
    score = score+1;
  }
  if(workers[solution.g].some(ele => j7.includes(ele)) == true){
    score = score+1;
  }

  if(j1.includes(solution.aT) == true){
    score = score+1;
  }
  if(j2.includes(solution.bT) == true){
    score = score+1;
  }
  if(j3.includes(solution.cT) == true){
    score = score+1;
  }
  if(j4.includes(solution.dT) == true){
    score = score+1;
  }
  if(j5.includes(solution.eT) == true){
      score = score+1;
    }
  if(j6.includes(solution.fT) == true){
      score = score+1;
    }
  if(j7.includes(solution.gT) == true){
      score = score+1;
    }

    var simInd = []
    var mechAssn = [solution.a,solution.b,solution.c,solution.d,solution.e,solution.f,solution.g]
    var timeAssn = [solution.aT,solution.bT,solution.cT,solution.dT,solution.eT,solution.fT,solution.gT]

    for (j=0;j<mechAssn.length;j++){
      for (k=0;k<mechAssn.length;k++){
        if (k!=j && mechAssn[k] == mechAssn[j] && timeAssn[k] === timeAssn[j]){
            score = score - 1;
          }

      }
    }

    for (j=0;j<mechAssn.length;j++){
      for (k=0;k<mechAssn.length;k++){
        if (k!=j && mechAssn[k] == mechAssn[j]) {
          if( timeAssn[k] < timeAssn[j] && ((timeAssn[k] + duration[k]) > timeAssn[j] ) ){
            score = score - 1;
          }

        }

      }
    }

    if(workerTimes[solution.a] === duration[0] && (workers[solution.a][0] === j1[0]) ){
        score=score+1;
    }
    if(workerTimes[solution.b] === duration[1] && (workers[solution.b][0] === j2[0])){
        score=score+1;
    }
    if(workerTimes[solution.c] === duration[2] && (workers[solution.c][0] === j3[0])){
        score=score+1;
    }
    if(workerTimes[solution.d] === duration[3] && (workers[solution.d][0] === j4[0])){
        score=score+1;
    }
    if(workerTimes[solution.e] === duration[4] && (workers[solution.e][0] === j5[0])){
        score=score+1;
    }
    if(workerTimes[solution.f] === duration[5] && (workers[solution.f][0] === j6[0])){
        score=score+1;
    }
    if(workerTimes[solution.g] === duration[6] && (workers[solution.g][0] === j7[0])){
        score=score+1;
    }

    if(workerTimes[solution.a] >= duration[0] && ( solution.aT + duration[0]  <= 1 + j1[(j1.length-1)])){
        score=score+1;
    }

    if(workerTimes[solution.b] >= duration[1] && ( solution.bT + duration[1]  <= 1 + j2[(j2.length-1)])){
        score=score+1;
    }

    if(workerTimes[solution.c] >= duration[2] && ( solution.cT + duration[2]  <= 1 + j3[(j3.length-1)])){
        score=score+1;
    }

    if(workerTimes[solution.d] >= duration[3] && ( solution.dT + duration[3]  <= 1 + j4[(j4.length-1)])){
        score=score+1;
    }

    if(workerTimes[solution.e] >= duration[4] && ( solution.eT + duration[4]  <= 1 + j5[(j5.length-1)])){
            score=score+1;
        }

    if(workerTimes[solution.f] >= duration[5]  && ( solution.fT + duration[5] <= 1 + j6[(j6.length-1)])){
            score=score+1;
        }

    if(workerTimes[solution.g] >= duration[6] && ( solution.gT + duration[6]  <= 1 + j7[(j7.length-1)])){
        score=score+1
    }

  callback(score)
}

function crossover(parent1, parent2, callback) {
  var child = {}
  if (Math.random()>0.5) {
    child.a = parent1.a
    child.aT = parent1.aT
  }
  else {
    child.a = parent2.a
    child.aT = parent2.aT
  }
  if (Math.random()>0.5) {
    child.b = parent1.b
    child.bT = parent1.bT

  }
  else {
    child.b = parent2.b
    child.bT = parent2.bT

  }
  if (Math.random()>0.5) {
    child.c = parent1.c
    child.cT = parent1.cT

  }
  else {
    child.c = parent2.c
    child.cT = parent2.cT
  }
  if (Math.random()>0.5) {
    child.d = parent1.d
    child.dT = parent1.dT

  }
  else {
    child.d = parent2.d
    child.dT = parent2.dT

  }
  if (Math.random()>0.5) {
    child.e = parent1.e
    child.eT = parent1.eT

    }
  else {
    child.e = parent2.e
    child.eT = parent2.eT

    }
    if (Math.random()>0.5) {
      child.f = parent1.f
      child.fT = parent1.fT
      }
    else {
      child.f = parent2.f
      child.fT = parent1.fT
      }
    if (Math.random()>0.5) {
    child.g = parent1.g
    child.gT = parent1.gT
  }
  else {
    child.g = parent2.g
    child.gT = parent2.gT
  }
  callback(child)
}

function mutate(solution, callback) {
  if (Math.random()<0.3) {
    solution.a = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }
  if (Math.random()<0.3) {
    solution.b = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }
  if (Math.random()<0.3) {
    solution.d = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }
  if (Math.random()<0.3) {
    solution.c = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }
  if (Math.random()<0.3) {
    solution.e = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }
  if (Math.random()<0.3) {
    solution.f = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }
  if (Math.random()<0.3) {
    solution.g = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  }


    if (Math.random()<0.3) {
      solution.aT = getSimilarTimes(workers[solution.a], j1)
    }
    if (Math.random()<0.3) {
      solution.bT = getSimilarTimes(workers[solution.b], j2)
    }
    if (Math.random()<0.3) {
      solution.cT = getSimilarTimes(workers[solution.c], j3)

    }
    if (Math.random()<0.3) {
      solution.dT = getSimilarTimes(workers[solution.d], j4)
        }
    if (Math.random()<0.3) {
      solution.eT = getSimilarTimes(workers[solution.e], j5)
    }
    if (Math.random()<0.3) {
      solution.fT = getSimilarTimes(workers[solution.f], j6)
      }

    if (Math.random()<0.3) {
      solution.gT = getSimilarTimes(workers[solution.g], j7)
    }



  callback(solution)
}


function stopCriteria() {
  return (this.generation == 3000);
}

console.log('=== TEST BEGINS === ')
var t = new Task(options)
  t.on('run start', function () { console.log('run start'); util.log('run') })
  t.on('run finished', function (results) { console.log('run finished - ', results); util.log('run')})
// t.on('init start', function () { console.log('init start') })
// t.on('init end', function (pop) { console.log('init end', pop) })
// t.on('loop start', function () { console.log('loop start') })
// t.on('loop end', function () { console.log('loop end') })
// t.on('iteration start', function (generation) { console.log('iteration start - ',generation) })
// t.on('iteration end', function () { console.log('iteration end') })
// t.on('calcFitness start', function () { console.log('calcFitness start') })
// t.on('calcFitness end', function (pop) { console.log('calcFitness end', pop) })
// t.on('parent selection start', function () { console.log('parent selection start') })
// t.on('parent selection end', function (parents) { console.log('parent selection end ',parents) })
// t.on('reproduction start', function () { console.log('reproduction start') })
//
//  t.on('find sum', function () { console.log('find sum') })
 //t.on('find sum end', function (sum) { console.log('find sum end', sum) })

//t.on('statistics', function (statistics) { console.log('statistics',statistics)})
// //
// t.on('normalize start', function () { console.log('normalize start') })
// t.on('normalize end', function (normalized) { console.log('normalize end',normalized) })
// t.on('child forming start', function () { console.log('child forming start') })
// t.on('child forming end', function (children) { console.log('child forming end',children) })
// t.on('child selection start', function () { console.log('child selection start') })
// t.on('child selection end', function (population) { console.log('child selection end',population) })
//
// t.on('mutate', function () { console.log('MUTATION!') })
//
//
// t.on('reproduction end', function (children) { console.log('reproduction end',children) })

t.on('error', function (error) { console.log('ERROR - ', error) })
t.run(function (stats) { //console.log('results', stats);

console.log("Max", stats.max.gT);
 })
