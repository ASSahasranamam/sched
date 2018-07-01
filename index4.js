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
    mutateProbability: 0.01,
    mutate: mutate,
    crossoverProbability: 0.5,
    crossover: crossover
  },
  util = require('util')

var workers = [
  { //worker0
    id: 10,
    pos: 0,
    shifts: [
      {
        start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-20 02:00", "YYYY-MM-DD HH:mm"),
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
      },{
        start: moment("2010-10-22 11:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-22 14:00", "YYYY-MM-DD HH:mm")
      }
    ]
  },
  { //worker3
    id: 30,
    pos: 3,
    shifts: [
      { //worker3
        start: moment("2010-10-21 11:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm")
      },
      { //worker3
        start: moment("2010-10-21 15:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 19:00", "YYYY-MM-DD HH:mm")
      }, { //worker3
        start: moment("2010-10-21 09:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 17:00", "YYYY-MM-DD HH:mm")
      }
    ]
  },
  {//worker4
    id: 30,
    pos: 4,
    shifts: [
      { //worker4
        start: moment("2010-10-20 17:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
      },  {
            start: moment("2010-10-20 14:00 ", "YYYY-MM-DD HH:mm"),
            end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
          }
        ]
      }
]

//Duration of Task in Hours
//var duration = [1, 1, 2];

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

var j = [
  {
    jid: 1,
    duration: 2,
    data: {
      start: moment("2010-10-20 09:10", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 11:10", "YYYY-MM-DD HH:mm")
    }

  }, {
    jid: 2,
    duration: 1,
    data: {
      start: moment("2010-10-21 08:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 09:00", "YYYY-MM-DD HH:mm")
    }

  }, {
    jid: 3,
    duration: 2,
    data: {
      start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
    }

  },{
    jid: 4,
    duration: 3,
    data: {
      start: moment("2010-10-21 17:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 5,
    duration: 2,
    data: {
      start: moment("2010-10-20 17:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 19:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 6,
    duration: 2,
    data: {
      start: moment("2010-10-21 10:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 12:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 7,
    duration: 1,
    data: {
      start: moment("2010-10-21 14:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 15:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 8,
    duration: 1,
    data: {
      start: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 14:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 9,
    duration: 1,
    data: {
      start: moment("2010-10-22 09:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-22 10:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 10,
    duration: 2,
    data: {
      start: moment("2010-10-22 10:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-22 12:00", "YYYY-MM-DD HH:mm")
    }
  },{
    jid: 11,
    duration: 1,
    data: {
      start: moment("2010-10-22 16:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-22 17:00", "YYYY-MM-DD HH:mm")
    }
  }
]



//Gives a random value including of min range and ONLY LESSER THAN the max limit
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


//Returns a random hour during which both the worker and machine are available
// function getSimilarTimes(arr1, arr2) {
//   //  console.log("sss");
//   var returnArray = []
//
//   for (var i = 0; i < arr1.length; i++) {
//     //  console.log("getSimilarTimes");
//     //  console.log("arr2", arr2)
//     //  console.log(arr1)
//     //  console.log(arr2)
//     if (moment(arr1[i].start).isSameOrBefore(moment(arr2.data.start)) && ((arr1[i].end).isSameOrAfter(moment(arr2.data.start).add(arr2.duration, "h")))) {
//
//       if ((arr1[i].start).isSameOrAfter((arr2.data.start))) {
//         returnArray.push(arr1[i].start)
//       } else {
//         returnArray.push(arr2.data.start)
//       }
//     }
//   //  console.log(returnArray)
//   }
//
//   //console.log(returnArray)
//   if (returnArray.length == 1) {
//     return returnArray[0];
//   } else if (returnArray.length == 0) {
//     //  returns an easily identifiable value with year 1000, to indicate infeasable solution
//     return (moment("1010-10-20 11:00", "YYYY-MM-DD HH:mm"))
//   } else {
//     return returnArray[getRandomInt(0, returnArray.length - 1)]
//   }
// }

function getSimilarTimes(wArr,jArr){
  var returnArray = []
//There is no implementation for deadline of Job as of yet.
  for(var i=0;i<wArr.length;i++){
    if(moment(jArr.data.start).isSame(moment(wArr[i].start)) ){
      returnArray.push(wArr[i].start);
    }else if( moment(jArr.data.start).isAfter( moment(wArr[i].start)) ){
      if(moment(jArr.data.start).add(jArr.duration,"h").isSameOrBefore(wArr[i].end)){
        returnArray.push(jArr.data.start)
      }
    }else if( moment(wArr[i].start).isAfter( moment(jArr.data.start)) ){
      if(moment(wArr[i].start).add(jArr.duration,"h").isSameOrBefore(wArr[i].end)){
        returnArray.push(wArr[i].start)
      }
    }
  }
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
  var solution = [];
  for (i of j) {
    solution.push({
      jobid: i.jid,
      wid: getRandomInt(0, (workers.length - 1)),
      wpos: [],
      starttime: moment()
    })
  }

  for (var i = 0; i < solution.length; i++) {
    var returnShiftStart = [];
    var ss = workers[solution[i].wid]
    for (y of ss.shifts) {
      returnShiftStart.push({start: y.start, end: y.end});
    }

    solution[i].starttime = getSimilarTimes(returnShiftStart, j[i])
  }

  //console.log(solution)
  callback(solution)
}

function fitness(solution, callback) {
  var score = 100;

  for (i of solution) {
    if (moment(i.starttime).isSame(moment("1010-10-20 11:00"))) {
      score = score - 3;
    }
  }

  //Repetition, one worker should not be assigned 2 jobs at the same day and time.
  for (l = 0; l < solution.length; l++) {
    for (k = 0; k < solution.length; k++) {
      if (k != l && solution[k].wid == solution[l].wid && moment(solution[l].starttime).isSame(moment(solution[k].starttime))) {
        score = score - 1;
      }

    }
  }



  //Overlap, If one worker works from 10-12 on a job, he should not be assigned a differnt job at 11.

  //
  // for (i = 0; i < solution.length; i++) {
  //   for (k = 0; k < solution.length; k++) {
  //     if (k != i && solution[k].wid == solution[i].wid) {
  //       if (solution[k].starttime.isBefore(solution[i].starttime) && ( moment(solution[k].starttime).add(j[k].duration, 'hours').isBefore(moment(solution[i].starttime)))) {
  //         score = score - 1;
  //       }
  //
  //     }
  //
  //   }
  // }



  callback(score)
}

function crossover(parent1, parent2, callback) {
  var child = parent1
  //  console.log(parent1)
  for (i = 0; i < parent1.length; i++) {

    if (Math.random() > 0.5) {
      //console.log(child)
      child[i].jobid = parent1.jobid
      child[i].wid = parent1[i].wid
      child[i].starttime = parent1[i].starttime
    } else {
      child[i].jobid = parent2[i].jobid
      child[i].wid = parent2[i].wid
      child[i].starttime = parent2[i].starttime
    }

  }

  callback(child)
}

//MUTATION

function mutate(solution, callback) {

  for (i of solution) {
    if (Math.random() < 0.3) {
      i.wid = getRandomInt(0, workers.length - 1)
    }
  }

  for (var i = 0; i < solution.length; i++) {
    //console.log(solution.aT)
    // if( typeof solution.aT != "undefined"){
    var returnShiftStart = [];
    var ss = workers[solution[i].wid]
    for (y of ss.shifts) {
      //      console.log("XXXXX", y)
      returnShiftStart.push({start: y.start, end: y.end});
      //            console.log(returnShiftStart);
      // }
    }

    if (Math.random() < 0.3) {
      solution[i].starttime = getSimilarTimes(returnShiftStart, j[i])
    }

  }

  callback(solution)
}

function stopCriteria() {
  return (this.generation === 1000);
}

console.log('=== TEST BEGINS === ');
var t = new Task(options);

t.on('statistics', function(statistics) {
  console.log('statistics', statistics)
});

t.on('error', function(error) {
  console.log('ERROR - ', error)
});
t.run(function(stats) {
  console.log('results', stats);
});
