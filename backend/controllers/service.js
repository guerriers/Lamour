const db = require("../models");


exports.findAll = (req, res) => {
  db.Service.findAll().then((data) => {
    res.status(200).json({
      statusCode: 200,
      message: "Data in Found",
      data: data,
    });
  });
};

exports.findOne = async(req, res) => {

  const payment_img = await db.Payment.findOne({
    where:{ bill_id : req.params.id}
  })
  const findService = await db.Service.findOne({
      where:{
          id: req.params.id
      }
  })
  var allData = [
    {
      payment_img: payment_img,
      bill: findService,
    },
  ];

try {
  if(payment_img&&findService){
    return res.status(200).json({
       statusCode: 201,
       message: "Data in Found",
       data: allData
     })
   } 
} catch (err){
  return res.status(500).json({
    statusCode: 500,
    message: err,
});
}

}
exports.create = async (req, res) => {
  const body = req.body;
  const total = parseInt(body.electricity_bill) + parseInt(body.water_bill) + parseInt(body.common_fee)
    console.log(body);
    let number_room = await db.roomRegistration.findOne({
      where: {
        room_id: req.body.room_id,
      },
    });
    if (!number_room) {
      return res.status(400).json({
        statusCode: 401,
        message: "ไม่มีหมายเลขห้องพักนี้",
      });
    }
    if (number_room.status === "1") {
      return res.status(400).json({
        statusCode: 401,
        message: "ห้องพักนี้ยังไม่ถูกจอง",
      });
    }
    
    const service = await db.Service.create({
      room_id: req.body.room_id,
      electricity_bill: req.body.electricity_bill,
      water_bill: req.body.water_bill,
      total_bill: total,
      common_fee: req.body.common_fee,
      status: req.body.status,
    },{
      where:{
        
      }
    });
    if(!service){
      return res.status(400).json({
            statusCode: 401,
            message: "สร้างใบชำระไม่สำเร็จ",
        });
    }
    db.Payment.create({
      bill_id: service.id
    })
    .then(() => {
      res.status(200).json({
          statusCode: 201,
          message: "สร้างใบชำระสำเร็จ",
          data: service,
      });
    })
  };


  exports.updatestatus = (req, res) => {
    db.Service.update({
        status : req.body.status,
      }, {
            where: {
              id: req.params.id,
            },
        })
        .then((data) => {
            res.status(200).json({
                statusCode: 201,
                message: "แก้ไขสถานะสำเร็จ",
                data: data,
  
            });
        })
        .catch((err) => {
          res.status(400).json({
            statusCode: 401,
            message: "แก้ไขสถานะไม่สำเร็จ",
            data: data,

        });
        });
  };
  
  exports.deleteOne = (req, res) => {
    db.Service.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.status(200).json({
                statusCode: 204,
                message: "ลบใบชำระสำเร็จ",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).send(err);
        });
  };


  