//your JS code here. If required.
document.getElementById("form").addEventListener("submit", (e)=>{
            e.preventDefault()
            
            let player_1 = document.getElementById("player1");
            let player_2 = document.getElementById("player2");

            document.getElementById("form").style.display = "none";
            document.querySelector(".game").style.display = "block"

            let currentPlayer = player_1.value;
            let currentTurn = "X"
            let gameOver = false;

            const message = document.querySelector(".message");
            message.innerText = `${currentPlayer}, you're up`;

            function switchPlayer(){
                currentPlayer = currentPlayer === player_1.value ? player_2.value :player_1.value;
                currentTurn = currentTurn === "X" ? "O" : "X"
                message.innerText = `${currentPlayer}, you're up`;
            }

            let cells = document.querySelectorAll(".cells");

            for (const cell of cells) {

                cell.addEventListener("click", ()=>{
                    if(cell.innerText !== "" || gameOver) return

                    cell.innerText=currentTurn;

                    if(checkWinner()) return;

                    if(checkDraw()) return;

                    switchPlayer()
                })
            }
            
            
            const checkWinner = () =>{
                let winPatterns = [
                    //rowwise winning
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    //columnwise winning
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    //Diagonalswise winning
                    [0,4,8],
                    [2,4,6]
                ]

                for(let pattern of winPatterns){
                    let pos1Val = cells[pattern[0]].innerText;
                    let pos2Val = cells[pattern[1]].innerText;
                    let pos3Val = cells[pattern[2]].innerText;
                    
                    if(pos1Val !== "" && pos1Val == pos2Val && pos2Val == pos3Val){
                        message.innerText = `${currentPlayer} congratulations you won!`
                        gameOver = true;
                        cells[pattern[0]].style.backgroundColor = "#FFD700";
                        cells[pattern[1]].style.backgroundColor = "#FFD700";
                        cells[pattern[2]].style.backgroundColor = "#FFD700";
                        return true;
                    }
                }
                return false;
            }

            const checkDraw = () =>{
                for(const cell of cells){
                    if(cell.innerText === ""){
                        return false;
                    }
                }

                message.innerText = "It's a Draw!"
                gameOver=true;
                return true;
            }

            const restartFunction = ()=>{
                for (const cell of cells) {
                    cell.innerText="";
                    cell.style.backgroundColor="#2FA084"
                }
                currentPlayer = player_1.value;
                currentTurn = "X"
                gameOver = false;
                message.innerText = `${currentPlayer}, you're up`
            }
            document.getElementById("restart").addEventListener("click", restartFunction)
        
            document.getElementById("newgame").addEventListener("click", ()=>{
                restartFunction()
                document.getElementById("form").style.display = "flex";
                document.querySelector(".game").style.display = "none"
                player_1.value="";
                player_2.value="";
            })
            
        })