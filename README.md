# Project 1 @cmda-minor-web · 2018-2019

## Table Of Contents
1. Project
2. Doel
3. API
4. Installatie
5. Extra: afstand tot de bibliotheek bepalen?

## 1. Project
Het project vindt plaats bij de Centrale OBA. Maandagochtend is om 10.00 uur de kickoff, vrijdag zijn de presentaties van de resultaten. In een week bouwt iedere student een eigen prototype dat bezoekers kan helpen om items uit de OBA collectie te vinden. Technieken geleerd bij [CSS to the Rescue](https://github.com/cmda-minor-web/css-to-the-rescue-1819) en [Web App from Scratch](https://github.com/cmda-minor-web/web-app-from-scratch-1819) worden toegepast bij het bouwen van de de prototypes.

## 2. Doel
Stel: Je hebt met spoed een boek nodig. Via mijn site kan je je favoriete boek zoeken, om vervolgens de dichstbijzijnde bibliotheek met dat boek terug te krijgen. Ook krijg je te zien op welke verdieping en welke afdeling het boek te vinden is. Naast dat krijg je ook nog een routebeschrijving, zodat je zo snel mogelijk het boek tot jouw beschikking hebt.

Stap 1: Locatie van klant opvragen.
Stap 2: Het gewenste boek zoeken.
Stap 3: Pagina met daarop: 
+ Dichstbijzijnde bibliotheek met dat boek beschikbaar
+ Routebeschrijving naar die bibliotheek
+ Verdieping en afdeling waar het boek te vinden is
+ Routebeschrijving binnen de bibliotheek.

note: wegens ziekte (griep) heb ik het product helaas niet af gekregen.

## 3. API
Voor dit project wordt de OBA API gebruikt. Voor volledige documentatie verwijs ik u graag naar de [DOCUMENTATIE](https://zoeken.oba.nl/api/v1/.)

## 4. Installatie
```
git clone https://github.com/roobinh/project-1-1819

cd project-1-1819
```

## 5. Extra: afstand tot de bibliotheek bepalen?
``` javascript
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

getDistanceFromLatLonInKm(
    lat1, //Latitude Position 1
    lon1, //Longitude Position 1
    lat2, //Latitude Position 2
    lon2 //Longitude Position 2
)
```
