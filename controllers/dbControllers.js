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

const getById = () => {
  console.log("Get one.")
}

const insertOne = () => {
  console.log("Add one")
}

const updateOne = async (req, res) => {
  const userId = new ObjectId(req.params.id)

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
