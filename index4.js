//hello
var genetic = require('genetic');
var moment = require('moment');
var Task = genetic.Task,
  options = {
    getRandomSolution: getRandomSolution,
    popSize: 500,
    stopCriteria: stopCriteria,
    fitness: fitness,
    minimize: false,
    mutateProbability: 0.05,
    mutate: mutate,
    crossoverProbability: 0.5,
    crossover: crossover
  },
  util = require('util')

//var workers = [[10,11],[7,8,9,10,11],[7,8,9,10,11],[1,2]];

// Worker Availability hours Start Times (Every Hour)

// var workers = [
//   [
//     [moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")],
//     [moment("2010-10-20 13:00", "YYYY-MM-DD HH:mm"),moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
//   ],
//
//   [
//     [moment("2010-10-21 07:59", "YYYY-MM-DD HH:mm"),
//     moment("2010-10-21 09:59", "YYYY-MM-DD HH:mm")],
//     [moment("2010-10-20 18:00", "YYYY-MM-DD HH:mm"),
//     moment("2010-10-20 22:00", "YYYY-MM-DD HH:mm")]
//   ]
// ]
var workers = [

  [
    { //worker0
      start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
    }, {
      start: moment("2010-10-20 02:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
    }
  ],
  [
    { //worker1
      start: moment("2010-10-20 13:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
    }, {
      start: moment("2010-10-21 08:00 ", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
    }
  ],
  [
    { //worker2
      id: 3,
      start: moment("2010-10-20 08:00 ", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
    }
  ]
]

//,[7,8,9,10
//,11],[7,8,9,10,11],[1,2]];

// var j  = [[7],[7],[8,9],[8],[11],[10,11],[11]];
//Duration of Task in Hours
var duration =[1,1,2];

var predecessor = [
  0,
  1,
  0,
  0,
  2,
  1,
  1
];

//Machine Availability times Start Times (Every Hour)
var j1 = {
  duration: 1,
  data: [
    {
      start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
    }
  ]
};

var j2 = {
  duration: 1,
  data: [
    {
      start: moment("2010-10-21 08:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 09:00", "YYYY-MM-DD HH:mm")
    }, {
      start: moment("2010-10-21 18:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 21:00", "YYYY-MM-DD HH:mm")
    }
  ]
};

var j3 = {
  duration: 2,
  data: [
    {
      start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
    }
  ]
};

//How many Hours are the workers available?
// var workerTimes = []
// for (var i = 0; i < workers.length; i++) {
//   workerTimes.push(workers[i].length);
// }

// duration(j.typeOf);

//Gives a random value including of min range and ONLY LESSER THAN the max limit
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Returns a random hour during which both the worker and machine are available
function getSimilarTimes(arr1, arr2) {
  var returnArray = []

          for (var i = 0; i < arr1.length; i++) {
            for (var a = 0; a < arr2.data.length; a++) {
              if (moment(arr1[i].start).isSameOrBefore(moment(arr2.data[a].start)) && (moment(arr1[i].end).isSameOrAfter(moment(arr2.data[a].start).add(arr2.duration, "h")))) {

                if (moment(arr1[i].start).isSameOrAfter(moment(arr2.data[a].start))) {
                  returnArray.push(arr1[i].start)
                } else {
                  returnArray.push(arr2.data[a].start)
                }
              }
              console.log(returnArray)
            }
  }

  //console.log(returnArray)
  if (returnArray.length == 1) {
    return returnArray[0];
  } else if (returnArray.length == 0) {
    //  returns an easily identifiable value with year 1000, to indicate infeasable solution
    return (moment("1010-10-20 11:00", "YYYY-MM-DD HH:mm"))
  } else {
    return returnArray[getRandomInt(0, returnArray.length - 1)]
  }
}

function getRandomSolution(callback) {
  var solution = {
    a: getRandomInt(0, (workers.length - 1)),
    aT: [],
    b: getRandomInt(0, (workers.length - 1)),
    bT: [],
    c: getRandomInt(0, (workers.length - 1)),
    cT: [],
    // d: Math.floor(Math.random() * (3 - 0 + 1) + 0),
    // dT:[],
    // e: Math.floor(Math.random() * (3 - 0 + 1) + 0),
    // eT:[],
    // f: Math.floor(Math.random() * (3 - 0 + 1) + 0),
    // fT: [],
    // g: Math.floor(Math.random() * (3 - 0 + 1) + 0),
    // gT: []

  }

  solution.aT = getSimilarTimes(workers[solution.a], j1)
  solution.bT = getSimilarTimes(workers[solution.b], j2)
  solution.cT = getSimilarTimes(workers[solution.c], j3)
  // solution.dT = getSimilarTimes(workers[solution.d], j4)
  // solution.eT = getSimilarTimes(workers[solution.e], j5)
  // solution.fT = getSimilarTimes(workers[solution.f], j6)
  // solution.gT = getSimilarTimes(workers[solution.g], j7)

  callback(solution)
}
function fitness(solution, callback) {
  //  console.log(solution);
  var score = 10;
  // if(workers[solution.a].some(ele => j1.includes(ele)) == true){
  //   score = score+1;
  // }
  // if(workers[solution.b].some(ele => j2.includes(ele)) == true){
  //   score = score+1;
  // }
  // if(workers[solution.c].some(ele => j3.includes(ele)) == true){
  //   score = score+1;
  // }
  // if(workers[solution.d].some(ele => j4.includes(ele)) == true){
  //   score = score+1;
  // }
  // if(workers[solution.e].some(ele => j5.includes(ele)) == true){
  //   score = score+1;
  // }
  // if(workers[solution.f].some(ele => j6.includes(ele)) == true){
  //   score = score+1;
  // }
  // if(workers[solution.g].some(ele => j7.includes(ele)) == true){
  //   score = score+1;
  // }
  for (var i of workers[solution.a]) {
    //console.log(solution.aT)
    // if( typeof solution.aT != "undefined"){
    if (solution.aT.isSame(i.start)) {
      score = score + 1;
      // }
    }
  }
  for (var i of workers[solution.b]) {
    //  console.log(solution.bT)
    // if( typeof solution.aT != "undefined"){
    if (solution.bT.isSame(i.start)) {
      score = score + 1;
      // }
    }
  }
  for (var i of workers[solution.c]) {
    //console.log(solution.aT)
    // if( typeof solution.aT != "undefined"){
    if (solution.cT.isSame(i.start)) {
      score = score + 1;
      // }
    }
  }
  for (var i of j1.data) {
    //console.log(solution.aT)
    // if( typeof solution.aT != "undefined"){
    if (solution.aT.isSame(i.start)) {
      score = score + 1;
      // }
    }
  }
  for (var i of j2.data) {
    //  console.log(solution.bT)
    // if( typeof solution.aT != "undefined"){
    if (solution.bT.isSame(i.start)) {
      score = score + 1;
      // }
    }
  }
  for (var i of j3.data) {
    //console.log(solution.aT)
    // if( typeof solution.aT != "undefined"){
    if (solution.cT.isSame(i.start)) {
      score = score + 1;
      // }
    }
  }

  // if (j1.includes(solution.aT) == true) {
  //   score = score + 1;
  // }
  // if (j2.includes(solution.bT) == true) {
  //   score = score + 1;
  // }
  // if (j3.includes(solution.cT) == true) {
  //   score = score + 1;
  // }
  // if(j4.includes(solution.dT) == true){
  //   score = score+1;
  // }
  // if(j5.includes(solution.eT) == true){
  //     score = score+1;
  //   }
  // if(j6.includes(solution.fT) == true){
  //     score = score+1;
  //   }
  // if(j7.includes(solution.gT) == true){
  //     score = score+1;
  //   }

  var simInd = []
  // var mechAssn = [solution.a,solution.b,solution.c,solution.d,solution.e,solution.f,solution.g]
  // var timeAssn = [solution.aT,solution.bT,solution.cT,solution.dT,solution.eT,solution.fT,solution.gT]

  var mechAssn = [solution.a,solution.b,solution.c];
  var timeAssn = [solution.aT,solution.bT,solution.cT];

  //Repetition, one worker should not be assigned 2 jobs at the same day and time.
  for (j = 0; j < mechAssn.length; j++) {
    for (k = 0; k < mechAssn.length; k++) {
      if (k != j && mechAssn[k] == mechAssn[j] && (timeAssn[k].isSame(timeAssn[j]))) {
        score = score - 1;
      }

    }
  }

  //Overlap, If one worker works from 10-12 on a job, he should not be assigned a differnt job at 11.


  //
  // for (j = 0; j < mechAssn.length; j++) {
  //   for (k = 0; k < mechAssn.length; k++) {
  //     if (k != j && mechAssn[k] == mechAssn[j]) {
  //       if (timeAssn[k].isBefore(timeAssn[j]) && (timeAssn[k].add(duration[k], 'hours').isBefore(timeAssn[j]))) {
  //         score = score - 1;
  //       }
  //
  //     }
  //
  //   }
  // }

  // if(workerTimes[solution.a] === duration[0] && (workers[solution.a][0] === j1[0]) ){
  //     score=score+1;
  // }
  // if(workerTimes[solution.b] === duration[1] && (workers[solution.b][0] === j2[0])){
  //     score=score+1;
  // }
  // if(workerTimes[solution.c] === duration[2] && (workers[solution.c][0] === j3[0])){
  //     score=score+1;
  // }
  // if(workerTimes[solution.d] === duration[3] && (workers[solution.d][0] === j4[0])){
  //     score=score+1;
  // }
  // if(workerTimes[solution.e] === duration[4] && (workers[solution.e][0] === j5[0])){
  //     score=score+1;
  // }
  // if(workerTimes[solution.f] === duration[5] && (workers[solution.f][0] === j6[0])){
  //     score=score+1;
  // }
  // if(workerTimes[solution.g] === duration[6] && (workers[solution.g][0] === j7[0])){
  //     score=score+1;
  // }

  //Both Worker and machine should be available for the entire duration of job

//
//       if(workerTimes[solution.a] >= duration[0] && ( solution.aT + duration[0]  <= 1 + j1[(j1.length-1)])){
//           score=score+1;
//       }
//
// if()
//
//
//
//   var cj1 = moment(j1[(j1.length - 1)])
//   cj1.add(1, 'hours')
//   var tj1 = moment(solution.aT)
//   tj1.add(duration[0], 'hours');
//   if (workerTimes[solution.a] >= duration[0]) {
//     if (tj1.isBefore(cj1)) {
//       score = score + 1;
//     } else if (tj1.isBefore(cj1)) {
//       score = score + 1;
//     }
//     console.log(cj1 + "//" + tj1)
//   }


  if (solution.aT.isSame(moment("1010-10-20 11:00"))) {
    score = score - 3;
  }
  if (solution.bT.isSame(moment("1010-10-20 11:00"))) {
    score = score - 3;
  }
  if (solution.cT.isSame(moment("1010-10-20 11:00"))) {
    score = score - 3;
  }
  // if (workerTimes[solution.b] >= duration[1]){
  //   if(solution.bT.add(duration[1], "h").isBefore(j2[(j2.length - 1)].add(1, "h") ))
  //   {
  //     score = score + 1;
  //   }
  //   else if(solution.bT.add(duration[1], "h").isSame(j2[(j2.length - 1)].add(1, "h") ))
  //   {
  //     score = score + 1;
  //   }
  // }
  //
  // if (workerTimes[solution.c] >= duration[2]){
  //   if(solution.cT.add(duration[2], "h").isBefore(j3[(j3.length - 1)].add(1, "h") )){
  //
  //     score = score + 1;
  //   }
  //   else if(solution.cT.add(duration[2], "h").isSame(j3[(j3.length - 1)].add(1, "hours")))
  //   {
  //     score = score + 1;
  //   }
  // }
  // if(workerTimes[solution.b] >= duration[1] && ( solution.bT + duration[1]  <= 1 + j2[(j2.length-1)])){
  //     score=score+1;
  // }
  //
  // if(workerTimes[solution.c] >= duration[2] && ( solution.cT + duration[2]  <= 1 + j3[(j3.length-1)])){
  //     score=score+1;
  // }
  //
  // if(workerTimes[solution.d] >= duration[3] && ( solution.dT + duration[3]  <= 1 + j4[(j4.length-1)])){
  //     score=score+1;
  // }
  //
  // if(workerTimes[solution.e] >= duration[4] && ( solution.eT + duration[4]  <= 1 + j5[(j5.length-1)])){
  //         score=score+1;
  //     }
  //
  // if(workerTimes[solution.f] >= duration[5]  && ( solution.fT + duration[5] <= 1 + j6[(j6.length-1)])){
  //         score=score+1;
  //     }
  //
  // if(workerTimes[solution.g] >= duration[6] && ( solution.gT + duration[6]  <= 1 + j7[(j7.length-1)])){
  //     score=score+1
  // }

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
  // if (Math.random()>0.5) {
  //   child.d = parent1.d
  //   child.dT = parent1.dT
  //
  // }
  // else {
  //   child.d = parent2.d
  //   child.dT = parent2.dT
  //
  // }
  // if (Math.random()>0.5) {
  //   child.e = parent1.e
  //   child.eT = parent1.eT
  //
  //   }
  // else {
  //   child.e = parent2.e
  //   child.eT = parent2.eT
  //
  //   }
  //   if (Math.random()>0.5) {
  //     child.f = parent1.f
  //     child.fT = parent1.fT
  //     }
  //   else {
  //     child.f = parent2.f
  //     child.fT = parent1.fT
  //     }
  //   if (Math.random()>0.5) {
  //   child.g = parent1.g
  //   child.gT = parent1.gT
  // }
  // else {
  //   child.g = parent2.g
  //   child.gT = parent2.gT
  // }
  callback(child)
}

function mutate(solution, callback) {
  if (Math.random() < 0.3) {
    solution.a = getRandomInt(0,workers.length-1)
  }
  if (Math.random() < 0.3) {
    solution.b = getRandomInt(0,workers.length-1)
  }
  if (Math.random() < 0.3) {
    solution.c = getRandomInt(0,workers.length-1)
  }
  // if (Math.random()<0.3) {
  //   solution.d = Math.floor(Math.random() * (1 - 0 + 1) + 0)
  // }

  // if (Math.random()<0.3) {
  //   solution.e = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  // }
  // if (Math.random()<0.3) {
  //   solution.f = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  // }
  // if (Math.random()<0.3) {
  //   solution.g = Math.floor(Math.random() * (3 - 0 + 1) + 0)
  // }

  if (Math.random() < 0.3) {
    solution.aT = getSimilarTimes(workers[solution.a], j1)
  }
  if (Math.random() < 0.3) {
    solution.bT = getSimilarTimes(workers[solution.b], j2)
  }
  if (Math.random() < 0.3) {
    solution.cT = getSimilarTimes(workers[solution.c], j3)

  }
  // if (Math.random()<0.3) {
  //   solution.dT = getSimilarTimes(workers[solution.d], j4)
  //     }
  // if (Math.random()<0.3) {
  //   solution.eT = getSimilarTimes(workers[solution.e], j5)
  // }
  // if (Math.random()<0.3) {
  //   solution.fT = getSimilarTimes(workers[solution.f], j6)
  //   }
  //
  // if (Math.random()<0.3) {
  //   solution.gT = getSimilarTimes(workers[solution.g], j7)
  // }

  callback(solution)
}

function stopCriteria() {
  return (this.generation == 10);
}

console.log('=== TEST BEGINS === ')
var t = new Task(options);

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

t.on('statistics', function(statistics) {
  console.log('statistics', statistics)
});
//
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
t.on('error', function(error) {
  console.log('ERROR - ', error)
});
t.run(function(stats) {
  console.log('results', stats);

});
