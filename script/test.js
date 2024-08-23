/**
 *
 *
 * @param {*} num
 * @param {*} legendselector
 * @return {*} 
 */
function uncheckLegends(num,legendselector) {
    const nomLegends = NameNumber.indexOf(num)
    for (let i = 0; i < 5; i++) {
        var max = 5
        if (i == 4){
            max = 3
        }
        for (let j = 0; j < max; j++) {
            const myRow = legendselector.getElementsByTagName("tr")[i];
            const myCell = myRow.getElementsByTagName("td")[j];
            const checkbox = myCell.getElementsByTagName("input")
            if (nomLegends == checkbox.checkbox.value){
                checkbox.checkbox.checked = false
                return 1
            }
        }
    }
    return -1
}

//TEST
function test(){
    for (let index = 0; index < 10000; index++) {
        generate2()
        console.log(`run:${index}`)
    }
    console.log("PASS")
    return -1
}

/* Good print
    console.log(`${max1}!!${max2}!!${max3}`)
    console.log(`${max1.length}!!${max2.length}!!${max3.length}`)
*/
