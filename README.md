# doh-cf-workers
A very minimalist DNS-over-HTTPS proxy on Cloudflare Workers.

Sign up for a free [Cloudlare Workers](https://workers.cloudflare.com/) account, create a new worker, replace the Script with the content of [index.js](/index.js), deploy the worker, and you're done, use the address anywhere DoH is accepted (AdGuard, browsers secure DNS settings, YogaDNS, Intra, Nebulo etc). Feel free to replace the `doh` variable with [any DNS-over-HTTPS server you want](https://github.com/curl/curl/wiki/DNS-over-HTTPS). Confirmed to work with Cloudflare itself, Google, and NextDNS.

Why? In case ISPs start banning known DoH providers, you can use your own proxy. Even if they block workers.dev wholesale, you can use your own domain. Daily request on free tier is limited to 100 thousands, should be enough for most personal use, or even a family.

You can also deploy the project using the button below, useful if you want to quickly modify the parameter/code without manually deploying to Cloudflare. Keep in mind the Action logs are visible to public unless you make your repository private, so they can see your Cloudflare Worker address.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tina-hello/doh-cf-workers)

Want more control of the filter? Use [serverless-dns](https://github.com/serverless-dns/serverless-dns) which powers [RethinkDNS](https://rethinkdns.com/)

Want to host on Google Cloud Function or see how this is implemented in .NET? Use my [doh-gcf](https://github.com/tina-hello/doh-gcf)
