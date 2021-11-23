const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{

    constructor(fieldc){
        this.field = fieldc;
    }

    print(){
        //Nested for loop that stores the state of the 2d array in a string
        let state = '';
        for(let outer=0;outer<this.field.length;outer++){
            for(let inner = 0; inner<this.field[outer].length;inner++){
                state+=this.field[outer][inner];
            } 
            state+='\n';
        }

        return state;
    }

    static generateField(height,width,percent){
        let hatNotAssigned = true; //Bolean that turns to false when hat is assigned
        const values = [hole,fieldCharacter,hat]; // array of values to be randomly selected
        let field = [];
        let innerFieled = [];
        const totalFieldArea = height*width;
        const holePercentage = Math.floor((percent/100)*totalFieldArea);
        let holeCount = 0;
        let randomVal = 0;
        
        for(let outerLoop = 0; outerLoop<=height;outerLoop++){
            innerFieled = [];
            for(let innerLoop = 0; innerLoop<=width;innerLoop++){
                if(hatNotAssigned && outerLoop > Math.floor(height/2)){ //Assigns the hat at a position that's at least half teh total height away from the top

                randomVal = Math.floor(Math.random()*3);
                innerFieled.push(values[randomVal]);
                if(values[randomVal] === hat){hatNotAssigned = false}
                if(values[randomVal] === hole){holeCount++} 

            }else if(holeCount<holePercentage){

                randomVal = Math.floor(Math.random()*2);
                if(values[randomVal] === hole){holeCount++}
                outerLoop === 0 || innerLoop == 0? innerFieled.push(fieldCharacter):innerFieled.push(values[randomVal]); //Frees the first row and column to help prevent being blocked by holes.

            }else if(hatNotAssigned && outerLoop === height && innerLoop === width ){ //sets the last value of the 2D array to hat, if it still hasn't been randomly assigned. 
                innerFieled.push(hat);
            }else{
                innerFieled.push(fieldCharacter);
            }
            }
            field.push(innerFieled);

        }
        field[0][0] = (pathCharacter);
        return new Field(field);
    }
}

/*const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);*/

  const myField = Field.generateField(10,15,20);

let gameOn = true;//Boolean that triggers while loop.

let currentPosition = [0,0]; // array that holds the values for the current location [row,collumn]. Placed outside the while loop to prevent re-initialiation.

while(gameOn){
let temp = '';  //temporary holds value from prompt to undergo checks before its value is stored in "move" 
let move = '';  //holds the value of correct moves ('l' for left,'r' for right, 'u' for up and 'd' for down)
console.log(myField.print());
temp = prompt('Which way?');
temp=temp.toLowerCase();
if(temp === 'r'||temp === 'l'||temp === 'u'||temp === 'd'){
move = temp;
}else{
    console.log("Enter a valid input");
    continue;
}
switch(move){
case 'r' : 
currentPosition[1]++; //moves the current position to the right by increasing the column value by 1
try{
    //compares position after move to each possibility and performs corresponding logic.
if( myField.field[currentPosition[0]][currentPosition[1]] === hole){
    console.log("Sorry. You fell into a hole :(")
    gameOn = false;
}else if(myField.field[currentPosition[0]][currentPosition[1]] === hat){
    console.log("Congrats! You found your Hat!")
    gameOn = false;
}else if(myField.field[currentPosition[0]][currentPosition[1]] === undefined){
    //Logs, out of bounds message and exits.
    //currentPosition[1]--;

    console.log("Out of bounds");
    gameOn = false;


}else{
    myField.field[currentPosition[0]][currentPosition[1]]='*';
}
}catch(e){
    //possible error would be if move exceeds outer array bounds. Logs message to screen and exits. Logic is same with other switch cases.
    console.log("Out of bounds");
    //currentPosition[1]--;
    gameOn = false;
};

break;

case 'l' : 
currentPosition[1]--;
try{
    if( myField.field[currentPosition[0]][currentPosition[1]] === 'O'){
        console.log("Sorry. You fell into a hole :(")
        gameOn = false;
    }else if(myField.field[currentPosition[0]][currentPosition[1]] === '^'){
        console.log("Congrats! You found your Hat!")
        gameOn = false;
    }else if(myField.field[currentPosition[0]][currentPosition[1]] === undefined){
        //prevents assigning another value to inner array(rows), Logs message to screen and exits.
        //currentPosition[1]++;
        console.log("Out of bounds");
        gameOn = false;
    
    }else{
        myField.field[currentPosition[0]][currentPosition[1]]='*';
    }
    }catch(e){
        console.log("Out of bounds");
        currentPosition[1]++;
    };

break;

case 'd' : 
currentPosition[0]++;
try{
    if( myField.field[currentPosition[0]][currentPosition[1]] === 'O'){
        console.log("Sorry. You fell into a hole :(")
        gameOn = false;
    }else if(myField.field[currentPosition[0]][currentPosition[1]] === '^'){
        console.log("Congrats! You found your Hat!")
        gameOn = false;
    }else{
        myField.field[currentPosition[0]][currentPosition[1]]='*';
    }
    }catch(e){
        console.log("Out of bounds");
        //currentPosition[0]--;
        gameOn = false;
    };
break;

case 'u' : 
currentPosition[0]--;
try{
    if( myField.field[currentPosition[0]][currentPosition[1]] === 'O'){
        console.log("Sorry. You fell into a hole :(")
        gameOn = false;
    }else if(myField.field[currentPosition[0]][currentPosition[1]] === '^'){
        console.log("Congrats! You found your Hat!")
        gameOn = false;
    }else{
        myField.field[currentPosition[0]][currentPosition[1]]='*';
    }
    }catch(e){
        console.log("Out of bounds");
        //currentPosition[0]++;
        gameOn = false;
    };

break;


}

}