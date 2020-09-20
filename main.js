const afficher = document.getElementById("afficher")
const number = document.getElementById("number")
const calcul = document.getElementById("calcul")

afficher.textContent = "\r\n";
let calculated = true;
let numberCalculation = [];
let numberLast = 0;

number.addEventListener("click", function(evt) {
   if(afficher.textContent.length > 15){
        alert("wtf dude max 10 numbers, i\'m still learning")
        }
   else if(calculated === true){
        afficher.textContent = evt.target.textContent;
        calculated = false;
        numberCalculation = [];
        numberLast++
        }
    else {
        afficher.textContent += evt.target.textContent;
        numberLast++
        }
});

calcul.addEventListener("click", function(evt) {
    
    if(evt.target.textContent === "C") {
        numberLast = 0;
        numberCalculation = [];
        calculated = true;
        afficher.textContent = "\r\n";
    }
    else if(afficher.textContent.length > 15 || calculated === true){
        alert("ERREUR ! No more of 15 character please");
        }
    else if(numberLast === 0){
        if(afficher.textContent === "\r\n"){
            if(evt.target.textContent === "÷"){
                alert("ERREUR, CANNOT DO 0 ÷ ")
            }
            else{
                afficher.textContent = "0 " + evt.target.textContent + " ";
                calculated = false;
                numberCalculation = [];
                numberCalculation.push("0");
                numberCalculation.push(evt.target.textContent);
                console.log(numberCalculation);
                }
            }
        else {
            console.log(numberCalculation);
            numberCalculation.pop();
            numberCalculation.push(evt.target.textContent);
            afficher.textContent = afficher.textContent.slice(0,-3);
            afficher.textContent += " " + evt.target.textContent + " ";
            console.log(numberCalculation);
            }
    }
    else if(evt.target.textContent === "="){
        numberCalculation.push(afficher.textContent.slice(-numberLast));
        numberLast = 0;
        calculated = true;

        /*for(let i = 0; i < numberCalculation.length; i++){
            result += Number(numberCalculation[i]);  
        }*/
        finalCalcul(numberCalculation);
    }
    else {
        numberCalculation.push(afficher.textContent.slice(-numberLast));
        numberCalculation.push(evt.target.textContent);
        numberLast = 0;
        afficher.textContent += " " + evt.target.textContent + " ";
    }
})

function finalCalcul(array) {
    let finalResult = 0;
    if(array.length === 1) {
        finalResult = array[0];
    }
    else {
        for(let i = 0; i < array.length; i++) {
            if(array[i] === "÷") {
                if(array[i-1] === ""){
                    finalResult = finalResult / Number(array[i+1]);
                }
                else if(array[i+1] === "") {
                    finalResult = Number(array[i-1]) / finalResult;
                }
                else {
                    finalResult += Number(array[i-1]) / Number(array[i+1]);
                    array[i] = "";
                    array[i-1] = "";
                    array[i+1] = "";
                    console.log(array)
                }  
            }
        }
        for(let i = 0; i < array.length; i++) {
            if(array[i] === "x") {
                if(array[i-1] === ""){
                    finalResult = finalResult * Number(array[i+1]);
                }
                else if(array[i+1] === "") {
                    finalResult = Number(array[i-1]) * finalResult;
                }
                else {
                    finalResult += Number(array[i-1]) * Number(array[i+1]);
                    array[i] = "";
                    array[i-1] = "";
                    array[i+1] = "";
                    console.log(array)
                }
            }
        }
        for(let i = 0; i < array.length; i++) {
            if(array[i] === "-") {
                finalResult += Number(array[i-1]) - Number(array[i+1]);
                array[i] = "";
                array[i-1] = "";
                array[i+1] = "";
                console.log(array)
            }
        }
        for(let i = 0; i < array.length; i++) {
            if(array[i] === "+") {
                finalResult += Number(array[i-1]) + Number(array[i+1]);
                array[i] = "";
                array[i-1] = "";
                array[i+1] = "";
                console.log(array)
            }
        }
    }
    afficher.textContent += "\r\n = " + finalResult;
}