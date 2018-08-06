var moment = require('moment');
var sortJsonArray = require('sort-json-array');
require('sanic.js').changeMyWorld();

var config = {
  "iterations": 100,
  "size": 100,
  "crossover": 0.5,
  "mutation": 0.05,
  "eliteness": 0.2
}


var jobs = {
  projStart: moment("2018-08-01 08:00", "YYYY-MM-DD HH:mm"),
  projDeadline: moment("2018-08-03 20:00", "YYYY-MM-DD HH:mm"),
  list: [
    {
      jid: 0,//formalise specs
      duration: 6,
      predecessor: []
    }, {
      jid: 1,//design hardware
      duration: 4,
      predecessor: [0]
    }, {
      jid: 2,//layout manual
      duration: 3,
      predecessor: [0]
    }, {
      jid: 3,//breadboard hardware
      duration: 2,
      predecessor: [1]

    }
    , {
      jid: 4,//finish manual
      duration: 4,
      predecessor: [2]

    }
    , {
      jid: 5,//test hardware
      duration: 3,
      predecessor: [3]

    }
    , {
      jid: 6,//design software
      duration: 6,
      predecessor: [0]

    }
    , {
      jid: 7,//release hardware
      duration: 2,
      predecessor: [6,5]
      //predecessor: [6]

    }
    , {
      jid: 8,//complete software
      duration: 4,
      predecessor: [6]

    }
    , {
      jid: 9,//release manual
      duration: 1,
      predecessor: [4]

    }, {
      jid: 10,//print manuals
      duration: 4,
      predecessor: [9]

    }, {
      jid: 11,//Release software
      duration: 1,
      predecessor: [8]

    }, {
      jid: 12,//Manufacture hardware
      duration: 4,
      predecessor: [7]

    }, {
      jid: 13,//Deliver project
      duration: 1,
      predecessor: [10,11,12]
      //predecessor: [12]
      }
    ]
}
  var workers = [
    { //worker0
      id: 5,
      pos: 0,
      shifts: [
        {
          start: moment("2018-08-01 10:00", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-01 20:00", "YYYY-MM-DD HH:mm")
        }, {
          start: moment("2018-08-02 13:00", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-02 20:00", "YYYY-MM-DD HH:mm")
        }
      ]
    }, { //worker1
      id: 10,
      pos: 1,
      shifts: [
        {
          start: moment("2018-08-01 13:00", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-01 20:00", "YYYY-MM-DD HH:mm")
        }, {
          start: moment("2018-08-02 08:00 ", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-02 20:00", "YYYY-MM-DD HH:mm")
        }, {
          start: moment("2018-08-03 08:00 ", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-03 20:00", "YYYY-MM-DD HH:mm")
        }
      ]
    }, { //worker2
      id: 20,
      pos: 2,
      shifts: [
        {
          start: moment("2018-08-01 08:00", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-01 15:00", "YYYY-MM-DD HH:mm")
        },
        {
          start: moment("2018-08-01 15:00 ", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-01 20:00", "YYYY-MM-DD HH:mm")
        }
        ,{
          start: moment("2018-08-02 10:00", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-02 14:00", "YYYY-MM-DD HH:mm")
        }
      ]
    }, { //worker3
      id: 30,
      pos: 3,
      shifts: [
        { //worker3
          start: moment("2018-08-01 15:00", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-01 20:00", "YYYY-MM-DD HH:mm")
        }, { //worker3
          start: moment("2018-08-02 08:00 ", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-02 19:00", "YYYY-MM-DD HH:mm")
        },
        { //worker3
          start: moment("2018-08-03 08:00 ", "YYYY-MM-DD HH:mm"),
          end: moment("2018-08-03 20:00", "YYYY-MM-DD HH:mm")
        },
      ]
    }
      ]

// //data set 1 for Oct 2010
// var workers = [
//   { //worker0
//     id: 10,
//     pos: 0,
//     shifts: [
//       {
//         start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
//       }, {
//         start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   }, { //worker1
//     id: 20,
//     pos: 1,
//     shifts: [
//       {
//         start: moment("2010-10-20 13:00", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
//       }, {
//         start: moment("2010-10-21 08:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
//       }, {
//         start: moment("2010-10-22 08:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-22 12:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   }, { //worker2
//     id: 30,
//     pos: 2,
//     shifts: [
//       {
//         start: moment("2010-10-20 08:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
//       }, {
//         start: moment("2010-10-22 11:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-22 14:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   }, { //worker3
//     id: 30,
//     pos: 3,
//     shifts: [
//       { //worker3
//         start: moment("2010-10-21 11:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm")
//       }, { //worker3
//         start: moment("2010-10-21 15:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-21 19:00", "YYYY-MM-DD HH:mm")
//       }, { //worker3
//         start: moment("2010-10-22 09:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-22 17:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   }, { //worker4
//     id: 30,
//     pos: 4,
//     shifts: [
//       { //worker4
//         start: moment("2010-10-20 17:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
//       }, {
//         start: moment("2010-10-21 14:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-21 16:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   }
// ]
//
// var jobs = {
//   projStart: moment("2010-10-20 09:10", "YYYY-MM-DD HH:mm"),
//   projDeadline: moment("2010-10-23 09:10", "YYYY-MM-DD HH:mm"),
//   list: [
//     {
//       jid: 0,
//       duration: 2,
//       predecessor: []
//     }, {
//       jid: 1,
//       duration: 1,
//       predecessor: [0]
//     }, {
//       jid: 2,
//       duration: 2,
//       predecessor: [1]
//     }, {
//       jid: 3,
//       duration: 3,
//       predecessor: [2]
//
//     }, {
//       jid: 4,
//       duration: 2,
//       predecessor: []
//
//     }
//     // , {
//     //   jid: 5,
//     //   duration: 2,
//     //   predecessor: []
//     // }, {
//     //   jid: 6,
//     //   duration: 1,
//     //   predecessor: []
//     // }, {
//     //   jid: 7,
//     //   duration: 1,
//     //   predecessor: []
//     // }, {
//     //   jid: 8,
//     //   duration: 1,
//     //   predecessor: []
//     //   }
//     // , {
//     //   jid: 9,
//     //   duration: 2,
//     //   predecessor: []
//     // }, {
//     //   jid: 10,
//     //   duration: 1,
//     //   predecessor: []
//     // }
//   ]
// }
//
// //gets predecessor

function getPred(job) {
  return job.predecessor
}

//Gives a random value including of min range and ONLY LESSER THAN the max limit
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var population = [];
var bestPopulation = []
var bbscore=[]
function seed() {
  var solution = [];
  //for tasks without predecessor allocate user with earliest shift
  for (i of jobs.list) {
    var getjob = getPred(jobs.list[i.jid])

    var seedworker
    if (getjob.length ===0){
      //here assign the worker whose shift start time is as close as possible to project start time
      seedworker = getRandomInt(0, workers.length -1)


    }
    else {
      seedworker = getRandomInt(0, workers.length -1 )
    }
    solution.push({
      jobid: i.jid,
      wid: seedworker,
      //lag: 0,
      wpos: [],
      priority: 1
    })
    //  console.log(solution)
  }

  //solution[0].starttime = moment(jobs.projStart)
  //solution[0].endtime = moment(solution[0].starttime).add(jobs.list[0].duration, 'h')

  for (var i = 0; i < solution.length; i++) {
    //solution[i].starttime = moment("1010-10-20 11:00")
    solution[i].starttime = getSimilarTimes(solution[i].jobid, solution)
    solution[i].endtime = moment(solution[i].starttime).add(jobs.list[i].duration, 'h')

  }
  //  console.log(solution)
  return solution;

}
function getSimilarTimes(jobid, solution) {
  var getjob = getPred(jobs.list[jobid])

  var possibleEndDate = hmGAGetLatestEndDatePredecessorForJobId(jobid, solution)

  if (getjob.length === 0) {
    possibleEndDate = jobs.projStart
  }
    // fails if no worker is available at start time.
  // } else {
    // console.log(getjob[0])
    // var x = getjob[0]
    // solution[x].priority = solution[x].priority + 2
var y = solution[jobid].wid
for(s of workers[y].shifts){

  if(moment(possibleEndDate).isSameOrAfter(s.start)){
    if(moment(possibleEndDate).add(jobs.list[jobid].duration,'h').isSameOrBefore(s.end)){
      return moment(possibleEndDate)
      break
    }
  } else if(moment(s.start).isAfter(moment(possibleEndDate))){
      if(moment(s.end).isAfter(moment(possibleEndDate).add(jobs.list[jobid].duration,'h' ))) {
    //    console.log("jobid, worker start date, possibleenddate",solution[jobid],moment(s.start),moment(possibleEndDate))
        return moment(s.start)
      }
    }
    else {
      return moment('1010-10-20 11:00', "YYYY-MM-DD HH:mm")

        }

      }

      return moment(possibleEndDate)

    }

  //}
  // this methode used to get the greatest end date

function hmGAGetLatestEndDatePredecessorForJobId(jobid, solution) {

    var predecessorTasks = getPred(jobs.list[jobid])

    if (predecessorTasks.length === 0) {

      return jobs.projStart

    } else {
for (var prejobId of predecessorTasks) {
      var tempStartDate = jobs.projStart
      solution[prejobId].priority = solution[prejobId].priority + 1

        if (moment(solution[prejobId].endtime).isAfter(tempStartDate)) {

          tempStartDate = solution[prejobId].endtime
        }
      }

      return tempStartDate

    }

}



function createPop() {

  for (var i = 0; i < config.size; i++) {
    population.push(seed())
    population[i].score = fitness(population[i])
  }

}

function fitness(solution) {
  var score = 1;
  //if first task starts with hte project start time, add points
  // if (moment(solution[0].starttime).isSame(moment(jobs.projStart)))
  // {
  //   score = score + 1
  // }
  for (i of solution) {

    // if(moment(i.starttime).isSame(moment(jobs.projStart))){
    //   score = score + 2;
    // }
    var getjob = getPred(i.jobid)
    //add additional points if successor is scheduled immediately after end date of predecessor.
    var predMaxEndDate = hmGAGetLatestEndDatePredecessorForJobId(i.jobid, solution)
    if (moment(predMaxEndDate).isSame(i.starttime)) {
      //score = score + 1
    }
    var sttimes = workers[i.wid]; //get worker shift times
    //console.log(sttimes)//worker times
    for (st of sttimes.shifts) {

      if (moment(i.starttime).isSameOrAfter(moment(st.start))) { //after Worker Start time

        if (moment(i.endtime).isSameOrBefore(moment(st.end))) {  //before Worker End time
          score = score + (i.priority * 2);
          //score = score +10
          break;
          }
        }
      }


  }

  //there should not be 2 jobs starting at the same time
  for (var l = 0; l < solution.length; l++) {
    for (var k = l + 1; k < solution.length; k++) {

      if (solution[k].wid === solution[l].wid) {
        if ((moment(solution[l].starttime).isSame(moment(solution[k].starttime))))
      {// if start dates are same for both the tasks.
          //  solution[l].starttime = moment("1000-10-20 11:00")
          score = score - (1 * solution[l].priority);
          solution[k].wpos.push('overlap ' + l )
          solution[l].wpos.push('overlap ' + k )

          break
          //console.log('repeat checking',l,k,solution[l].starttime,solution[k].starttime)
        }
         else {
         if ((moment(solution[l].starttime).isAfter(moment(solution[k].starttime))) && moment(solution[l].endtime).isSameOrBefore(moment(solution[k].endtime)) ) {
//           //  solution[l].starttime = moment("1000-10-20 11:00")
                 score = score - (1 * solution[l].priority);
//   //DOES NOT WORK as priority must be given to tasks predecessors
// //score = score -2
            solution[k].wpos.push('Partialoverlap')
//           //console.log('repeat checking',l,k,solution[l].starttime,solution[k].starttime)
//         }
    }
  }
}
}}


// if(solution[solution.length-1].endtime.isSameOrBefore(jobs.projDeadline) ){
//   score = score + 5
// }

  return score
}

//
//
//alternate sorting function
var sort_by = function(field, reverse, primer){

					   var key = primer ?
					       function(x) {return primer(x[field])} :
					       function(x) {return x[field]};

					   reverse = !reverse ? 1 : -1;

					   return function (a, b) {
					       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
					   }
				}

function reproduce() {

  var matingPool = [];
  // ArrayList which we will use for our "mating pool"


  for (i of population) {

    for (var y = 0; y < i.score * 100; y++) {
      matingPool.push(i)
    }
  }

  for (i = 0; i < population.length; i++) {
    var a = getRandomInt(0, matingPool.length - 1);
    var b = getRandomInt(0, matingPool.length - 1);
    var parentA = matingPool[a];
    var parentB = matingPool[b];
    var child = crossover(parentA, parentB);
     mutate(child);
    child.score = fitness(child);
    population[i] = child;

  }
  //population = sortJsonArray(population, 'score', 'des')
  //population.sort(sort_by('score', false, parseInt));



//console.log(" iterations",population[0])
}

function crossover(parentA, parentB) {
  var child = parentA

  console.log(child)
  for (i = 0; i < child.length; i++) {
    child[i].wpos=[]
    if (Math.random() > 0.5) {
      //console.log(child)
      child[i].wid = parentA[i].wid
      child[i].starttime = moment(parentA[i].starttime)
    } else {
      child[i].wid = parentB[i].wid
      child[i].starttime = moment(parentB[i].starttime)
    }

  }
  return child
}

function mutate(solution) {

  for (var i = 0; i < solution.length; i++) {

    if (Math.random() < config.mutation) {
      solution[i].wid = getRandomInt(0, workers.length - 1)

      var wstart = solution[i].wid
      if (workers[wstart].shifts.length === 1) {
        solution[i].starttime === moment(workers[wstart].starttime)
      } else {
        var sttimes = []

        for (st of workers[wstart].shifts) {
          sttimes.push(moment(st.starttime))
        }

        solution[i].starttime = sttimes[getRandomInt(0, sttimes.length - 1)]
        solution[i].endtime = moment(solution[i].starttime).add(jobs.list[i].duration, 'h')

      }

    }
  }

  return solution
}

function start() {
  createPop()
  console.log("=-TEST-START-=")
  var fittest = 0;
  var MaxScore = 0;
  for (var i = 0; i < config.iterations; i++) {
    // while( fittest<5){
  //  population = sortJsonArray((population), 'score', 'des')
    //console.log('pre repo score :  ', population[0].score)
    population.sort(sort_by('score', true, parseInt));

    reproduce();
    //population = sortJsonArray(population, 'score', 'des')
    population.sort(sort_by('score', true, parseInt));

    console.log('Max Score of gen:  ', i, population[0].score)
    bestPopulation.push(population[0])
    bbscore.push(population[0].score)

    console.log('score pushed : ', bestPopulation[bestPopulation.length-1].score  )
    console.log('Min Score of gen :  ', i, population[population.length-1].score)
    bestPopulation.sort(sort_by('score', true, parseInt))
    console.log('bestScore so far', bestPopulation[0].score)


  }
    population = checkAndAdjust(population);

  console.log(" iterations", i)
  //population = sortJsonArray((population), 'score' )
  population.sort(sort_by('score', true, parseInt));
//  bestPopulation.sort(sort_by('score', true, parseInt));


  console.log("Highest", population[0].score)

  bestPopulation.sort(function(a, b){
    return b.score - a.score
  })

  console.log("Highest BEST population : ", bestPopulation[0].length, bestPopulation[0].score)
//  console.log("Highest BEST population", bestPopulation[bestPopulation.length-1])
bbscore.sort(function(a, b){
  return b-a
})
  console.log("Best Score: ",bbscore)
}


  function checkAndAdjust(population){

//  bestPopulation =  bestPopulation.sort(sort_by('score', true, parseInt));
  console.log('with return based', bestPopulation[0].score)
  //console.log(bestPopulation)
  for(sol of population){
    var value = "0"
    for(j of sol){
      if(j.wpos.length > 0){
        value = "1"
      }
      if (value == "0") {
      //  console.log("Best Values", sol.score)
      }
    }


  }
    return population
  }
//function checkAndAdjust(population){
// for(sol of population){
//   for(j of sol){
//     if(j.wpos.length > 0){
//
//       //  j.starttime = moment("1010-10-20 11:00")
//       //  j.endtime = moment("1010-10-20 11:00")
//     }
//   }
// }
//   return population
// }

start();
