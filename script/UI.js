import {NameNumber} from "./main.js"
export {UI};

function changeimageLegends(contexte,path,label) {
    contexte.src = `images/legends/${path}.png`
    label.innerHTML = path
}

function changeimageWeapons(contexte,Class,Weapon,label) {
    contexte.src = `images/weapons/${Class}/${Weapon}.webp`
    label.innerHTML = Weapon
}

function changeimagePOI(sky,base,view,map,POI_map) {
    sky.src = `images/maps/${map}_POI/Sky/${POI_map}_Sky.webp`
    base.src = `images/maps/${map}_POI/base/${POI_map}.webp`
    view.src = `images/maps/${map}_POI/View/${POI_map}_View.webp`
}

class UI {
    timeout1 = null
    timeout2 = null
    timeout3 = null

    timeoutWeapon1 = null
    timeoutWeapon2 = null
    timeoutPOI_map = null

    constructor(document){
        // HTML Element
        this.button = document.getElementById('generate')
        this.player1 = document.getElementById('team1')
        this.player2 = document.getElementById('team2')
        this.player3 = document.getElementById('team3')
        this.myTable1 = document.getElementById("LegendeSelector1");
        this.myTable2 = document.getElementById("LegendeSelector2");
        this.myTable3 = document.getElementById("LegendeSelector3");
        this.parcoursRow = [1,2,3,4,5]
        this.parcoursCol = [[1,2,3,4,5],[1,2,3,4,5,6],[1,2,3,4],[1,2,3,4,5,6],[1,2,3,4]]
        this.name1 = document.getElementById("OutP1")
        this.name2 = document.getElementById("OutP2")
        this.name3 = document.getElementById("OutP3")
        this.weapon1 = document.getElementById("weapon1")
        this.weapon2 = document.getElementById("weapon2")
        this.weaponName1 = document.getElementById("weapon1Name")
        this.weaponName2 = document.getElementById("weapon2Name")
        this.codeLegends1 = document.getElementById("CodeLegends1")
        this.codeLegends2 = document.getElementById("CodeLegends2")
        this.codeLegends3 = document.getElementById("CodeLegends3")

        this.POI_sky = document.getElementById("POI_sky")
        this.POI_view = document.getElementById("POI_view")
        this.POI_base = document.getElementById("POI_base")
        this.map = document.getElementById("Map Select")
        this.WeaponMod = document.getElementById("modeWeapon")
        this.mapMod = document.getElementById("modeMAP")
    }

    resetUI(){
        this.player1.src = 'images/random1.gif'
        this.player2.src = 'images/random2.gif'
        this.player3.src = 'images/random3.gif'
        this.weapon1.src = 'images/weapons/randomWeapon1.gif'
        this.weapon2.src = 'images/weapons/randomWeapon2.gif'
        this.POI_sky.src  = 'images/maps/'+this.map.value+'_POI/Random_sky.gif'
        this.POI_base.src = 'images/maps/'+this.map.value+'_POI/Random_base.gif'
        this.POI_view.src = 'images/maps/'+this.map.value+'_POI/Random_view.gif'

        this.name1.innerHTML = "???"
        this.name2.innerHTML = "???"
        this.name3.innerHTML = "???"
        this.weaponName1.innerHTML = "???"
        this.weaponName2.innerHTML = "???"

        let legendsSelected1 = this.selectedLegend(this.myTable1)
        let legendsSelected2 = this.selectedLegend(this.myTable2)
        let legendsSelected3 = this.selectedLegend(this.myTable3)
        let map = this.map.value
        clearTimeout(this.timeout1)
        clearTimeout(this.timeout2)
        clearTimeout(this.timeout3)
        clearTimeout(this.timeoutWeapon1)
        clearTimeout(this.timeoutWeapon2)
        clearInterval(this.timeoutPOI_map)

        return {legendsSelected1,legendsSelected2,legendsSelected3,map}
    }
    /**
     * Check selected legends with UI
     * 
     *
     *
     * @param {Array<String>} LegendsFree
     * @param {*} legendselector
     * @return {Array<String>} 
     */
    selectedLegend(legendselector){
        // Mode Fill LegendsFree
        let listPlayer = []
        for (let i = 0; i < 5; i++) {
            const colI = this.parcoursCol[i]
            let j = 0;
            for (j of colI) {
                const myRow = legendselector.getElementsByTagName("tr")[this.parcoursRow[i]];
                const myCell = myRow.getElementsByTagName("td")[j];
                const checkbox = myCell.getElementsByTagName("input")
                if (checkbox.checkbox.checked){
                    listPlayer.push(NameNumber.indexOf(checkbox.checkbox.value))
                }
            }
        }
        return listPlayer
    }

