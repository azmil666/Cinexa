import React from 'react'

const Search = ({ handleInput, search }) => {
  return (
    <section className="searchbox-wrap">
      <input
        type="text"
        placeholder="Search movies"
        className="searchbox"
        onChange={handleInput}
        onKeyDown={search}
      />
    </section>
  );
};

export default Search