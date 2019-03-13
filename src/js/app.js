import {API} from "./index.js";

localStorage.clear();

console.log("Succesfully imported: app.js");

//-----------SET DEFAULT HASH TO "HOME"-----------//
if(window.location.hash === "") {
    window.location.hash = "home";
}

(async() => {

    const api = new API({
        key: "1e19898c87464e239192c8bfe422f280"
    });
    
    const wrapper = {
        searchBook: async function(name) {
            ui.enableLoader();
            console.log("Searching Book: " + name + "...");
            
            const stream = await api.createStream("search/" + name + "{9}");

            stream
                .pipe(render.addToDocument)
                .catch(console.error);
        },
        searchAvailability: async function(frabl) {
            ui.enableLoader();

            console.log("Searching Availability, frabl: " + frabl + "...");

            const avail = await api.availability(frabl);

            render.availability(avail);
        }
    }

    const router = {
        home: function() {
        },
        availability: function(frabl) {            
            var books = document.getElementById('books');
            books.setAttribute('style', 'display: none');

            wrap.searchAvailability(frabl);
        }
    }

    const renderer = {
        addToDocument: function(response) {
            console.log(response)
            ui.disableLoader();

            var books = document.getElementById('books');
            books.innerHTML = "";

            for(var i=0; i<response.length ; i++) {
            
                var frabl = response[i]['frabl']['_text'];

                var clickable = document.createElement('a').setAttribute('href', '#availability?frabl=' + frabl);
                clickable.innerHTML = "Beschikbaarheid";

                var book = document.createElement('div').setAttribute('class', 'book');

                var title = document.createElement('h2').setAttribute('class', 'title');
    
                var titel = response[i]['titles']['title']['_text'];
                if(typeof titel === 'undefined') {
                    titel = "Unknown";
                } else {
                    titel = titel.split('/')[0].slice(0,50);
                }
                title.innerHTML = titel;
    
                var cover = document.createElement('img').setAttribute('class', 'cover');

                if(response[i]['coverimages']['coverimage'].hasOwnProperty(0)) {
                    var image = response[i]['coverimages']['coverimage'][0]['_text'];
                } else {
                    var image = response[i]['coverimages']['coverimage']['_text'];
                }
                
                cover.setAttribute('src', image);

                var desc = document.createElement('p').setAttribute('class', 'description');

                if(response[i].hasOwnProperty('summaries')) {
                    var description = response[i]['summaries']['summary']['_text'];
                } else {
                    var description = "Description not available";
                }
                desc.innerHTML = description.slice(0, 200);
                
                book.appendChild(title);
                book.appendChild(cover);
                book.appendChild(desc);
                book.appendChild(clickable)
                
                books.appendChild(book);
            }
        },
        availability: function(availability) {
            console.log(availability);

            //UI styling
            ui.enableAvailability();
            ui.disableLoader();

            //JSON with pointers
            var geojson = [];

            // div where availability gets added        
            var mainDiv = document.getElementById('availability');
            
            // all possible locations
            var locations = availability['aquabrowser']['locations']['location'];

            if(typeof(locations.length) === "undefined") {
                var amountOfBooks = 1;
            } else {
                var amountOfBooks = locations.length;
            }

            //Loop trough all books
            for(var i=0; i<amountOfBooks; i++) {
                var div = document.createElement('div');
                var availability = document.createElement('p');
                var title = document.createElement('h2');

                if(typeof(locations.length) === "undefined") {
                    var location = locations;
                } else {
                    var location = locations[i];
                }
                
                var available = location['_attributes']['available'];
                var name = location['_attributes']['name'];

                availability.innerHTML = "available: " + available;
                title.innerHTML = name;

                //If book is available
                if(location['_attributes']['available'] == "true") {

                    var lat = location['holding']['_attributes']['latitude'];
                    var long = location['holding']['_attributes']['longitude'];

                    div.setAttribute('class', 'available');

                    var directions = document.createElement('a');
                    directions.setAttribute('href', 'http://maps.google.com/?q=' + name);
                    directions.innerHTML = "Directions";

                    if(location['items']['item'].hasOwnProperty(0)) {
                        var loc = location['items']['item'][0];
                    } else {
                        var loc = location['items']['item'];
                    }
                    
                    var floor = loc['subloc']['_text'];
                    var shelf = loc['shelfmark']['_text'];

                    geojson.push({
                        type: 'FeatureCollection',
                        features: [{
                          type: 'Feature',
                          geometry: {
                            type: 'Point',
                            coordinates: [long, lat]
                          },
                          properties: {
                            title: name,
                            floor: floor,
                            shelf: shelf
                          }
                        }]
                    });

                    var verdieping = document.createElement('p');
                    verdieping.innerHTML = "Afdeling: " + floor;

                    var kast = document.createElement('p');
                    kast.innerHTML = "Plaats: " + shelf;

                    div.appendChild(title);
                    div.appendChild(availability); 
                    div.appendChild(verdieping);
                    div.appendChild(kast);    
                    div.appendChild(directions);

                //If book is not available
                } else {
                    div.setAttribute('class', 'unavailable');

                    div.appendChild(title);
                    div.appendChild(availability);
                }
                mainDiv.appendChild(div);
            }
            ui.MapBox(geojson);
        }
    }

    const uix = {
        enableLoader: function() {
            var loader = document.getElementById("loader");
            loader.setAttribute('style', 'display: block;');
        },
        disableLoader: function() {
            var loader = document.getElementById('loader');
            loader.setAttribute('style', 'display: none;');
        },
        enableAvailability: function() {
            var avail = document.getElementById('availability');
            avail.setAttribute('style', 'display: grid');
        },
        MapBox: function(pointers) {
            console.log("Enabling MapBox...");
            console.log(pointers);

            mapboxgl.accessToken = 'pk.eyJ1Ijoicm9vYmluMTk5OSIsImEiOiJjanJxYzVpeGIwdzJ4NDlycTZvd2lramRkIn0.jEoxjM-oE38jYCIHnhLw_g';
            if(localStorage.getItem(userLong) !== "undefined") {
                var mapLong = localStorage.getItem('userLong');
                var mapLat = localStorage.getItem('userLat')
            } else {
                var mapLong = '4.9006';
                var mapLat = '52.3648';
            }

            var map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                zoom: 12,
                center: [mapLong, mapLat]
            });

            //Calculate nearest library
            var nearest = 10000;
            var closestName = "";

            var userLong = localStorage.getItem('userLong');
            var userLat = localStorage.getItem('userLat');

            for(var p=0; p<pointers.length;p++) {
                var long = pointers[p]['features'][0]['geometry']['coordinates'][0];
                var lat = pointers[p]['features'][0]['geometry']['coordinates'][1];

                var name = pointers[p]['features'][0]['properties']['title'];

                var distance = location.calculateDistance(userLat, userLong, lat, long);
                console.log("afstand tot " + name + ": " + distance);
                
                if(distance < nearest) {
                    nearest = distance;
                    closestName = name;
                }
            }
            
            console.log("Dichstbijzijnde = " + closestName + ", afstand = " + nearest)

            //Place Markers
            for(var p=0; p<pointers.length;p++) {
                var title = pointers[p]['features'][0]['properties']['title'];
                var verdieping = pointers[p]['features'][0]['properties']['floor'];
                var shelf = pointers[p]['features'][0]['properties']['shelf'];
            
                var el = document.createElement('div');
                if(title == closestName) {
                    el.className = 'markerClose';
                } else {
                    el.className = 'marker';
                }
                console.log("Placing marker at:" + title);
                console.log("longlat: " + pointers[p]['features'][0]['geometry']['coordinates'])

                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(pointers[p]['features'][0]['geometry']['coordinates'])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + title + '</h3>' + "<p><a href='http://maps.google.com/?q=" + title + "'> Route </a></p>"))
                    .addTo(map);
            }

            //Place marker at house
            el.className = 'markerHouse';
            var LngLat = [userLong, userLat];
            console.log("marker at house: " + LngLat);
            new mapboxgl.Marker(el)
                .setLngLat(LngLat)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML('<h3> Jouw Locatie </h3>'))
                .addTo(map);
        }
    }

    const locatie = {
        getLocation: function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(location.setLocation);
            } else { 
                console.log("Geolocation is not supported by this browser.");
            }
        },
        setLocation: function(position) {
            console.log("user position available: " + position.coords.latitude + " + " + position.coords.longitude);
            localStorage.setItem('userLat', position.coords.latitude);
            localStorage.setItem('userLong', position.coords.longitude);
        },
        calculateDistance: function(lat1, lon1, lat2, lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = location.deg2rad(lat2-lat1);  // deg2rad below
            var dLon = location.deg2rad(lon2-lon1); 
            var a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(location.deg2rad(lat1)) * Math.cos(location.deg2rad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
              ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return d;
        },
        deg2rad: function(deg) {
            return deg * (Math.PI/180)
        }
    }

    //-----------VARIABLES-----------//
    const render = Object.create(renderer);
    const wrap = Object.create(wrapper);
    const route = Object.create(router);
    const location = Object.create(locatie);
    const ui = Object.create(uix)

    //-----------ROUTING-----------//
    routie({
		'home': function() {
            route.home();
        },
		'availability/?:frabl': function(frabl) {
            route.availability(frabl.substr(7));
        }
    });
    
    //-----------EVENT LISTENERS-----------//
    document.getElementById("search").addEventListener("click", function(){
        name = document.getElementById("input").value;
        wrap.searchBook(name);
    });

    location.getLocation();
})();   
