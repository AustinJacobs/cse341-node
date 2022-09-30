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

const createContact = async (req, res) => {
  const document = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('contacts')
    // Can use insertMany to insert multiple documents at once.
    .insertOne(document);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || 'An error ocurred during contact creation.'
      );
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'An error ocurred during the contact update.'
      );
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .fetchDb()
    .db(database_name)
    .collection('contacts')
    // Can use deleteMany to delete multiple contacts at once.
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'An error ocurred during contact deletion.'
      );
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
