var prefix = "[visitor@ms-colivier ~]$ "
var webashUrl_testing = "https://webash.cestoliv.com/api/v1/"
var webashUrl_master = "https://webash.cestoliv.com/api/v1/"
var webashUrl = webashUrl_master

formatBash = (string, fg = "", bg = "", ft = "") => {
	foreground = {
        "default": 39,
        "black": 30,
        "red": 31,
        "green": 32,
        "yellow": 33,
        "blue": 34,
        "magenta": 35,
        "cyan": 36,
        "light_gray": 37,
        "dark_gray": 90,
        "light_red": 91,
        "light_green": 92,
        "light_yellow": 93,
        "light_blue": 94,
        "light_magenta": 95,
        "light_cyan": 96,
        "white": 97
    }
    background = {
        "default": 49,
        "black": 40,
        "red": 41,
        "green": 42,
        "yellow": 43,
        "blue": 44,
        "magenta": 45,
        "cyan": 46,
        "light_gray": 47,
        "dark_gray": 100,
        "light_red": 101,
        "light_green": 102,
        "light_yellow": 103,
        "light_blue": 104,
        "light_magenta": 105,
        "light_cyan": 106,
        "white": 107
    }
    format = {
        "default": 0,
        "bold": 1,
        "dim": 2,
        "italic": 3,
        "underlined": 4,
        "blink": 5,
        "strikethrough": 9
    }
    
    let prefix = ""
    
    if(ft == "") {
        prefix = format["default"]
    }
    else {
        prefix = format[ft]
    }
    
    if(fg== "") {
        prefix += ";" + foreground["default"]
    }
    else {
        prefix += ";" + foreground[fg]
    }
    
    if(bg== "") {
        prefix += ";" + background["default"]
    }
    else {
        prefix += ";" + background[bg]
    }
    
    return("\\033[" + prefix + "m" + string + "\\033[0m")
}

treat = (query) => {
    let id = Math.random() + ""
    currentAns = id
    return new Promise((resolve, reject) => {
        querySplit = query.split(" ")
        querySplit[querySplit.length - 1] = querySplit[querySplit.length - 1].replace("\n", "")

        switch(querySplit[0]) {
            case 'cestoliv':
                runSummary(query).then((response) => {
                    resolve({id: id, ans: response})
                })
                break
            case "clear":
                resolve({id: id, ans: "", clear: true})
                break
            case "exit":
                resolve({id: id, ans: 'bye !', close: true})
                break
            case "master":
                if(webashUrl == webashUrl_master) {
                    resolve({id: id, ans: 'The console already uses the "master" branch of WeBash'})
                }
                else {
                    webashUrl = webashUrl_master
                    resolve({id: id, ans: 'The console now uses the WeBash "master" branch'})
                }
                break
            case "testing":
                if(webashUrl == webashUrl_testing) {
                    resolve({id: id, ans: 'The console already uses the "testing" branch of WeBash'})
                }
                else {
                    webashUrl = webashUrl_testing
                    resolve({id: id, ans: 'The console now uses the WeBash "testing" branch'})
                }
                break
            case "branch":
                if(webashUrl == webashUrl_testing) {
                    resolve({id: id, ans: 'The console uses the "testing" branch of WeBash'})
                }
                else {
                    resolve({id: id, ans: 'The console uses the "master" branch of WeBash'})
                }
                break
            default:
                getWeBashAnswer(query).then((response) => {
                    resolve({id: id, ans: response})
                })
                break
        }
    })
}

getWeBashAnswer = (query) => {
    return new Promise((resolve, reject) => {
        fetch(webashUrl + query, {mode: 'cors'}).then((response) => {
            response.json().then((json) => {
                json["output"] = json["output"].replace(/</g, "&lt;")
                                            .replace(/>/g, "&gt;")
                resolve(json["output"])
            }).catch((error) => {
                resolve("Server : " + webashUrl + "\n" + error)
            })
        }).catch((error) => {
            resolve("Server : " + webashUrl + "\n" + error)
        })
    })
}

