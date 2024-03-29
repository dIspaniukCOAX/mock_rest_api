const express = require("express");
const validationResult = require("express-validator").validationResult;
const check = require("express-validator").check;
const cors = require("cors");
const Lead = require("./models/lead.model");
const LeadGetTest = require("./models/leadGetTest.model");
const connectToDatabase = require("./db/database");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

connectToDatabase();

app.post("/plain-text", async(req,res) => {
  try {
    console.log('req :>> ', req);
    console.log('req.body :>> ', req.body);
    return res.status(200).json(req.body);
  } catch (error) {
    console.log('error :>> ', error);
    return error
  }
})

app.get("/lead-data/:id", async (req, res) => {
  try {
    const searchLead = await Lead.findById(req.params.id);
    return res.status(200).json(searchLead);
  } catch (err) {
    return res.status(404).json({ errorStatus: 404, errorMessage: err });
  }
});

app.post(
  "/lead-data",
  [
    check("f_name").isString().withMessage("f_name is required key"),
    check("l_name").isString().withMessage("l_name is required key"),
    check("lead_name")
      .optional()
      .isString()
      .withMessage("lead_name is required key"),
    check("lead_email")
      .isString()
      .withMessage("lead_email is required key")
      .isEmail()
      .withMessage("Invalid email format"),
    check("lead_phone").isString().withMessage("lead_phone is required key"),
    check("lead_region").isString().withMessage("lead_region is required key"),
    check("lead_service")
      .isString()
      .withMessage("lead_service is required key"),
    check("lead_source").isString().withMessage("lead_source is required key"),
  ],
  async (req, res) => {
    const errors = validationResult(req).array();
    if (errors && errors.length) {
      return res.status(400).json({ errors });
    }
    try {
      const content = req.body;
      if (!content) {
        return res.status(400).json({ errorStatus: 400, errorMessage: "Empty data" });;
      }

      const lead = new Lead(req.body);
      await lead.save();

      res.status(201).json({
        status: 201,
        data: lead,
      });
    } catch (error) {
      console.log("error :>> ", error);
      return res
        .status(404)
        .json({ errorStatus: 404, errorMessage: error });
    }
  }
);

app.get(
  "/test/lead-data",
  [
    check("f_name").isString(),
    check("l_name").isString(),
    check("lead_email").isString(),
    check("lead_phone").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req).array();
    if (errors && errors.length) {
      return res.status(400).json({ errors });
    }
    try {
      const leadGetTest = new LeadGetTest(req.query);
      await leadGetTest.save();

      return res.status(201).json({
        status: 201,
        data: leadGetTest
      });
    } catch (error) {
      console.log('error :>> ', error);
      return res.status(404).json({ errorStatus: 404, errorMessage: error });
    }
  }
);

app.listen(8001, () => console.log("REST API Server is running..."));
