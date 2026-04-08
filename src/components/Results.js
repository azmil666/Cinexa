import React from 'react'
import Result from './Result';

const Results = ({ results, openPopup }) => {

  const cleanMovies = results
  .filter(movie => movie.Poster && movie.Poster !== "N/A")
  .filter((movie, index, self) =>
    index === self.findIndex(m => m.Title === movie.Title)
  );

  return (
    <section className="results">
      {cleanMovies.map(result => (
        <Result key={result.imdbID} result={result} openPopup={openPopup}/>
      ))}
    </section>
  );
};

export default Results