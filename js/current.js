let previousCity = "";
let urlParams = new URLSearchParams(window.location.search);

if (urlParams.get('city') != null)
    showWeather(urlParams.get('city'));

//Main Form
document.querySelector('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let searchValue = document.querySelector('#search').value;

    showWeather(searchValue);
});

//Nav form
document.querySelector('#navSearchForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let navSearchValue = document.querySelector('#navSearch').value;
    document.querySelector('#search').value = navSearchValue;

    showWeather(navSearchValue);
});

function showWeather(city) {
    if (previousCity == city)
        return;

    previousCity = city;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=1462b2063b2bf2916d8ba369e56a5241&q=${city}&units=metric&lang=fr`;

    fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        let searchInput = document.querySelector('#search');
        if(data.cod == 404)
        {
            searchInput.classList.add('border');
            searchInput.classList.add('border-danger');
            searchInput.classList.add('border-2');
            searchInput.classList.add('text-danger');
            return;
        }
        searchInput.classList.remove('border');
        searchInput.classList.remove('border-danger');
        searchInput.classList.remove('border-2');
        searchInput.classList.remove('text-danger');

        let utc = new Date(new Date().toUTCString());
        let gmt = data.timezone / 3600;

        let heureLocale = new Date(utc.getTime() + 3600000 * gmt);

        document.querySelector("#result").innerHTML = `
            <div class="card bg-light" style="width: auto;">
                <div class="card-header">
                    <h5 class="card-title">${data.name}, ${getCountryName(data.sys.country)} <img src="https://www.countryflags.io/${data.sys.country}/flat/32.png"></h6>
                </div>
                <div class="card-body">
                    <p class="card-text">
                    <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'> ${data.weather[0].description}
                    </p>
                    <p class="card-text"><i class='fas fa-thermometer-half text-danger'></i> : ${data.main.temp}°C</p>
                    <p class="card-text"><i class='fas fa-thermometer-quarter text-danger'></i> ressentie : ${data.main.feels_like}°C</p>
                    <p class="card-text"><i class="fas fa-tint text-info"></i> ${data.main.humidity}%</p>
                    <p class="card-text"><i class="fas fa-wind text-info"></i> ${data.wind.speed}km/h</p>
                    <p class="card-text"><i class="far fa-clock"></i> de cette météo : ${format(data.dt * 1000)}</p>
                    <p class="card-text"><i class="far fa-clock"></i> locale : ${format(heureLocale)}</p>
                </div>
            </div>
        `;
    });

    //Set city parameter in URL
    let url = new URL('https://paulguillon.github.io/meteojs/current.html');
    url.searchParams.set('city', city);
    window.history.replaceState(null, null, url);

}

function format(date) {
    return new Date(date).toISOString().split('.')[0].replace('T', ' à ');
}
