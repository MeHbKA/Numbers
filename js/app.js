$(document).ready(function(){
  let numbers = [];
  function ReqData(apiKey, n, id){
    this.jsonrpc = '2.0',
    this.method = 'generateIntegers',
    this.params = {
      apiKey: apiKey,
      n: n,
      min: 0,
      max: 1,
      replacement: true,
      base: 10
    },
    this.id = id
  }; 
  
  let data_1 = new ReqData ('7b5c41a2-ac76-4ead-957a-fdf2a583c979', 10000, 1);
  let data_2 = new ReqData ('94481ff8-85b0-4484-b5f5-46484bb99ded', 10000, 1);
  let data_3 = new ReqData ('b2ac17cf-a120-44a0-b0dd-b1fe3e39a6ee', 10000, 1);
  let data_4 = new ReqData ('4ba9b721-393e-4ad0-8ffb-dfd88aacbee9', 10000, 1);
  
  loadAllNumbers(data_1,numbers);
  async function loadAllNumbers(data_1,numbers,zero,one){
    await loadNumbers(data_1, numbers, zero, one);
    await loadNumbers(data_2,numbers,zero,one);
    await loadNumbers(data_3,numbers,zero,one);
    await loadNumbers(data_4,numbers,zero,one);
    //counts and out;
    let out = '';
    let countZero = 0;
    let countOne = 0;
    let countZeroZero = 0;
    let countZeroOne = 0;
    let countOneZero = 0;
    let countOneOne = 0;
    let countZeroZeroZero = 0;
    let countZeroZeroOne = 0;
    let countZeroOneZero = 0;
    let countOneZeroZero = 0;
    let countZeroOneOne = 0;
    let countOneOneZero = 0;
    let countOneZeroOne = 0;
    let countOneOneOne = 0;
//      one a row
      for (let i = 0; i < numbers.length; i++){
        if (numbers[i] === 0){
          countZero++;
        } else if (numbers[i] === 1){
          countOne ++;
        }
//        two a row
        if (numbers[i-1] === 0 && numbers[i] === 0){
          countZeroZero++;
        } else if (numbers[i-1] === 0 && numbers[i] === 1){
          countZeroOne++;
        } else if (numbers[i-1] === 1 && numbers[i] === 0){
          countOneZero++;
        } else if(numbers[i-1] === 1 && numbers[i] === 1){
          countOneOne ++;
        }
//        three a row
        if(numbers[i-1] === 0 && numbers[i] === 0 && numbers [i+1] === 0){
          countZeroZeroZero++;
        } else if (numbers[i-1] === 0 && numbers[i] === 0 && numbers [i+1] === 1){
          countZeroZeroOne++;
        } else if (numbers[i-1] === 0 && numbers[i] === 1 && numbers [i+1] === 0){
          countZeroOneZero++;
        } else if (numbers[i-1] === 1 && numbers[i] === 0 && numbers [i+1] === 0){
          countOneZeroZero++;
        } else if (numbers[i-1] === 0 && numbers[i] === 1 && numbers [i+1] === 1) {
          countZeroOneOne++;
        } else if (numbers[i-1] === 1 && numbers[i] === 1 && numbers [i+1] === 0) {
          countOneOneZero++;
        } else if (numbers[i-1] === 1 && numbers[i] === 0 && numbers [i+1] === 1) {
          countOneZeroOne++;
        } else if (numbers[i-1] === 1 && numbers[i] === 1 && numbers [i+1] === 1) {
          countOneOneOne++;
        }
      }
//    write to page
      out += `<div>Итого нулей: ${Math.round((countZero * 100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого единиц: ${Math.round((countOne *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "00": ${Math.round((countZeroZero *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "01": ${Math.round((countZeroOne *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "10": ${Math.round((countOneZero *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "11": ${Math.round((countOneOne *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "000": ${Math.round((countZeroZeroZero *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "001": ${Math.round((countZeroZeroOne *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "010": ${Math.round((countZeroOneZero *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "100": ${Math.round((countOneZeroZero *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "011": ${Math.round((countZeroOneOne *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "110": ${Math.round((countOneOneZero *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "101": ${Math.round((countOneZeroOne *100)/(numbers.length + 1))} %</div>`
      out += `<div>Итого повторений "111": ${Math.round((countOneOneOne *100)/(numbers.length + 1))} %</div>`
      console.log(numbers);
      $('#text').html(out);
      
    }
});

async function loadNumbers (data, numbers, zero, one){
  for (let i = 0; i < 25; i++){
    await $.ajax({
      url: 'https://api.random.org/json-rpc/2/invoke',
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(result) {
      let resArr = result.result.random.data;
        resArr.forEach(function(element){
          numbers.push(element);
        }) 
      }
    });
  }
}