    updateFromCode(Code,legendselector){
        let count = 0
        for (let i = 0; i < 5; i++) {
            const colI = this.parcoursCol[i]
            let j = 0;
            for (j of colI) {
                const myRow = legendselector.getElementsByTagName("tr")[this.parcoursRow[i]];
                const myCell = myRow.getElementsByTagName("td")[j];
                const checkbox = myCell.getElementsByTagName("input")
                if (Code[count] == "1"){
                    checkbox.checkbox.checked = true
                }else{
                    checkbox.checkbox.checked = false
                }
                count++
            }
        }
    }
    codeFromTable(){
        let code1 = this.#codeFromTableSelect(this.myTable1)
        let code2 = this.#codeFromTableSelect(this.myTable2)
        let code3 = this.#codeFromTableSelect(this.myTable3)
        this.codeLegends1.value = code1
        this.codeLegends2.value = code2
        this.codeLegends3.value = code3
        return {code1,code2,code3}
    }
    #codeFromTableSelect(legendselector){
        let code = ""
        for (let i = 0; i < 5; i++) {
            const colI = this.parcoursCol[i]
            let j = 0;
            for (j of colI) {
                const myRow = legendselector.getElementsByTagName("tr")[this.parcoursRow[i]];
                const myCell = myRow.getElementsByTagName("td")[j];
                //console.log("i:"+i+" j:"+j)
                const checkbox = myCell.getElementsByTagName("input")
                if (checkbox.checkbox.checked){
                    code = code.concat("","1")
                }
                else {
                    code = code.concat("","0")
                }
            }
        }
        code = parseInt(code, 2).toString(16).toUpperCase().padStart(7, '0')
        code = "0x".concat(code)
        return code       
    }

    updateUIlegends(mode,numeroLegends){
        this.timeout1 = setTimeout(changeimageLegends.bind(null,this.player1,NameNumber[numeroLegends[0]],this.name1),1000)
        this.timeout2 = setTimeout(changeimageLegends.bind(null,this.player2,NameNumber[numeroLegends[1]],this.name2),3000)
        if (mode == "Trio"){
            this.timeout3 = setTimeout(changeimageLegends.bind(null,this.player3,NameNumber[numeroLegends[2]],this.name3),6000)
        }
    }

    updateUIweapons(Weapons){
        this.timeoutWeapon1 = setTimeout(changeimageWeapons.bind(null,this.weapon1,Weapons[0][1],Weapons[0][0],this.weaponName1),1000)
        this.timeoutWeapon2 = setTimeout(changeimageWeapons.bind(null,this.weapon2,Weapons[1][1],Weapons[1][0],this.weaponName2),3000)

    }

    updateUImaps(POI_map){
        this.timeoutPOI_map = setTimeout(changeimagePOI.bind(null,this.POI_sky,this.POI_base,this.POI_view,this.map.value,POI_map),3000)
    }

    updateUIWeaponMod(state){
        if (state=="On"){
            this.WeaponMod.checked = true
        }
        else {
            this.WeaponMod.checked = false
        }
    }

    updateUIMapMod(state){
        if (state=="On"){
            this.mapMod.checked = true
        }
        else {
            this.mapMod.checked = false
        }        
    }
}