const db = require("../models");

exports.findAll = (req, res) => {
  db.Resident.findAll().then((data) => {
    res.status(200).json({
      statusCode: 200,
      message: "Data in Found",
      data: data,
    });
  });
};

exports.findOne = (req, res) => {
  db.Resident.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json({
        statusCode: 200,
        message: "Data in Found",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.create = async (req, res) => {
  let number_room = await db.roomRegistration.findOne({
    where: {
      room_id: req.body.room_id,
    },
  });
  if (!number_room) {
    return res.status(400).json({
      statusCode: 401,
      message: "ไม่มีห้องพักหมายเลขนี้",
    });
  }
  let check_username = await db.Resident.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (check_username) {
    return res.status(400).json({
      statusCode: 401,
      message: "Username นี้ถูกใช้งานแล้ว",
    });
  }
  db.Resident.create({
    room_id: req.body.room_id,
    floor: req.body.floor,
    size: req.body.size,
    direction: req.body.direction,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    car_registration: req.body.car_registration,
    date: req.body.date,
    username: req.body.room_id,
    password: req.body.phone,
  })
    .then( async (data) => {
      const c_username = await db.User.create({
        username: req.body.room_id,
        password: req.body.phone,
        status: "0",
      });
      if (!c_username) {
        res.status(400).json({
          statusCode: 401,
          message: "สร้างชื่อผู้ใช้กับรหัสผ่านไม่สำเร็จ",
        });
      }
        res.status(200).json({
          statusCode: 201,
          message: "จองห้องพักสำเร็จ",
          data: data,
        });
    })
    .catch((err) => {
      res.status(400).json({
        statusCode: 401,
        message: "จองห้องพักไม่สำเร็จ",
      });
    });
};

exports.update = async(req, res) => {
  db.Resident.update(
    {
      room_id: req.body.room_id,
      size: req.body.size,
      floor: req.body.floor,
      direction: req.body.direction,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      car_registration: req.body.car_registration,
      username: req.body.username,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    })
    .then(async (data) => {
      db.User.update({
        password: req.body.password,
      },{
        where:{
          username: req.body.passwordusername,
        }
      });
        res.status(200).json({
          statusCode: 201,
          message: "จองห้องพักสำเร็จ",
          data: data,
        });
    })
    .catch((err) => {
      res.status(400).json({
        statusCode: 401,
        message: "จองห้องพักไม่สำเร็จ",
      });
    });
}

exports.deleteOne = async (req, res) => {
  const room = await db.Resident.findOne({
    where: { id: req.params.id },
  });

  db.Resident.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      const delete_user = db.User.destroy({
        where: {
          username: room.username,
          password: room.password,
        },
      });
      if (!delete_user) {
        return res.status(400).json({
          statusCode: 401,
          message: "ลบข้อมูลผู้ใช้สำเร็จ",
          data: data,
        });
      }
      res.status(200).json({
        statusCode: 204,
        message: "ลบข้อมูลสำเร็จ",
      });
    })
    .catch(() => {
      res.status(400).json({
        statusCode: 401,
        message: "ลบข้อมูลไม่สำเร็จ",
      });
    });
};
