const bycrypt = require("bcryptjs");
const { User, validateUser } = require("../../models/auth/user");

exports.registerUser = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }
  const { userName, email, password } = req.body;

  const checkUserName = await User.findOne({ userName: userName }).lean();

  if (checkUserName) {
    return res.status("400").send("User Name Already Exist");
  }

  const checkEmail = await User.findOne({ email: email }).lean();

  if (checkEmail) {
    return res.status("400").send("Email Already Exist");
  }

  const hashPass = await bycrypt.hash(password, 8);

  const client = new User({
    userName,
    email,
    password: hashPass,
  });

  const result = await client.save();
  const accessToken = client.getAuthToken();
  return res
    .status(200)
    .send({ _id: result._id, accessToken, username: result.userName });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: email }, { userName: email }],
  });
  if (!user) {
    return res.status(400).send("Email not found");
  }

  const isUserCorrect = await bycrypt.compare(password, user.password);

  if (!isUserCorrect) {
    return res.status(400).send("Password is invalid!");
  }
  const accessToken = user.getAuthToken();

  if (user.deleteMyAccount && user.deleteMyAccount == "yes") {
    const client = {
      deleteMyAccount: "no",
      deactivationDate: "",
    };
    const updatedUser = await User.findByIdAndUpdate(user._id, client);
  }

  return res.status(200).send({ _id: user._id, accessToken });
};