runSummary = (query) => {
    return new Promise((resolve, reject) => {
        querySplit = query.split(" ")
        querySplit[querySplit.length - 1] = querySplit[querySplit.length - 1].replace("\n", "")

        if(querySplit[1]) {
            switch(querySplit[1]) {
                case 'about':
                    resolve("Bienvenue sur mon site, vous avez toutes mes " + formatBash("félicitations", "magenta", "", "") + " pour être arrivé jusqu'ici !!\nDu coup et bien... Je vais me présenter !\n" +
                        formatBash("├── ", "red", "", "blink") + "Je suis " + formatBash("CESTOLIV", "", "", "bold") + " aka " + formatBash("Olivier", "", "", "bold") + ", je suis lycéen mais avant tout développeur, designer et je m'improvise même parfois créateur de contenu.\n" +
                        formatBash("├── ", "red", "", "blink") + "Grand amoureux du libre et de l'OpenSource, je roule forcément sous " + formatBash("Linux", "yellow", "", "") + ", j'aurais aimé vous dire " + formatBash("Arch btw", "cyan", "", "") + ", mais impossible à installer sur ma machine actuelle, du coup, en ce moment c'est " + formatBash("Manjaro", "green", "", "") + ".\n" +
                        formatBash("├── ", "red", "", "blink") + "Malgré tout ce que vous trouverez à redire, j'aime beaucoup " + formatBash("JavaScript", "yellow", "", "") + " !\n" + 
                        formatBash("└── ", "red", "", "blink") + "En bon designer, je suis très fan du material design, je trouve aussi le neumorphic design très intéressant et j'ai une attirance particullière pour le minimalisme. J'adore tout de qui est rétro !"
                    )
                    break
                case "project":
                    querySplit[1] = "projects"
                case 'projects':
                    resolve(formatBash("PROJETS PRINCIPAUX :", "", "", "bold") + '\n' +
                    '├── <a href="https://chevro.fr" target="_blank">chevro.fr</a> : Création et propulsion de contenu\n' +
                    '└── <a href="https://blwrt.com" target="_blank">blwrt.com</a> : Application de notes synchronisées, OpenSource, et auto-hébergeable\n' +
                    "\n\n" +
                    formatBash("PROJETS GITHUB :", "", "", "bold") + '\n' +
                    '├── <a href="https://github.com/CHEVROfr/CHEVRO" target="_blank">chevro.fr</a> : site officiel\n' +
                    '├── <a href="https://github.com/CHEVROfr/BLUEWRITE" target="_blank">blwrt.com</a> : client web BLUEWRITE\n' +
                    '└── <a href="https://github.com/CHEVROfr/bluewrite-firefox-ext" target="_blank">blwrt for firefox</a> : extension firefox pour BLUEWRITE (utilise la sidebar)\n' +
                    "\n" +
                    formatBash("PROJETS auxquels je CONTRIBUE :", "", "", "bold") + '\n' +
                    '- <a href="https://github.com/taokann/WeBash" target="_blank">WeBash</a> : Une API qui émule un client bash (utilisé pour ce site !)')
                    break
                case 'contact':
                    resolve(formatBash("ME CONTACTER", "", "", "bold") + '\n' +
                    "├── ✉️ " + formatBash("Mail", "cyan", "", "") + ' : <a href="mailto:cestoliv@chevro.fr" target="_blank">cestoliv@chevro.fr</a>\n' +
                    "├── 🐦 " + formatBash("Twitter", "cyan", "", "") + ' : <a href="https://twitter.com/cestoliv" target="_blank">@cestoliv</a>\n' +
                    "└── 💬 " + formatBash("Discord", "cyan", "", "") + ' : ' + formatBash("cestoliv#0899", "dark_gray", "", "") + '\n')
                    break
                case 'social':
                    resolve(formatBash("MES RÉSEAUX SOCIAUX", "", "", "bold") + '\n' +
                    "├── 🎥 " + formatBash("YouTube", "cyan", "", "") + ' : <a href="https://www.youtube.com/channel/UCIVzban_FWu6idGf2rwSzlg" target="_blank">CESTOLIV</a>\n' +
                    "├── 🐦 " + formatBash("Twitter", "cyan", "", "") + ' : <a href="https://twitter.com/cestoliv" target="_blank">@cestoliv</a>\n' +
                    "├── 📸 " + formatBash("Instagram", "cyan", "", "") + ' : <a href="https://instagram.com/_cestoliv" target="_blank">@_cestoliv</a>\n' +
                    "├── 💬 " + formatBash("Discord", "cyan", "", "") + ' : ' + formatBash("cestoliv#0899", "dark_gray", "", "") + '\n' +
                    "└── 🕺 " + formatBash("TikTok", "cyan", "", "") + ' : ' + '<a href="https://vm.tiktok.com/JNNfJjo/" target="_blank">@cestoliv</a>')
                    break
                default: 
                    resolve("cestoliv : Argument unavailable")
                    break
            }
        }
        else {
            resolve(formatBash("MS-CESTOLIV, version 1.01", "", "", "bold") + '\n' + 
            "    summary ->  commands available :\n\n" +
            "    📜 - " + formatBash("about", "", "", "bold") + " : À propos de moi, et de ce (super) site\n" +
            "    💬 - " + formatBash("social", "", "", "bold") + " : Des liens direct vers mes réseaux sociaux\n" +
            "    🔨 - " + formatBash("projects", "", "", "bold") + " : Mes projets\n" + 
            "    📱 - " + formatBash("contact", "", "", "bold") + " : Ou comment récupérer mon 06 😉\n\n" +
            "    ex -> cestoliv about"
            )
        }
    })
    
}

