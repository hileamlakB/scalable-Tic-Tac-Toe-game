class playerAI extends player{
    constructor(name,character,game,aiJudge){
       super(name, character)
       this.game = game
       this.aiJudge = new ticTacToeJudge()
    }
    yourTurn(){
        //do the minmax algorithm hear and answer the write choice
        console.log(this.game.getBoard())
    }
    analyze(board){

        let judgeVerdict = this.aiJudge.isOver(board);
        if(judgeVerdict){
            return (judgeVerdict[2]=="draw")?0:1
        } 
        else if (judgeVerdict==false){
            return -1
        }

        for(let i=0;){

        }
        
        
    }
}