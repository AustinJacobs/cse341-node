const mongodb = require('../database/connect');
const dotenv = require('dotenv');
dotenv.config();
const ObjectId = require('mongodb').ObjectId;
const database_name = process.env.DB_NAME;

const getAllContacts = async (req, res, next) => {
  const data = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('contacts')
    .find();
  data.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    if (res) {
      res.json(documents);
    }
  });
};

const getSingleContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const data = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('contacts')
    .find({ _id: userId });
  data.toArray().then((documents) => {
    res.setHeader('Content-Type', 'application/json');
    if (res) {
      res.json(documents[0]);
    }
  });
};

module.exports = { getAllContacts, getSingleContact };
