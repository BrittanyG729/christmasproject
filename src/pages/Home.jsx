/*
    Example movie object
    {
    "Title": "Home Alone 2",
    "Year": "2012",
    "Rated": "N/A",
    "Released": "N/A",
    "Runtime": "14 min",
    "Genre": "Short, Drama",
    "Director": "James N. Kienitz Wilkins",
    "Writer": "James N. Kienitz Wilkins",
    "Actors": "Jessica Carlsen, Mark Anthony Hackett",
    "Plot": "A sovereign woman is lost in New York.",
    "Language": "English",
    "Country": "United States",
    "Awards": "N/A",
    "Poster": "N/A",
    "Ratings": [
        {
        "Source": "Internet Movie Database",
        "Value": "5.1/10"
        }
    ],
    "Metascore": "N/A",
    "imdbRating": "5.1",
    "imdbVotes": "24",
    "imdbID": "tt2109140",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "N/A",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True",
    "Poster": "....."
    }
*/



const titles = [
    'Scrooged',
    'Home Alone 2',
    'The Polar Express',
    'A Christmas Story',
    'Elf',
    'The Santa Clause',
    'Rudolph the Red-Nosed Reindeer',
    "Frosty the Snowman",
]

import Form from '../components/Form'
import { searchMovie, searchPoster } from '../lib/api.js'
import { useState, useEffect, useMemo } from 'react'
import MovieCard from '../components/MovieCard.jsx'


export default function Home() {

    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])

    function filterMovies(query) {
        query = query.toLowerCase()
        setFilteredMovies(movies.filter(m => {
            let title = m.Title.toLowerCase() 
            return title.includes(query)
        }))
    }

    async function addMovie(title) {
        // if movie has already been searched, return
        if (movies.some(m => m.memo === title)) return

        let data = await searchMovie(title)
        if (!data.Title) return

        // use the title to mark movies so we can check if they have already been searched
        data.memo = title
        
        let posterData = await searchPoster(title)
        if (posterData.Search && posterData.Search[0]) {
            data.Poster = posterData.Search[0].Poster
        }
        setMovies(current => {
            current.push(data)
            // using the spread operator (...) to make a copy of the array, because if we don't, react will think it's the same array, and might not update hte DOM
            return [...current]
        })
        setFilteredMovies(current => {
            current.push(data)
            return [...current]
        })
    }

    useEffect(()=>{
        titles.forEach((title, i) => {
            setTimeout(() => {
                addMovie(title)
            }, i*10)
        })
    },[])

    useEffect(()=>{
        console.log(`A movie was added. There are ${movies.length} movies.`)
    },[movies])

  return (
    <div>
        <Form filterMovies={filterMovies}/>
        {filteredMovies.length ? (
            <div className="movies">
                {filteredMovies.map((movie,i) => {
                    const key = movie.imdbID+i
                    return (
                        <MovieCard key={key} movie={movie} />
                    )
                })}
            </div>
        ):(
            <>Loading...</>
        )}
    </div>
  )
}