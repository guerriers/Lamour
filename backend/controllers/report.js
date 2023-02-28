const db = require("../models");

exports.residentFind = (req, res) => {
    db.Resident.findAll().then((data) => {
      res.status(200).json({
        statusCode: 200,
        message: "Data in Found",
        data: data,
      });
    });
  };

  exports.monthFind = async(req, res) => {
    const monthList = []
    const allData =[];
   const allMonthReport = await db.Service.findAll();
  var sumWater = await allMonthReport.reduce((a,b)=>{
    const key = (b['createdAt']).toLocaleString('default', { month: 'long' })
   a[key]=a[key]? a[key]+b['water_bill']:b['water_bill']
    return a
  },{})


  var sumElectric = await allMonthReport.reduce((a,b)=>{
    const key = (b['createdAt']).toLocaleString('default', { month: 'long' })
    a[key]=a[key]? a[key]+b['electricity_bill']:b['electricity_bill']
    return a
  },{})
 

  var sumCommon = await allMonthReport.reduce((a,b)=>{
    const key = (b['createdAt']).toLocaleString('default', { month: 'long' })
    a[key]=a[key]? a[key]+b['common_fee']:b['common_fee']
    return a
  },{})


var sumTotalBill = await allMonthReport.reduce((a,b)=>{
  const key = (b['createdAt']).toLocaleString('default', { month: 'long' })
  a[key]=a[key]? a[key]+b['total_bill']:b['total_bill']
  return a
},{})

var sumMonth= await allMonthReport.reduce((a,b)=>{
  const key = (b['createdAt']).toLocaleString('default', { month: 'long' })
  a[key]=a[key]? b['createdAt'].toLocaleString('default', { month: 'long' }):b['createdAt'].toLocaleString('default', { month: 'long' })
 
  monthList.push(a);

  return a
},{})

var sumYear= await allMonthReport.reduce((a,b)=>{
  const key = (b['createdAt']).toLocaleString('default', { year: 'numeric' })
  a[key]=a[key]? b['createdAt'].toLocaleString('default', { year: 'numeric' }):b['createdAt'].toLocaleString('default', { year: 'numeric' })
  return a
},{})


allData.push(sumWater)
allData.push(sumElectric)
allData.push(sumCommon)
allData.push(sumTotalBill)
allData.push({month:sumMonth})
allData.push({year:sumYear})

          res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data: allData,
            qs:req.query
          });
        };

  exports.yearFind = async(req, res) => {
    const allData =[];
   const allMonthReport = await db.Service.findAll();
  var sumWater = await allMonthReport.reduce((a,b)=>{
    const key = (b['createdAt']).toLocaleString('default', { year: 'numeric' })
   a[key]=a[key]? a[key]+b['water_bill']:b['water_bill']
    return a
  },{})


  var sumElectric = await allMonthReport.reduce((a,b)=>{
    const key = (b['createdAt']).toLocaleString('default', { year: 'numeric' })
    a[key]=a[key]? a[key]+b['electricity_bill']:b['electricity_bill']
    return a
  },{})


  var sumCommon = await allMonthReport.reduce((a,b)=>{
    const key = (b['createdAt']).toLocaleString('default', { year: 'numeric' })
    a[key]=a[key]? a[key]+b['common_fee']:b['common_fee']
    return a
  },{})


var sumTotalBill = await allMonthReport.reduce((a,b)=>{
  const key = (b['createdAt']).toLocaleString('default', { year: 'numeric' })
  a[key]=a[key]? a[key]+b['total_bill']:b['total_bill']
  return a
},{})

var sumMonth= await allMonthReport.reduce((a,b)=>{
  const key = (b['createdAt']).toLocaleString('default', { year: 'numeric' })
  a[key]=a[key]? b['createdAt'].toLocaleString('default', { year: 'numeric' }):b['createdAt'].toLocaleString('default', { year: 'numeric' })
  return b['createdAt'].toLocaleString('default', { year: 'numeric' })
},{})


allData.push(sumWater)
allData.push(sumElectric)
allData.push(sumCommon)
allData.push(sumTotalBill)
allData.push({year:sumMonth})

          res.status(200).json({
            statusCode: 200,
            message: "Data in Found",
            data: allData,
          });
  };