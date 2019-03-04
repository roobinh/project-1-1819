
import {API} from "./index.js";

console.log("Succesfully imported: app.js");

(async () => {
    localStorage.clear();
  
    const api = new API({
        key: "1e19898c87464e239192c8bfe422f280"
    });

    const stream = await api.createStream("search/banaan{5}");
  
    stream
    //   .pipe(stringify)
      .pipe(console.log)
      .catch(console.error);
  })();

