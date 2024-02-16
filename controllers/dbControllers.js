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
  let userId;
try {
  userId = new ObjectId(req.params.id);
} catch (err) {
  return res.status(400).send(`Invalid ID format: ${req.params.id}`);
}
  try{
    const result = await mongodb
      .getDb()
      .db(dbName)
      .collection(dbCollection)
      .find({_id: userId})
    result.toArray().then((lists) => {
      res.json(lists[0])
    })
  } catch(err) {
    return res.status(400).send(`Search for ${userId} failed: ${err}`)
  }
}

const insertOne = async (req, res) => {

    
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'add new customer',
    required: true,
    schema: {
    "firstName": "Test3",
    "lastName": "LTest3",
    "email": "test3@ldka.com",
    "phone": 123456789,
    "address": "1234 Abc Street",
    "startDate": "XX/XX/XXXX"
  }
  }
  */



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
    return res.status(400).send(`Create new customer failed: ${err``}`)
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
        res.send(`Update to ${userId} complete.`).status(204)
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
      return res.status(404).send(`No document deleted with id: ${userId}`)
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
