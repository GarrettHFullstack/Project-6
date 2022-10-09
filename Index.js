let board = [
    ["x","x","x","x","x"],
    ["x",0,0,0,"x"],
    ["x",0,0,0,"x"],
    ["x",0,0,0,"x"],
    ["x","x","x","x","x"]

];

let WinStatus = false;
let RemainingSquares = 0;
let Player1 = ""
let Player2 = ""
let Player1Name = document.getElementsByClassName("players")[0]
let Player2Name = document.getElementsByClassName("players")[1]
getnames();
let turn = Player1;
let container = document.getElementById("board");
let PaintBoard = "";
document.getElementsByClassName("players")[0].classList.add("playeractive")
container.addEventListener("click", function(event){
    document.getElementsByClassName("players")[1].classList.remove("playeractive")
    console.log(turn)
    let Identifier = event.target.id;
    let Identifier2 = event.target;
    console.log(Identifier2)
    let row = [Number(Identifier.slice(3,4))]
    let column = [Number(Identifier.slice(7))]
    checker1 = board[row[0]][column[0]]
    if(checker1 == 0 && WinStatus == false && RemainingSquares < 9 && Identifier2.classList.contains("box")==true){
    PaintBoard = document.getElementById(`row${row[0]}box${column[0]}`)
    board[row[0]][column[0]] = turn;
    if(turn == Player1){
        PaintBoard.classList.add("Player1")
    }else {
        PaintBoard.classList.add("Player2")
    }
    diagonal1(row[0],column[0])
    diagonal2(row[0],column[0])
    topcheck(row[0],column[0])
    RightLeft(row[0],column[0])
    if(Player2 == "AI"){
    ai();
    }
    if(turn == Player1){
        if(WinStatus == false){
            if(Player2 != "AI"){
                turn = Player2
                document.getElementsByClassName("players")[1].classList.add("playeractive")
                document.getElementsByClassName("players")[0].classList.remove("playeractive")
            }
    }
    } else {  
        if(WinStatus == false){
        document.getElementsByClassName("players")[0].classList.add("playeractive")
        turn = Player1 
        } 
    }
    } else if(WinStatus == true){
        alert(turn + " Has won the game, please restart")
    } else if(RemainingSquares == 9){
        alert("You have Tied, please restart the game")
    }
    else{
        if(Identifier2.classList.contains("box")==true){
        alert("square is taken please choose a different square")
        }
    }
})
function creatediv(){
    for(let y = 1; y <= 3; y++){
        let row = document.createElement('div')
        row.classList.add("row");
        row.id = `row${y}`
        container.append(row);
        row = document.getElementById(`row${y}`)
        for(let l = 1; l < 4; l++){
            let box = document.createElement('div');
            box.id = `row${y}box${l}`
            box.classList.add ("box")
            box.classList.add (`column${l}`)
            row.append(box);
        }
    }     
}
function diagonal1(row,column){
    let k = []
    let i = 1;
    while(board[row+i][column-i] == turn){
        k.push(board[row+i][column-i])

        i++;
    }
    i = 1;
    while(board[row-i][column+i] == turn){
        k.push(board[row-i][column+i])

        i++;
    }

    if(k.length >= 2 && Player2){
        Winner();
    }
}
function diagonal2(row,column){
    let k = []
    let i = 1;
    while(board[row-i][column-i] == turn){
        k.push(board[row-i][column-i])

        i++;
    }
    i = 1;
    while(board[row+i][column+i] == turn){
        k.push(board[row+i][column+i])
        i++;
    }
    if(k.length >= 2){
        Winner();
    }
}
function topcheck(row,column){
    let k = []
    let i = 1;
    while(board[row+i][column] == turn){
        k.push(board[row+i][column])
        i++;
    }
    i = 1;
    while(board[row-i][column] == turn){
        k.push(board[row-i][column])
        i++;
    }
    if(k.length >= 2){
        Winner();
    }
}
function RightLeft(row,column){
    let k = []
    let i = 1;
    while(board[row][column-i] == turn){
        k.push(board[row][column-i])
        i++;
    }
    i = 1;
    while(board[row][column+i] == turn){
        k.push(board[row][column+i])
        i++;
    }
    

    if(k.length >= 2){
        Winner();
    }
    if(Player2 != "AI" || turn == Player1){
    RemainingSquares++;
    }
    if(RemainingSquares == 9 && WinStatus != true){
        Tie();
        }
}
creatediv();
function Winner(){
   
    WinStatus = true;

    win()
}
let ClearButton = document.getElementById("clearResults");

