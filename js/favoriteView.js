'use stict';

// Load favorites view
function loadFavoriteView() {
  //sends request to Coronavirus  api for the data
  const xhr = getData()
  xhr.onload = function() {
    //if request successful
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      //creates html code for body in index.html
      const favoriteView = `
        ${response.Countries.map(character => `
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
  }
  xhr.send();
}

// hide non favorites and apply checkmarks to favorites
function showFavorites() {
  // retrieve local storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  //hide all countries
  document.querySelectorAll('.countryName').forEach(function(countryName) {
    countryName.style.display = "none";
  })
  // add class 'fav' to each favorite and show favorites
  favorites.forEach(function(favorite) {
    if (document.getElementById(favorite)) {
      document.getElementById(favorite).className += ' fav';
      document.getElementById(favorite).parentNode.parentNode.style.display = "block";
    }
  });
}
