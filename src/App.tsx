import React, { useState } from 'react';
import './App.scss';
import axios from 'axios';

interface MovieResponseData {
  poster_path: string;
  id: number;
}

const App = () => {
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState<MovieResponseData[]>([]);
  function MovieInput() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=cf8a901bd64d0c92392d8a717953b799&language=en-US&page=1&query=${input}`
      )
      .then((data) => {
        setSearchData(
          data.data.results.filter(
            (m: MovieResponseData) => m.poster_path != null
          )
        );
      });
  }
  return (
    <div>
      <input
        type="text"
        id="userIP"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={MovieInput}>Search</button>
      <div className="info">
        {searchData.map((m) => {
          return (
            <div key={m?.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${m?.poster_path}`}
                alt="movie poster"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