ClearButton.addEventListener("click", clearboard)
function clearboard(){
    for (let p = 1; p < 4; p++){
        for (let k = 1; k < 4; k++){
            let Ind = document.getElementById(`row${p}box${k}`)
            Ind.classList.remove('Player1')
            Ind.classList.remove('Player2')
            RemainingSquares = 0;
            board[p][k] = 0;
            WinStatus = false
        }
    }
    console.log(board)
}

function ai(){
    let Holder = {
    
    }
    let greatest = 0;
    let placeGreat = 0;
    console.log(board)
    for(let RowInt = 1; RowInt <=3; RowInt++){
        for(let ColumnInt = 1; ColumnInt <=3; ColumnInt++){
            if(board[RowInt][ColumnInt] == 0){
                Holder[`row${RowInt}column${ColumnInt}`] = diagonal1Ai(RowInt,ColumnInt)+diagonal2Ai(RowInt,ColumnInt)+topcheckAi(RowInt,ColumnInt)+RightLeftAi(RowInt,ColumnInt)
                if(diagonal1Ai(RowInt,ColumnInt)+diagonal2Ai(RowInt,ColumnInt)+topcheckAi(RowInt,ColumnInt)+RightLeftAi(RowInt,ColumnInt)> greatest){
                    if(board[2][2] == Player1 || board[2][2] == Player2){
                    greatest = diagonal1Ai(RowInt,ColumnInt)+diagonal2Ai(RowInt,ColumnInt)+topcheckAi(RowInt,ColumnInt)+RightLeftAi(RowInt,ColumnInt);
                    placeGreat = [RowInt,ColumnInt]
                    } else{
                        placeGreat = [2,2]
                    }
                }
            }
        }
        
    }
    PaintBoard = document.getElementById(`row${placeGreat[0]}box${placeGreat[1]}`)
    if(RemainingSquares != 9 && WinStatus != true){
    PaintBoard.classList.add("Player2")
    
    board[placeGreat[0]][placeGreat[1]] = Player2;
    
    turn = Player2
    diagonal1(placeGreat[0],placeGreat[1])
    diagonal2(placeGreat[0],placeGreat[1])
    topcheck(placeGreat[0],placeGreat[1])
    RightLeft(placeGreat[0],placeGreat[1])
    RemainingSquares++;
    turn = Player1
    }
}
function diagonal1Ai(row1,column1){
    let k = 0;
    let inRow = []
    let i = 1;
    while(board[row1+i][column1-i] !== "x"){
        if(board[row1+i][column1-i] == Player1){
            k++
            inRow.push(1)
        }
        if(board[row1+i][column1-i] == "AI"){
            k--
        }
        i++;
    }
    i = 1;
    while(board[row1-i][column1+i] !== "x"){
        if(board[row1-i][column1+i] == Player1){
            k++
            inRow.push(1)
        }
        if(board[row1-i][column1+i] == "AI"){
            k--
        }
        i++;
    }
    if(inRow.length == 2){
        k = k+5;
    }
    return k;
}
//Diagonml1Ai goes from top left to bottom right
function diagonal2Ai(row1,column1){
    let k = 0;
    let i = 1;
    let inRow = []
    console.log(turn)
    while(board[row1-i][column1-i] !== "x"){
       if(board[row1-i][column1-i] == Player1){
        k++
        inRow.push(1)
       }
       if(board[row1-i][column1-i] == "AI"){
        k--
       }

        i++;
    }
    i = 1;
    while(board[row1+i][column1+i] !== "x"){
       if(board[row1+i][column1+i]== Player1){
        k++
        inRow.push(1)
       }
       if(board[row1+i][column1+i]== "AI"){
        k--
       }
        i++;
    }
    if(inRow.length == 2){
        k = k+5;
    }
    return k;
}
function topcheckAi(row1,column1){
    let k = 0
    let i = 1;
    let inRow = []
    while(board[row1+i][column1] !== "x"){
        if(board[row1+i][column1]== Player1){
            k++
            inRow.push(1)
        }
        if(board[row1+i][column1]== "AI"){
        k--
        }
        i++;
    }
    if(inRow.length == 2){
        k = k+5;
    }
    i = 1;
    while(board[row1-i][column1] !== "x"){
       if(board[row1-i][column1] == Player1){
            k++
            inRow.push(1)
       }
       if(board[row1-i][column1] == "AI"){
            k--
   }
        i++;
        }
        if(inRow.length == 2){
            k = k+5;
        }
    return k;

}
function RightLeftAi(row1,column1){
    let k = 0
    let i = 1;
    let inRow = []
    console.log("checking object" + row1 + column1)
    while(board[row1][column1-i] !== "x"){
        if(board[row1][column1-i] == Player1){
            k++
            inRow.push(1)
        }
        if(board[row1][column1-i] == "AI"){
            k--
        }
        i++;
    }
    i = 1;
    while(board[row1][column1+i] !== "x"){
        if(board[row1][column1+i] == Player1){
            k++
            inRow.push(1)
        }
        if(board[row1][column1+i] == "AI"){
            k--
        }
        i++;
    }
        if(inRow.length == 2){
            k = k+5;
        }
    return k;
}
function getnames(){
    let x = document.createElement("div")
    x.classList.add("startdiv")
    console.log(x)
    let getNamesOverlay = 
    `<div id = "getNames" style = "display: flex;background-color = white; align-items: center;position: absolute; flex-direction: column;justify-content: center;width: 100%; height: 100%"><div class = "upper">WELCOME TO GARRETTS<br>MILK-TAK-TOE</div><div class = "lower"><div class = "PlayerText">Please enter Player 1's Name</div> <input class = "startInput" type = "text"><button class = "submit" type = "submit" >Submit</button><div></div>`
    x.innerHTML = getNamesOverlay;
    let startpage = document.getElementsByTagName("body")[0]
    startpage.prepend(x)
    // Start of Button
    x = document.getElementsByClassName("startdiv")[0]
    let input1 = document.getElementsByTagName('input')[0]
    let submitButton = document.getElementsByTagName('button')[0]
    let playertext = document.getElementsByClassName("PlayerText")[0]
    let valueofInput = ""
    function nameChange(){
        valueofInput = input1.value;
        if (Player1 == ""){
        playertext.textContent = "Please enter Player 2's Name - If AI please type AI"
        Player1 = valueofInput.toUpperCase();
        Player1Name.textContent = "Player 1: " + Player1
        console.log(Player1)
        valueofInput = "";
        input1.value = "";
        turn = Player1;
    }   else if (Player2 == "" || Player1 == Player2){
        playertext.textContent = "Please enter Player 2's Name - If AI please type AI"
        Player2 = valueofInput.toUpperCase();
        Player2Name.textContent = "Player 2: " + Player2
        console.log(Player2)
        console.log(Player1)
        valueofInput = "";
        input1.value = "";
        if (Player1 != Player2){
            startpage.removeChild(x)
        }
    }   else if (Player1 == Player2){
        playertext.textContent = "Please Use a different name for player 2"
    }   
    }
    submitButton.addEventListener('click', nameChange)
}   
function win(){
    let x = document.createElement("div")
    x.classList.add("startdiv")
    console.log(x)
    let getNamesOverlay = 
    `<div id = "getNames" style = "display: flex;background-color = white; align-items: center;position: absolute; flex-direction: column;justify-content: center;width: 100%; height: 100%"><div class = "upper">${turn} HAS ONE THE GAME!</div><div class = "lower"><div class = "PlayerText">Please Hit the button to clear board and reset game</div><button class = "submit" type = "submit" >Reset</button><div></div>`
    x.innerHTML = getNamesOverlay;
    let startpage = document.getElementsByTagName("body")[0]
    startpage.prepend(x)
    let submitButton = document.getElementsByTagName('button')[0]
    function winner(){
        clearboard();
        startpage.removeChild(x)
    }
    submitButton.addEventListener('click', winner)
}
function Tie(){
    let x = document.createElement("div")
    x.classList.add("startdiv")
    console.log(x)
    let getNamesOverlay = 
    `<div id = "getNames" style = "display: flex;background-color = white; align-items: center;position: absolute; flex-direction: column;justify-content: center;width: 100%; height: 100%"><div class = "upper">YOU HAVE TIED!</div><div class = "lower"><div class = "PlayerText">Please Hit the button to clear board and reset game</div><button class = "submit" type = "submit" >Reset</button><div></div>`
    x.innerHTML = getNamesOverlay;
    let startpage = document.getElementsByTagName("body")[0]
    startpage.prepend(x)
    let submitButton = document.getElementsByTagName('button')[0]
    function Ties(){
        clearboard();
        startpage.removeChild(x)
    }
    submitButton.addEventListener('click', Ties)
}

