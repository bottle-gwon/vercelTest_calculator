const displayDigit = document.querySelector("#calDigit"); //디스플레이 숫자
const displaySymbol = document.querySelector("#calSymbol");//디스플레이 부호

const calBtn = document.querySelector(".cal-button").children;


//숫자 임시 저장 
let digit1 = null;
let digit2 = null;
let symbol = null;
let result = null;
let next = false;

/** 숫자 추가 함수
 * 
 * @param  number 숫자이거나 '.'
 */
const addDigit = function(number){

    const tmp = document.createElement("p")
    tmp.id = 'calDigit';
 
    if(next && symbol !== null){
        displayDigit.textContent = '0';
        displaySymbol.textContent = digit1 + symbol;
        displayDigit.append();
        displaySymbol.append();
        next = false;
    }
    if(displayDigit.textContent.includes("%")){
        return false;
    }


    if(number !== '.'){
        number = Number.parseFloat(number);
    }

    if(typeof number === 'number'){
        // 숫자 추가 알고리즘//
        
        if(displayDigit.textContent === '0'){
            tmp.textContent = number;
        }else{
            tmp.textContent = displayDigit.textContent;
            tmp.textContent += number.toString();
        }
        displayDigit.replaceChildren(tmp)

    }else if(number === '.'){
        //소수점 알고리즘//
        if(displayDigit.textContent ==='0' || displayDigit.textContent.indexOf('.') === -1){
            tmp.textContent = displayDigit.textContent;
            tmp.textContent += number;
            displayDigit.replaceChildren(tmp);
        }

    }else{
        // alert("비정상적인 입력");
        console.error("비정상적인 입력");
    }
}

/** +/- 버튼 기능 함수
 *  화면에 있는 숫자 부호 변경
 */
const plusMinus = function(){
    
    if(displayDigit.textContent !== '0'){
        const tmp = document.createElement("p")
        tmp.id = 'calDigit';

        tmp.textContent = displayDigit.textContent;

        if(displayDigit.textContent.indexOf('-') === -1){
            tmp.textContent = '-'  + displayDigit.textContent;
        }else{
            tmp.textContent = displayDigit.textContent.replace("-","");
        }

         displayDigit.replaceChildren(tmp);
    }
}


/**
 * 화면 및 변수 초기화
 */
const clearScreen = function() {
    digit1 = null;
    digit2 = null;
    result = null;
    symbol = null;
    next = false;

    displaySymbol.textContent = 'history';
    displayDigit.textContent = '0';
    displayDigit.append();
    displaySymbol.append();

}



/** 퍼센트 함수
 * 
 * @param {숫자} num 
 * @returns num에 %가 붙어 있으면 백분율로 변경해서 리턴
 */
const per  = function(num){

    if(typeof num === 'number'){
        return num;
    }
    if(num.includes('%')){
        num.slice(num.indexOf('%'),1);
        num = Number.parseFloat(num) * 0.01
    }else{
        num = Number.parseFloat(num);
    }
    return num

}

/** 계산 함수
 * 
 * = 또는 값이 있는 상태에서 연산자를 눌렀을때 계산하고 화면에 출력
 */
const calculate = function() {
    
    //% 연산

    if(next){
        return;
    }

    if(symbol===null && displayDigit.textContent.includes('%')){

        digit1 = displayDigit.textContent;
        
            displaySymbol.textContent = digit1;
            displaySymbol.append();

            digit1 = per(digit1);
            displayDigit.textContent = digit1;
            displayDigit.append()
            return;


    }

    if(digit1 && symbol){
        digit1 = per(digit1);
        digit2 = displayDigit.textContent;
        
        switch(symbol){
            case '+':
                digit2 = digit2.includes("%") ? digit1 * per(digit2) : digit2;
                result = Number.parseFloat(digit1) + Number.parseFloat(digit2);
                break;
            case '-':
                digit2 = digit2.includes("%") ? digit1 * per(digit2) : digit2;
                result = digit1  - digit2;
                break;
            case '✕':
                digit2 = per(displayDigit.textContent);
                result = digit1 * digit2;
                break;
            case '÷':
                digit2 = per(displayDigit.textContent);
                result = digit1 / digit2;
                break;
            default:
                console.error("알수 없는 연산")
                break;
        }
        
        displayDigit.textContent = result;
        displayDigit.append()
        displaySymbol.textContent = digit1 + symbol + digit2;
        if(displaySymbol.textContent.includes("--")){
            displaySymbol.textContent = displaySymbol.textContent.replace("--","-");
        }
        displaySymbol.append();

        digit1 = result;
        result = null;
        digit2 = null;
        symbol = null;

    }

}

/** 연산자 추가함수
 * 
 * @param {연산자} op 
 */
const oper = function(op){

    //next가 true면 다음은 숫자가 들어가야한다.
    if(!next){
        if(digit1){
            calculate();
        }else{
            digit1 = displayDigit.textContent;
        }
        symbol = op;
        next= true
    }

}

/** 화면에 퍼센트 추가 함수
 * 
 */
const addPer = function(){

    // if(displayDigit.textContent !== '0'){
        const tmp = document.createElement("p")
        tmp.id = 'calDigit';

        tmp.textContent = displayDigit.textContent;

        if(!displayDigit.textContent.includes('%')){
            tmp.textContent = displayDigit.textContent + "%";
        }else{
            tmp.textContent = displayDigit.textContent.replace("%","");
        }
    
        displayDigit.replaceChildren(tmp);
    
    
}

/** 백스페이스 함수
 * 
 */
const backSpace = function(){

    if(displayDigit.textContent !== "0"){
        let key = displayDigit.textContent;
        if(displayDigit.textContent.length === 1){
            displayDigit.textContent = "0";
        }else{
           
           displayDigit.textContent = key.slice(0,-1);
        }

        displayDigit.append()
    }
}

/** function 값들 정리
 * 
 * @param {} symbol 
 */
const func = function(id){
    if(id === 'symbolPm'){
        plusMinus();
    }else if(id === 'symbolEq'){
        calculate()
    }else if(id ==='symbolPer'){
        addPer()
    }else if(id ==='symbolBack'){
        backSpace();
    }
}




for (const element of calBtn){
    if(element.className.includes('number')){
        element.addEventListener("click", function(){
            console.log(element.textContent);
            addDigit(element.textContent);
        })

    }else if(element.id === 'symbolCle'){
        element.addEventListener("click", function(){
            console.log(element.textContent);
            clearScreen();
        })
    }else if(element.className.includes('function')){
        element.addEventListener("click", function(){
            func(element.id)
        })
    }else if(element.className.includes('operator')){
        element.addEventListener("click",function(){
            console.log(element.textContent);
            oper(element.textContent);
        })
    }
    else{
        element.addEventListener("click",function(){
            console.log(element.textContent);
        })
    }

}
