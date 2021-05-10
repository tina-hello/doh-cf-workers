# doh-cf-workers
A very minimalist DNS-over-HTTPS proxy on Cloudflare Workers.

Sign up for a free [Cloudlare Workers](https://workers.cloudflare.com/) account, create a new worker, replace the Script with the content of [index.js](/index.js), deploy the worker, and you're done, use the address anywhere DoH is accepted (AdGuard, browsers secure DNS settings, YogaDNS, Intra, Nebulo etc). Feel free to replace the `doh` variable with any DNS-over-HTTPS server you want. Confirmed to work with Cloudflare itself, Google, and NextDNS.

Why? In case ISPs start banning known DoH providers, you can use your own proxy. Even if they block workers.dev wholesale, you can use your own domain. Daily request on free tier is limited to 100 thousands, should be enough for most personal use, or even a family.
