const express = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
const dbName = "briansCRM";
const dbCollection = "customers";

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .find();
    result.toArray().then((lists) => {
      res.json(lists);
    });
  } catch (err) {
    return res.status(400).send("request failed: " + err);
  }
};

const getById = async (req, res) => {
  console.log("Get one.")
  try{
    const userId = new ObjectId(req.params.id)
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .find({_id: userId})
    result.toArray().then((lists) => {
      res.json(lists[0])
    })
  } catch(err) {
    return res.status(400).send(`Search for ${userId} faild: ${err}`)
  }
}

const insertOne = async (req, res) => {
  console.log("Add one")
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "birthday",
  ]
    
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'add new customer',
    required: true,
    schema: {
    "fName": "Test3",
    "lName": "LTest3",
    "email": "test3@ldka.com",
    "phone": {
      "husband": 123456789,
      "wife": 123456789,
      "other": null
    },
    "address": {
      "streetNum": 1234,
      "streetName": "Abc Street",
      "city": "Abc Town",
      "zip": 12345,
      "state": "XX"
    },
    "startDate": "XX/XX/XXXX"
  }
  }
  */

  const hasRequiredFields = requiredFields.every(
    (field) => req.body[field] !== undefined
  )

  try {
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .insertOne(req.body)
      .then((result) => {
        res.send(result.insertedId).status(201)
      })
  } catch (err) {
    return res.status(400).send(`Create new customer faild: ${err``}`)
  }
}

const updateOne = async (req, res) => {
  const userId = new ObjectId(req.params.id)

  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'update contact',
    required: true,
    schema: {
    }
  }
  */

  try {
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .updateOne({ _id: userId }, {$set: req.body})
      .then((result) => {
        res.send(result.insertedId).status(204)
      })
  }catch(err){
    return res.status(400).send(`Update failed: ${err}`)
  }
}

const deleteOne = async (req, res) => {
  console.log("Delete One")
  const userId = new ObjectId(req.params.id)
  try{
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .deleteOne({_id: userId})
    if (result.deletedCount === 0) {
      return res.status(404).send(`No document deleted wit id: ${userId}`)
  }
    res.status(200).send(`Documents deleted: ${result.deletedCount}`)
  } catch(err){
    return res.status(400).send(`Delete failed ${err}`)
  }
}

module.exports = {

  getAll,
  getById,
  insertOne,
  updateOne,
  deleteOne
}
