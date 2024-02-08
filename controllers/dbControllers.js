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

const updateOne = () => {
  console.log("Update One")
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
