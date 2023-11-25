const express = require("express")
const router = express.Router()
module.exports = { router }

const authenticate = require("../controllers/authenticate.js")

router.post("/", async (req, res) => {
  const result = await authenticate.authenticateUser(
    req.body.userData
  )
  res.json(result)
})

router.post("/create", async (req, res) => {
  const result = await authenticate.createUser(req.body.userData)
  res.json(result)
})

router.delete("/delete", async (req, res) => {
  const result = await authenticate.deleteUser(req.body.userData)
  res.json(result)
})