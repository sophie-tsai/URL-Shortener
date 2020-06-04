/*
import express from 'express';
import { json, urlencoded } from 'body-parser';

import Url from './model/url';
import cors from 'cors';
import User from './model/user';
import { connect } from './connect';
*/

const express = require('express');
const { urlencoded, json } = require('body-parser');
const User = require('./model/user');
const Url = require('./model/url');
const cors = require('cors');
const connect = require('./connect');

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// app.get('/', (req, res) => res.send('Is anybody there?!'));

app.get('/urls', async (req, res) => {
  try {
    const allUrls = await Url.find({}).lean().exec();
    res.status(200).json(allUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.get('/users/:user/urls', async (req, res) => {
  const user = req.params.user;
  try {
    const userUrls = await Url.find({ user: user }).lean().exec();
    res.status(200).json(userUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.post('/createUser', async (req, res) => {
  const userToBeCreated = req.body.createUser;
  const user = await User.create(userToBeCreated);
  res.status(201).json(user.toJSON());
});

app.post('/creatUrl', async (req, res) => {
  const urlToBeCreated = req.body.url;
  const url = await Url.create(urlToBeCreated);
  res.status(201).json(url.toJSON());
});

function start() {
  const PORT = 5000;

  try {
    connect();

    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/api`);
    });
  } catch (e) {
    console.error(e);
  }
}

start();
