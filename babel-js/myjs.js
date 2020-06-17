'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var daysWrap = document.querySelector('.days-wrap');
var needDedCof = 1000;

// const myData = "хахаха я подменил тебя";
// const modifyCopy = (e) => {
//     e.clipboardData.setData('text/plain',  arr  );
//     document.execCommand('copy');
//     e.preventDefault();
// };

// document.addEventListener('copy', modifyCopy);
var countStav1 = 0;
// arr.forEach((day)=>{
//   let sov = 0;
//   day.arr.forEach((item, i)=>{
//     let kof = item.kof;
//     let hour = item.hour;
//     let min = item.min;
//     let sec = item.sec;
//     countStav1++;
//     day.arr.forEach((item2, j)=>{
//       if(i != j && 
//         (kof == item2.kof && 
//           hour == item2.hour &&
//           min == item2.min &&
//           sec == item2.sec
//         )) {
//           console.log('item', item );
//           console.log('item2', item2 );
//           sov++;
//           day.arr.splice(j, 1);
//         }
//     });
//   });
//   console.log('sov', sov);
// });

// let NEWCOPYARR = [];

// arr.forEach((day)=>{
//   let sov = 0;
//   day.arr.forEach((item, i)=>{
//     let kof = item.kof;
//     let hour = item.hour;
//     let min = item.min;
//     let sec = item.sec;

//     day.arr.forEach((item2, j)=>{
//       if(i != j && 
//         (kof == item2.kof && 
//           hour == item2.hour &&
//           min == item2.min &&
//           sec == item2.sec
//         )) {
//           console.log('item', item );
//           console.log('item2', item2 );
//           sov++;
//           day.arr.splice(j, 1);
//         }
//     });
//   });
//   console.log('sov', sov);
// });
// let textarea = document.querySelector('.to-copy');
// textarea.value = JSON.stringify(arr, null, 2);


console.log('countStav1', countStav1);

document.querySelector('.main-wrap').style.width = daysWrap.scrollWidth + 'px';
document.querySelector('button.clear').addEventListener('click', function () {
  daysWrap.innerHTML = '';
});
document.querySelector('button.search').addEventListener('click', function () {
  search();
});

document.querySelector('#search').addEventListener('input', function (e) {
  // console.log();
  needDedCof = e.target.value;
});
// daysWrap.style.width = 

function search() {
  daysWrap.innerHTML = '';
  var AllResult = 0;
  var AllB = 0;
  var AllM = 0;
  var per = '';
  var arr002 = [];
  setTimeout(function () {
    arr.forEach(function (day, i) {

      var date = day.name;
      var arr = day.arr;
      arr002 = [].concat(_toConsumableArray(arr002), _toConsumableArray(arr));
      var obj = createDay(daysWrap, date, arr, needDedCof);
      AllResult += +obj.r;
      AllB += +obj.b;
      AllM += +obj.m;
    });
    var BM2 = getBolsheMenshe2(arr002, needDedCof);
    console.dir(BM2);
    per = JSON.stringify(BM2.periodObj, null, '\t');
    console.log(per);
  }, 300);

  setTimeout(function () {
    document.querySelector('.main-wrap').style.width = daysWrap.scrollWidth + 'px';
    document.querySelector('#info').innerText = 'r: ' + AllResult + ', b: ' + AllB + ', m: ' + AllM;
  }, 5000);
}
setTimeout(function () {
  var maxHeight = 0;
  document.querySelectorAll('.day__section--last').forEach(function (item) {
    // console.log(item.offsetHeight);
    if (item.offsetHeight > maxHeight) {
      maxHeight = item.offsetHeight;
    }
  });
  console.log(maxHeight);
  document.querySelectorAll('.day__section--last').forEach(function (item) {
    item.style.height = maxHeight + "px";
  });
}, 2000);

function createDay(wrap, date, arr, kof) {
  var day = document.createElement('li');
  day.classList.add('day');
  var obj = createLastSection(day, date, arr, kof);

  var resultDay = obj.r;
  var b = obj.b;
  var m = obj.m;

  for (var i = 0; i < 23; i++) {
    createDaySection(day, date, i, 0, i + 1, 0, arr, kof);
  }
  createDaySection(day, date, 23, 0, 23, 59, arr, kof);

  wrap.append(day);
  return { r: resultDay, b: b, m: m };
}

