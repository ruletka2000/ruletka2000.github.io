const daysWrap = document.querySelector('.days-wrap');
let needDedCof = 1000;

// const myData = "хахаха я подменил тебя";
// const modifyCopy = (e) => {
//     e.clipboardData.setData('text/plain',  arr  );
//     document.execCommand('copy');
//     e.preventDefault();
// };

// document.addEventListener('copy', modifyCopy);
let countStav1 = 0;
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
document.querySelector('button.clear').addEventListener('click', ()=>{
  daysWrap.innerHTML = '';
})
document.querySelector('button.search').addEventListener('click', ()=>{
  search();
})

document.querySelector('#search').addEventListener('input', (e)=>{
  // console.log();
  needDedCof = e.target.value;
})
// daysWrap.style.width = 

function search() {
  daysWrap.innerHTML = '';
  let AllResult = 0;
  let AllB = 0;
  let AllM = 0;
  let per = ''; 
  let arr002= [];
  setTimeout(()=>{
    arr.forEach((day, i)=>{

      const date = day.name;
      const arr = day.arr;
      arr002 = [...arr002, ...arr];
      let obj = createDay(daysWrap, date, arr, needDedCof);
      AllResult += +obj.r;
      AllB += +obj.b;
      AllM += +obj.m;
    });
    let BM2 = getBolsheMenshe2(arr002, needDedCof);
    console.dir(BM2);
    per = JSON.stringify((BM2.periodObj), null, '\t')
    console.log(per);
  }, 300);
  

  setTimeout(()=>{
    document.querySelector('.main-wrap').style.width = daysWrap.scrollWidth + 'px';
    document.querySelector('#info').innerText = (`r: ${AllResult}, b: ${AllB}, m: ${AllM}` );
  }, 5000);
  
}
setTimeout(()=>{
  let maxHeight = 0;
  document.querySelectorAll('.day__section--last').forEach((item)=>{
    // console.log(item.offsetHeight);
    if(item.offsetHeight > maxHeight) {
      maxHeight = item.offsetHeight;
    }
  });
  console.log(maxHeight);
  document.querySelectorAll('.day__section--last').forEach((item)=>{
    item.style.height = maxHeight + "px";
  });
}, 2000);


function createDay(wrap, date, arr, kof) {
  let day = document.createElement('li');
  day.classList.add('day');
  let obj = createLastSection(day, date, arr, kof);

  let resultDay = obj.r;
  let b = obj.b;
  let m = obj.m;

  for(let i = 0; i < 23; i++) {
    createDaySection(day, date, i,0,(i+1), 0, arr, kof);
  }
  createDaySection(day, date, 23,0,23, 59, arr, kof);

  

  wrap.append(day);
  return ({r:resultDay, b:b, m:m});
}

function createDaySection(day, date, startH, startM, endH, endM, arr, kof) {
  let daySection = document.createElement('div');
  daySection.classList.add('day__section');

  let newArr = countStav(arr, startH,startM,endH,endM);

  let BM2 = getBolsheMenshe2(newArr, kof);

  if(newArr.length < 50) {
    daySection.classList.add('disabled');
  } else if(BM2.result > 50) {
    daySection.classList.add('res50');
  } else if(BM2.result > 30) {
    daySection.classList.add('res30');
  } else if(BM2.result > 10) {
    daySection.classList.add('res10');
  } else if(BM2.result > 0) {
    daySection.classList.add('res0');
  } else if(BM2.result < -50) {
    daySection.classList.add('res-50');
  } else if(BM2.result < -30) {
    daySection.classList.add('res-30');
  } else if(BM2.result < -10) {
    daySection.classList.add('res-10');
  } else if(BM2.result < 0) {
    daySection.classList.add('res-0');
  }

  let row1 = createRow(daySection);
  createDate(row1, date);
  createTime(row1, startH, startM, endH, endM, newArr);
  
  let row2 = createRow(daySection);
  createCountBM(row2, newArr, kof);

  let row3 = createRow(daySection);
  createResult(row3, newArr, kof);

  let row4 = createRow(daySection);
  createMinus(row4, newArr, kof);

  day.append(daySection);
  return daySection;
}

function createLastSection(day, dateName, arr, kof) {
  let daySection = document.createElement('div');
  daySection.classList.add('day__section');
  daySection.classList.add('day__section--last');

  let BM = getBolsheMenshe(arr, kof);
  let BM2 = getBolsheMenshe2(arr, kof);
  // let BM = getBolsheMenshe(newArr, kof);
  dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');
  createRowSpace(daySection, `Итого за ${dateName}`);
  createRowSpace(daySection, `Ставок ${arr.length}`);
  createRowSpace(daySection, `${BM.m} <= ${kof} > ${BM.b} | мы в + на: ${(BM.b*(kof-1) - BM.m).toFixed(2)}`);
  createRowSpace(daySection, `Результат: ${(BM2.result).toFixed(2)}`);
  createRowSpace(daySection, `Максимальный минус: ${(BM2.minResult).toFixed(2)}`);
  createRowSpace(daySection, `Периоды: ` + JSON.stringify((BM2.periodObj), null, '\t'));

  day.append(daySection);
  return ({r:(BM2.result).toFixed(2), b:BM.b, m:BM.m, });
}

