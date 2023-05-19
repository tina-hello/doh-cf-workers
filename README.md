# doh-cf-workers
A very minimalist DNS-over-HTTPS proxy on Cloudflare Workers.

Sign up for a free [Cloudflare Workers](https://workers.cloudflare.com/) account, create a new worker, replace the Script with the content of [index.js](/index.js), deploy the worker, and you're done, use the address anywhere DoH is accepted (AdGuard, browsers secure DNS settings, YogaDNS, Intra, Nebulo etc). Feel free to replace the `doh` variable with [any DNS-over-HTTPS server you want](https://github.com/curl/curl/wiki/DNS-over-HTTPS). Confirmed to work with Cloudflare itself, Google, and NextDNS. The rarely supported [JSON API](https://developers.google.com/speed/public-dns/docs/doh/json) is available through the `dohjson` variable. Some providers use identical URL (Cloudlfare, NextDNS), some use `/resolve` instead of `/dns-query` for path (Google, AdGuard).

Why? In case ISPs start banning known DoH providers, you can use your own proxy. Even if they block workers.dev wholesale, you can use your own domain (it must be hosted on Cloudflare, add a CNAME record targeting anything and bind the route from your website Workers tab). If you want to use domain not hosted on Cloudflare, use [doh-cf-pages](https://github.com/tina-hello/doh-cf-pages) instead, where even CNAME records from [FreeDNS](https://freedns.afraid.org/) is enough for custom domain.

Daily request on free tier is limited to 100 thousands, should be enough for most personal use, or even a family. If you need more, upgrade to paid plan (card needed) and edit the [wrangler.toml](/wrangler.toml), though with minimum $5 monthly you might be better off just hosting AdGuard Home on a proper VPS ($5 on Vultr, pretty much unlimited request) which you can also put behind Cloudflare to hide your VPS IP. Once Cloudfare Snippet is released and if it's available on free tier, the code will be updated to adopt it for unlimited daily request.

You can also deploy the project using the button below, useful if you want to quickly modify the parameter/code without manually deploying to Cloudflare. Keep in mind the Action logs are visible to public unless you make your repository private (you'll need to [unfork](https://stackoverflow.com/questions/38831301/how-to-un-fork-the-github-repository)), so anyone can see your Cloudflare Worker address. Remember to remove the logs after deploying if you leave the repository public unless you're OK with others using your daily request quota.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tina-hello/doh-cf-workers)

Want more control of the filter? Use [serverless-dns](https://github.com/serverless-dns/serverless-dns) which powers [RethinkDNS](https://rethinkdns.com/)

Want to host on Google Cloud Function or see how this is implemented in .NET? Use my [doh-gcf](https://github.com/tina-hello/doh-gcf)