function createDaySection(day, date, startH, startM, endH, endM, arr, kof) {
  var daySection = document.createElement('div');
  daySection.classList.add('day__section');

  var newArr = countStav(arr, startH, startM, endH, endM);

  var BM2 = getBolsheMenshe2(newArr, kof);

  if (newArr.length < 50) {
    daySection.classList.add('disabled');
  } else if (BM2.result > 50) {
    daySection.classList.add('res50');
  } else if (BM2.result > 30) {
    daySection.classList.add('res30');
  } else if (BM2.result > 10) {
    daySection.classList.add('res10');
  } else if (BM2.result > 0) {
    daySection.classList.add('res0');
  } else if (BM2.result < -50) {
    daySection.classList.add('res-50');
  } else if (BM2.result < -30) {
    daySection.classList.add('res-30');
  } else if (BM2.result < -10) {
    daySection.classList.add('res-10');
  } else if (BM2.result < 0) {
    daySection.classList.add('res-0');
  }

  var row1 = createRow(daySection);
  createDate(row1, date);
  createTime(row1, startH, startM, endH, endM, newArr);

  var row2 = createRow(daySection);
  createCountBM(row2, newArr, kof);

  var row3 = createRow(daySection);
  createResult(row3, newArr, kof);

  var row4 = createRow(daySection);
  createMinus(row4, newArr, kof);

  day.append(daySection);
  return daySection;
}

function createLastSection(day, dateName, arr, kof) {
  var daySection = document.createElement('div');
  daySection.classList.add('day__section');
  daySection.classList.add('day__section--last');

  var BM = getBolsheMenshe(arr, kof);
  var BM2 = getBolsheMenshe2(arr, kof);
  // let BM = getBolsheMenshe(newArr, kof);
  dateName = [].concat(_toConsumableArray(dateName.split('').slice(0, 2)), ['/'], _toConsumableArray(dateName.split('').slice(2, 4))).join('');
  createRowSpace(daySection, '\u0418\u0442\u043E\u0433\u043E \u0437\u0430 ' + dateName);
  createRowSpace(daySection, '\u0421\u0442\u0430\u0432\u043E\u043A ' + arr.length);
  createRowSpace(daySection, BM.m + ' <= ' + kof + ' > ' + BM.b + ' | \u043C\u044B \u0432 + \u043D\u0430: ' + (BM.b * (kof - 1) - BM.m).toFixed(2));
  createRowSpace(daySection, '\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ' + BM2.result.toFixed(2));
  createRowSpace(daySection, '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0438\u043D\u0443\u0441: ' + BM2.minResult.toFixed(2));
  createRowSpace(daySection, '\u041F\u0435\u0440\u0438\u043E\u0434\u044B: ' + JSON.stringify(BM2.periodObj, null, '\t'));

  day.append(daySection);
  return { r: BM2.result.toFixed(2), b: BM.b, m: BM.m };
}

function createRowSpace(daySection, str) {
  var row = document.createElement('div');
  row.classList.add('row');

  row.innerText = str;
  // createDate(row, date);

  daySection.append(row);
  return row;
}

function createRow(daySection) {
  var row = document.createElement('div');
  row.classList.add('row');

  // createDate(row, date);

  daySection.append(row);
  return row;
}

function createDate(row, dateName) {
  var date = document.createElement('div');
  date.classList.add('date');

  dateName = [].concat(_toConsumableArray(dateName.split('').slice(0, 2)), ['/'], _toConsumableArray(dateName.split('').slice(2, 4))).join('');

  date.innerHTML = dateName + '&nbsp;';

  row.append(date);
  return date;
}

function createTime(row, startH, startM, endH, endM, newArr) {
  var time = document.createElement('div');
  time.classList.add('time');

  if ((startH + '').length == 1) {
    startH = '0' + startH;
  }
  if ((startM + '').length == 1) {
    startM = '0' + startM;
  }
  if ((endH + '').length == 1) {
    endH = '0' + endH;
  }
  if ((endM + '').length == 1) {
    endM = '0' + endM;
  }

  var str = '| ' + startH + ':' + startM + '\u2014' + endH + ':' + endM + ' &nbsp; &nbsp; ' + newArr.length;

  time.innerHTML = str;

  row.append(time);
  return time;
}

function createCountBM(row, newArr, kof) {
  var countBM = document.createElement('div');
  countBM.classList.add('counterBM');

  var BM = getBolsheMenshe(newArr, kof); // dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  countBM.innerHTML = BM.m + ' <= ' + kof + ' > ' + BM.b + ' | \u043C\u044B \u0432 + \u043D\u0430: ' + (BM.b * (kof - 1) - BM.m).toFixed(2);

  row.append(countBM);
  return countBM;
}

function createResult(row, newArr, kof) {
  var result = document.createElement('div');
  result.classList.add('result');

  var BM2 = getBolsheMenshe2(newArr, kof); // dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  result.innerHTML = '\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ' + BM2.result.toFixed(2);

  row.append(result);
  return result;
}

function createMinus(row, newArr, kof) {
  var minus = document.createElement('div');
  minus.classList.add('minus');

  var BM2 = getBolsheMenshe2(newArr, kof); // dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  minus.innerHTML = '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0438\u043D\u0443\u0441: ' + BM2.minResult.toFixed(2);

  row.append(minus);
  return minus;
}

// function createCountOfBet(row, arr) {
//   let count = document.createElement('div');
//   count.classList.add('count');


//   // count.innerHTML = dateName + '&nbsp;';

//   row.append(count);
//   return count;
// }


// function showAllDay(day, arr, kof) {
//   let str = '';

