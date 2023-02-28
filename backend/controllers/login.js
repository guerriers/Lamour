const db = require("../models");

exports.check = async (req, res) => {
  const check_username = await db.User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!check_username) {
    return res.status(400).json({
      statusCode: 401,
      message: "ไม่มีชื่อผู้ใช้นี้ กรุณากรอกชื่อผู้ใช้ให้ถูกต้อง !!",
    });
  }
  if (check_username.password !== req.body.password) {
    return res.status(400).json({
      statusCode: 401,
      message: "รห้สผ่านไม่ถูกต้อง โปรดลองอีกครั้ง",
    });
  }
  return res.status(200).json({
    statusCode: 200,
    message: "เข้าสู่ระบบสำเร็จ",
    data: check_username
  });
};
