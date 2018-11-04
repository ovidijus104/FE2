import React from 'react';
import axios from 'axios';
import Card from './Card';
import Nav from './Nav';
import { endpoints } from '../../config';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movieList: [],
      categoriesList: [],
      likeIds: [],
      activeItemId: -1,
    };
  }

  componentDidMount() {
     this.requestMovies();
     this.requestCategories();
  }

/* --- API Request Start --- */
  requestMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((res) => this.setMovieList(res.data.results))
      .catch((error) => console.log(error));
  };

  requestCategories = () => {
    axios
      .get(endpoints.genres())
      .then((res) => this.setCategoriesList(res.data.genres))
      .catch((error) => console.log(error));
   };

  requestMoviesByCategories(categoriesId){
    axios
      .get(endpoints.genreMovies(categoriesId))
      .then((res) => this.setMovieList(res.data.results))
      .catch((error) => console.log(error));
  }
  /* --- API Request End --- */

  /* --- Set movies array --- */
  setMovieList = (movieList) => {
    this.setState({
      movieList,
    })
  };

  /* --- Set categories(Nav Item) array --- */
  setCategoriesList = (categoriesList) => {
    this.setState({
      categoriesList : categoriesList,
    })
  };

  handleCategoriesClick = (categoriesId) => {
     const { activeItemId } = this.state;
        if(categoriesId !== activeItemId) {
            this.setState({activeItemId: categoriesId});
            this.requestMoviesByCategories(categoriesId);
        }
    };

  handleLikeClick = (cardId) => {
    const { likeIds } = this.state;
    let index = likeIds.indexOf(cardId);

      if(index !== -1){
          likeIds.splice(index, 1)
      }else{
          likeIds.push(cardId)
      }

      this.setState({
         likeIds: likeIds,
      });

    };

  render() {
    const { movieList, categoriesList, likeIds, activeItemId } = this.state;
      console.log(likeIds);
    return (
        <React.Fragment>
          <nav>
              { categoriesList.map((item) => <Nav activeItemId={activeItemId} handleCategoriesClick={this.handleCategoriesClick} item={item} key={item.id} /> )}
          </nav>

          <div className="cards">
              {movieList.map((movie) => <Card likeIds={likeIds} movie={movie} handleLikeClick={this.handleLikeClick} key={movie.id} />)}
          </div>
        </React.Fragment>
    );
  }
}
