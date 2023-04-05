const express = require("express");
const router = express.Router();
const axios = require("axios");
const Info = require("../models/HODinfo");

const fetchdata = async () => {
  try {
    let res = await axios({
      method: "get",
      url: "https://api.wazirx.com/api/v2/tickers",
      responseType: "json",
    });
    // console.log(res);
    const responseData = Object.values(res.data).slice(0, 10);

    // console.log("Data Fetched");
    // console.log(responseData);
    const requiredFieldData = responseData.map((data, index) => {

      const { name, last, buy, sell, volume, base_unit } = data;

      return { index: index + 1, name, last, buy, sell, volume, base_unit };
    });
    console.log("Data Fetched");
    console.log(requiredFieldData);

    return requiredFieldData;

  } catch (error) {
    console.log(error);
  }
};

//Route 1 -- fetch all info and add to database -- "http://localhost:5000/add_details"
router.post("/add_details", async (req, res) => {
  try {
    const data = await fetchdata();

    const saveInfoPromise = data.map((d) => Info.create(d));
    await Promise.all(saveInfoPromise);

    res.json({ message: "Data inserted successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 1 -- fetch all info from database -- "http://localhost:5000/get_details"
router.get("/get_details", async (req, res) => {
  try {
    const getInfo = await Info.find();
    res.json(getInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
