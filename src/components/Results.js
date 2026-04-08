import React from 'react'
import Result from './Result';

const Results = ({ results = [], openPopup, searchTerm, hasSearched }) => {

const cleanMovies = (results || [])
  .filter(movie => movie && movie.Poster && movie.Poster !== "N/A")
  .filter((movie, index, self) =>
    index === self.findIndex(m => m.Title === movie.Title)
  );

  return (
  <section className="results">
    {cleanMovies.length > 0 ? (
      cleanMovies.map(result => (
        <Result 
          key={result.imdbID} 
          result={result} 
          openPopup={openPopup}
        />
      ))
    ) : (
      hasSearched && (
        <p style={{ textAlign: "center", width: "100%" }}>
          No movies found for "{searchTerm}"
        </p>
      )
    )}
  </section>
)};
export default Results