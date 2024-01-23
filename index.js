const fs = require("fs/promises");
const express = require("express");
const validationResult = require("express-validator").validationResult;
const check = require("express-validator").check;
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/lead-data/:id", async (req, res) => {
  const id = req.params.id;
  let content;

  try {
    content = await fs.readFile(`data/${id}.txt`, "utf-8");
  } catch (err) {
    return res.sendStatus(404);
  }

  res.json({
    content: content,
  });
});

app.post(
  "/lead-data",
  [
    check("f_name").isString().withMessage("f_name is required key"),
    check("l_name").isString().withMessage("l_name is required key"),
    check("lead_name").optional().isString().withMessage("lead_name is required key"),
    check("lead_email")
      .isString()
      .withMessage("lead_email is required key")
      .isEmail()
      .withMessage("Invalid email format"),
    check("lead_phone").isString().withMessage("lead_phone is required key"),
    check("lead_region").isString().withMessage("lead_region is required key"),
    check("lead_service").isString().withMessage("lead_service is required key"),
    check("lead_source").isString().withMessage("lead_source is required key"),
  ],
  async (req, res) => {
    const errors = validationResult(req).array();
    if(errors && errors.length){
        res.status(400).json({ errors })
    } 
    const content = req.body;
    if (!content) {
      return res.sendStatus(400);
    }

    await fs.mkdir("data/", { recursive: true });
    await fs.writeFile(`data/${Date.now()}.txt`, JSON.stringify(content));

    res.status(201).json({
      status: 201,
      data: content
    });
  }
);

app.listen(8001, () => console.log("REST API Server is running..."));
