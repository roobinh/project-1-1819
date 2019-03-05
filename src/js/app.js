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
        }
    }

    const router = {
        home: function() {
			console.log('Home pagina.');
        },

        availability: function(id) {
            console.log("Availability pagina. ID = " + id);
            
            var books = document.getElementById('books');
            books.setAttribute('style', 'display: none');

            var loader = document.getElementById('loader');
            loader.setAttribute('style', 'display: block;');
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
                var identifiers = response[i]['identifiers'];

                for(var x=0; x<identifiers.length; x++) {   
                    var temp = identifiers[x]['ppn-id'];
                    if(typeof temp !== 'undefined') {
                        console.log("gevonden: " + identifiers[x]['ppn-id']);
                        var id = identifiers[x]['ppn-id'];
                    }
                }  

                clickable.setAttribute('href', '#availability?id=' + id);
                clickable.innerHTML = "Beschikbaarheid";

                var book = document.createElement('div');
                book.setAttribute('class', 'book');
    
                var title = document.createElement('h2');
                // title = title.split('/');
                title.setAttribute('class', 'title');
                var titel = response[i]['title']['full'];
                
                if(typeof titel === 'undefined') {
                    titel = "Unknown";
                } else {
                    titel = titel.split('/')[0].slice(0,50);
                }
                title.innerHTML = titel;
    
                var cover = document.createElement('img');
                cover.setAttribute('class', 'cover');
                var image = response[i]['images'][0];
                cover.setAttribute('src', image);
    
                var desc = document.createElement('p');
                desc.setAttribute('class', 'description');
                var description = response[i]['summary'];
                if(typeof description !== 'undefined') {
                    desc.innerHTML = description.slice(0, 200);
                } else {
                    desc.innerHTML = "Description not available";
                }
    
                book.appendChild(title);
                book.appendChild(cover);
                book.appendChild(desc);
                book.appendChild(clickable)
                
                books.appendChild(book);
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
		'availability/?:id': function(id) {
            id = id.substr(4) // '?:id=8892374' -> '8892374'
            route.availability(id);
		}
    });
    
    //-----------EVENT LISTENERS-----------//
    document.getElementById("search").addEventListener("click", function(){
        name = document.getElementById("input").value;
        wrap.searchBook(name);
    });
})();   