import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// import resultsView from './views/resultsView.js';

import 'core-js/stable'; // polyfilling async/await
import 'regenerator-runtime/runtime'; // polyfilling everything else
import resultsView from './views/resultsView.js';

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearch = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearch);
};

init();
