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
            var loader = document.getElementById("loader");
            loader.setAttribute('style', 'display: block;');

            console.log("Searching Book: " + name + "...");
            
            const stream = await api.createStream("search/" + name + "{9}");

            stream
                .pipe(render.addToDocument)
                .catch(console.error);
        },
        searchAvailability: async function(frabl) {
            var loader = document.getElementById('loader');
            loader.setAttribute('style', 'display: block;');

            console.log("Searching Availability, frabl: " + frabl + "...");

            const avail = await api.availability(frabl);
            // avail.then(console.log)
            // console.log(avail);
            render.availability(avail);


        }
    }

    const router = {
        home: function() {
			console.log('Home pagina.');
        },

        availability: function(frabl) {
            console.log("Availability pagina. frabl = " + frabl);
            
            var books = document.getElementById('books');
            books.setAttribute('style', 'display: none');

            wrap.searchAvailability(frabl);
        }
    }

    const renderer = {
        addToDocument: function(response) {
            console.log(response)
            var loader = document.getElementById('loader');
            loader.setAttribute('style', 'display: none;');

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

            var loader = document.getElementById('loader');
            loader.setAttribute('style', 'display: none;');

            var locations = availability['aquabrowser']['locations']['location'];

            for(var i=0; i<locations.length;i++) {
                console.log(locations[i]['_attributes']['name'])
                // console.log(locations)
            }


            // var test = availability['aquabrowser']['locations']['location'][0]['_attributes']['name'];
            // console.log(test);
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
		'availability/?:id': function(id) {
            id = id.substr(7) // '?:id=8892374' -> '8892374'
            route.availability(id);
		}
    });
    
    //-----------EVENT LISTENERS-----------//
    document.getElementById("search").addEventListener("click", function(){
        name = document.getElementById("input").value;
        wrap.searchBook(name);
    });
})();   