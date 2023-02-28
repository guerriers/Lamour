import React, { Fragment, useState, useEffect } from "react";
import "../css/service_charge.css";
import { Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const Service_charge = ({ history, match }) => {
  const getUsername = localStorage.getItem("username");
  const username = JSON.parse(getUsername);

  const [formValues, setFormValues] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      })
        .then((res) => res.json())
        .then((data) => {
if(data){
  setFormValues(data.data[0]);
  setHasLoaded(true);
}
        })
        .catch((err) => {
          console.log(err);
        });
    };
   if(username){
    fetchData();
   }
  }, [username]);
  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          <div>
            <div className="head_viewdata">
              <h1>คุณ {formValues.firstname + "  " + formValues.lastname}</h1>
            </div>
            <Container className="wrapper_service_charge">
              <div className="head_service_charge">
                <h3 className="">
                  ค่าบริการประจำเดือน{" "}
                  {moment(formValues.bill.createdAt)
                    // .add(30, "day")
                    .format("MM / YYYY")}{" "}
                  <Badge className="Badge" pill bg={formValues.bill.status === "0" ? 'danger' : formValues.bill.status === "1" ? 'warning' : 'success'}>
                    {formValues.bill.status === "0" ? 'รอการชำระ' : formValues.bill.status === "1" ? 'รอการตรวจสอบ' : 'ชำระแล้ว'}</Badge>
                </h3>
              </div>
              <div>
                <div className="wrapper_service">
                  <p>ค่าไฟฟ้า</p>
                  <p>{formValues.bill.electricity_bill} บาท</p>
                </div>
                <div className="wrapper_service">
                  <p>ค่าน้ำ</p>
                  <p>{formValues.bill.water_bill} บาท</p>
                </div>
                <div className="wrapper_service">
                  <p>ค่าส่วนกลาง</p>
                  <p>{formValues.bill.common_fee} บาท</p>
                </div>
                <div className="wrapper_service">
                  <p>รวม</p>
                  <p>{formValues.bill.total_bill} บาท</p>
                </div>
              </div>
              <div className="warpper_button">
                <Link to={`/service_bill/pay/${formValues.bill.id}`}>
                  <button className="viewdata_submit">ชำระค่าบริการ</button>
                </Link>
              </div>
            </Container>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>ไม่มียอดค้างชำระ...</p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Service_charge;
