import { Fragment, useState, useEffect } from "react";
import "../css/service_charge.css";
import { Container, Form } from "react-bootstrap";
import axios from "axios";

const initialValues = {
  selectedFile: null,
  error: null
}
const Service_pay = ({ match, history }) => {
  const getUsername = localStorage.getItem("username");
  const username = JSON.parse(getUsername);
  const [payValues, setPayValues] = useState(initialValues);
  const [getPaymentValues, setGetPaymentValues] = useState([]);
  // const [formErrors, setFormErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [validated, setValidated] = useState(false);


  const uploadHandler = async (val) => {
    let value = val.target.files[0];
    if (isSelected) { }

    if (value.size > 20000000) {
      return (setPayValues({ selectedFile: null, error: "exceed" },
        setIsSelected(false),
        alert("ไฟล์มีขนาดเกิน 20 MB")
      )
      )
    }
    if (!value.type.startsWith("image")) {
      return (setPayValues({ selectedFile: null, error: "none_image" }),
        setIsSelected(false),
        alert("กรุณาเลือกไฟล์รูปภาพ"))
    }

    return (setPayValues({ selectedFile: value, error: null }),
      setIsSelected(true))
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then((data) => {
          setGetPaymentValues(data.data[0]);
          setPayValues(data.data[0]);
          setHasLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if(username){
      fetchData();
    }

  }, [username]);

  const onSubmit = async (roomData) => {

    const form = roomData.currentTarget;
    roomData.preventDefault();
    roomData.stopPropagation();
    if (form.checkValidity() === false) {
      alert('กรุณาแนบรูปภาพ')
      roomData.preventDefault();
      roomData.stopPropagation();
    }

    setValidated(true);
    const fd = new FormData();
    fd.append("files", payValues.selectedFile);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/payment/${match.params.id}`,
        fd
      )
      .then((res) => {
        alert("ชำระค่าบริการสำเร็จ รอตรวจสอบ")
        history.push("/service_bill");
      });
  };

  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          <div>
            <div className="head_viewdata">
              <h1>ชำระค่าบริการ</h1>
            </div>
            <Form onSubmit={onSubmit}
              noValidate
              validated={validated}>
              <Container className="wrapper_service_pay">
                <div className="wrapper_data" style={{ padding: "50px 12px" }}>
                  <div className="wrapper_service">
                    <p>หมายเลขห้องพัก</p>
                    <p>{getPaymentValues.bill.room_id}</p>
                  </div>
                  <div className="wrapper_service">
                    <p>ชื่อผู้เข้าพัก</p>
                    <p>
                      {getPaymentValues.firstname + "  " + getPaymentValues.lastname}
                    </p>
                  </div>
                  <div className="wrapper_service">
                    <p>รวม</p>
                    <p>{getPaymentValues.bill.total_bill} บาท</p>
                  </div>
                </div>
                <div className="box_bottom">
                  <div className="wrapper_data account_number">
                    <img
                      className="img_logo"
                      src={"/assets/img/logo_bank.png"}
                      alt="logo"
                    />
                    <p>3154421152 นิติบุคคลคอนโดลามูร์ </p>
                  </div>
                  <div className="warpper_button box_upload">
                    <p>{payValues.selectedFile && payValues.selectedFile.name}</p>
                    <Form.Label
                      className="viewdata_submit sub_img"
                      htmlFor="file-upload"
                    >
                      แนบรูปภาพ
                    </Form.Label>

                    <Form.Control
                      id="file-upload"
                      name="img_payment"
                      type="file"
                      style={{ display: "none" }}
                      onChange={uploadHandler}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
                <div className="warpper_button">
                  <button className="viewdata_submit">ยืนยันการชำระค่าบริการ</button>
                </div>
              </Container>
            </Form>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Loading....</p>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Service_pay;
