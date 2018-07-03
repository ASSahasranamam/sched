var genetic = require('genetic');
var moment = require('moment');
var Task = genetic.Task,
  options = {
    getRandomSolution: getRandomSolution,
    popSize: 500,
    stopCriteria: stopCriteria,
    fitness: fitness,
    minimize: false,
    mutateProbability: 0.1,
    mutate: mutate,
    crossoverProbability: 0.5,
    crossover: crossover
  },
  util = require('util')
//data set 2 for July 2018
  // var workers = [
  //   { //worker0
  //     id: 10,
  //     pos: 0,
  //     shifts: [
  //       {
  //         start: moment("2018-07-01 09:00", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-01 14:00", "YYYY-MM-DD HH:mm")
  //       }, {
  //         start: moment("2018-07-02 10:00", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-02 11:00", "YYYY-MM-DD HH:mm")
  //       }
  //       // ,
  //       // {
  //       //   start: moment("2018-07-02 17:00", "YYYY-MM-DD HH:mm"),
  //       //   end: moment("2018-07-02 19:00", "YYYY-MM-DD HH:mm")
  //       // }
  //     ]
  //   }, { //worker1
  //     id: 20,
  //     pos: 1,
  //     shifts: [
  //       // {
  //       //   start: moment("2018-07-01 15:00", "YYYY-MM-DD HH:mm"),
  //       //   end: moment("2018-07-01 17:00", "YYYY-MM-DD HH:mm")
  //       // },
  //       {
  //         start: moment("2018-07-02 10:00 ", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-02 17:00", "YYYY-MM-DD HH:mm")
  //     //  }, {
  //       //   start: moment("2010-10-22 08:00 ", "YYYY-MM-DD HH:mm"),
  //       //   end: moment("2010-10-22 12:00", "YYYY-MM-DD HH:mm")
  //      }
  //     ]
  //   },
  //    { //worker2
  //     id: 30,
  //     pos: 2,
  //     shifts: [
  //       {
  //         start: moment("2018-07-01 14:00 ", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-01 18:00", "YYYY-MM-DD HH:mm")
  //       },{
  //         start: moment("2018-07-02 12:00 ", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-02 14:00", "YYYY-MM-DD HH:mm")
  //       }
  //     ]
  //   },
  //   { //worker3
  //     id: 30,
  //     pos: 3,
  //     shifts: [
  //       { //worker3
  //         start: moment("2018-07-02 17:00 ", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-02 19:00", "YYYY-MM-DD HH:mm")
  //       },
  //       { //worker3
  //         start: moment("2018-07-01 19:00 ", "YYYY-MM-DD HH:mm"),
  //         end: moment("2018-07-01 20:15", "YYYY-MM-DD HH:mm")
  //       }
  //     ]
  //   },
    // {//worker3
    //   id: 30,
    //   pos: 4,
    //   shifts: [
    //     { //worker4
    //       start: moment("2010-10-20 17:00 ", "YYYY-MM-DD HH:mm"),
    //       end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
    //     },
    //     {
    //           start: moment("2010-10-21 14:00 ", "YYYY-MM-DD HH:mm"),
    //           end: moment("2010-10-21 16:00", "YYYY-MM-DD HH:mm")
    //         }
    //       ]
    //     }
  //]
