let apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=1462b2063b2bf2916d8ba369e56a5241&q=beuzeville&units=metric'

let jours = {};

fetch(apiUrl).then(function (response) {
    return response.json();
}).then(function (dataList) {
    dataList.list.forEach(data => {
        if (jours.hasOwnProperty(data.dt_txt.substr(0, 10))) {// Existe donc ajoute
            jours[data.dt_txt.substr(0, 10)].push(data);
        } else {// Existe pas donc créer et ajoute
            jours[data.dt_txt.substr(0, 10)] = [data];
        }
    });
    document.write(`<h1 style="font-family: 'Operator Mono Lig Light';">À beuzeville</h1>`);
    
    document.write(`<table cellpadding="5" style="font-family: 'Operator Mono Lig Light';border:1px solid black;text-align:center;background-color:lightgray;">`);
        document.write(`<thead style="background-color:gray;color:white">`);
            document.write(`<tr>`);
                document.write(`<th>`);
                    document.write(`Jour`);
                document.write(`</th>`);
                document.write(`<th colspan="8">`);
                    document.write(`Horaire`);
                document.write(`</th>`);
            document.write(`</tr>`);
        document.write(`</thead>`);
        document.write(`<tbody style="background-color:white;">`);
        for (const jour in jours) {
            document.write(`<tr>`);
                document.write(`<td>`);
                document.write(new Date(jour).toString().substr(0, 10));
                document.write(`</td>`);
                jours[jour].forEach(j => {
                    document.write(`<td>`);
                        document.write(`
                            ${j.dt_txt.substr(11,5).split(':')[0]}h
                            <br>
                            ${+j.main.temp}°C
                            <br>
                            <img src="https://openweathermap.org/img/wn/${j.weather[0].icon}@2x.png">
                            `);
                    document.write(`</td>`);
                });
            document.write(`</tr>`);
        }
        document.write(`</tbody>`);
    document.write(`</table>`);
    console.table(data)
});