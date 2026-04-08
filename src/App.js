import { useState, useEffect } from "react";
import Search from "./components/Search";
import axios from 'axios';
import Results from "./components/Results";
import Popup from "./components/Popup";

const TOP_MOVIES = [
  "tt0111161", "tt0068646", "tt0071562", "tt0468569",
  "tt0050083", "tt0108052", "tt0167260", "tt0110912",
  "tt0060196", "tt0137523", "tt0120737", "tt0109830"
];
function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
    hasSearched: false
    
  });
  
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const BASE_URL = "https://www.omdbapi.com/";

  const search = (e) => {
  if (e.key === "Enter") {
    axios(`${BASE_URL}?apikey=${API_KEY}&s=${state.s}`)
      .then(({ data }) => {

        if (data.Response === "True") {
          setState(prevState => ({
            ...prevState,
            results: data.Search,
            hasSearched: true
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            results: [],
            hasSearched: true
          }));
        }

      });
  }
};
  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState => {
      return{ ...prevState, s: s}

    });

  }
  const openPopup = id => {
    axios(`${BASE_URL}?apikey=${API_KEY}&i=${id}`).then(({ data }) => {
    let result = data;

    setState(prevState => {
      return { ...prevState, selected: result }
    });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }
  useEffect(() => {
  const fetchTopMovies = async () => {
    try {
      const requests = TOP_MOVIES.map(id =>
        axios(`${BASE_URL}?apikey=${API_KEY}&i=${id}`)
      );

      const responses = await Promise.all(requests);
      const movies = responses.map(res => res.data);

      setState(prevState => ({
        ...prevState,
        results: movies
      }));

    } catch (err) {
      console.error(err);
    }
  };

  fetchTopMovies();
}, [API_KEY, BASE_URL]);
  
  return (
    <div className="App">
      <header>
        <h1>Cinexa</h1>
      </header>

      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} searchTerm={state.s} hasSearched={state.hasSearched}/>
        
        {(typeof state.selected.Title != "undefined" ) ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;