//   for(let i = 0; i < 23; i++) {
//       str += day + ' с ' + i + ':00 - '+ (i+1) +':00 ' + countStav(arr, i,00,(i+1),00).length + '\n'; 
//       str += getBolsheMenshe(countStav(arr, i,00,(i+1),00), kof).m + ' <=' + kof + ' > ' + getBolsheMenshe(countStav(arr, i,00,(i+1),00), kof).b + ' | мы в + на: ' + -(getBolsheMenshe(countStav(arr, i,00,(i+1),00), kof).m - getBolsheMenshe(countStav(arr, i,00,(i+1),00), kof).b * (kof-1)) + '\n';
//       str += 'Результат ' + getBolsheMenshe2(countStav(arr, i,00,(i+1),00), kof).result + '\n';
//       str += 'Максимальный минус ' + getBolsheMenshe2(countStav(arr, i,00,(i+1),00), kof).minResult + '\n';
//       str += '\n';
//   }

//   str += day + ' с ' + 23 + ':00 - '+ 23 +':59 ' + countStav(arr, 23,00,23,59).length + '\n'; 
//   str += getBolsheMenshe(countStav(arr, 23,00,23,59), kof).m + ' <=' + kof + ' > ' + getBolsheMenshe(countStav(arr, 23,00,23,59), kof).b + ' | мы в + на: ' + -(getBolsheMenshe(countStav(arr, 23,00,23,59), kof).m - getBolsheMenshe(countStav(arr, 23,00,23,59), kof).b * (kof-1)) + '\n';
//   str += 'Результат ' + getBolsheMenshe2(countStav(arr, 23,00,23,59), kof).result + '\n';
//   str += 'Максимальный минус ' + getBolsheMenshe2(countStav(arr, 23,00,23,59), kof).minResult + '\n';
//   str += '\n';

//   let zaDen = getBolsheMenshe(arr, kof);
//   let zaDen2 = getBolsheMenshe2(arr, kof);
//   str += '\n';
//   str += 'Итого за день:';
//   str += '\n';
//   str += 'Ставок ' + arr.length + '\n'; 
//   str += zaDen.m + ' <= ' + kof + ' > ' + zaDen.b + ' | мы в + на: ' + -(zaDen.m - zaDen.b * (kof-1)) + '\n';
//   str += 'Результат ' + zaDen2.result + '\n';
//   str += 'Максимальный минус ' + zaDen2.minResult + '\n';
// }

function getBolsheMenshe2(arr1, kof) {
  var counterMenshe = 0;
  var counterBolshe = 0;
  var result = 0;;
  var minResult = 0;
  var arrRes = [];
  var lastWinIndex = null;
  var arrWinIndex = [];
  var arr = arr1.reverse();
  arr.forEach(function (item, i) {
    // console.log(item);
    if (item.kof > kof) {
      counterBolshe++;
      result += kof - 1;
      if (lastWinIndex) {
        arrWinIndex.push(i - lastWinIndex - 1);
      }
      lastWinIndex = i;
    } else {
      counterMenshe++;
      result--;
    }
    arrRes.push(result);
    if (+result <= +minResult) {
      if (arr.length > 1000) {
        // console.log('minResult', minResult);
        // console.log('result', result);
      }
      if (arr.length > 1000 && minResult == -23) {
        // console.log('aaa');
      }
      minResult = result;
      // console.log(arr.length);
      if (arr.length > 1000) {
        // console.log(minResult);
      }
    }
  });
  var periodObj = {};
  arrWinIndex.forEach(function (period) {
    periodObj[period] = periodObj[period] ? periodObj[period] + 1 : 1;
  });

  return { 'b': counterBolshe, 'm': counterMenshe, 'minResult': minResult, 'result': result, 'arrRes': arrRes, 'periodObj': periodObj };
}

function getBolsheMenshe(arr, kof) {
  var counterMenshe = 0;
  var counterBolshe = 0;
  var activeThrottle = 0;
  arr.forEach(function (item, i) {
    // console.log(item);
    if (activeThrottle == 0) {
      if (item.kof > kof) {
        counterBolshe++;
        activeThrottle = 0;
      } else {
        counterMenshe++;
      }
    } else {
      activeThrottle--;
    }
  });
  return { 'b': counterBolshe, 'm': counterMenshe };
}

function countStav(arr, startH, startM, endH, endM) {
  var counter = 0;
  var result = [];
  arr.forEach(function (item) {
    var flag = true;

    if (item.hour == startH) {
      if (item.min >= startM) {
        flag = flag;
      } else {
        flag = false;
      }
    } else if (item.hour > startH) {
      flag = flag;
    } else {
      flag = false;
    }
    if (item.hour == endH) {
      if (item.min < endM) {
        flag = flag;
      } else {
        flag = false;
      }
    } else if (item.hour < endH) {
      flag = flag;
    } else {
      flag = false;
    }
    if (flag) {
      counter++;
      result.push(item);
    }
  });

  return result;
}