$(document).ready(function () {

    ville = "";
    $('#form').submit((e) => {
        var nomVille = $('#nomVille').val();
        e.preventDefault();
        if(ville != nomVille)
        
            GetMeteo(nomVille);
        ville = nomVille;
    });
});

function GetMeteo(name){
    var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=1462b2063b2bf2916d8ba369e56a5241&q=' + name + '&units=metric';

    $.getJSON(url, function(data) {
        var gmtNow = new Date(new Date().toUTCString());
        var gmt = data.timezone / 3600;
        var heureLocale = new Date(gmtNow.getTime() + 3600000 * gmt).toISOString();
        $("#tableau").html(
            "<tr>" +
                "<td><h1>" + data.name + "</h1></td>" +
            "</tr>"+
            "<tr>" +
                "<td>Coordonnées : lat " + data.coord.lat + " " + data.coord.lon + " lon</td>" +
            "</tr>" +
            "<tr>" +
                "<td>" + 
                "Temps : " + data.weather[0].description + 
                "<br><img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>" +
                "</td>" +
            "</tr>" +
            "<tr>" +
                "<td>Température : " + data.main.temp + "°C</td>" +
            "</tr>" +
            "<tr>" +
                "<td>Ressenti : " + data.main.feels_like + "°C</td>" +
            "</tr>" +
            "<tr>" +
                "<td>Humidité : " + data.main.humidity + "%</td>" +
            "</tr>" +
            "<tr>" +
                "<td>Pays : " + getCountryName(data.sys.country) + "</td>" +
            "</tr>" +
            "<tr>" +
                "<td>Heure de cette météo : " + new Date(new Date - data.dt).toISOString({hour: 'numeric', minute:'numeric'}) + "</td>" +
            "</tr>" +
            "<tr>" +
                "<td>Heure locale : " + heureLocale + "</td>" +
            "</tr>"
        );
    });
}