// Siehe Anleitung: https://leafletjs.com/
const map = L.map('map', { //muss Map heißen, weil das DIV-Element dazu im Index.html so definiert ist.
  center: [46.7699, 10.2405],
  zoom: 10,
  fullscreenControl: true, //Fullscreen Plugin
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href= "https://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/c212a19c-6e06-4ca4-bdee-3ec62ccd7b1e/tab/complete">Zonierung<a/>, <a href= "https://mapicons.mapsmarker.com/">Icons A<a/>, <a href= "https://icons8.de/">Icons B<a/> '
}).addTo(map);


const ZONE = [{
  title: "Zonierung des UBEVM",
  data: "data/UBEVM_Zonierung_Perimeter.json",
}]

//eine Variable erstellen in der die Zonierungen unterschiedliche Farben bekommen (kann hier angepasst werden). Braucht kein eigenes skript, weil nur wenig Inhalt
const COLORS = {
  "Kernzone": "darkred",
  "Pflegezone": "green",
  "Entwicklungszone": "orange"
}
//Forschleife machen, die über die ganzen Geojson-Daten Läuft
for (let config of ZONE) {
  fetch(config.data)
    .then(response => response.json()) //innere runde Klammer: Funktionsaufruf, damit es gestartet/ausgeführt wird 
    .then(geojsonData => {
      //console.log("Data: ", geojsonData); //Immer mal wieder, zum schauen ob es funktioniert oder Fehler gibt.
      if (config.title == "Zonierung des UBEVM") {
        drawGeometry(geojsonData);
      }
    });
};
//Zonierung "zeichnen" + hinzufügen
let drawGeometry = (geojsonData) => {
  //console.log("Geometry", geojsonData);
  L.geoJson(geojsonData, {
    style: (feature) => {
      let col = COLORS[feature.properties.Zone]; //Eckige Klammern weil ich in einem Objekt auf einen Wert/Schlüssel zureifen will, der ein Leerzeichen hat
      return {
          color: col,
          fillOpacity: 0.2,      
      }
    }, //Popups einbinden und beschriften, damit man auf die Zone klicken kann, wenn wir das wollen
    onEachFeature: (features, layer) => {
      layer.bindPopup(`<strong>Zonierung des UBEVM</strong>
      <hr>
      ${features.properties.Zone || ""}<br>
      Gesamtgröße: ${features.properties.Area_ha|| ""} ha
      `);
    },
  }).addTo(map)
}

//Icon download: https://icons8.de/icons 
//müssen Link auf die Seite setzen für die Icons die wir verwenden: <a target="_blank" href="https://icons8.de/icon/114091/minus">Minus</a> Icon von <a target="_blank" href="https://icons8.de">Icons8</a>
//<a target="_blank" href="https://icons8.de/icon/zddfYtvTqQmM/volle-batterie">Volle Batterie</a> Icon von <a target="_blank" href="https://icons8.de">Icons8</a>
//<a target="_blank" href="https://icons8.de/icon/78189/leere-batterie">Leere Batterie</a> Icon von <a target="_blank" href="https://icons8.de">Icons8</a>

//Icons für die verschiedenen Bereiche definieren (noch bessere suchen)
let icons = {
  "Entwickelt": "entwickelt.png",
  "Entwicklungsbedarf": "entwicklungsbedarf.png",
  "Vorteil": "vorteil.png",
  "Nachteil": "nachteil.png",
  "keineZuordnung": "comment-map-icon.png"
}

console.log(COMMENTS) //Schauen ob die Verknüpfung funktioniert und etwas in der Console gelogged wird
for (let entry of COMMENTS) { //Marker müssen noch an ID angepasst werden. "entry" wird hier als Begriff für die einzelnen Variablen bzw Keys in COMMENTS definiert  
  //console.log(entry);
  //wählen wann welches Icon zum Einsatz kommt:
  if (icons[entry.id == "Entwickelt"]) {}
  if (icons[entry.id == "Enwicklungsbedarf"]) {}
  if (icons[entry.id == "Vorteil"]) {}
  if (icons[entry.id == "Nachteil"]) {}
  if (icons[entry.id == "keineZuordnung"]) {} //In die Legende einbauen (dieses ev. als Kommentar?)

//Icons einsetzen:
let mrk = L.marker([entry.lat, entry.lng], {
  icon: L.icon({
    iconUrl: `icons/${icons[entry.id]}`,
    iconSize: [37, 37], //Array mit Höhe u Breite, kann ich im img anschauen. Mit der Size ist das Icon genau mittig auf den Koordinatenpunkt, passend für unsere Karte.
    popupAnchor: [0, -19], //Damit das Popup am ende des Icons aufploppt udn nicht in der Mitte und die Hälfte überdeckt, verschieben wir es um die Hälfte ca. nach oben.
  })
}).addTo(map);
mrk.bindPopup(`
      <strong> ${entry.ort}:</strong>
      <hr>${entry.txt}
      `);
}

//Maßstab siehe: https://leafletjs.com/reference-1.7.1.html#control-scale
L.control.scale({
  imperial: false
}).addTo(map)

// hash: zeigt in der URL-Leiste die Koordinaten und den #Zoom des Kartenausschnittes an 
var hash = new L.Hash(map); //var hash steht hier nur weil man eine neue Var erstellt, falls man sie später noch mal braucht. new  --> nach L muss großbuchstabe sein.

//Minimap
var miniMap = new L.Control.MiniMap(L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"), {
  toggleDisplay: true, //Minimap wird damit ein- und ausklappbar
  minimized: true //mit true zeigt es die Minimap im eingeklappten Zustand an.
}).addTo(map);


//Legende: https://github.com/ptma/Leaflet.Legend 

L.control.Legend({
position: "bottomleft",
legends: [{
  label: "Marker1",
  type: "image",
  url: "marker/marker-red.png",
}]
}).addTo(map);


/* DROPDOWN FÜR QUELLE
When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var d = 0; d < dropdowns.length; d++) {
      var openDropdown = dropdowns[d];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}