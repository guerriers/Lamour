import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import moment from "moment";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf",
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};
async function printResident(data) {
  var bodyHeader = [
    { text: "ขนาดห้อง", style: "tableHeader" },
    { text: "ห้องพัก", style: "tableHeader" },
    { text: "ชั้น", style: "tableHeader" },
    { text: "ชื่อ - นามสกุล", style: "tableHeader" },
    { text: "เบอร์โทร", style: "tableHeader" },
    { text: "ตำแหน่ง", style: "tableHeader" },
    { text: "วันที่เข้า", style: "tableHeader" },
    // { text: "วันที่ออก", style: "tableHeader" },
    { text: "ทะเบียนรถ", style: "tableHeader" },
  ];

  var oneData = [];
  var dataAll = [];
  //     const {id,room_id,floor,size,direction}= data[0];
  if (data.length === 0) {
    oneData.push("-", "-", "-", "-", "-", "-", "-", "-", "-");
  }

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var header = data[key];
      var row = new Array();
      row.push({ text: header.size, style: "tableItem" });
      row.push({ text: header.room_id, style: "tableItem" });
      row.push({ text: header.floor, style: "tableItem" });
      row.push({
        text: header.firstname + " " + header.lastname,
        style: "tableItem",
      });
      row.push({ text: header.phone, style: "tableItem" });
      row.push({ text: header.direction, style: "tableItem" });
      row.push({ text: header.date, style: "tableItem" });
      // row.push({
      //   text: header.date_out ? header.date_out : "-",
      //   style: "tableItem",
      // });
      row.push({ text: header.car_registration, style: "tableItem" });
      dataAll.push(row);
    }
  }

  dataAll.unshift(bodyHeader);

  var docDefinition = {
    content: [
      { text: "Lamour Condo", margin: [0, 2, 10, 20] },
      { text: "รายงานผู้พักอาศัย", style: "header" },
      {
        text: `วันที่พิมพ์ ${moment(Date.now()).format("DD/MM/YYYY")}`,
        style: "subheader",
      },
      {
        style: "tableExample",
        table: {
          height: [40],
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          body: dataAll,
        },
      },
    ],

    defaultStyle: {
      font: "THSarabunNew",
    },
    styles: {
      tableHeader: {
        alignment: "center",
      },
      tableItem: {
        alignment: "center",
      },
      header: {
        fontSize: 20,
        // bold: true,
        alignment: "center",
        margin: [5, 2, 10, 5],
        // font: 'Roboto-Regular'
      },
      subheader: {
        fontSize: 14,
        alignment: "center",
        margin: [5, 2, 10, 15],
      },
    },
  };

  pdfMake.createPdf(docDefinition).open();
}

async function printMonth(data, month) {

  var bodyHeader = [
    { text: "เดือน", style: "tableHeader" },
    { text: "ค่าไฟฟ้า", style: "tableHeader" },
    { text: "ค่าน้ำ", style: "tableHeader" },
    { text: "ค่าส่วนกลาง", style: "tableHeader" },
    { text: "รวม", style: "tableHeader" },
  ];

  var finalData = [];
  var oneData = [];
  const dataAll = [];

  //     const {id,room_id,floor,size,direction}= data[0];
  if (data.length === 0) {
    oneData.push("-", "-", "-", "-", "-");
  }
  const dataCopy = [...data];
  Object.freeze(dataCopy);
  const dataBody = [...dataCopy];

  const returnedTarget = await Object.assign(dataAll, data);
  finalData.push((dataBody[0] = month ? month : ''));
  finalData.push(
    (dataBody[1] = await returnedTarget[1][month ? month : ''])
  );
  finalData.push(
    (dataBody[2] = await returnedTarget[0][month ? month : ''])
  );
  finalData.push(
    (dataBody[3] = await returnedTarget[2][month ? month : ''])
  );
  finalData.push(
    (dataBody[4] = await returnedTarget[3][month ? month : ''])
  );


  var docDefinition = {
    content: [
      { text: "Lamour Condo", margin: [0, 2, 10, 20] },
      { text: "รายงานการชำระค่าบริการรายเดือน", style: "header" },
      {
        text: `วันที่พิมพ์ ${moment(Date.now()).format("DD/MM/YYYY")}`,
        style: "subheader",
      },
      {
        style: "tableExample",
        table: {
          height: [40],
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*"],
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          body: [bodyHeader, finalData],
        },
      },
    ],

    defaultStyle: {
      font: "THSarabunNew",
    },
    styles: {
      tableHeader: {
        alignment: "center",
      },
      tableItem: {
        alignment: "center",
      },
      header: {
        fontSize: 20,
        // bold: true,
        alignment: "center",
        margin: [5, 2, 10, 5],
        // font: 'Roboto-Regular'
      },
      subheader: {
        fontSize: 14,
        alignment: "center",
        margin: [5, 2, 10, 15],
      },
    },
  };

  pdfMake.createPdf(docDefinition).open();
}

async function printYear(data, year) {

  var bodyHeader = [
    { text: "ปี", style: "tableHeader" },
    { text: "ค่าไฟฟ้า", style: "tableHeader" },
    { text: "ค่าน้ำ", style: "tableHeader" },
    { text: "ค่าส่วนกลาง", style: "tableHeader" },
    { text: "รวม", style: "tableHeader" },
  ];

  var finalData = [];
  var oneData = [];
  const dataAll = [];

  //     const {id,room_id,floor,size,direction}= data[0];
  if (data.length === 0) {
    oneData.push("-", "-", "-", "-", "-");
  }
  const dataCopy = [...data];
  Object.freeze(dataCopy);
  const dataBody = [...dataCopy];

  const returnedTarget = await Object.assign(dataAll, data);

  finalData.push((dataBody[0] = year ? year : ''));
  finalData.push(
    (dataBody[1] = await returnedTarget[1][year ? year : ''])
  );
  finalData.push(
    (dataBody[2] = await returnedTarget[0][year ? year : ''])
  );
  finalData.push(
    (dataBody[3] = await returnedTarget[2][year ? year : ''])
  );
  finalData.push(
    (dataBody[4] = await returnedTarget[3][year ? year : ''])
  );


  var docDefinition = {
    content: [
      { text: "Lamour Condo", margin: [0, 2, 10, 20] },
      { text: "รายงานการชำระค่าบริการรายปี", style: "header" },
      {
        text: `วันที่พิมพ์ ${moment(Date.now()).format("DD/MM/YYYY")}`,
        style: "subheader",
      },
      {
        style: "tableExample",
        table: {
          height: [40],
          headerRows: 1,
          widths: ["*", "*", "*", "*", "*"],
          // dontBreakRows: true,
          // keepWithHeaderRows: 1,
          body: [bodyHeader, finalData],
        },
      },
    ],

    defaultStyle: {
      font: "THSarabunNew",
    },
    styles: {
      tableHeader: {
        alignment: "center",
      },
      tableItem: {
        alignment: "center",
      },
      header: {
        fontSize: 20,
        // bold: true,
        alignment: "center",
        margin: [5, 2, 10, 5],
        // font: 'Roboto-Regular'
      },
      subheader: {
        fontSize: 14,
        alignment: "center",
        margin: [5, 2, 10, 15],
      },
    },
  };

  pdfMake.createPdf(docDefinition).open();
}

export { printResident, printMonth, printYear };