//data set 2 for July 2018
  // var j = [
  //   // {
  //   //   jid: 1,
  //   //   duration: 2,
  //   //   data: {
  //   //     start: moment("2018-07-01 09:00", "YYYY-MM-DD HH:mm"),
  //   //     end: moment("2018-07-01 11:00", "YYYY-MM-DD HH:mm")
  //   //   }
  //   //
  //   // },
  //   {
  //     jid: 1,
  //     duration : 2,
  //     data:{
  //       start: moment("2018-07-01 09:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-01 11:00", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //     {
  //     jid: 2,
  //     duration: 2,
  //     data: {
  //       start: moment("2018-07-01 11:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-01 13:00", "YYYY-MM-DD HH:mm")
  //     }
  //
  //   }, {
  //     jid: 3,
  //     duration: 1,
  //     data: {
  //       start: moment("2018-07-01 06:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-01 07:00", "YYYY-MM-DD HH:mm")
  //     }
  //
  //   },
  //   {
  //     jid: 4,
  //     duration: 1.5,
  //     data: {
  //       start: moment("2018-07-02 09:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 10:30", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 5,
  //     duration: 2,
  //     data: {
  //       start: moment("2018-07-02 12:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 14:00", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 6,
  //     duration: 1,
  //     data: {
  //       start: moment("2018-07-01 15:30", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-01 16:30", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 7,
  //     duration: 1.5,
  //     data: {
  //       start: moment("2018-07-01 14:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-01 15:30", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 8,
  //     duration: 2,
  //     data: {
  //       start: moment("2018-07-02 14:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 16:00", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 9,
  //     duration: 1.5,
  //     data: {
  //       start: moment("2018-07-02 10:30", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 12:00", "YYYY-MM-DD HH:mm")
  //     }
  //   }
  //   ,{
  //     jid: 10,
  //     duration: 1,
  //     data: {
  //       start: moment("2018-07-02 16:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 17:00", "YYYY-MM-DD HH:mm")
  //     }
  //   },{
  //     jid: 11,
  //     duration: 2,
  //     data: {
  //       start: moment("2018-07-02 17:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 19:00", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 12,
  //     duration: 1,
  //     data: {
  //       start: moment("2018-07-02 17:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-02 18:00", "YYYY-MM-DD HH:mm")
  //     }
  //   },
  //   {
  //     jid: 13,
  //     duration: 2.15,
  //     data: {
  //       start: moment("2018-07-01 19:00", "YYYY-MM-DD HH:mm"),
  //       end: moment("2018-07-01 20:15", "YYYY-MM-DD HH:mm")
  //     }
  //   }
  // ]

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
  },
   { //worker2
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
  { //worker2
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
        start: moment("2010-10-22 09:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-22 17:00", "YYYY-MM-DD HH:mm")
      }
    ]
  },
  {//worker3
    id: 30,
    pos: 4,
    shifts: [
      { //worker4
        start: moment("2010-10-20 17:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
      },
      {
            start: moment("2010-10-21 14:00 ", "YYYY-MM-DD HH:mm"),
            end: moment("2010-10-21 16:00", "YYYY-MM-DD HH:mm")
          }
        ]
      }
]


//Duration of Task in Hours
//var duration = [1, 1, 2];

