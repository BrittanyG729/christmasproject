const KEY = "93d3afe9"
const ROOT = `https://www.omdbapi.com/?apikey=${KEY}&type=movie`
const POSTER_ROOT = `http://img.omdbapi.com/?apikey=${KEY}`

async function apiFetch(url) {
    const res = await fetch(url)
    if (!res.ok) {
        console.log('something went wrong')
        console.log(res)
    }
    const data = await res.json()
    return data
}

async function searchMovie(query) {
    const url = ROOT + "&t=" + query
    const data = await apiFetch(url)
    return data
}

async function searchPoster(query) {
    const url = ROOT + "&s=" + query
    const data = await apiFetch(url)
    return data
}

export {
    searchMovie,
    searchPoster
}