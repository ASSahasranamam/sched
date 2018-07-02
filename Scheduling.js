
var moment = require('moment');
var sortJsonArray = require('sort-json-array');


var config = {
    "iterations": 10
    , "size": 20
    , "crossover": 0.5
    , "mutation": 0.05
    , "eliteness": 0.2
  };
  var fittest = []
var maxPpg =[]
// var workers = [
//   { //worker0
//     id: 10,
//     pos: 0,
//     shifts: [
//       {
//         start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
//       }, {
//         start: moment("2010-10-20 02:00", "YYYY-MM-DD HH:mm"),
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
//       },{
//         start: moment("2010-10-22 11:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-22 14:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   },
//   { //worker3
//     id: 30,
//     pos: 3,
//     shifts: [
//       { //worker3
//         start: moment("2010-10-21 11:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm")
//       },
//       { //worker3
//         start: moment("2010-10-21 15:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-21 19:00", "YYYY-MM-DD HH:mm")
//       }, { //worker3
//         start: moment("2010-10-22 09:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-22 17:00", "YYYY-MM-DD HH:mm")
//       }
//     ]
//   },
//   {//worker4
//     id: 30,
//     pos: 4,
//     shifts: [
//       { //worker4
//         start: moment("2010-10-20 17:00 ", "YYYY-MM-DD HH:mm"),
//         end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
//       },  {
//             start: moment("2010-10-21 14:00 ", "YYYY-MM-DD HH:mm"),
//             end: moment("2010-10-21 16:00", "YYYY-MM-DD HH:mm")
//           }
//         ]
//       }
// ]


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

