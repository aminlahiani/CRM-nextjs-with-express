const express = require("express");
const auth = require("../middleware/auth");
const Admin = require("../models/admin");

const router = express.Router();

router.post("/create/admin", async (req, res) => {
  const user = new Admin({
    ...req.body,
    role: "ADMIN",
  });
  try {
    await user.save();
  
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/admin/login', async (req, res) => {
  try {
      const user = await Admin.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      req.session.token = token;
      res.status(200).send({ user, token })
  } catch (error) {
      res.status(400).send({error})
  }
})


router.get("/users/me", auth, async (req, res) => {
  console.log(req.user)
  res.send({currentUser: req.user});
});

module.exports = router;
