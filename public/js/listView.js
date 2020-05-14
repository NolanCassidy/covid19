'use stict';

// loads list view
function loadListView() {
  CovidAPI.getAll(function(result) {
      //check if result is valid
      if(result.Countries){
        //creates html code for body in index.html
        const listView = `
          <input type="text" onkeyup="showSearch(this)" placeholder="Search..."/>
          <br><br>
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
        //initialize body, all/favorite tabs, and add checkmark to favorites
        document.getElementById('body').innerHTML = listView;
        document.getElementById('favoriteCountries').addEventListener('click', loadFavoriteView);
        document.getElementById('allCountries').addEventListener('click', loadListView);
        showAll();
    }
  });
}

//updates listveiw from search bar
function showSearch(s) {
  search = s.value.toLowerCase();
  document.querySelectorAll('.countryName').forEach(function(countryName) {
    text = countryName.innerText.toLowerCase();
    if(text.match(search)) {
      countryName.style.display = "block"
    }else{
      countryName.style.display = "none"
    }
  })
}

//gets all favorites from local storage and apply checkmarks
function showAll() {
  // retrieve local storage
  LocalFavorites.getAll(function(favorites) {
    // apply fav class to all favorites
    applyFavorites(favorites);
  });
}

//apply check mark to all favorited countries
function applyFavorites(favorites){
  favorites.forEach(function(favorite) {
    if (document.getElementById(favorite)) {
      document.getElementById(favorite).className += ' fav';
    }
  });
}
