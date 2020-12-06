/*
    prod : 
        ENVIRONMENT=prod deno run --allow-net --allow-env --allow-read --unstable ./server.ts
    dev :
        deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
        ENVIRONMENT=debug denon run --allow-net --allow-env --allow-read --unstable ./server.ts
*/

import { opine, serveStatic } from "https://deno.land/x/opine@0.25.0/mod.ts"
import { renderFile } from "https://deno.land/x/eta@v1.9.0/mod.ts"
import { config } from "https://deno.land/x/dotenv/mod.ts"

const env = Deno.env.toObject();
const app = opine()

app.engine(".html", renderFile)
app.set("view engine", "html")
app.set("views", "views")

if(env.ENVIRONMENT == "debug") {
    app.set("view cache", false)
}

app.use(serveStatic("res/public"))

app.get("/", (req, res) => {
    res.render("index", {
        webash_url: config()["WEBASH_URL"]
    })
})

app.listen(9062)
console.log("Opine started on port 9062")