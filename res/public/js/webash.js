var webash_terminal = document.getElementById("webash_terminal")
var webash_answers_div = document.getElementById("webash_answers")
var webash_input = document.getElementById("webash_input")

const SOCKET_URL = webash_terminal.getAttribute("webash-url")

var webash_params = {
    colored: true
}

var webash_answers = {} // we are gonna store all the commands and answers based on their id
/* 
    future structure of webash_answers :

    {
        "d9adfe92": {
            order: 0,
            command: {colored: false, command: "echo Hello WeBash !", command_id: "d9adfe92"},
            answers: [
                {ended: true, command_id: "d9adfe92", text: "Hello WeBash !\n", order: 0}
            ]
        },
        "be6d89c0": {
            order: 1,
            command: {colored: false, command: "echo How are you ?", command_id: "be6d89c0"},
            answers: [
                {ended: true, command_id: "be6d89c0", text: "How are you ? !\n", order: 0}
            ]
        }
    }
*/

var webash_answers_order = [] // this is where we will store the order of the commands
/* 
    future structure of webash_answers_order :
        [
            "d9adfe92",
            "be6d89c0"
        ]
    }
*/

var socket = io.connect(SOCKET_URL)
const prefix = "~ >>> "

webash_input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        send_command()
    }
})
webash_input.addEventListener("input", (event) => {
    check_prefix()
    // FIT TO CONTEXT
    /* Accounts for rows being deleted, pixel value may need adjusting */
    if (webash_input.clientHeight == webash_input.scrollHeight) {
        webash_input.style.height = "30px";
    }

    var adjustedHeight = webash_input.clientHeight
    adjustedHeight = Math.max(webash_input.scrollHeight, adjustedHeight)
    if (adjustedHeight > webash_input.clientHeight)
        webash_input.style.height = adjustedHeight + "px"
})

let finished = true
socket.on('command_answer', (answer) => {
    webash_answers[answer.command_id].answers.push(answer)

    if(answer.ended) {
        finished = true
        webash_input.disabled = false // enable the input
        webash_input.value = prefix // add the prefix
    }

    webash_input.focus()
    display_answers()
})

webash_terminal.onclick = () => {
    // if not selecting
    var selection = window.getSelection();
    if(selection.toString().length === 0) {
        webash_input.focus()
    }
}

send_command = () => {
    // construct the command
    command_params = {...webash_params} // take the main params
    command_params.command = webash_input.value.substr(prefix.length) // add your command
    command_params.command_id = Math.random().toString(16).substr(2, 8) // random string

    // ui
    webash_input.value = "" // empty the input
    webash_input.disabled = true // disable the input
    
    // storing command for future display
    webash_answers_order.push(command_params.command_id) // add the command id to order

    webash_answers[command_params.command_id] = {}
    webash_answers[command_params.command_id].command = command_params
    webash_answers[command_params.command_id].answers = []
    
    socket.emit("command", command_params) // send the command
} 

display_answers = () => {
    let answer_string = ""

    // loop in every commands requests
    for(i = 0; i < webash_answers_order.length; i++) {
        let command = "<p><b>" + prefix + " " + webash_answers[webash_answers_order[i]].command.command + "</b></p>"
        // show the command
        answer_string += command
    
        let command_answers = webash_answers[webash_answers_order[i]].answers
        // re-order the answers (if they are partials)
        command_answers = command_answers.sort((a, b) => {
            return a.order > b.order ? 1 : -1
        })

        // loop in the answers (most of the time, there will be only one)
        answer_string += "<p>"
        for(j = 0; j < command_answers.length; j++) {
            command_answer = command_answers[j].text
            command_answer = formatBash(command_answer)

            answer_string += command_answer
        }
        answer_string += "</p>"
    }

    webash_answers_div.innerHTML = answer_string
}

clear = () => {
    webash_answers = {}
    webash_answers["13102003"] = {
        order: 0,
        command: {
            colored: true,
            command: "Welcome",
            command_id: "13102003"
        },
        answers: [
            {
                ended: false,
                command_id: "13102003",
                text: '&nbsp;&nbsp;\\033[1;32;49m+-+-+-+-+-+-+\\033[0m\n&nbsp;&nbsp;\\033[1;32;49m|W|e|B|a|s|h|\\033[0m\n&nbsp;&nbsp;\\033[1;32;49m+-+-+-+-+-+-+\\033[0m\n',
                order: 0 
            },
            {
                ended: true,
                command_id: "13102003",
                text: '&nbsp;&nbsp;\\033[4;32;49m<a href="https://github.com/taokann/WeBash">on github</a>\\033[0m\n',
                order: 1
            },
        ]
    }

    webash_answers_order = []
    webash_answers_order[0] = "13102003"

    webash_input.value = ""
    check_prefix()
    display_answers()
}

check_prefix = () => {
    if(!webash_input.value.startsWith(prefix)) {
        webash_input.value = prefix + webash_input.value
    }
}

formatBash = (str) => {
    getFormatTextClass = (str) => {
        switch (str) { // format text
            case "1":
                return "bold"
            case "2":
                return "dim"
            case "3":
                return "italic"
            case "4":
                return "underlined"
            case "5":
                return"blink"
            case "9":
                return "strikethrough"
            default:
                return ""
        }
    }

    getFormatFgColorClass = (str) => {
        switch (str) { // foreground
            case "30":
                return " blackFg"
            case "31":
                return " redFg"
            case "32":
                return " greenFg"
            case "33":
                return " yellowFg"
            case "34":
                return " blueFg"
            case "35":
                return " magentaFg"
            case "36":
                return " cyanFg"
            case "37":
                return " lightGrayFg"
            case "90":
                return " darkGrayFg"
            case "91":
                return " lightRedFg"
            case "92":
                return " lightGreenFg"
            case "93":
                return " lightYellowFg"
            case "94":
                return " lightBlueFg"
            case "95":
                return " lightMagentaFg"
            case "96":
                return " lightCyanFg"
            case "97":
                return " whiteFg"
            default:
                return ""
        }
    }

    getFormatBgColorClass = (str) => {
        switch (str) { // background
            case "40":
                return " blackBg"
            case "41":
                return " redBg"
            case "42":
                return " greenBg"
            case "43":
                return " yellowBg"
            case "44":
                return " blueBg"
            case "45":
                return " magentaBg"
            case "46":
                return " cyanBg"
            case "47":
                return " lightGrayBg"
            case "100":
                return " darkGrayBg"
            case "101":
                return " lightRedBg"
            case "102":
                return " lightGreenBg"
            case "103":
                return " lightYellowBg"
            case "104":
                return " lightBlueBg"
            case "105":
                return " lightMagentaBg"
            case "106":
                return " lightCyanBg"
            case "107":
                return " whiteBg"
            default:
                return ""
        }
    }

    var rx = /\\033\[(\d+);(\d+);(\d+)m(.+?)\\033\[0m/g
    str = str.replace(rx, ($0, $1, $2, $3, $4) => {
        let classAttribute = ""
        if($1)
            classAttribute += getFormatTextClass($1)
        if($2)
            classAttribute += getFormatFgColorClass($2)
        if($3)
            classAttribute += getFormatBgColorClass($3)

        return '<i class="' + classAttribute + '">' + $4 + "</i>"
    })

    return str
}

clear()