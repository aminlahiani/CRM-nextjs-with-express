const express = require("express");
const auth = require("../middleware/auth");

const User = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const user = new User({
    ...req.body,
    role: "Admin",
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/admin/login', async (req, res) => {
  try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      req.session.token = token;
      res.status(200).send({ user, token })
  } catch (error) {
      res.status(400).send({error})
  }
})
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
