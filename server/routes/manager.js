const express = require("express");
const auth = require("../middleware/auth");

const User = require("../models/user");

const router = express.Router();

router.post("/create/manager", async (req, res) => {
  const user = new User({
    ...req.body,
    role: "Manager",
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/manager', async (req, res) => {
 

  try {
      const user = await User.find()

      if (!user) {
          return res.status(404).send()
      }

      res.send(user)
  } catch (e) {
      res.status(500).send()
  }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

module.exports = router;