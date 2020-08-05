//creat a tictactoe game class
class ticTacToe{
    constructor(length){
        this.gameStarted = false
        this.turn = "X"
        this.boardLength = length
        this.board = undefined;
    }

    squareArray (length){
        let _ = []
        for(let i = 0; i<length; i++){
            _.push([])
            for(let j = 0; j<length; j++){
                _[i].push("")
            }
        }

        return _
    }
    start(){
        this.gameStarted = true
        this.board = this.squareArray(this.boardLength )
    }
    reset(){
        this.gameStarted = false
        this.board = this.squareArray(this.boardLength )
    }

    isStarted(){
        return this.gameStarted
    }
    appendToBoard(location){
        this.board[location[0]][location[1]] = this.turn;
        //after adding the current value into the board
        //change the player character to the next character
        this.turn = (this.turn=='X')?"O":"X"
    }
    getBoard(){
        return this.board
    }
    getTurn(){
        return this.turn
    }

    checkDraw(){

        //the simple case of a draw where there are no more moves to play
        for(let i=0; i<this.board.length; i++)
        {
            for (let j=0;j<this.board[i].length;j++){
                if (this.board[i][j]==""){
                    return false
                }

            }
            
        }
        return true
    }
       
    

}

//creat judge class
class ticTacToeJudge{
    constructor(game){
        this.judgedGame = game;
        this.helper = new helperFunctions()
    }
    isOver(){
        let rowResult = this.isOverInRow()
        if (rowResult){
            return rowResult
        }
        else{
            let colResult = this.isOverInCol();
            if (colResult){
                return colResult
            }
            else{
                let digResult =  this.isOverInDig();
                if (digResult){
                    return digResult
                }
            }

        }

        return false
            

    }

    isOverInRow(){
        //check if the game is over in each row and if itsnt 
        //a win situation in any of the rows return a false at the end of 
        // the for loop
        for (let i=0; i<this.judgedGame.getBoard().length;i++){
        
            //in each raw different consecutive sections can have a
            //winning possibility so try each one by passing the 
            //the rows into the checkRow function
            let rowStatus = this.checkRow(this.judgedGame.getBoard()[i])
            //if the game is won return a won message
            if(rowStatus[0]){
                //[gameIsWons,[winningRow,winningCol],"the type of win"]
                //the location of the first winning element will be used in the display later
                return [true,[i,rowStatus[1]],"row"]
                
    
            }
            
        }
        return false

    }
    checkRow(row){

        for(let i=0; i<row.length - 2;i++){

            //slice a row of length three and see if 
            //they are equal if they are we got  a winner if they 
            //arent we will go the next slice
            if(this.helper.checkEqualityList(row.slice(i,i+3))){

                //return the location where the similar row started which in short is the columun 
                //knowing this will be useful later in displaying the winner
                return [true,i]
            }
           
            
         
        }
        return false
    

    }

    isOverInCol(){
         //check if the game is over on the col
        //first reverse the list so that it can be treated 
        //as a col
        let reversedBoard = this.helper.reverseSquareList(this.judgedGame.getBoard())
        
        //check if the game is over in each col and if itsnt 
        //a win situation in any of the cols return a false at the end of 
        // the for loop this basically does the same thing as the is overInrow function
        //tho for that to be true w have reversed the list above
        for (let i=0; i<reversedBoard.length;i++){
        
            //in each raw of the reversed list different consecutive sections can have a
            //winning possibility so try each one by passing the 
            //the rows into the checkRow function
            let colstatus = this.checkRow(reversedBoard[i])
            //if the game is won return a won message
            if(colstatus[0]){
                //[gameIsWons,[winningRow,winningCol],"the type of win"]
                //the location of the first winning element will be used in the display later
                return [true,[colstatus[1],i],"col"]
                //here the location of the first winning element pisition is reversed to counter
                //act the revers of the list doen above
                
    
            }
            
        }
        return false
    }
  
    isOverInDig(){

    }


}

//creat a class holding helper functions
class helperFunctions{
    constructor(){

    }

    checkEqualityList(list){

        for(let j=0; j<list.length;j++){
            
            // the rest becase we dont want empty equals in this game
            if(list[j] == ''){
                
                return false
            }
           
            //if one of them is false you can be
            //sure that the  elements in  the list aren't equal at all
            if (list[j]!=list[0]){
                return false;
            }
        }
        return true;
    }

    reverseSquareList(list){
        let newList = []
        for(let i=0; i<list.length;i++){
            newList.push([])
            for(let j=0; j<list[0].length;j++){
            
                newList[i].push("")
            }
            
        }

        for(let i=0;i<list.length;i++){
            for(let j=0;j<list[i].length;j++){
                newList[j][i] = list[i][j];
            }

        }

        return(newList)
    }
}

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