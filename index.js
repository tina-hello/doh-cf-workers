// SPDX-License-Identifier: 0BSD
const providers = ["https://dns.dnswarden.com/g",
				   "https://freedns.controld.com/x-oisd",
				   "https://sky.rethinkdns.com/1:IAAgAA==",
				   "https://blitz.ahadns.com/1:1"]
const doh = providers[Math.random() * providers.length | 0] 

const contype = 'application/dns-message'

const r404 = new Response(null, {status: 404});

// developers.cloudflare.com/workers/runtime-apis/fetch-event/#syntax-module-worker
export default {
    async fetch(r, env, ctx) {
        return handleRequest(r);
    },
};

async function handleRequest(request) {
    // when res is a Promise<Response>, it reduces billed wall-time
    // blog.cloudflare.com/workers-optimization-reduces-your-bill
    let res = r404;
    const { method, headers, url } = request
    const searchParams = new URL(url).searchParams
    if (method == 'GET' && searchParams.has('dns')) {
        res = fetch(doh + '?dns=' + searchParams.get('dns'), {
            method: 'GET',
            headers: {
                'Accept': contype,
            }
        });
    } else if (method === 'POST' && headers.get('content-type') === contype) {
        // streaming out the request body is optimal than awaiting on it
        const rostream = request.body;
        res = fetch(doh, {
            method: 'POST',
            headers: {
                'Accept': contype,
                'Content-Type': contype,
            },
            body: rostream,
        });
    }
    return res;
}
