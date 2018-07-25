var moment = require('moment');
var sortJsonArray = require('sort-json-array');
require('sanic.js').changeMyWorld();

var config = {
  "iterations": 100,
  "size": 500,
  "crossover": 0.5,
  "mutation": 0.05,
  "eliteness": 0.2
};

//data set 1 for Oct 2010
var workers = [
  { //worker0
    id: 10,
    pos: 0,
    shifts: [
      {
        start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }, { //worker1
    id: 20,
    pos: 1,
    shifts: [
      {
        start: moment("2010-10-20 13:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-21 08:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-22 08:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-22 12:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }, { //worker2
    id: 30,
    pos: 2,
    shifts: [
      {
        start: moment("2010-10-20 08:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-22 11:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-22 14:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }, { //worker3
    id: 30,
    pos: 3,
    shifts: [
      { //worker3
        start: moment("2010-10-21 11:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm")
      }, { //worker3
        start: moment("2010-10-21 15:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 19:00", "YYYY-MM-DD HH:mm")
      }, { //worker3
        start: moment("2010-10-22 09:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-22 17:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }, { //worker4
    id: 30,
    pos: 4,
    shifts: [
      { //worker4
        start: moment("2010-10-20 17:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-21 14:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 16:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }
]

var jobs = {
  projStart: moment("2010-10-20 09:10", "YYYY-MM-DD HH:mm"),
  projDeadline: moment("2010-10-23 09:10", "YYYY-MM-DD HH:mm"),
  list: [
    {
      jid: 0,
      duration: 2,
      predecessor: []
    }, {
      jid: 1,
      duration: 1,
      predecessor: [0]
    }, {
      jid: 2,
      duration: 2,
      predecessor: [1]
    }, {
      jid: 3,
      duration: 3,
      predecessor: [2]

    }, {
      jid: 4,
      duration: 2,
      predecessor: []

    }
    // , {
    //   jid: 5,
    //   duration: 2,
    //   predecessor: []
    // }, {
    //   jid: 6,
    //   duration: 1,
    //   predecessor: []
    // }, {
    //   jid: 7,
    //   duration: 1,
    //   predecessor: []
    // }, {
    //   jid: 8,
    //   duration: 1,
    //   predecessor: []
    //   }
    // , {
    //   jid: 9,
    //   duration: 2,
    //   predecessor: []
    // }, {
    //   jid: 10,
    //   duration: 1,
    //   predecessor: []
    // }
  ]
}

//gets predecessor

function getPred(job) {
  return job.predecessor
}

//Gives a random value including of min range and ONLY LESSER THAN the max limit
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var population = [];

function seed() {
  var solution = [];
  for (i of jobs.list) {
    solution.push({
      jobid: i.jid,
      wid: getRandomInt(0, (workers.length - 1)),
      wpos: [],
      priority: 1
    })
    //  console.log(solution)
  }

  solution[0].starttime = moment(jobs.projStart)
  solution[0].endtime = moment(solution[0].starttime).add(jobs.list[0].duration, 'h')

  for (var i = 1; i < solution.length; i++) {
    solution[i].starttime = getSimilarTimes(solution[i].jobid, solution)
    solution[i].endtime = moment(solution[i].starttime).add(jobs.list[i].duration, 'h')

  }
  //  console.log(solution)
  return solution;

}

function getSimilarTimes(jobid, solution) {
  var getjob = getPred(jobs.list[jobid])

  if (getjob.length === 0) {
    return jobs.projStart
  } else {
    console.log(getjob[0])
    var x = getjob[0]
    solution[x].priority = solution[x].priority + 2
    return solution[x].endtime
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
  //initialize the score as 0
  //5 Points added to score per successfull Match.

  for (i of solution) {
    var sttimes = workers[i.wid];
    console.log(sttimes)
    for (st of sttimes.shifts) {
      if ((i.starttime).isSameOrAfter((st.start))) {
        if ((i.endtime).isSameOrBefore((st.end))) {
          score = score + (i.priority * 1);
          break
        }

      }

    }

  }

  //there should not be 2 jobs starting at the same time
  for (var l = 0; l < solution.length; l++) {
    for (var k = l + 1; k < solution.length; k++) {

      if (solution[k].wid === solution[l].wid) {
        if (((solution[l].starttime).isSame(solution[k].starttime))) {
          //  solution[l].starttime = moment("1000-10-20 11:00")
  //        score = score - 1;
  //DOES NOT WORK as priority must be given to tasks predecessors



          solution[k].wpos.push('overlap')
          break
          //console.log('repeat checking',l,k,solution[l].starttime,solution[k].starttime)
        } else if (((solution[l].starttime).isSameOrAfter(solution[k].starttime)) && (solution[l].starttime).isSameOrBefore(solution[k].endtime) ) {
          //  solution[l].starttime = moment("1000-10-20 11:00")
                  score = score - 1;
  //DOES NOT WORK as priority must be given to tasks predecessors



          solution[k].wpos.push('Partialoverlap')
          //console.log('repeat checking',l,k,solution[l].starttime,solution[k].starttime)
        }
    }
  }
}

  return score
}

//
//
function reproduce() {

  var matingPool = []; // ArrayList which we will use for our "mating pool"

  for (i of population) {

    for (var y = 0; y < i.score * 100; y++) {
      matingPool.push(i)
    }
  }

  for (i = 0; i < population.length; i++) {
    var child;
    var a = getRandomInt(0, matingPool.length - 1);
    var b = getRandomInt(0, matingPool.length - 1);
    var parentA = matingPool[a];
    var parentB = matingPool[b];
    //  child = crossover(parentA, parentB);
    //  mutate(child);
    child = parentA
    child.score = fitness(child);
    population[i] = child;
  }

}

function crossover(parentA, parentB) {
  var child = parentA

  for (i = 0; i < child.length; i++) {
    child[i].wpos=[]
    if (Math.random() > 0.5) {
      //console.log(child)
      child[i].wid = parentA[i].wid
      child[i].starttime = parentA[i].starttime
    } else {
      child[i].wid = parentB[i].wid
      child[i].starttime = parentB[i].starttime
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
        solution[i].starttime === workers[wstart].starttime
      } else {
        var sttimes = []

        for (st of workers[wstart].shifts) {
          sttimes.push(st.starttime)
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
    reproduce();

  }
  population = checkAndAdjust(population);

  population = sortJsonArray((population), 'score', 'des')
  console.log("xxx", population)
  console.log("Highest", population[0])
}

function checkAndAdjust(population){


for(sol of population){
  for(j of sol){
    if(j.wpos.length > 0){
        j.starttime = moment("1010-10-20 11:00")
        j.endtime = moment("1010-10-20 11:00")
    }
  }
}
  return population
}

start();
