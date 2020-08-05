
let tryAray = [[16, 22, 27 , 31, 34 ,36],
                [11, 17, 23 , 28, 32 ,35],
                [7, 12, 18 , 24, 29 ,33],
                [4, 8, 13 , 19, 25 ,30],
                [2, 5, 9 , 14, 20 ,26],
                [1, 3, 6 , 10, 15 ,21]]


function doTheThing(tryAray){
    for(let j=tryAray.length-1;j>=0;j--){
        let listOfThree = []
        let jTemp = j
        let colCounter = 0
        while (jTemp<tryAray.length){
           
            listOfThree.push(tryAray[jTemp][colCounter])
            colCounter++;
            jTemp ++;
        } 
        console.log(listOfThree)
    }
}
function reverseSquareList(list){
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
// doTheThing(tryAray)
// doTheThing(reverseSquareList(tryAray))
console.log(tryAray.reverse())
doTheThing(reverseSquareList(tryAray.reverse()))