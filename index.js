addEventListener('fetch', function(event) {
    const { request } = event
    const response = handleRequest(request)
    event.respondWith(response)
})

const doh = 'https://freedns.controld.com/p3'
const dohjson = 'https://freedns.controld.com/p3'
const contype = 'application/dns-message'
const jstontype = 'application/dns-json'

async function handleRequest(request) {
    
    const { method, headers, url } = request
    const searchParams = new URL(url).searchParams
    if (method == 'GET' && searchParams.has('dns')) {
        return await fetch(doh + '?dns=' + searchParams.get('dns'), {
            method: 'GET',
            headers: {
                'Accept': contype,
            }
        });
    } else if (method == 'POST' && headers.get('content-type')==contype) {
        return await fetch(doh, {
            method: 'POST',
            headers: {
                'Accept': contype,
                'Content-Type': contype,
            },
            body: await request.arrayBuffer()
        });
    } else if (method== 'GET' && headers.get('Accept')==jstontype) {
        const search = new URL(url).search
         return await fetch(dohjson + search, {
            method: 'GET',
            headers: {
                'Accept': jstontype,
            }
        });
    } else {
        return new Response("", {status: 404})
    }
}
