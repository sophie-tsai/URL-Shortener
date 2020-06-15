const express = require('express');
const { urlencoded, json } = require('body-parser');
const User = require('./model/user');
const Url = require('./model/url/url');
const cors = require('cors');
const connect = require('./connect');
const generateToken = require('./model/url/utils');

const app = express();

corsOptions = {
  origin: 'https://sophie-tsai.github.io/Smolify/',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).send('Healthy'));

// gets all urls
app.get('/urls', async (req, res) => {
  try {
    const allUrls = await Url.find({}).lean().exec();
    res.status(200).json(allUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// gets all urls of a specific user
app.get('/users/:user/urls', async (req, res) => {
  const user = req.params.user;
  try {
    const userUrls = await Url.find({ user: user }).lean().exec();
    // console.log(userUrls.length);
    res.status(200).json(userUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// gets specific user information
app.get('/users/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.find({ user: username }).lean().exec();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// gets and a redirect specific url with token
app.get('/:token', async (req, res) => {
  const token = req.params.token;
  const docMatch = await Url.findOne({ token: token }).exec();
  res.redirect(`https://${docMatch.longUrl}`);
  docMatch.timesUsed++;
  await docMatch.save();
});

// creates a new user
app.post('/users', async (req, res) => {
  const userToBeCreated = req.body.user;
  try {
    const user = await User.create(userToBeCreated);
    res.status(201).json(user.toJSON());
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      res.status(403).send('username has been taken');
      return;
    }
    res.status(500).send();
  }
});

// creates a new url
app.post('/urls', async (req, res) => {
  const urlToBeCreated = req.body.url;
  urlToBeCreated.token = generateToken();
  try {
    const url = await Url.create(urlToBeCreated);

    res.status(201).json(url.toJSON());
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// deletes user doc and links
app.delete('/users/:user', async (req, res) => {
  const user = req.params.user;
  try {
    const userMatch = await User.findByIdAndDelete(user).exec();
    console.log('deleted', userMatch);
    const userUrls = await Url.deleteMany({ user: user });

    res.status(200).send('deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// delete a link by id
app.delete('/urls/:url', async (req, res) => {
  const url = req.params.url;
  try {
    const urlMatch = await Url.findByIdAndDelete(url).exec();
    console.log('deleted', urlMatch);
    res.status(200).send('link deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// update username
app.put('/users/:user', async (req, res) => {
  const user = req.params.user;
  const updatedUsername = req.body.updatedUser;
  try {
    const userMatch = await User.findById(user).exec();
    userMatch.user = updatedUsername;
    await userMatch.save();
    console.log('updated', userMatch);
    res.status(200).send('updated');
  } catch (error) {
    console.error(error);
    res.status(403).send();
  }
});

function start() {
  const PORT = process.env.PORT || 5000;

  try {
    connect();

    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = start;
