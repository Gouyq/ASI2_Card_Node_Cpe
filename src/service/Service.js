// https://www.youtube.com/watch?v=eKY9r8tQZEM

const headers = {
    "Accept": "application/json",
    "content-type": "application/json"
}

function joinURL(baseURL, url) {
    return `${baseURL}/${url}`
}

class Service {
    constructor(domain) {
        this.domain = domain
    }

    request(url, method="GET", data=null) {
        url = joinURL(this.domain, url)
        const options = {
            headers,
            method
        }

        if(data) {
            options.body = JSON.stringify({...data})
        }

        return fetch(url, options)
    }
}

module.exports = Service;