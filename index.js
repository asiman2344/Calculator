const display=document.querySelector('.calculator-input')
const number=document.querySelectorAll('.number');
const operator=document.querySelectorAll('.operator');
const decimal=document.querySelector('.decimal');
const clear=document.querySelector('.clear');
const equal=document.querySelector('.equal-sign');


let displayValue='0';
let firstElement=null;
let operator1=null;
let waitingForSecond=false

updateDisplay();
function updateDisplay(){
  display.value=displayValue;
}

for(let i=0;i<number.length;i++){
  number[i].addEventListener('click',function(e){
    let elementNum=e.target;
    
    if(waitingForSecond){
      displayValue=elementNum.value
      waitingForSecond=false;
    }else{
      if(displayValue==='0'){
        displayValue=elementNum.value;
      }else{
        displayValue+=elementNum.value;
      }
    }

    console.log(displayValue,firstElement,waitingForSecond,operator1);
    updateDisplay()
  })
}
// Operatör butonlarına tıklama işlemleri

for(let j=0;j<operator.length;j++){
  operator[j].addEventListener('click',function(e){
    let elementOperator=e.target;

    if(firstElement===null){
      firstElement=displayValue
    }
    waitingForSecond=true;
    operator1=elementOperator.value;
    console.log(displayValue,firstElement,waitingForSecond,operator1);
  })
}

equal.addEventListener('click', function () {
  if (firstElement !== null && operator1 !== null) {
    calculate(firstElement, displayValue, operator1);
    firstElement = null;
    operator1 = null;
    waitingForSecond = true;
  }
});

function calculate(num1, num2, operation) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operation) {
    case '+':
      displayValue = (num1 + num2).toString();
      break;
    case '-':
      displayValue = (num1 - num2).toString();
      break;
    case '*':
      displayValue = (num1 * num2).toString();
      break;
    case '/':
      displayValue = (num1 / num2).toString();
      break;
    default:
      break;
  }

  updateDisplay();
}

decimal.addEventListener('click',function(){
  if(!displayValue.includes('.')){
    displayValue+='.'
  }
  updateDisplay()
})

clear.addEventListener('click',function(){
  displayValue='0';
  updateDisplay()
})
