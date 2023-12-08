// npm i react-router-dom

 function MovieCard({movie}) {
    const loaded =() => {
        
    }
  return (
    <div className="movie-card">
        <h2>{movie.Title}</h2>
        <img src={movie.Poster} alt="" />
        <h2>{movie.Year}</h2>
                <h3>Ratings</h3>
                {movie.Ratings.map ((rating, i) => {
                    return (
                      <div className="rating" key={`r-${i}`}>
                        <h4>{rating.Source}</h4>
                        <h4>{rating.Value}</h4>
                      </div>
                    )
                })}
        
    </div>
  )
}
export default MovieCard