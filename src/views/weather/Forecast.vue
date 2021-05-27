<template>
  <div class="forecast">
    <header class="container-lg bg-info text-light rounded-bottom p-5">
      <h1 class="display-4">Météo des prochains jours</h1>
    </header>
    <main class="container-lg mt-4">
      <div id="forecast"></div>
    </main>
  </div>
</template>

<script>
let apiUrl =
  "https://api.openweathermap.org/data/2.5/forecast?appid=1462b2063b2bf2916d8ba369e56a5241&q=beuzeville&units=metric&lang=fr";

let jours = {};

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (dataList) {
    dataList.list.forEach((data) => {
      if (jours[data.dt_txt.substr(0, 10)]) {
        // Existe donc ajoute
        jours[data.dt_txt.substr(0, 10)].push(data);
      } else {
        // Existe pas donc créer et ajoute
        jours[data.dt_txt.substr(0, 10)] = [data];
      }
    });
    let container = document.querySelector("main");
    let textHtml = "";

    textHtml = `<h1 style="font-family: 'Operator Mono Lig Light';">À beuzeville</h1>`;
    console.log(jours);
    textHtml += `<table cellpadding="5" style="font-family: 'Operator Mono Lig Light';text-align:center;background-color:lightgray;">`;
    textHtml += `<thead style="background-color:gray;color:white">`;
    textHtml += `<tr>`;
    textHtml += `<th>Jour</th>`;
    textHtml += `<th colspan="8">Horaire</th>`;
    textHtml += `</tr>`;
    textHtml += `</thead>`;
    textHtml += `<tbody style="background-color:white;">`;
    for (const jour in jours) {
      textHtml += `<tr>`;
      textHtml += `<td>`;
      textHtml += new Date(jour).toString().substr(0, 10);
      textHtml += `</td>`;
      jours[jour].forEach((j) => {
        textHtml += `
                        <td>
                            ${j.dt_txt.substr(11, 5).split(":")[0]}h
                            <img src="https://openweathermap.org/img/wn/${
                              j.weather[0].icon
                            }@2x.png">
                            ${j.weather[0].description}
                            ${+j.main.temp}°C
                        </td>`;
      });
      textHtml += `</tr>`;
    }
    textHtml += `</tbody>`;
    textHtml += `</table>`;

    container.innerHTML = textHtml;
  });
</script>
