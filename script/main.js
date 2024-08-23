// LIST LEGENDS -> MUST MATCH NAME OF IMAGES IN FOLDER images\legends
export const NameNumber = ['bloodhound',
                            'gibraltar',
                            'lifeline',
                            'pathfinder',
                            'wraith',
                            'bangalore',
                            'caustic',
                            'mirage',
                            'octane',
                            'wattson',
                            'crypto',
                            'revenant',
                            'loba',
                            'rampart',
                            'horizon',
                            'fuse',
                            'valkyrie',
                            'seer',
                            'ash',
                            'madmaggie',
                            'newcastle',
                            'conduit',
                            'vantage',
                            'catalyst',
                            'ballistic']

import {UI} from './UI.js'
import {Game} from './game.js'

let UIgame = new UI(document)
let game = new Game()

const button = document.getElementById('generate')

button.addEventListener('click',generate2)

addEventListener("input",UpdateCode)
init()

function init(){
    checkCookie("LegendeSelector1")
    checkCookie("LegendeSelector2")
    checkCookie("LegendeSelector3")
}


function UpdateCode(event){
    if (event.target.id.match("CodeLegends[0-3]")) {
        let txt = document.getElementById(event.target.id).value
        if (txt.match("0x[0-9a-fA-F]{7}([0-9a-fA-F]{7})?")){
            let code = ((parseInt(txt, 16)).toString(2)).padStart(25, '0')
            console.log("hello")
            console.log(code)
            //console.log("LegendeSelector".concat(event.target.id.slice(-1)))
            UIgame.updateFromCode(code,document.getElementById("LegendeSelector".concat(event.target.id.slice(-1)))) 
            document.cookie = "LegendeSelector".concat(event.target.id.slice(-1)) +"="+txt+";"+"expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; samesite=strict"        
        }
    }
    else {
        let {code1,code2,code3} = UIgame.codeFromTable()
        document.cookie = "LegendeSelector1="+code1+";"+"expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; samesite=strict"
        document.cookie = "LegendeSelector2="+code2+";"+"expires=Fri, 31 Dec 9999 23:59:59 GMT; paht=/; secure; samesite=strict"
        document.cookie = "LegendeSelector3="+code3+";"+"expires=Fri, 31 Dec 9999 23:59:59 GMT; paht=/; secure; samesite=strict"
    }
}

/**
 * Main function
 *
 */
function generate2() {
    // reset
    let {legendsSelected1,legendsSelected2,legendsSelected3,map} = UIgame.resetUI()
    game.updateFreeLegends(legendsSelected1,legendsSelected2,legendsSelected3)

    try {
        let numeroLegends = game.generateRandomPlayer()
        UIgame.updateUIlegends(numeroLegends)
    } catch (error) {
        console.log(error)
        game.rebuild()

    }   
}

/**  COOKIE
 *
 */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    const regexSelector = new RegExp("LegendeSelector*")

    let code = getCookie(cname);
    if (code != "") {
        if (regexSelector.test(cname)) {
            code = ((parseInt(code, 16)).toString(2)).padStart(25, '0')
            UIgame.updateFromCode(code,document.getElementById(cname))
        }

    } else {
        if (regexSelector.test(cname)){
            document.cookie = cname+"=0xFFFFFF;expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; samesite=strict"
        } 
    }
}
