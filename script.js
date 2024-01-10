let boxes = document.querySelectorAll(".box");
let resetBtn =document.querySelector(".reset-btn");

let newGameBtn = document.querySelector("#new-btn");
let winnerMsg = document.querySelector(".winner-msg");
let msg=document.querySelector("#msg");

let turn0=true;
let count=0;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        
        if(turn0)
        {
            box.innerText="0";
            turn0=false;
        }
        else{
            box.innerText="X"
            turn0=true;
        }
        box.disabled=true;
       
        let isWinner=checkWinner();
       
        count++;
        if(count === 9 && !isWinner)
        {
            gameDraw();
        }
    });
});

const checkWinner = () =>{

    for(let pattern of winPatterns)
    {     
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText; 

        if(pos1val != "" && pos2val != "" && pos3val !="")
        {
            if(pos1val === pos2val && pos2val === pos3val)
            {   
                showWinner(pos1val);
                return true;
            }
        }

    }
    return false;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    winnerMsg.classList.remove("hide");   // this is for which we have hide the winner and new game container...
    disableBoxes();
}


const gameDraw = () =>{
    msg.innerText="Game was a Draw";
    winnerMsg.classList.remove("hide");
    disableBoxes();   
};

const disableBoxes =() =>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};

const enableBoxes =() =>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

const resetGame = () =>{
    turn0=true;
    count=0;
    enableBoxes();
    winnerMsg.classList.add("hide");

}


resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
