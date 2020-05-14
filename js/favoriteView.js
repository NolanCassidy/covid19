'use stict';

// Load favorites view
function loadFavoriteView() {
  //sends request to Coronavirus  api for the data
  CovidAPI.getAll(function(result) {
      //check if result is valid
      if(result.Countries){
      //creates html code for body in index.html
      const favoriteView = `
        ${result.Countries.map(character => `
          <a onclick="loadSingleView('${character.CountryCode}');">
            <article class="countryItem countryName" >
              <article class="countryView">
                <country id="${character.Country}">${character.Country}</country>
              </article>
            </article>
          </a>
        `).join('')}
      `;
      //initialize body, hide non favorites, and add checkmarks to favorites
      document.getElementById('body').innerHTML = favoriteView;
      showFavorites();
    }
  });
}

// loads favorites view without calling api for fast loading
function loadFavorite() {
  document.getElementById('favoriteCountries').addEventListener('click', loadFavorite);
  document.getElementById('allCountries').addEventListener('click', loadList);
  showFavorites();
}

// hide non favorites and apply checkmarks to favorites
function showFavorites() {
  //hide all countries
  document.querySelectorAll('.countryName').forEach(function(countryName) {
    countryName.style.display = "none";
  })
  // retrieve local storage
  LocalFavorites.getAll(function(favorites) {
    // add class 'fav' to each favorite and show favorites
    favorites.forEach(function(favorite) {
      if (document.getElementById(favorite)) {
        document.getElementById(favorite).className += ' fav';
        document.getElementById(favorite).parentNode.parentNode.style.display = "block";
      }
    });
  });
}
