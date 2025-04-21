const User = require("../models/User");
const jwt = require("jsonwebtoken");

const googleSignIn = async (req, res) => {
  const { name, email, image } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, image });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Google authentication error", error });
  }
};

module.exports = { googleSignIn };
