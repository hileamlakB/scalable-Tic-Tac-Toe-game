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

                //now lets check the cse of the lower triagular matric
                //where the digaonals are drawn from top to bottom left to write
                let digResult =  this.isOverInDig(this.judgedGame.getBoard());
                if (digResult){
                    return digResult
                }

                else{
                    //now lets check the case of the upper triagular matrix
                    //where the digaonals are drawn from top to bottom left to right
                    let transposedDigResult =  this.isOverInDig(this.helper.transposeSquareList(this.judgedGame.getBoard()));
                    if (transposedDigResult){
                        return transposedDigResult
                    }
                    else{
                        let reverseMap = {

                        }
                        for(let i=0;i<this.judgedGame.getBoard().length;i++){
                            reverseMap[i] = this.judgedGame.getBoard().length - 1 - i

                        }
                         //now lets check the case of the upper triagular matrix
                        //where the digaonals are drawn from bottom to top left to right
                        let reversedDigResult =  this.isOverInDig(this.judgedGame.getBoard().reverse());
                        if (reversedDigResult){
                            reversedDigResult[1][0] = reverseMap[reversedDigResult[1][0]]
                            reversedDigResult[2] = "digRev" 
                            return reversedDigResult
                        }

                        else{
                             //now lets check the case of the lower triagular matrix
                            //where the digaonals are drawn from bottom to top left to right
                            let transposedReversedDigResult =  this.isOverInDig(this.helper.transposeSquareList(this.judgedGame.getBoard().reverse()));
                            if (transposedReversedDigResult){
                                transposedReversedDigResult[1][0] = reverseMap[transposedReversedDigResult[1][0]]
                                transposedReversedDigResult[2] = "digRev" 
                                return transposedReversedDigResult
                            }
                        }
                    }

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
        let reversedBoard = this.helper.transposeSquareList(this.judgedGame.getBoard())
        
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
  
    isOverInDig(board){
        //first prepare all the possible diagonals of length three that could
        //possibly result in a win
        

        //this process will only work for one half of the diagonal
        //the reversed list must be processed again so that the
        //upper triangular matrix can also be handled
        for(let j=board.length-1;j>=0;j--){
            let listOfThree = []
            let jTemp = j
            let colCounter = 0
            while (jTemp<board.length){
                listOfThree.push(board[jTemp][colCounter])
                colCounter++;
                jTemp ++;
            } 

            //after pulling aout the possible digonlas
            // the problem has now reduced to the row proplem so we can call the
            //checkRow function when ever the length of the diagonal is greater 
            //than or equal to

            if(listOfThree.length>=3){
                let digStatus = this.checkRow(listOfThree)
                if (digStatus[0]){
                    
                    //[gameIsWons,[winningRow,winningCol],"the type of win"]
                    //the location of the first winning element will be used in the display later
                    //here locating the first wining postion is a bit tricky because both the colomun
                    //and the width are changin in a diagonal so we will do use one nice propert of the 
                    //dig
                    return [true,[j+digStatus[1],digStatus[1]],"dig"]
                    
            
                    

                }
            }
        }



    }

    checkDraw(){

        //the simple case of a draw where there are no more moves to play
        for(let i=0; i<this.judgedGame.getBoard().length; i++)
        {
            for (let j=0;j<this.judgedGame.getBoard()[i].length;j++){
                if (this.judgedGame.getBoard()[i][j]==""){
                    return false
                }

            }
            
        }
        return true
    }

}
