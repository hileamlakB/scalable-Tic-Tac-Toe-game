
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
