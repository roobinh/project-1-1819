
import {API} from "./index.js";

console.log("Succesfully imported: app.js");

(async () => {
    localStorage.clear();
  
    const api = new API({
        key: "1e19898c87464e239192c8bfe422f280"
    });

    async function searchBook(name) {
        console.log("Search Book: " + name);
        console.log("API is loading...");

        const stream = await api.createStream("search" + '/' + name + "{5}");

        stream
            .pipe(console.log)
            .catch(console.error);
    }

    document.getElementById("search").addEventListener("click", function(){
        name = document.getElementById("input").value;
        searchBook(name);
    });
    
  })();


