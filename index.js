//hello
var genetic = require('genetic');
var Task = genetic.Task
  , options = { getRandomSolution : getRandomSolution
            , popSize : 500
            , stopCriteria : stopCriteria
            , fitness : fitness
            , minimize : false
            , mutateProbability : 0.1
            , mutate : mutate
            , crossoverProbability : 0.3
            , crossover : crossover
            }
    , util = require('util')

var workers = [[10],[8,9,10,11],[7,8,9,10],[8]];

var j = [[7], [7],[8,9][8],[11],[10],[11]];
var j1 = [7];
var j2 = [7];
var j3 = [8,9];
var j4 = [8];
var j5 = [11];
var j6=[10];
var j7 = [11];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomSolution(callback) {
  var solution = {
     a: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     b: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     c: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     d: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     e: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     f: Math.floor(Math.random() * (3 - 0 + 1) + 0),
     g: Math.floor(Math.random() * (3 - 0 + 1) + 0)

   }
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
  callback(score)
}

function crossover(parent1, parent2, callback) {
  var child = {}
  if (Math.random()>0.5) {
    child.a = parent1.a
  }
  else {
    child.a = parent2.a
  }
  if (Math.random()>0.5) {
    child.b = parent1.b
  }
  else {
    child.b = parent2.b
  }
  if (Math.random()>0.5) {
    child.c = parent1.c
  }
  else {
    child.c = parent2.c
  }
  if (Math.random()>0.5) {
    child.d = parent1.d
  }
  else {
    child.d = parent2.d
  }
  if (Math.random()>0.5) {
    child.e = parent1.e
    }
  else {
    child.e = parent2.e
    }
  if (Math.random()>0.5) {
    child.f = parent1.f
      }
  else {
    child.f = parent2.f
      }
  if (Math.random()>0.5) {
    child.g = parent1.g
          }
  else {
    child.g = parent2.g
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

  callback(solution)
}


function stopCriteria() {
  return (this.generation == 1000)
}

console.log('=== TEST BEGINS === ')
var t = new Task(options)// t.on('run start', function () { console.log('run start'); util.log('run') })
//  t.on('run finished', function (results) { console.log('run finished - ', results); util.log('run')})
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
// t.on('find sum end', function (sum) { console.log('find sum end', sum) })

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
t.run(function (stats) { console.log('results', stats); })
