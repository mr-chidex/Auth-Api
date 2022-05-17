const bcryptjs = require("bcryptjs");

exports.getHashedPass = async (password) => {
  const salt = await bcryptjs.genSalt(12);
  const hashPass = await bcryptjs.hash(password, salt);

  return hashPass;
};
