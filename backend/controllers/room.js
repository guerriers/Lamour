const db = require("../models");

exports.findAll = (req, res) => {
  db.roomRegistration.findAll().then((data) => {
    res.status(200).json({
      statusCode: 200,
      message: "Data in Found",
      data: data,
    });
  });
};

exports.findOne = (req, res) => {
    db.roomRegistration.findOne({
        where:{
            room_id: req.params.id
        }
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
  if (number_room) {
    return res.status(400).json({
      statusCode: 401,
      message: "มีทะเบียนของห้องพักนี้อยู่แล้ว",
    });
  }
  db.roomRegistration
    .create({
      room_id: req.body.room_id,
      floor: req.body.floor,
      size: req.body.size,
      direction: req.body.direction,
      price: req.body.price,
      detail: req.body.detail,
      status: req.body.status,
      date: Date.now(),
    })
    .then((data) => {
      res.status(200).json({
        statusCode: 201,
        message: "เพื่มห้องพักสำเร็จ",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        statusCode: 401,
        message: "เพื่มห้องพักไม่สำเร็จ",
        data: data,
      });
    });
};

exports.update = async(req, res) => {
  db.roomRegistration.update({
    room_id: req.body.room_id,
    floor: req.body.floor,
    size: req.body.size,
    direction: req.body.direction,
    price: req.body.price,
    detail: req.body.detail,
    status: req.body.status,
    }, {
          where: {
            room_id: req.params.id,
          },
      })
      .then((data) => {
          res.status(200).json({
              statusCode: 201,
              message: "แก้ไขข้อมูลห้องพักสำเร็จ",
              data: data,

          });
      })
      .catch((err) => {
        res.status(400).json({
          statusCode: 401,
          message: "แก้ไขข้อมูลห้องพักไม่สำเร็จ",
          data: data,

      });
      });
};

exports.deleteOne = (req, res) => {
  db.roomRegistration.destroy({
          where: {
              room_id: req.params.id
          }
      }).then(data => {
          res.status(200).json({
              statusCode: 204,
              message: "ลบห้องพักสำเร็จ",
              data: data,
          });
      })
      .catch((err) => {
        res.status(400).json({
          statusCode: 401,
          message: "ลบห้องพักไม่สำเร็จ",
          data: data,
      });
      });
};
