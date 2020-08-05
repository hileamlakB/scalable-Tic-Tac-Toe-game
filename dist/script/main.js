newGame = new ticTacToe (3);
judge = new ticTacToeJudge(newGame);

//when the box elements are clicked
$(".box").click(function(){

    //check if the game is already started and the playing mode is selected
    //if it isnt prompt a requring message
    if (!newGame.isStarted()){
        if ($("#playerId").val() == 0){
            $(".message").append(
                `<p>Choose an opponent First</p>`
            )

            $(".message").css("display",'flex')
            setTimeout(()=>{
                $(".message").empty();
                $(".message").css("display","none")},2000)
        }
        //if the playermode is choosen just start the game
        else{
        
            newGame.start();
            
        }
    }
    //if the game is already started choose the player mode and 
    // take the aproperiate action
    if (newGame.isStarted()){
        // if the game mode is with another player handle that 
        if ($("#playerId").val() == 2){
           
            //get the row and colemen of the pressed box
            let col = parseInt(this.parentElement.id), row = parseInt(this.id); 
           
            //only if the prsesed value doeesnt have a previous value
            //put a value in it and check the game status
           if( $(this).html() == ''){

                //append the value the clicked value innto
                //the game board and also display it inn the page
                $(this).append(`<p>${newGame.getTurn()}</p>`)
                newGame.appendToBoard([col,row])
                
                //check if the game is already over or 
                //still continuing
                let gameOver = judge.isOver();
                
                //also check if the game is drawn
                //if it isnt over
                if(gameOver){    
                    gameWon(gameOver.slice(1,3))
                }
                else{
                    console.log(newGame.checkDraw())
                    if(newGame.checkDraw()){
                        $(".message").append(`<p>A Draw!</p>`)
                        $(".message").css("display",'flex')
                    } 
                }
            } 
        }
        //if the game is against an AI handle that
        else if($("#playerId").val() == 1){
        }
    }
});

function gameWon(winPos){
    //draw Streak
    let value = $(document.body.getElementsByClassName("col")[winPos[0][0]].getElementsByClassName("box")[winPos[0][1]]).text()
    
    if(winPos[1]=="row"){
        for(let i=winPos[0][1]; i<winPos[0][1]+3; i++){
            $(document.body.getElementsByClassName("col")[winPos[0][0]].getElementsByClassName("box")[i]).css('background-color','whitesmoke')
            $(document.body.getElementsByClassName("col")[winPos[0][0]].getElementsByClassName("box")[i]).html(`<p><del>${value}<del><p>`)
        }
    }
    if(winPos[1]=="col"){
        for(let i=winPos[0][0]; i<winPos[0][0]+3; i++){
            $(document.body.getElementsByClassName("col")[i].getElementsByClassName("box")[winPos[0][1]]).css('background-color','whitesmoke')
            $(document.body.getElementsByClassName("col")[i].getElementsByClassName("box")[winPos[0][1]]).html(`<p><del>${value}<del><p>`)
        }
    }
    $(".message").append(`<p>Player ${value} Won! Congragtulation</p>`)
    $(".message").css("display",'flex')
    
    
}

$("#restart").click(
    function(){
        newGame.reset()

        $(".message").empty()
        $(".message").css("display",'none');
    
        Array.from( document.body.getElementsByClassName("col")).forEach(
            eachCol=>{
                Array.from( eachCol.getElementsByClassName("box")).forEach(
                    eachRow =>{
                        $(eachRow).empty()
                        $(eachRow).css('background-color','white')
                    }

                )
            }
        )
    }

);

//todo
// 1.diagonal wins
// 2.AI
// 3.Optimizations (draw before the game is over, dont check for a win before at list three moves into the game)
//4.scaling
//5.polishing win messages
//git Push to your repo