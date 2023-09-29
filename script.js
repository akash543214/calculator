import { infixToPostfix,evaluatePostfix } from './test.js';

const grid = document.querySelector('.buttons-grid');
const screen = document.querySelector('.screen');
const screenLast = document.querySelector('.screen-last');
const screenCurrent = document.querySelector('.screen-current');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
let num="";
let operands = [];
 
function evaluateExp(exp)
{
  const postfixExpression = infixToPostfix(exp);
  const result = evaluatePostfix(postfixExpression);
  return result;
}

function isOperator(op)
{
   if(op==='+' || op==='-' || op==='÷' || op==='x' || op==='.')
   return true;

   return false;
}
grid.addEventListener('click',(e)=>{
      

   if(e.target.id=="clearBtn" || e.target.id=="deleteBtn" || e.target.className == "buttons-grid")
   return;

   let val = e.target.textContent;
   if(val==='=')
   {
   let getNum = num.replace(/\x/g, '*');
     getNum = getNum.replace(/\÷/g, '/');
      getNum = getNum.replace(/([-+/*÷)(])/g, ' $1 ');
      let result = evaluateExp(getNum);
      screenCurrent.textContent = result;
      screenLast.textContent = result;
      return;
   }
   if(isOperator(val)===true)
      if(isOperator(num[num.length-1])===true)
      return;
    
   num+= val;
   screenCurrent.textContent = num;
 
})

clearBtn.addEventListener('click',(e)=>{
   screenCurrent.innerHTML = "";
   screenLast.innerHTML = "";
   num="";
})

deleteBtn.addEventListener('click',(e)=>{
   num = num.slice(0,-1);
   screenCurrent.innerHTML = num;
})

