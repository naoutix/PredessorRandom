export {generateFirstElement,generateSecondElement,generateThirdElement,generateRedundancy}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateFirstElement(MaxSort){
    let max1 = MaxSort[0]
    let choose1 = max1[getRandomInt(max1.length)]
    max1.splice(max1.indexOf(choose1),1)
    return choose1
}

function generateSecondElement(mode,MaxSort,choose1) {
    let max1 = MaxSort[0]
    let max2 = MaxSort[1]

    let choose2 = choose1
    var k = 0
    if (mode == "Trios"){
        let max3 = MaxSort[2]
        while (choose2 == choose1 && k <3000){
            var elementChoisi = max2[getRandomInt(max2.length)]
            choose2 = elementChoisi
            if (max1.length == 1){
                if (max2.length == 2){
                    for (let index = 0; index < max2.length; index++) {
                        const elementAutre = max2[index];
                        if (elementAutre != elementChoisi){
                            var change = false
                            if (max1.indexOf(elementAutre)!=-1){
                                change = true
                            }
                            if (max3.length == 2 && max3.indexOf(elementAutre)!=-1 && max3.indexOf(max1[0])!=-1){
                                change = true
                            }
                            if (max3.length == 2 && max3.indexOf(elementChoisi)!=-1 && max3.indexOf(choose1)!=-1){
                                change = true
                            }
                            if (max3.length == 2 && max3.indexOf(elementAutre)!=-1 && max3.indexOf(choose1)!=-1){
                                change = false
                            }
                            if (max3.length == 2 && max3.indexOf(elementChoisi)!=-1 && max3.indexOf(max1[0])!=-1){
                                change = false
                            }
                            if (change) {
                                choose2 = elementAutre
                            }
                        }
                    }
                }
            }
        k++
        if (k>=3000){
            throw new Error(`TYPE2 :max1:${max1} max2:${max2} max3:${max3},choose1:${choose1},choose2:${choose2}`)
        }
        }
    }
    else{
        while (choose2 == choose1 && k <3000){
            var elementChoisi = max2[getRandomInt(max2.length)]
            choose2 = elementChoisi
            k++
            if (k>=3000){
                throw new Error(`TYPE2 :max1:${max1} max2:${max2} max3:${max3},choose1:${choose1},choose2:${choose2}`)
            }
        }
    }
    max2.splice(max2.indexOf(choose2),1)
    return choose2
}

function generateThirdElement(MaxSort,choose1,choose2) {
    let max1 = MaxSort[0]
    let max2 = MaxSort[1]
    let max3 = MaxSort[2]
    var choose3 = choose2
    var k = 0
    while ((choose1 == choose3 || choose2 == choose3)&& k <3000){
    
        var elementChoisi = max3[getRandomInt(max3.length)]
        choose3 = elementChoisi
        if (max1.length == 1){
            if (max3.length == 2){
                for (let index = 0; index < max3.length; index++) {
                    const elementAutre = max3[index];
                    if (elementAutre != elementChoisi){
                        var change = false
                        if (max1.indexOf(elementAutre)!=-1){
                            change = true
                        }
                        if (change) {
                            choose3 = elementAutre
                        }
                    }
                }
            }
        }
        if (max2.length == 1){
            if (max3.length == 2){
                for (let index = 0; index < max3.length; index++) {
                    const elementAutre = max3[index];
                    if (elementAutre != elementChoisi){
                        var change = false
                        if (max2.indexOf(elementAutre)!=-1){
                            change = true
                        }
                        if (change) {
                            choose3 = elementAutre
                        }
                    
                    }
                }
            }
        }
    k++
    if (k>=3000){
        throw new Error(`TYPE3 : max1:${max1} max2:${max2} max3:${max3},choose1:${choose1},choose2:${choose2},choose3:${choose3}`)
    }
    }
    max3.splice(max3.indexOf(choose3),1)
    return choose3  
}

function generateRedundancy(max) {
    let choose1 = getRandomInt(max.length)
    return choose1
}