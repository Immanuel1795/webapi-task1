let countryData;
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', (e) => {
 
    const searchString = e.target.value.toLowerCase();
 
    const filteredCountry = countryData.filter((country) => {
        country.name.toLowerCase().includes(searchString);
    });
 
      createCards(filteredCountry);
});

async function restCountryAPI(){
    let data = await fetch('https://restcountries.eu/rest/v2/all');
    countryData = await data.json();
    createCards(countryData);
}


function createCards(countryData){
    let row = document.getElementById("cards");
    countryData.forEach((element) => {
      let cardElement = `
      <div class="card  bg-dark text-white mb-2 m-1 text-center" style="height:100%"  >
        <div class="overflow">
            <img src=${element.flag} class="card-img-top" alt="country_flag">
        </div>
        <div class="card-body " >
            <p class="card-title h2" >${element.name}(${element.alpha3Code})</p>
            <p class="card-text">The capital of ${element.name} is ${element.capital}. It is placed in the ${element.region} region. It's population is ${element.population}. The currency used in ${element.demonym} is ${element.currencies[0].name}(${element.currencies[0].symbol})</p>
        </div>
    </div>  `;
      let column = document.createElement("div");
      column.className = "col-md-6 col-lg-3 p-1";
      column.innerHTML = cardElement;
      row.appendChild(column);
    });
    document.getElementById("main-container").append(row);
}


restCountryAPI();

