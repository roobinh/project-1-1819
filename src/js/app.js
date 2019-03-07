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
                var image = response[i]['coverimages']['coverimage'][0]['_text'];
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

            render.disableLoader();

            // div where availability gets added        
            var mainDiv = document.getElementById('availability');
            
            // all possible locations
            var locations = availability['aquabrowser']['locations']['location'];

            // all locations where the book is available
            var availableLocations = []

            if(typeof(locations.length) === "undefined") {
                var amountOfBooks = 1;
            } else {
                var amountOfBooks = locations.length;
            }

            for(var i=0; i<amountOfBooks; i++) {
                var div = document.createElement('div');

                if(typeof(locations.length) === "undefined") {
                    var location = locations;
                } else {
                    var location = locations[i];
                }
                
                var name = location['_attributes']['name'];
                var available = location['_attributes']['available'];

                var title = document.createElement('h2');
                title.innerHTML = name;

                var availability = document.createElement('p');
                availability.innerHTML = "available: " + available;
                
                if(location['_attributes']['available'] == "true") {
                    availableLocations.push(name);

                    div.setAttribute('class', 'available');

                    var directions = document.createElement('a');
                    directions.setAttribute('href', '#directions?=' + name);
                    directions.innerHTML = "Directions";

                    var floor = location['items']['item']['subloc']['_text'];
                    var shelf = location['items']['item']['shelfmark']['_text'];

                    var verdieping = document.createElement('p');
                    verdieping.innerHTML = "Afdeling: " + floor;

                    var kast = document.createElement('p');
                    kast.innerHTML = "Plaats: " + shelf;

                    div.appendChild(title);
                    div.appendChild(availability); 
                    div.appendChild(verdieping);
                    div.appendChild(kast);    
                    div.appendChild(directions);

                } else {
                    div.setAttribute('class', 'unavailable');

                    div.appendChild(title);
                    div.appendChild(availability);
                }

                

                
                
                

                mainDiv.appendChild(div);
            }
            console.log(availableLocations);

        },
        enableLoader: function() {
            var loader = document.getElementById("loader");
            loader.setAttribute('style', 'display: block;');
        },
        disableLoader: function() {
            var loader = document.getElementById('loader');
            loader.setAttribute('style', 'display: none;');
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
            console.log(frabl);
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