var bottom = new Vue({
    el: "#bottom",
    methods: {
        scrollToMe() {
            setTimeout(() => {
                this.$el.scrollIntoView({behavior: "smooth"})
            }, 50)
        }
    }
})

var console_out = new Vue({
    el: '#os-console-out',
    data: {
        commands_output: []
    },
    methods: {
        add(str, className) {
            str = str.toString()
            str = str.replace(/\n/g, "<br />")
            
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

            this.commands_output.push({text: str, class: className})

            bottom.scrollToMe()
        },
        start() {
            this.add("" +
                "  ___ ___ ___ _____ ___  _    _____   __\n" +
                " / __| __/ __|_   _/ _ \\| |  |_ _\\ \\ / /\n" +
                "| (__| _|\\__ \\ | || (_) | |__ | | \\ V /\n" +
                " \\___|___|___/ |_| \\___/|____|___| \\_/ v1.01\n" +
                "\n"+
                formatBash("🎉 Bienvenue !", "", "", "blink") + "\n\n" +
                "Ce site fonctionne à la manière d'un terminal, il vous faudra donc " + formatBash("quelques", "", "", "italic") + " rudiments pour trouver des informations sur moi 😉\n" +
                formatBash("Commencez", "yellow", "", "") + " en tapant " + formatBash("cestoliv", "magenta", "", "") + " puis touchez " + formatBash("Entré", "cyan", "", "underlined") + "\n\n" +

                "En plus de ça, vous pourrez utiliser le terminal " + formatBash("normalement", "", "", "italic") + ", grâce à " + formatBash("WeBash", "green", "", "bold") + ", une API OpenSource que j'ai co-créé !\n" +
                formatBash("Commencez", "yellow", "", "") + " en tapant " + formatBash("help", "magenta", "", "") + " puis touchez " + formatBash("Entré", "cyan", "", "underlined") + "\n" +
                "\n\n")
        },
        clear() {
            this.commands_output = []
            this.start()
        },
        focus_entry() {
            console_in.focus()
        }
    }
})

var console_in = new Vue({
    el: '#os-console-in',
    data: {
        command: prefix
    },
    methods: {
        treat_command() {
            let cmd = this.command.substring(prefix.length)
            if(cmd && cmd.trim() != "") {
                treat(this.command.substring(prefix.length)).then((response) => {
                    if(response.clear) {
                        console_out.clear()
                    }
                    else {
                        console_out.add(prefix + cmd, "out_query")
                        console_out.add(response.ans, "out_answer")
                    }

                    if(response.close) {
                        setTimeout(() => {
                            console_out.clear()
                        }, 1000)
                    }

                    this.command = prefix
                }) 
            }
            else {
                this.command = prefix
            }
        },

        check_prefix() {
            if(!this.command.startsWith(prefix)) {
                this.command = prefix
            }
        },

        focus() {
            this.$el.focus()
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    }
})

console_out.start()