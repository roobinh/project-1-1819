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
            render.enableLoader();
            console.log("Searching Book: " + name + "...");
            
            const stream = await api.createStream("search/" + name + "{9}");

            stream
                .pipe(render.addToDocument)
                .catch(console.error);
        },
        searchAvailability: async function(frabl) {
            render.enableLoader();

            console.log("Searching Availability, frabl: " + frabl + "...");

            const avail = await api.availability(frabl);

            render.availability(avail);
        }
    }

    const router = {
        home: function() {
			console.log('Home pagina.');
        },
        availability: function(frabl) {            
            var books = document.getElementById('books');
            books.setAttribute('style', 'display: none');

            wrap.searchAvailability(frabl);
        },
        directions: function(location) {
            window.open("http://maps.google.com/?q=" + location);
        }
    }

    const renderer = {
        addToDocument: function(response) {
            console.log(response)

            render.disableLoader();

            var books = document.getElementById('books');
            books.innerHTML = "";

            for(var i=0; i<response.length ; i++) {
                var clickable = document.createElement('a');

                var frabl = response[i]['frabl']['_text'];

                clickable.setAttribute('href', '#availability?frabl=' + frabl);
                clickable.innerHTML = "Beschikbaarheid";

                var book = document.createElement('div');
                book.setAttribute('class', 'book');
    
                var title = document.createElement('h2');

                title.setAttribute('class', 'title');
                var titel = response[i]['titles']['title']['_text'];
                
                if(typeof titel === 'undefined') {
                    titel = "Unknown";
                } else {
                    titel = titel.split('/')[0].slice(0,50);
                }
                title.innerHTML = titel;
    
                var cover = document.createElement('img');
                cover.setAttribute('class', 'cover');

                if(response[i]['coverimages']['coverimage'].hasOwnProperty(0)) {
                    var image = response[i]['coverimages']['coverimage'][0]['_text'];
                } else {
                    var image = response[i]['coverimages']['coverimage']['_text'];
                }
                
                cover.setAttribute('src', image);

                var desc = document.createElement('p');
                desc.setAttribute('class', 'description');

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

            render.enableAvailability();
            render.disableLoader();

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
                    directions.setAttribute('href', '#directions?=' + name);
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

                    // if(typeof(location['items']['item']['subloc']['_text']) !== "undefined") {
                    //     var floor = location['items']['item']['subloc']['_text'];
                    // } else {
                    //     var floor = "Niet gevonden";
                    // }

                    // var floor = location['items']['item']['subloc']['_text'] ? location['items']['item']['subloc']['_text'] : "niet gevonden";
                    // var shelf = location['items']['item']['shelfmark']['_text'];

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
            render.MapBox(geojson);
        },
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
            
            var map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                zoom: 10,
                center: [4.9006,52.3648]
            });

            for(var p=0; p<pointers.length;p++) {
                // create a HTML element for each feature

                var title = pointers[p]['features'][0]['properties']['title'];
                var verdieping = pointers[p]['features'][0]['properties']['floor'];
                var shelf = pointers[p]['features'][0]['properties']['shelf'];

                console.log(title + verdieping + shelf)

                var el = document.createElement('div');
                el.className = 'marker';
                
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(pointers[p]['features'][0]['geometry']['coordinates'])
                    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3>' + title + '</h3>'))
                    .addTo(map);
            }
        }
    }

    //-----------VARIABLES-----------//
    const render = Object.create(renderer);
    const wrap = Object.create(wrapper);
    const route = Object.create(router);

    //-----------ROUTING-----------//
    routie({
		'home': function() {
            route.home();
        },
		'availability/?:frabl': function(frabl) {
            route.availability(frabl.substr(7));
        },
        'directions/?:location': function(location) {
            console.log(location.substr(2));
            route.directions(location.substr(2));

        }
    });
    
    //-----------EVENT LISTENERS-----------//
    document.getElementById("search").addEventListener("click", function(){
        name = document.getElementById("input").value;
        wrap.searchBook(name);
    });
})();   

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

console.log(getDistanceFromLatLonInKm(52.354246, 4.901915, 52.347628, 4.905054));
