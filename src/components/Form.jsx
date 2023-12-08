import { useState } from "react";

export default function Form(props) {
    // add state to hold the data of the form
    const [query, setQuery] = useState("")

    //handleChange - updates formData when we type into form
    const handleChange = (event) => {
        //use the event object to detect key and value to update
        setQuery(event.target.value)
    };
    
    const handleSubmit = (event) => {
        // prevent page from refreshing on form submissin
        event.preventDefault();

        // pass the search term to moviesearch prop (the method that will search)
        props.filterMovies(query);
    }

    function showAll() {
        props.filterMovies("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="searchterm"
                    onInput={handleChange}
                />
                <input type="submit" value="submit" />
                <input type="button" value="show all"
                onClick={showAll}
                />
            </form>
            <p>Type in the movie to search for</p>
        </div>
    )
}

/*
function Form(props) {
  // add state to hold the data of the form
  const [formData, setFormData] = useState({
      searchterm: "",
  })

  //handleChange - updates formData when we type into form
  const handleChange = (event) => {
      //use the event object to detect key and value to update
      setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = (event) => {
      // prevent page from refreshing on form submissin
      event.preventDefault();

      // pass the search term to moviesearch prop (the method that will search)
      props.moviesearch(formData.searchterm);
  }

  return (
      <div>
          <form onSubmit={handleSubmit}>
              <input 
                  type="text" 
                  name="searchterm"
                  onChange={handleChange}
                  value={formData.searchterm}
              />
              <input type="submit" value="submit" />

          </form>
          <p>Type in the movie to search for</p>
      </div>
  )
}
*/