//Machine Availability times Start Times (Every Hour)
//data set 1 2010 Oct
var j = [
  {
    jid: 1,
    duration: 2,
    data: {
      start: moment("2010-10-20 09:10", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 11:10", "YYYY-MM-DD HH:mm")
    }

  },
    {
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

  },
  {
    jid: 4,
    duration: 3,
    data: {
      start: moment("2010-10-21 17:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
    }
  },
  {
    jid: 5,
    duration: 2,
    data: {
      start: moment("2010-10-20 17:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 19:00", "YYYY-MM-DD HH:mm")
    }
  },
  {
    jid: 6,
    duration: 2,
    data: {
      start: moment("2010-10-21 10:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 12:00", "YYYY-MM-DD HH:mm")
    }
  },
  {
    jid: 7,
    duration: 1,
    data: {
      start: moment("2010-10-21 14:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 15:00", "YYYY-MM-DD HH:mm")
    }
  },
  {
    jid: 8,
    duration: 1,
    data: {
      start: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 14:00", "YYYY-MM-DD HH:mm")
    }
  },
  {
    jid: 9,
    duration: 1,
    data: {
      start: moment("2010-10-22 09:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-22 10:00", "YYYY-MM-DD HH:mm")
    }
  }
  ,{
    jid: 10,
    duration: 2,
    data: {
      start: moment("2010-10-22 9:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-22 11:00", "YYYY-MM-DD HH:mm")
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

function getSimilarTimes(wArr, jArr) {

     var returnArray = []
     for(var i=0; i<wArr.length; i++){
//  for(i of wArr){
    //console.log('wArr === i',wArr,i)
if ((jArr.data.start).isSameOrAfter(moment(wArr[i].start)) &&
    (jArr.data.end).isSameOrBefore(moment(wArr[i].end)) ) {
      returnArray.push(jArr.data.start)
    }
  }

  if (returnArray.length === 1) {
      return moment(returnArray[0]);
    } else if (returnArray.length === 0) {
      //  returns an easily identifiable value with year 1000, to indicate infeasable solution
      return (moment("1010-10-20 11:00", "YYYY-MM-DD HH:mm"))
    } else {
      return moment(returnArray[getRandomInt(0, returnArray.length - 1)])
    }
}


function getRandomSolution(callback) {
  var solution = [];
  for (i of j) {
    solution.push({
      jobid: i.jid,
      wid: getRandomInt(0, (workers.length -1 )),
      wpos: [],
      starttime: moment()
    })
    //  console.log(solution)
  }

  for (var i = 0; i < solution.length; i++) {
    var returnShiftStart = [];
    var ss = workers[solution[i].wid]
    for (var y of ss.shifts) {
      returnShiftStart.push({start: y.start, end: y.end});
    }
    solution[i].starttime = getSimilarTimes(returnShiftStart, j[i])
  }
  callback(solution)
}

function fitness(solution, callback) {
  //initialize the score as 0
  //5 Points added to score per successfull Match.
  var score = 1;

  //Check if there worker is available or not!
  for (i of solution) {
    if (moment(i.starttime).isAfter(moment("1010-10-20 11:00"))) {
      score = score + 3;
    }
    else {
      if(moment(i.starttime).isSame(moment("1010-10-20 11:00"))){
      //  score = score - 1;
      }
    }
  }
  //worker start time and job start time match ?
  for (var i = 0; i < solution.length; i++) {
    //console.log(solution.aT)
    // if( typeof solution.aT != "undefined"){
      var w = solution[i].wid
      var wst = workers[w].shifts
      for(var y = 0; y< workers[w].shifts.length;y++){
        if ((j[i].data.start).isSameOrAfter(moment(workers[w].shifts[y].start)) &&
        (j[i].data.end).isSameOrBefore(moment(workers[w].shifts[y].end)) ) {
        score = score + 1;
        // }
      }
    }

  }
//Do Solution's start time match with the Job's availability start time
  // for (var i = 0; i < j.length; i++) {
  //   var w = solution[i].wid
  //   var wst = workers[w].shifts
  //   for(var y = 0; y< workers[w].shifts.length;y++){
  //
  //   //console.log(solution.aT)
  //   // if( typeof solution.aT != "undefined"){
  //   if ( (moment(workers[w].shifts.start).isSameOrBefore((j[i].data.start))) &&
  //   // asubu should it be worker start time?
  //   ((j[i].data.end).isSameOrBefore(moment(wst[y].end)))) {
  //     score = score + 1;
  //     // }
  //   }
  // }
//}
   //asubu uncommented
  //Repetition, one worker should not be assigned 2 jobs at the same day and time.
  for (var l = 0; l < solution.length; l++) {
    for ( var k = l+1; k < solution.length; k++) {
      if (k!== l) {
        if(solution[k].wid === solution[l].wid) {
          if(((solution[l].starttime).isSame(solution[k].starttime)))
          {
          //  solution[l].starttime = moment("1000-10-20 11:00")
          score = score - 1; //DOES NOT WORK

          //console.log('repeat checking',l,k,solution[l].starttime,solution[k].starttime)
          }
          else {
            //not same start time but before or after means allow.
            //console.log('repeat checking',l,k,solution[l].starttime,solution[k].starttime)
            if(((j[l].data.end).isSameOrBefore(solution[k].starttime)) ||
            ((j[k].data.end).isSameOrBefore(solution[l].starttime)))
            score = score + 1
          }
        }

      }

    }
  }

  //Overlap, If one worker works from 10-12 on a job, he should not be assigned a differnt job at 11.


  // for (var l = 0; l < solution.length; l++) {
  //   for (k = l+1; k < solution.length; k++) {
  //     if ((k !== l) && (solution[k].wid === solution[l].wid)) {
  //       if (solution[k].starttime.isSameOrBefore(solution[l].starttime)
  //       && (moment(solution[k].starttime).add(j[k].duration, 'hours').isSameOrAfter(solution[l].starttime))) {
  //         score = score - 1;
  //       }
  //
  //     }
  //
  //   }
  // }



  callback(score)
}
function startCheck(solutionEle,i){
  if (solutionEle.starttime.isSame(moment("1010-10-20 11:00"))){
    //
    // if (moment(solutionEle.starttime).isSame((j[i].data.start))) {
    //
    //   var w = solutionEle.wid
    //   var wst = workers[w].shifts
    //   for(var y = 0; y< workers[w].shifts.length;y++){
    //     if ((j[i].data.start).isSame(moment(workers[w].shifts[y].start))) {
           return false;
        // }
    //   }
    // }
  } else{
    return true;
  }

}
// function startCheck(solutionEle){
//   if (solutionEle.starttime.isAfter(moment("1010-10-20 11:00"))){
//
//     // if (moment(solutionEle.starttime).isSame((j[i].data.start))) {
//     //
//     //   var w = solutionEle.wid
//     //   var wst = workers[w].shifts
//     //   for(var y = 0; y< workers[w].shifts.length;y++){
//     //     if ((j[i].data.start).isSame(moment(workers[w].shifts[y].start))) {
//            return true;
//     //     }
//     //   }
//     // }
//   } else{
//     return false;
//   }
//
// }
function crossover(parent1, parent2, callback) {
  var child = parent1
  //  console.log(parent1)
  //if solution.starttime is  moment("1010-10-20 11:00") crossover else dont do anything
  //
  for (i = 0; i < parent1.length; i++) {
    //asubu
    if (startCheck(parent1[i],i)=== true){
    child[i].starttime = parent1[i].starttime
    child[i].jobid = parent1[i].jobid
    child[i].wid = parent1[i].wid
  } else if (startCheck(parent2[i],i)=== true){
      child[i].jobid = parent2[i].jobid
      child[i].wid = parent2[i].wid
      child[i].starttime = parent2[i].starttime
  } else {
    if (Math.random() > 0.5)  {
      //console.log(child)
      child[i].jobid = parent1[i].jobid
      child[i].wid = parent1[i].wid
      child[i].starttime = parent1[i].starttime
    } else {
      child[i].jobid = parent2[i].jobid
      child[i].wid = parent2[i].wid
      child[i].starttime = parent2[i].starttime
    }
  }
    //
    //
    //
    //
    // if (Math.random() > 0.5) {
    //   //console.log(child)
    //   child[i].jobid = parent1[i].jobid
    //   child[i].wid = parent1[i].wid
    //   child[i].starttime = parent1[i].starttime
    // } else {
    //   child[i].jobid = parent2[i].jobid
    //   child[i].wid = parent2[i].wid
    //   child[i].starttime = parent2[i].starttime
    // }

  }

  callback(child)
}

//MUTATION

function mutate(solution, callback) {


  for (var i = 0; i < solution.length; i++) {

    if (Math.random() < 0.3 && (startCheck(solution[i],i)=== false ) ) {
      solution[i].wid = getRandomInt(0, workers.length - 1)

      var returnShiftStart = [];
      var ss = workers[solution[i].wid]
      for (y of ss.shifts) {
      //console.log("score in mutate", solution[i].score)
        returnShiftStart.push({start: y.start, end: y.end});
      }
        //solution[i].starttime = moment(returnShiftStart[getRandomInt(0, returnShiftStart.length - 1)])
 solution[i].starttime = getSimilarTimes(returnShiftStart, j[i])
    }
  }
  callback(solution)
}

function stopCriteria() {
  return (this.generation === 100);
}

console.log('=== TEST BEGINS === ');
var t = new Task(options);

// t.on('init start', function () { console.log('init start') })
// t.on('init end', function (pop) { console.log('init end', pop) })
// t.on('loop start', function () { console.log('loop start') })
// t.on('loop end', function () { console.log('loop end') })
//   t.on('iteration start', function (generation) { console.log('iteration start - ',generation) })
// t.on('iteration end', function () { console.log('iteration end') })
// t.on('calcFitness start', function () { console.log('calcFitness start') })
//     t.on('calcFitness end', function (pop) { console.log('calcFitness end', pop) })
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
//  t.on('child selection end', function (population) { console.log('child selection end',population) })
//
// t.on('mutate', function () { console.log('MUTATION!') })
//
//
// t.on('reproduction end', function (children) { console.log('reproduction end',children) })

t.on('error', function(error) {
  console.log('ERROR - ', error)
});
t.run(function(stats) {
  console.log('results',stats, 'MAXSCORE',stats.maxScore);
});
