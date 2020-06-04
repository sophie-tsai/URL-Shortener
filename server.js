const express = require("express");
const Url = require("./src/url");
const User = require("./src/user")
const connect = require("./src/connect")
const app = express();
const PORT = process.env.PORT || 5000
const {json, urlencoded} = require('body-parser')



app.use(urlencoded({extended: true}));
app.use(json())

app.get('/', (req, res) => res.send('Is anybody there?!'))

app.get("/urls", async (req,res) => {
   try {
       const allUrls = await Url.find({})
       .lean()
       .exec()
       res.status(200).json(allUrls)
   } catch (error) {
       console.error(error);
       res.status(500).send()
   }
})


connect(`mongodb://localhost:27017/url-shortener`)
.then(()=> app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`)))
.catch(error => console.error(error))