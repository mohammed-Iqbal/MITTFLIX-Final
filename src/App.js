import React from 'react';
import * as MovieAPI from './MovieAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      searchText: ""
    };
    this.movies = this.movies.bind(this);
    this.searchTextChange = this.handleSearchTextChange.bind(this)
  }
  componentDidMount() {
    const genre = this;
    var json = MovieAPI.getAll();
    json.then((parsedJson) => 
      genre.setState({
        movies: parsedJson
      })   
    )
    json = MovieAPI.genres();
    json.then((parsedJson) => 
      genre.setState({
        genres: parsedJson
      })   
    )
  }
  handleSearchTextChange(event) {
    this.setState({
      searchText: event.target.value
    })
  }
  movies(ix) {
    var movie_ids = []
    for (let i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].genre_ids.includes(this.state.genres[ix].id)) {
        movie_ids.push(i)
      }
    }
    if (movie_ids.length === 0) {
      return ``
    } else {
      movie_ids.sort()
      return (
        <div className="titleList">
          <div className="title">
            <h1> {this.state.genres[ix].name} </h1>
            <div className="titles-wrapper">
              {
                movie_ids.map((item) => (
                  <div className="movie">
                    <img
                    src={this.state.movies[item].backdrop_path}
                    />
                    <div className="overlay">
                      <div className="title">{this.state.movies[item].title}</div>
                      <div className="rating">{this.state.movies[item].vote_average}/10</div>
                      <div className="plot">
                        {this.state.movies[item].overview}
                      </div>
                    </div>
                    <div data-toggled="false" className="listToggle">
                      <div>
                        <i className="fa fa-fw fa-plus"></i>
                        <i className="fa fa-fw fa-check"></i>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    }
  }
  render = () => {
    const { genres } = this.state;
    return (
      <>
        <header className="header">
          <a href="/">
            <img
              src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
              alt="netflix-font"
              border="0"
            />
          </a>
          <div id="navigation" className="navigation">
            <nav>
              <ul>
                <li><a href="/myList">My List</a></li>
              </ul>
            </nav>
          </div>
          <form id="search" className="search">
            <input type="search" placeholder="Search for a title..." value="" onChange={this.searchTextChange}/>
            <div className="searchResults"></div>
          </form>
        </header>
        {
          genres.map((item, i) => (
            this.movies(i)
          ))
        }
      </>
    );
  }
}

export default App;
