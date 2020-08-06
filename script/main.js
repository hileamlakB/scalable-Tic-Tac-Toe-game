GAME = new ticTacToe (3);

//if the game is aginast another human player get player names
$("#playerId").change(
    function(){
        $(".controller").remove()
        if ($(this).val() == 2){
            console.log("here")
            $(".left").append(
                `<div class="controller">
                    <form id="player-form">
                        <div class="player-container">
                        <label for="player1">Player 1:</label>
                        <input type="text"  name="player1" id="player1" class="input-field" />
                        </div>
                        <div class="player-container">
                        <label for="player2">Player 2:</label>
                        <input type="text"  name="player2" id="player2" class="input-field" />
                        </div>

                        <input type="submit" class="submit-btn btn-primary" value="Start Game" />
                    </form>
                    
                </div>`
            )
        }
        else if ($(this).val() == 1){
            console.log("here")
            $(".left").append(
                `<div class="controller">
                    <form id="player-form">
                        <div class="player-container">
                        <label for="player1">Player 1:</label>
                        <input type="text"  name="player1" id="player1" class="input-field" />
                        </div>
                        <div class="player-container">
                        <label for="player2">Player 2:</label>
                        <input type="text"  name="player2" id="player2" class="input-field" />
                        </div>

                        <input type="submit" class="submit-btn btn-primary" value="Start Game" />
                    </form>
                    
                </div>`

            )
            $('#player2').attr("disabled", "disabled");
            $('select').attr("disabled", "disabled");
            $('#player2').val("Smart Bot")
        }
        $(".submit-btn").click(
            function(event){
                //ask if they want to be player one or two
                event.preventDefault();
                if($("#playerId").val()==2){

                    if ($('#player1').val().trim() === '' || $('#player2').val().trim() === '') {
                        alertMessage('You Must Enter a Name for Each Player')
                        return;
                      }
                    let player1 = new player($('#player1').val(),"X"), player2 = new player($('#player2').val(),"O"); 
                    
                    GAME.start(player1,player2);
                    $(".headerInfo").append(`<p>${GAME.getPlayerTurn().getName()}'s Turn</p>`)
    
                    $(this).remove()
                    $('#player1, #player2').attr("disabled", "disabled");
                    
                }
                else if ($("#playerId").val()==1){
                    if ($('#player1').val().trim() === '') {
                        alertMessage('You Must Enter a Name')
                        return;
                    }
                    let player1 = new player($('#player1').val(),"X"), player2 = new playerAI($('#player2').val(),"O",GAME); 
                    
                    GAME.start(player1,player2);
                    $(".headerInfo").append(`<p>${GAME.getPlayerTurn().getName()}'s Turn</p>`)
    
                    $(this).remove()
                    $('#player1, #player2').attr("disabled", "disabled");

                }
            }
             
                
        )
        

    }
    
)


//when the box elements are clicked
$(".box").click(function(){
    

    //check if the game is already started and the playing mode is selected
    //if it isnt prompt a requring message
    if (!GAME.isStarted()){
        
        if ($("#playerId").val() == 0){
            alertMessage("Choose an opponent First")
        }
        else if ($("#playerId").val() == 2){
            alertMessage("Insert names and start the game")
        }
        
    }

    //if the game is already started choose the player mode and 
    // take the aproperiate action
    if (GAME.isStarted()){
        // if the game mode is with another player handle that 
        if ($("#playerId").val() == 2 || $("#playerId").val() == 1 ){
           
            //get the row and colemen of the pressed box
            let col = parseInt(this.parentElement.id), row = parseInt(this.id); 
            
           
            //only if the prsesed value doeesnt have a previous value
            //put a value in it and check the game status
           if( $(this).html() == ''){

                //append the value the clicked value innto
                //the game board and also display it inn the page
                $(this).append(`<p>${GAME.getPlayerTurn().getCharacter()}</p>`)
                let gameStatus = GAME.appendToBoard([col,row])
                if(gameStatus){
                    
                    return gameOver(gameStatus.slice(1,4))
                    
                }

                $(".headerInfo > p").remove()
                $(".headerInfo").append(`<p>${GAME.getPlayerTurn().getName()}'s Turn</p>`)
                
                
                //check if the game is already over or 
                //still continuing
                
                
                
                
               
                
                   
                     
                
            }    
        }
        //if the game is against an AI handle that
        else if($("#playerId").val() == 1){
            
            
        }     
    }
   
});

function gameOver(winPos){

    if(winPos[1]=="draw"){
        console.log("here")
        alertMessage('A Draw!',false)
        return;
    } 

    //draw Streak
    let value = $(document.body.getElementsByClassName("col")[winPos[0][0]].getElementsByClassName("box")[winPos[0][1]]).text()
    
    if(winPos[1]=="row"){
        for(let i=winPos[0][1]; i<winPos[0][1]+3; i++){
            $(document.body.getElementsByClassName("col")[winPos[0][0]].getElementsByClassName("box")[i]).css('background-color','whitesmoke')
            $(document.body.getElementsByClassName("col")[winPos[0][0]].getElementsByClassName("box")[i]).html(`<p><del>${value}<del><p>`)
        }
        
    }
    else if(winPos[1]=="col"){
        for(let i=winPos[0][0]; i<winPos[0][0]+3; i++){
            $(document.body.getElementsByClassName("col")[i].getElementsByClassName("box")[winPos[0][1]]).css('background-color','whitesmoke')
            $(document.body.getElementsByClassName("col")[i].getElementsByClassName("box")[winPos[0][1]]).html(`<p><del>${value}<del><p>`)
        }
        
    }
    else if(winPos[1]=="dig"){
        let digCounter = 0
        let i = winPos[0][0], j =winPos[0][1];
        while(digCounter<3){
            $(document.body.getElementsByClassName("col")[i+digCounter].getElementsByClassName("box")[j+digCounter]).css('background-color','whitesmoke')
            $(document.body.getElementsByClassName("col")[i+digCounter].getElementsByClassName("box")[j+digCounter]).html(`<p><del>${value}<del><p>`)
            digCounter++;
        }
        
    }
    else if(winPos[1]=="digRev"){
        let digCounter = 0
        let i = winPos[0][0], j =winPos[0][1];
        while(digCounter<3){
            $(document.body.getElementsByClassName("col")[i-digCounter].getElementsByClassName("box")[j+digCounter]).css('background-color','whitesmoke')
            $(document.body.getElementsByClassName("col")[i-digCounter].getElementsByClassName("box")[j+digCounter]).html(`<p><del>${value}<del><p>`)
            digCounter++;
        }
        
    }

    alertMessage(`${winPos[2].getName()} Won! Congragtulations ${winPos[2].getName()[0]}`,false)
   
    
    
}

$("#restart").click(
    function(){
        GAME.reset()
        $('select').removeAttr("disabled")
        $(".controller").remove()
        $("#playerId").val('0')
        $(".headerInfo > p").remove()

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

//Todo
//
// 3.Optimizations (draw before the game is over, dont check for a win before at list three moves into the game)
//creat player class that will be used in the Ai class during the optimization proces
//4.scaling
// 2.AI
//turn tracker in the left
//score board in the right
//online multiplayer backend

//5.polishing win messages
//resopnsive

function alertMessage(message,delay=true){
    $(".message").append(
        `<p>${message}</p>`
    )
    $(".message").css("display",'flex')
    if (delay){
        
        setTimeout(()=>{
        $(".message").empty();
        $(".message").css("display","none")},2000)
    }
    
}