var toggleSwitch = document.getElementById("toggle-color-scheme")
var toggleColorSchemeIcon = document.getElementById("toggle-color-scheme-icon")

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark")
        toggleColorSchemeIcon.classList.add("sun")
        toggleColorSchemeIcon.classList.remove("moon")
        localStorage.setItem("theme", "dark")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
        toggleColorSchemeIcon.classList.add("moon")
        toggleColorSchemeIcon.classList.remove("sun")
        localStorage.setItem("theme", "light")
    }
}

toggleSwitch.addEventListener("change", switchTheme, false)

var currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null

if (
    !currentTheme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
) {
    currentTheme = "dark"
}

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme)
    if (currentTheme === "dark") {
        toggleSwitch.checked = true
        toggleColorSchemeIcon.classList.add("sun")
        toggleColorSchemeIcon.classList.remove("moon")
    }
}