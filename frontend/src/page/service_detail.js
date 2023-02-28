import React, { Fragment, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import "../css/service_detail.css";
import moment from 'moment'

const Service_detail = ({ match, history }) => {
  const initialValuesEdit = {
    bill: {
      status: ''
    }
  };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [serviceEdit, setServiceEdit] = useState(initialValuesEdit);
  const [serviceDetail, setServiceDetail] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceEdit({ ...serviceEdit, [name]: value });
  };
  const validate = (values) => {
    const errors = {};

    return errors;
  }
  const onSubmit = async (roomData) => {
    roomData.preventDefault();
    setFormErrors(validate(serviceEdit));
    setIsSubmit(true);

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/service/${match.params.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceEdit),
    }).then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 201) {
          alert("ปรับสถานะการชำระค่าบริการแล้ว");
          history.push("/service");
        }
        if (res.statusCode === 401) {
          console.log(res.message)
        }

      })
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/service/${match.params.id}`);
        const data = await response.json();
        if (data) {
          setServiceDetail(data.data[0]);
          setServiceEdit(data.data[0].bill)
          setHasLoaded(true);
        }
      } catch (error) {
        alert(error)
      }
    };
    fetchData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(serviceEdit.bill);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          <div>
            <div className="head_viewdata">
              <h1>ตรวจสอบการชำระค่าบริการ</h1>
            </div>
            <Form onSubmit={onSubmit}>
              <Container className="wrapper_service_detail">
                <div className="img_service">
                  <img
                    className="img_logo"
                    src={
                      serviceDetail.payment_img.proof_of_payment ?
                        `http://localhost:3001/payment_img/${serviceDetail.payment_img.proof_of_payment}` :
                        "/assets/img/noimage.png"
                    }
                    alt="logo"
                  />
                  <div className="detail_img">
                    <p>วันที่ : {moment(serviceDetail.payment_img.createdAt).format('DD / MM / YYYY')}</p>
                    <p>ห้อง : {serviceDetail.bill.room_id}</p>
                  </div>
                </div>
                <div className="wrapper_service_charge">
                  <div className="wrapper_boxdata">
                    <div className="head_boxdata">
                      <h3>ชำระค่าบริการ : เดือนพฤษภาคม</h3>
                    </div>
                    <div className="wrapper_data">
                      <div className="wrapper_servicedetail">
                        <p>ค่าไฟฟ้า</p>
                        <p>{serviceDetail.bill.electricity_bill} บาท</p>
                      </div>
                      <div className="wrapper_servicedetail">
                        <p>ค่าน้ำ</p>
                        <p>{serviceDetail.bill.water_bill} บาท</p>
                      </div>
                      <div className="wrapper_servicedetail">
                        <p>ค่าส่วนกลาง</p>
                        <p>{serviceDetail.bill.common_fee} บาท</p>
                      </div>
                      <div className="wrapper_servicedetail">
                        <p>รวม</p>
                        <p>{serviceDetail.bill.total_bill} บาท</p>
                      </div>

                      <div className="servicedetail_check">
                        <Form.Check
                          inline
                          label="รอการชำระ"
                          name="status"
                          type="radio"
                          checked={serviceEdit.status === "0"}
                          onChange={handleChange}
                          value="0"
                        />
                        <Form.Check
                          inline
                          label="รอการตรวจสอบ"
                          name="status"
                          type="radio"
                          checked={serviceEdit.status === "1"}
                          onChange={handleChange}
                          value="1"
                        />
                        <Form.Check
                          inline
                          label="ชำระแล้ว"
                          name="status"
                          type="radio"
                          checked={serviceEdit.status === "2"}
                          onChange={handleChange}
                          value="2"
                        />
                      </div>
                    </div>
                    <div className="servicedetail_btn">
                      <button className="button_submit " type="submit">
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </div>
              </Container>
            </Form>
          </div>

        </Fragment>
      ) : (<Fragment>
        <p>Loading....</p>
      </Fragment>)}
    </Fragment>
  );



};

export default Service_detail;
