import express from 'express';
import { json, urlencoded } from 'body-parser';
import url from './model/url';
import cors from 'cors';
import User from './model/user';
import connect from './connect';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Is anybody there?!'));
app.get('/urls', async (req, res) => {
  try {
    const allUrls = await url.find({}).lean().exec();
    res.status(200).json(allUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export const start = async () => {
  const PORT = process.env.PORT;

  try {
    await connect(`mongodb://localhost:27017/url-shortener`);
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