var workers = [
  {
    id: 10,
    pos: 0,
    shifts: [
      { //worker0
        start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 20:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }, {
    id: 20,
    pos: 1,
    shifts: [
      { //worker1
        start: moment("2010-10-20 13:00", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
      }, {
        start: moment("2010-10-21 08:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }, {
    id: 30,
    pos: 2,
    shifts: [
      { //worker2
        start: moment("2010-10-20 08:00 ", "YYYY-MM-DD HH:mm"),
        end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
      }
    ]
  }
]

//Duration of Task in Hours
var duration = [1, 1, 2];

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
      start: moment("2010-10-20 10:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 12:00", "YYYY-MM-DD HH:mm")
    }

  }, {
    jid: 2,
    duration: 1,
    data: {
      start: moment("2010-10-21 08:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-21 09:00", "YYYY-MM-DD HH:mm")
    }

  }, {
    duration: 2,
    data: {
      start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
      end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
    }

  }
]
//
// var j = [
//   {
//     jid: 1,
//     duration: 2,
//     data: {
//       start: moment("2010-10-20 09:10", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-20 11:10", "YYYY-MM-DD HH:mm")
//     }
//
//   }, {
//     jid: 2,
//     duration: 1,
//     data: {
//       start: moment("2010-10-21 08:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-21 09:00", "YYYY-MM-DD HH:mm")
//     }
//
//   }, {
//     jid: 3,
//     duration: 2,
//     data: {
//       start: moment("2010-10-20 14:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-20 16:00", "YYYY-MM-DD HH:mm")
//     }
//
//   },{
//     jid: 4,
//     duration: 3,
//     data: {
//       start: moment("2010-10-21 17:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-21 20:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 5,
//     duration: 2,
//     data: {
//       start: moment("2010-10-20 17:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-20 19:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 6,
//     duration: 2,
//     data: {
//       start: moment("2010-10-21 10:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-21 12:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 7,
//     duration: 1,
//     data: {
//       start: moment("2010-10-21 14:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-21 15:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 8,
//     duration: 1,
//     data: {
//       start: moment("2010-10-21 13:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-21 14:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 9,
//     duration: 1,
//     data: {
//       start: moment("2010-10-22 09:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-22 10:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 10,
//     duration: 2,
//     data: {
//       start: moment("2010-10-22 10:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-22 12:00", "YYYY-MM-DD HH:mm")
//     }
//   },{
//     jid: 11,
//     duration: 1,
//     data: {
//       start: moment("2010-10-22 16:00", "YYYY-MM-DD HH:mm"),
//       end: moment("2010-10-22 17:00", "YYYY-MM-DD HH:mm")
//     }
//   }
// ]

function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

//Gives a random value including of min range and ONLY LESSER THAN the max limit
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getSimilarTimes(wArr,jArr){
  var returnArray = []

for(x of wArr){
  if(x.start.isSame(jArr.data.start)){
    returnArray.push(x.start)
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



var population=[];



function seed() {
  var solution = {data:[]};
  for (i of j) {
    solution.data.push({
      jobid: i.jid,
      wid: getRandomInt(0, (workers.length - 1)),
      wpos: [],
      starttime: moment()

    })
  }

  for (var i = 0; i < solution.data.length; i++) {
    var returnShiftStart = [];
    var w = solution.data[i].wid
     var ss = workers[w]


    for(y of ss.shifts) {
      returnShiftStart.push({start: y.start, end: y.end});
    }
//    console.log(i,returnShiftStart);

    solution.data[i].starttime = getSimilarTimes(returnShiftStart, j[i])
  }

//  console.log(solution)
 return solution;

}

function createPop() {

 for(var i=0;i<config.size;i++){
   population[i].push(seed())
   population[i].score=fitness(population[i])
 }

}

function fitness(target) {
  var score = 1;
//
//   for(var i=0;i<target.length;i++){
//     if(target[i].starttime.isSame(moment(j[i].data.start)) ){
//       score= score+1;
//     }else{
//   for(l of workers){
//         for(  k of l.shifts){
//         if(target[i].starttime.isSameOrAfter(moment(k.start)) ){
//           if(moment(target[i].starttime).add(j[i].duration,'h').isSameOrBefore(moment(k.end)) ){
//           score= score+1;
//         }
//       }}
//     }
//   }
// }
  for (i of target.data) {
    if (i.starttime.isAfter(moment("1010-10-20 11:00"))) {
      score = score +10;
    }
  }
  for (var i = 0; i < target.data.length; i++) {
    var returnShiftStart = [];
    var w = target.data[i].wid
     var ss = workers[w]
//     console.log("ss",w,"---",ss)
     for (y of ss.shifts){
       if((y.start).isSame(target.data[i].starttime)){
         score=score+10;
       }
     }
//     console.log(i,returnShiftStart);


  }

  // //Repetition, one worker should not be assigned 2 jobs at the same day and time.
  // for (l = 0; l < target.length; l++) {
  //   for (k = 0; k < target.length; k++) {
  //     if (k != l && target[k].wid == target[l].wid && moment(target[l].starttime).isSame(moment(target[k].starttime))) {
  //       score=score;
  //     }
  //
  //   }
  // }

  return score
}


//
function reproduce(){

    var matingPool = []; // ArrayList which we will use for our "mating pool"

    for (var i = 0; i < (Math.floor(population.length  * config.eliteness)); i++) {

        matingPool.push(population[i]);
    }
    console.log('matingPool',matingPool)

    // for(var i =0; i< Math.floor(population.length * config.eliteness);i++){
    // //  if(i < Math.floor(population.length  * config.eliteness)){
    //     population[i]=matingPool[i]
    //   }
      for(var i = Math.floor((population.length * config.eliteness)); i < population.length; i++){
        var child;
        var a = Math.floor(Math.random(matingPool.length));
        var b = Math.floor(Math.random(matingPool.length));
        var partnerA = matingPool[a];
        var partnerB = matingPool[b];
        // if(partnerA.score===16){
        //   child =partnerA
        // } else if(partnerB.score===16){
        //   child =partnerB
        // }else{
       child = crossover(partnerA, partnerB);
       mutate(child);
       child.score = fitness(child);
       population[i] = child;

}


//     }

      }





//
function crossover(parent1, parent2) {
  var child = parent1
  //  console.log(parent1)
  for (i = 0; i < parent1.data.length; i++) {

    if (Math.random() > 0.5) {
      //console.log(child)
    //  child[i].jobid = parent1.jobid
      child.data[i].wid = parent1.data[i].wid
      child.data[i].starttime = parent1.data[i].starttime
    } else {
      //child[i].jobid = parent2[i].jobid
      child.data[i].wid = parent2.data[i].wid
       child.data[i].starttime = parent2.data[i].starttime
    }

  }
  return child
}

function mutate(solution) {

  for (i of solution.data) {
    if (Math.random() < config.mutation) {
      i.wid = getRandomInt(0, workers.length - 1)
    }
  }


    for (var i = 0; i < solution.data.length; i++) {
      var returnShiftStart = [];
      var w = solution.data[i].wid
       var ss = workers[w]

      for(y of ss.shifts) {
        returnShiftStart.push({start: y.start, end: y.end});
      }
  //     console.log(i,returnShiftStart);

        //solution.data[i].starttime = getSimilarTimes(returnShiftStart, j[i])
solution.data[i].starttime = getSimilarTimes(returnShiftStart, j[i])
    }
//   for (var i = 0; i < solution.length; i++) {
//     //console.log(solution.aT)
//     // if( typeof solution.aT != "undefined"){
//     var returnShiftStart = [];
//     var ss = workers[solution[i].wid]
//
//     for (y of ss.shifts) {
//       //      console.log("XXXXX", y)
//       returnShiftStart.push({start: y.start, end: y.end});
//       //            console.log(returnShiftStart);
//       // }
//     }
// }




  return solution
}

function start(){
  createPop()
  console.log("=-TEST-START-=")
  var fittest=[]
for(var i = 0; i<config.iterations;i++){

   population= sortJsonArray((population), 'score', 'des')
    reproduce();
    population= sortJsonArray((population), 'score', 'des')
    for(var y =0; y < Math.floor(population.length * config.eliteness);y++){
      console.log('gen: ',i, 'Position : ', y,'Score : ' , population[y].score)
    }
}
console.log("xxx",population)

}

start();
