'use stict';

//loads single detailed view
function loadSingleView(id) {
  //sends request to Coronavirus  api for the data
  var xhr = getData()
  xhr.onload = function() {
    //if request successful
    if (this.status == 200) {
      var response = JSON.parse(this.responseText);
      //creates html code for body in index.html
      const singleView = `
        <button id="goHome" class="goHomeButton">Back</button>
        <br><br>
        ${response.Countries.filter(character=> id === character.CountryCode).map(character => `
          <article class="singleItem">
            <article class="countryView">
              <h2> <countrySingle id="${character.Country}">${character.Country}</countrySingle></h2>
            </article>
            <h3>Confirmed: <span>${character.TotalConfirmed}</span></h3>
            <h3>Active: <span>${character.TotalConfirmed-character.TotalRecovered-character.TotalDeaths}</span></h3>
            <h3>Recovered: <span>${character.TotalRecovered}</span></h3>
            <h3>Recover Rate: <span>%${Math.round(character.TotalRecovered/(character.TotalConfirmed)*100)}</span></h3>
            <h3>Deaths: <span>${character.TotalDeaths}</span></h3>
            <h3>Death Rate: <span>%${Math.round(character.TotalDeaths/(character.TotalConfirmed)*100)}</span></h3>
          </article>
        `).join('')}
      `;
      //initialize body, goHome button, and add checkmark to favorites
      document.getElementById('body').innerHTML = singleView;
      document.getElementById('goHome').addEventListener('click', loadListView);
      showSingle();
    }
  }
  xhr.send();
}

//apply check mark to all favorited countries and allow toggling
function showSingle(){
  // retrieve local storage
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // apply fav class to all favorites
  favorites.forEach(function(favorite) {
    if (document.getElementById(favorite)) {
      document.getElementById(favorite).className += ' fav';
    }
  });
  // allow favorite toggle
  document.querySelector('.countryView').addEventListener('click', function(clicked) {
    var id = clicked.target.id;
    var item = clicked.target;
    var index = favorites.indexOf(id);
    // toggle favorite on/off
    if(index == -1) {
      item.className = 'fav';
      favorites.push(id);
    }else{
      item.className = '';
      favorites.splice(index, 1);
    }
    // store favorites in localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  });
}
