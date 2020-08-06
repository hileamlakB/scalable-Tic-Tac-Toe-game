class playerAI extends player{
    constructor(name,character,game){
       super(name, character)
       this.game = game
       this.aiJudge = new ticTacToeJudge()
    }
    yourTurn(){
        //do the minmax algorithm hear and answer the write choice
        
        this.analyze(this.game.getBoard())
    }
    analyze(board){
        console.log('here3')

        let judgeVerdict = this.aiJudge.isThisOver(board);
        console.log(judgeVerdict)
        if(judgeVerdict){
            return (judgeVerdict[2]=="draw")?0:(judgeVerdict[2]=="draw")?0:1
        } 
        
        console.log('here4',board)

        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[i].length;j++){
                console.log(board[i][j])
                
            }

        }

        
        
    }
}