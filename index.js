addEventListener('fetch', function(event) {
    const { request } = event
    const response = handleRequest(request)
    event.respondWith(response)
})

async function handleRequest(request) {
    const doh = 'https://security.cloudflare-dns.com/dns-query'
    const { method, url } = request
    const { host, pathname, searchParams } = new URL(url)
    if (method == 'GET' && searchParams.has('dns')) {
        return await fetch(doh + '?dns=' + searchParams.get('dns'), {
            method: 'GET',
            headers: {
                'Accept': 'application/dns-message',
            }
        });
    } else if (method == 'POST') {
        return await fetch(doh, {
            method: 'POST',
            headers: {
                'Accept': 'application/dns-message',
                'Content-Type': 'application/dns-message',
            },
            body: await request.arrayBuffer()
        });
    } else {
        return new Response("", {status: 404})
    }
}
