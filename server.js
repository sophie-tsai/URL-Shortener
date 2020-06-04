const express = require("express");
const Url = require("./src/url");
const connect = require("./src/connect")
const app = express();
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))



connect(`mongodb://localhost:27017/url-shortener`)
.then(()=> app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`)))
.catch(error => console.error(error))