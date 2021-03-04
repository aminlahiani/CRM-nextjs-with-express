const express = require("express");
const auth = require("../middleware/auth");
const Manager = require("../models/manager");



const router = express.Router();

router.post("/create/manager", async (req, res) => {
  const user = new Manager({
    ...req.body,
    role: "MANAGER",
  });
  try {
    await user.save();

    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post('/manager/login', async (req, res) => {
  try {
      const user = await Manager.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      req.session.token = token;
      res.status(200).send({ user, token })
  } catch (error) {
      res.status(400).send({error})
  }
})
router.get('/manager', async (req, res) => {
 

  try {
      const user = await Manager.find()

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(500).send()
  }
})

router.get('/manager/me', auth, async (req, res) => {
  console.log(req.user)
  res.send({currentUser: req.user});
})

module.exports = router;