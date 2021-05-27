<template>
  <div class="current">
    <header>
      <h1 class="text-4xl">Current weather</h1>
    </header>
    <main>
      <form
        class="flex flex-col items-center gap-8 mt-8"
        @submit.prevent="
          getWeather(city);
          city = null;
        "
      >
        <input
          type="text"
          class="
            input
            border border-gray-400
            appearance-none
            rounded
            p-3
            focus
            focus:border-indigo-600
            focus:outline-none
            active:outline-none
            active:border-indigo-600
          "
          placeholder="Enter location"
          v-model="city"
        />
        <button
          type="submit"
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded-full
          "
        >
          See
        </button>
      </form>
      <section class="results">
        <section class="weatherInfo flex flex-col items-center" v-if="weather">
          <h1>
            <fa :icon="['fas', 'map-marker-alt']" class="text-2xl"></fa>
            {{ weather.name }}
          </h1>
          <p>
            <fa
              :icon="['fas', 'thermometer-half']"
              class="text-2xl text-red-600"
            ></fa>
            {{ weather.main.temp }}°C / {{ (weather.main.temp * 9) / 5 + 32 }}°F
          </p>
          <img
            :src="`https://www.countryflags.io/${weather.sys.country}/flat/64.png`"
            :title="`${weather.name}, ${weather.sys.country}`"
            class="cursor-help"
          />
        </section>
        <section v-else-if="weather === false">Unknown location</section>
      </section>
    </main>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Current",
  components: {},
  setup() {
    const route = useRoute();
    const store = useStore();

    const state = reactive({
      weather: null,
      city: null,
    });

    const getWeather = async function (city) {
      state.weather = await store.dispatch("weather/currentWeather", city);
    };

    watchEffect(async () => {
      if (route.params.city) getWeather(route.params.city);
    });

    return { ...toRefs(state), getWeather };
  },
};

// let city, previousCity;
// let timezone = 0;
// let mymap = L.map("mymap");

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: "mapbox/streets-v11",
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: "your.mapbox.access.token",
// }).addTo(mymap);

// let urlParams = new URLSearchParams(window.location.search);
// if (urlParams.has("city") && urlParams.get("city") != null) {
//   city = urlParams.get("city");
//   fillInputs();
//   showWeather();
// }

// //Main Form
// document.querySelector("#searchForm").addEventListener("submit", (e) => {
//   e.preventDefault();

//   let searchValue = document.querySelector("#search").value;

//   city = searchValue;
//   fillInputs();
//   showWeather();
// });

// //Nav form
// document.querySelector("#navSearchForm").addEventListener("submit", (e) => {
//   e.preventDefault();

//   let navSearchValue = document.querySelector("#navSearch").value;

//   city = navSearchValue;
//   fillInputs();
//   showWeather();
// });

// function fillInputs() {
//   let upperCity = city.replace(city[0], city[0].toUpperCase());
//   document.querySelector("#search").value = upperCity;
//   document.querySelector("#navSearch").value = upperCity;
//   city = upperCity;
// }

// /**
//  * Display weather
//  */
// async function showWeather() {
//   if (city == previousCity) return;
//   else previousCity = city;

//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?APPID=1462b2063b2bf2916d8ba369e56a5241&q=${city}&units=metric&lang=fr`;

//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   timezone = data.timezone;

//   let searchInput = document.querySelector("#search");
//   if (data.cod == 404) {
//     searchInput.classList.add("border");
//     searchInput.classList.add("border-danger");
//     searchInput.classList.add("border-2");
//     searchInput.classList.add("text-danger");
//     return;
//   }
//   searchInput.classList.remove("border");
//   searchInput.classList.remove("border-danger");
//   searchInput.classList.remove("border-2");
//   searchInput.classList.remove("text-danger");

//   let utc = new Date(new Date().toUTCString());
//   let gmt = data.timezone / 3600;

//   let heureLocale = new Date(utc.getTime() + 3600000 * gmt);

//   document.querySelector("#result").innerHTML = `
//         <div class="card bg-light" style="width: auto;">
//             <div class="card-header">
//                 <h5 class="card-title">${data.name}, ${getCountryName(
//     data.sys.country
//   )} <img src="https://www.countryflags.io/${
//     data.sys.country
//   }/flat/32.png"></h6>
//             </div>
//             <div class="card-body">
//                 <p class="card-text">
//                 <img src='https://openweathermap.org/img/wn/${
//                   data.weather[0].icon
//                 }@2x.png'> ${data.weather[0].description}
//                 </p>
//                 <p class="card-text"><i class='fas fa-thermometer-half text-danger'></i> : ${
//                   data.main.temp
//                 }°C</p>
//                 <p class="card-text"><i class='fas fa-thermometer-quarter text-danger'></i> ressentie : ${
//                   data.main.feels_like
//                 }°C</p>
//                 <p class="card-text"><i class="fas fa-tint text-info"></i> ${
//                   data.main.humidity
//                 }%</p>
//                 <p class="card-text"><i class="fas fa-wind text-info"></i> ${
//                   data.wind.speed
//                 }km/h</p>
//                 <p class="card-text"><i class="far fa-clock"></i> de cette météo : ${format(
//                   data.dt * 1000 + 3600000 * gmt
//                 )}</p>
//                 <p class="card-text"><i class="far fa-clock"></i> locale : <span id="localeHourSpan">${format(
//                   heureLocale
//                 )}</span></p>
//             </div>
//         </div>
//     `;

//   //Set city parameter in URL
//   let url = new URL(window.location.origin + "/current.html");
//   url.searchParams.set("city", city);
//   window.history.replaceState(null, null, url);

//   mymap.setView([data.coord.lat, data.coord.lon], 13);

//   // Clear all markers

//   // Add a marker on the desired city
//   let marker = L.marker([data.coord.lat, data.coord.lon]).addTo(mymap);
//   // Popup on marker
//   marker.bindPopup(`<b>${data.name}</b>`);
// }

// //Refresh weather every 60sec
// setInterval(showWeather, 60000);
// //Real-time local time
// setInterval(localeHour, 1000);

// /**
//  * Display local time in real-time
//  */
// function localeHour() {
//   let localeSpan = document.querySelector("#localeHourSpan");

//   let utc = new Date(new Date().toUTCString());
//   let gmt = timezone / 3600;
//   let localeTime = new Date(utc.getTime() + 3600000 * gmt + 1000);

//   localeSpan.innerText = format(localeTime);
// }

// /**
//  * Transform a string to a cleaned date
//  * @param string date
//  */
// function format(date) {
//   return new Date(date).toISOString().split(".")[0].replace("T", " à ");
// }
</script>
