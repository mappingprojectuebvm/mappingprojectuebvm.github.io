// https://leafletjs.com/
const map = L.map('map', {//map heißen, weil das div element dazu im index html so definiert. ergebniskarte heißt map!
    center: [46.7599, 10.2104],
    zoom: 10, 
    fullscreenControl: true,//Fullscreen plugin
}) 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Hier könnte man noch verschiedene kartengrundlagen einabuen wie im beispiel. und ev den layer fürs BR wenn wir in finden/Bekommen
// Beispielmarker für Popups: koordinaten und text ändern :)
L.marker([46.7599, 10.2104]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();


// //Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
    toggleDisplay: true, //minimap ein und ausklappbar
    minimized: true //fangt im eingeklappten zustand an. diese einstellungen kann man alle in der leaflet/github davon nachlesen
}).addTo(map);