function createRowSpace(daySection, str) {
  let row = document.createElement('div');
  row.classList.add('row');

  row.innerText = str;
  // createDate(row, date);

  daySection.append(row);
  return row;
}

function createRow(daySection) {
  let row = document.createElement('div');
  row.classList.add('row');

  // createDate(row, date);

  daySection.append(row);
  return row;
}

function createDate(row, dateName) {
  let date = document.createElement('div');
  date.classList.add('date');

  dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  date.innerHTML = dateName + '&nbsp;';

  row.append(date);
  return date;
}

function createTime(row, startH, startM, endH, endM, newArr) {
  let time = document.createElement('div');
  time.classList.add('time');
  
  if((startH + '').length == 1) {
    startH = '0' + startH;
  }
  if((startM + '').length == 1) {
    startM = '0' + startM;
  }
  if((endH + '').length == 1) {
    endH = '0' + endH;
  }
  if((endM + '').length == 1) {
    endM = '0' + endM;
  }

  
  let str = `| ${startH}:${startM}—${endH}:${endM} &nbsp; &nbsp; ${newArr.length}`;

  time.innerHTML = str;

  row.append(time);
  return time;
}

function createCountBM(row, newArr, kof) {
  let countBM = document.createElement('div');
  countBM.classList.add('counterBM');

  let BM = getBolsheMenshe(newArr, kof);// dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  countBM.innerHTML = `${BM.m} <= ${kof} > ${BM.b} | мы в + на: ${(BM.b*(kof-1) - BM.m).toFixed(2)}`;

  row.append(countBM);
  return countBM;
}

function createResult(row, newArr, kof) {
  let result = document.createElement('div');
  result.classList.add('result');

  let BM2 = getBolsheMenshe2(newArr, kof);// dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  result.innerHTML = `Результат: ${(BM2.result).toFixed(2)}`;

  row.append(result);
  return result;
}

function createMinus(row, newArr, kof) {
  let minus = document.createElement('div');
  minus.classList.add('minus');

  let BM2 = getBolsheMenshe2(newArr, kof);// dateName = [...dateName.split('').slice(0,2), '/', ...dateName.split('').slice(2,4)].join('');

  minus.innerHTML = `Максимальный минус: ${(BM2.minResult).toFixed(2)}`;

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
  let counterMenshe = 0;
  let counterBolshe = 0;
  let result = 0;;
  let minResult = 0;
  let arrRes = [];
  let lastWinIndex = null;
  let arrWinIndex = [];
  let arr  = arr1.reverse();
  arr.forEach((item, i)=>{
      // console.log(item);
      if(item.kof > kof) {
          counterBolshe++;
          result += (kof - 1);
          if(lastWinIndex) {
            arrWinIndex.push((i - lastWinIndex - 1));
          } 
          lastWinIndex = i;
          
      } else {
          counterMenshe++;
          result--;
          
          
      }
      arrRes.push(result);
      if(+result <= +minResult) {
          if(arr.length > 1000) {
              // console.log('minResult', minResult);
              // console.log('result', result);
          }
          if(arr.length > 1000 && minResult == -23) {
              // console.log('aaa');
          }
          minResult = result;
          // console.log(arr.length);
          if(arr.length > 1000) {
              // console.log(minResult);
          }

      }
  })
  let periodObj= {};
  arrWinIndex.forEach((period)=>{
    periodObj[period] = (periodObj[period]) ? (periodObj[period] + 1) : 1;
  });

  
      return {'b': counterBolshe, 'm': counterMenshe, 'minResult': minResult, 'result':result, 'arrRes':arrRes, 'periodObj':periodObj}
  
  
}

function getBolsheMenshe(arr, kof) {
  let counterMenshe = 0;
  let counterBolshe = 0;
  let activeThrottle = 0;
  arr.forEach((item, i)=>{
      // console.log(item);
      if(activeThrottle == 0) {
        if(item.kof > kof) {
          counterBolshe++;
          activeThrottle = 0;
        } else {
            counterMenshe++;
        }
      } else {
        activeThrottle--;
      }
      
  })
  return {'b': counterBolshe, 'm': counterMenshe}
}

function countStav(arr, startH, startM, endH, endM) {
  let counter = 0;
  let result = [];
  arr.forEach( (item)=>{
      let flag = true;

      if( item.hour == startH ) {
          if( item.min >= startM ) {
              flag = flag;
          } else {
              flag = false;
          }
      } else if( item.hour > startH ){
          flag = flag;
      } else {
          flag = false;
      }
      if( item.hour == endH ) {
          if( item.min < endM ) {
              flag = flag;
          } else {
              flag = false;
          }
      } else if( item.hour < endH ){
          flag = flag;
      } else {
          flag = false;
      }
      if(flag) {
          counter++;
          result.push(item);
      }      
  } );

  return result;
}