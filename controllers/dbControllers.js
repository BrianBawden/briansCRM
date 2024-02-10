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
    
  /* #swagger.parameters['body'] = {
    in: 'body',
    description: 'add new contact',
    required: true,
    schema: {
      $firstName: 'newFirstName', 
      $lastName: 'newLastName', 
      $email: 'newEmail@email.com', 
      $favoriteColor: 'newColor', 
      $birthday: 'XX/XX/XXXX'
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

const deleteOne = () => {
  console.log("Delete One")
}

module.exports = {

  getAll,
  getById,
  insertOne,
  updateOne,
  deleteOne
}
