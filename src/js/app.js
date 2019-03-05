
import {API} from "./index.js";

console.log("Succesfully imported: app.js");

function addToDocument(response) {  
    console.log(response)

    var books = document.getElementById('books');
    var loader = document.getElementById('loader');
    loader.setAttribute('style', 'display: none;');

    for(var i=0; i<response.length ; i++) {
        var book = document.createElement('div');
        book.setAttribute('class', 'book');

        var title = document.createElement('h2');
        title.setAttribute('class', 'title');
        title.innerHTML = response[i]['title']['full'];

        var cover = document.createElement('img');
        cover.setAttribute('class', 'cover');
        var image = response[i]['images'][0];
        cover.setAttribute('src', image);

        var desc = document.createElement('p');
        desc.setAttribute('class', 'description');
        var description = response[i]['summary'];
        desc.innerHTML = description;

        book.appendChild(title);
        book.appendChild(cover);
        book.appendChild(desc);

        books.appendChild(book);
    }
}

(async () => {
    localStorage.clear();
    
	const api = new API({
		key: "1e19898c87464e239192c8bfe422f280"
    });
    
    async function searchBook(name) {
        var loader = document.getElementById("loader");
        loader.setAttribute('style', 'display: block;');

        console.log("Searching Book: " + name + "...");
        
        const stream = await api.createStream("search/banaan{9}");

        stream
            .pipe(addToDocument)
            .catch(console.error);
    }

	
        
    document.getElementById("search").addEventListener("click", function(){
        name = document.getElementById("input").value;
        searchBook(name);
    });
})();   