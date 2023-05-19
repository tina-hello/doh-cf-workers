// SPDX-License-Identifier: CC0-1.0

const doh = 'https://security.cloudflare-dns.com/dns-query'
const dohjson = 'https://security.cloudflare-dns.com/dns-query'
const contype = 'application/dns-message'
const jstontype = 'application/dns-json'
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
        // TODO: streaming out request buffer is optimal than awaiting on it
        const reqbuf = await request.arrayBuffer();
        res = fetch(doh, {
            method: 'POST',
            headers: {
                'Accept': contype,
                'Content-Type': contype,
            },
            body: reqbuf,
        });
    } else if (method === 'GET' && headers.get('Accept') === jstontype) {
        const search = new URL(url).search
         res = fetch(dohjson + search, {
            method: 'GET',
            headers: {
                'Accept': jstontype,
            }
        });
    }
    return res;
}
