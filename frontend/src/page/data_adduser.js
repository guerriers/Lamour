import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/data_room.css";

const User_add = ({ history, location }) => {
  const initialValues = {
    room_id: "",
    floor: "",
    size: "",
    direction: "",
    firstname: "",
    lastname: "",
    phone: "",
    car_registration: "",
    username: "",
    password: "",
    date: "",
  };
  const redirect = location.search
    ? location.search.split("=")[1]
    : "/manageuser";
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleReset = () => {
    setIsSubmit(false);
    // history.push("/manageuser");
    // window.location.href("/manageuser");
    history.push("/manageuser");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const onSubmit = async (roomData) => {
    const form = roomData.currentTarget;
    roomData.preventDefault();
    roomData.stopPropagation();
    if (form.checkValidity() === false) {
      roomData.preventDefault();
      roomData.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity()) {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("เพิ่มข้อมูลผู้ใช้สำเร็จ");
            setIsSubmit(true);
            handleReset();
          }
          if (res.statusCode === 401) {
            alert(res.message);
            setIsSubmit(false);
          }
        });
    }
  };

  useEffect(() => { });
  return (
    <div>
      <div className="head_viewdata">
        <h1>เพิ่มบัญชีผู้ใช้</h1>
      </div>
      <Form
        className="wrapper_viewdataroom"
        noValidate
        validated={validated}
        onSubmit={onSubmit}
      >
        <Form.Group>
          <Form.Label>เลขห้อง<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="เลขห้อง"
            name="room_id"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกเลขห้อง
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>ชั้น<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Select name="floor" onChange={handleChange} required>
            <option value={""}>เลือกชั้น</option>
            <option value="ชั้น 1">ชั้น 1</option>
            <option value="ชั้น 2">ชั้น 2</option>
            <option value="ชั้น 3">ชั้น 3</option>
            <option value="ชั้น 4">ชั้น 4</option>
            <option value="ชั้น 5">ชั้น 5</option>
            <option value="ชั้น 6">ชั้น 6</option>
            <option value="ชั้น 7">ชั้น 7</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            กรุณาเลือกชั้น
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>ขนาดห้อง<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Select
            type="number"
            name="size"
            onChange={handleChange}
            required
          >
            <option value={""}>เลือกขนาดห้อง</option>
            <option value="29.5 ตร.ม.">29.5 ตร.ม.</option>
            <option value="30.5 ตร.ม.">30.5 ตร.ม.</option>
            <option value="33.5 ตร.ม.">33.5 ตร.ม. </option>
            <option value="36.5 ตร.ม.">36.5 ตร.ม.</option>
            <option value="38 ตร.ม.">38 ตร.ม.</option>
            <option value="42 ตร.ม.">42 ตร.ม.</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            กรุณาเลือกขนาดห้อง
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>ทิศทางของห้อง<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Select
            type="text"
            name="direction"
            onChange={handleChange}
            required
          >
            <option value={""}>เลือกทิศทางของห้อง</option>
            <option value="ทิศเหนือ">ทิศเหนือ</option>
            <option value="ทิศใต้">ทิศใต้</option>
            <option value="ทิศตะวันออก">ทิศตะวันออก</option>
            <option value="ทิศตะวันตก">ทิศตะวันตก</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            กรุณาเลือกทิศทางห้อง
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>ชื่อ<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="ชื่อ"
            name="firstname"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกชื่อ
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>นามสกุล<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="นามสกุล"
            name="lastname"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกนามสกุล
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>เบอร์โทร<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="number"
            className="no-arrow"
            placeholder="เบอร์โทร"
            name="phone"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกเบอร์โทร
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>ทะเบียนรถ</Form.Label>
          <Form.Control
            // required
            type="text"
            placeholder="ทะเบียนรถ"
            name="car_registration"
            onChange={handleChange}
          />
          {/* <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group>
          <Form.Label>วันที่เข้าพัก<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="date"
            placeholder="วันที่เข้าพัก"
            name="date"
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณาเลือกวันที่เข้าพัก
          </Form.Control.Feedback>
        </Form.Group>

        <div className="warpper_button">
          <button className="viewdata_submit" type="submit">
            เพิ่มบัญชี
          </button>
        </div>
      </Form>
    </div>
  );
};

export default User_add;
