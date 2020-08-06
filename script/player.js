class player{
    constructor(name,character){
        this.name = name
        this.character = character
        
    }
    getCharacter(){
        return this.character
    }
    getName(){
        return this.name
    }
    //a method to only be used by an AI player
    yourTurn(){

    }
    
}