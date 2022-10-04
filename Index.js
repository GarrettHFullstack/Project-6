let board = [
    ["x","x","x","x","x","x","x","x","x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x",0,0,0,0,0,0,0,"x"],
    ["x","x","x","x","x","x","x","x","x"]
];
let WinStatus = false;
let Player1 = ""
let Player2 = ""
let Player1Name = document.getElementsByClassName("players")[0]
let Player2Name = document.getElementsByClassName("players")[1]
while(Player2 == "" || Player1 == Player2){
    if (Player1 == ""){
    Player1 = prompt("what is playing 1 name?")
    Player1Name.textContent = Player1
}   if (Player2 == "" || Player1 == Player2){
    Player2 = prompt("what is playing 2 name?")
    Player2Name.textContent = Player2
}   if (Player1 == Player2){
    alert("Please Use a different name")
}
}
let turn = Player1;
let container = document.getElementById("board");
container.addEventListener("click", function(event){
    let Identifier = event.target.id;
    console.log(Identifier)
    let row = [Number(Identifier.slice(3,4))]
    let column = [Number(Identifier.slice(7))]
    checker1 = board[row[0]][column[0]]
    console.log("you selected "+row[0] + ","+column[0])
    let i = 0;
    if(checker1 == 0 && WinStatus == false){
        while(board[row[0]+i][column[0]] == 0){
            if(board[row[0]+i][column[0]] ==! "x"){
            i++
            }
        }
    let PaintBoard = document.getElementById(`row${row[0]+i-1}box${column[0]}`)
    
    board[row[0]+i-1][column[0]] = turn;
    console.log(board)
    diagonal1(row[0]+i-1,column[0])
    diagonal2(row[0]+i-1,column[0])
    topcheck(row[0]+i-1,column[0])
    RightLeft(row[0]+i-1,column[0])
    if(turn == Player1){
        PaintBoard.classList.add("Player1")
        if(WinStatus == false){
        turn = Player2
    }
    } else {
        PaintBoard.classList.add("Player2")
        if(WinStatus == false){
        turn = Player1  
        } 
    }
    } else if(WinStatus == true){
        alert(turn + " Has won the game, please restart")
    }
    else{
        alert("square is taken please choose a different square")
    }
    console.log(document.getElementById(`row${row[0]+i-1}box${column[0]}`))
})
function creatediv(){
    for(let y = 1; y <= 7; y++){
        let row = document.createElement('div')
        row.classList.add("row");
        row.id = `row${y}`
        container.append(row);
        row = document.getElementById(`row${y}`)
        for(let l = 1; l < 8; l++){
            let box = document.createElement('div');
            box.id = `row${y}box${l}`
            box.classList.add ("box")
            box.classList.add (`column${l}`)
            row.append(box);
        }
    }     
}
function diagonal1(row,column){
    console.log("your row is" + row)
    console.log("your column is" +column)
    let k = []
    let i = 1;
    console.log(row - i)
    console.log(column + i)
    while(board[row+i][column-i] == turn){
        k.push(board[row+i][column-i])
        console.log("while 1" + k)
        i++;
    }
    i = 1;
    while(board[row-i][column+i] == turn){
        k.push(board[row-i][column+i])
        console.log("while 1" + k)
        i++;
    }
    console.log(k)
    if(k.length >= 3){
        Winner();
    }
}
function diagonal2(row,column){
    console.log("D2your row is " + row)
    console.log("D2your column is " +column)
    let k = []
    let i = 1;
    console.log(row - i)
    console.log(column + i)
    while(board[row-i][column-i] == turn){
        k.push(board[row-i][column-i])
        console.log("while 1" + k)
        i++;
    }
    i = 1;
    while(board[row+i][column+i] == turn){
        k.push(board[row+i][column+i])
        console.log("while 1" + k)
        i++;
    }
    console.log(k)
    if(k.length >= 3){
        Winner();
    }
}
function topcheck(row,column){
    console.log("D2your row is " + row)
    console.log("D2your column is " +column)
    let k = []
    let i = 1;
    console.log(row - i)
    console.log(column + i)
    while(board[row+i][column] == turn){
        k.push(board[row+i][column])
        console.log("while 1" + k)
        i++;
    }
    console.log(k)
    if(k.length >= 3){
        Winner();
    }
}
function RightLeft(row,column){
    console.log("D2your row is " + row)
    console.log("D2your column is " +column)
    let k = []
    let i = 1;
    console.log(row - i)
    console.log(column + i)
    while(board[row][column-i] == turn){
        k.push(board[row][column-i])
        console.log("while 1" + k)
        i++;
    }
    i = 1;
    while(board[row][column+i] == turn){
        k.push(board[row][column+i])
        console.log("while 1" + k)
        i++;
    }
    console.log(k)
    if(k.length >= 3){
        Winner();
    }
}

creatediv();
function Winner(){
    WinStatus = true;
    console.log("Contrats" + turn + "you are the victor!!!!!")
}