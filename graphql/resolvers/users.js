const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/user");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },

    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("wrong credential", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "wrong credentials";
        throw new UserInputError("wrong credentials", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //todos validate users data
      const { valid, errors } = validateRegisterInput(
        email,
        username,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      //make sure user does not already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      //hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
