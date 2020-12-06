# CESTOLIV.COM

My official website, ![cestoliv.com](https://cestoliv.com)

## Self-hosting
```
git clone https://github.com/cestoliv/website.git
cd website
ENVIRONMENT=prod deno run --allow-net --allow-env --allow-read --unstable ./server.ts
```
development :
```
deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
ENVIRONMENT=debug denon run --allow-net --allow-env --allow-read --unstable ./server.ts
```

### Systemd
*cestoliv.service to run as a systemd service.*

    sed -i "s?^WorkingDirectory=.*?WorkingDirectory=$(pwd)?g" cestoliv.service

    cp cestoliv.service /etc/systemd/system/cestoliv.service

    sudo systemctl start cestoliv

### .env
- `WEBASH_URL` : Url of the WeBash instance