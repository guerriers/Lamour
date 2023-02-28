const db = require("../models");
const fs = require("fs");
const path = require("path");

exports.payment_bill = async (req, res) => {
  var service = await db.Resident.findOne({
    where: { username: req.body.username },
  });
  var service_bill = await db.Service.findOne({
    where: {
      room_id: service.room_id,
      status: "0" || "1",
    },
  });
  var allData = [
    {
      firstname: service.firstname,
      lastname: service.lastname,
      bill: service_bill,
    },
  ];

  if (service_bill && service) {
    return res.status(200).json({
      statusCode: 200,
      message: "Data in Found",
      data: allData,
    });
  }
};

exports.upload = async (req, res) => {
  console.log(req);
  if (!req.files) {
    res.status(400).json({
      statusCode: 401,
      message: "No files sent",
    });
  }
  const file = req.files.files;
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;
  console.log(file.name);
  file.mv(
    `${process.env.FILE_UPLOAD_PATH}/payment_img/${file.name}`,
    async (err) => {
      if (err) {
        res.status(400).json({
          statusCode: 401,
          message: "Copying images to the server failed.",
        });
      }
      try {
        db.Payment.update(
          {
            proof_of_payment: file.name,
          },
          {
            where: {
              bill_id: req.params.id,
            },
          }
        ).then((data) => {
          const change_ss = db.Service.update(
            {
              status: "1",
            },
            {
              where: {
                id: req.params.id,
              },
            }
          );
          if(!change_ss){
            return res.status(400).json({
                statusCode: 401,
                message: "อัพเดพสถานะใบชำระไม่สำเร็จ",
                data: data,
                namefile: file.name,
              });
          }
          return res.status(200).json({
            statusCode: 201,
            message: "Update Img Successfully",
            data: data,
            namefile: file.name,
          });
        });
      } catch (err) {
        res.status(400).json({
          statusCode: 400,
          message: "Failed to save the image.",
        });
      }
    }
  );
};
