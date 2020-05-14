'use stict';

// loads list view
function loadListView() {
  //sends request to Coronavirus api for the data
  const xhr = getData()
  xhr.onload = function() {
    //if request successful
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      ///creates html code for body in index.html
      const listView = `
        <input type="text" onkeyup="showSearch(this)" placeholder="Search..."/>
        <br><br>
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
      //initialize body, all/favorite tabs, and add checkmark to favorites
      document.getElementById('body').innerHTML = listView;
      document.getElementById('favoriteCountries').addEventListener('click', loadFavoriteView);
      document.getElementById('allCountries').addEventListener('click', loadListView);
      showAll();
    }
  }

  xhr.send();
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

//apply check mark to all favorited countries
function showAll() {
  // retrieve local storage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // apply fav class to all favorites
  favorites.forEach(function(favorite) {
    if (document.getElementById(favorite)) {
      document.getElementById(favorite).className += ' fav';
    }
  });
}
