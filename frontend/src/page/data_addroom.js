import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/data_room.css";

const Room_add = ({ history }) => {
  const initialValues = {
    room_id: "",
    floor: "",
    size: "",
    direction: "",
    price: "",
    detail: "",
    status: "1",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleReset = () => {
    setIsSubmit(false);
    history.push("/manageroom");
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
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("Room successfully Added");
            setIsSubmit(true);
            handleReset();
          }
          if (res.statusCode === 401) {
            alert(res.message);
          } 
        });
    }
  };

  useEffect(() => { });
  return (
    <div>
      <div className="head_viewdata">
        <h1>เพิ่มทะเบียนห้องพัก</h1>
      </div>
      <Form
        className="wrapper_viewdataroom"
        noValidate
        validated={validated}
        onSubmit={onSubmit}
      >
        <div>
          <Form.Label>เลขห้อง<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="เลขห้อง"
            name="room_id"
            required
            value={formValues.room_id}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกเลขห้อง
          </Form.Control.Feedback>
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <Form.Label>ราคาห้องพัก<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="ราคาห้องพัก"
            name="price"
            required
            value={formValues.price}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกราคาห้องพัก
          </Form.Control.Feedback>
        </div>
        <div>
          <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
          <Form.Control
            type="text"
            placeholder="รายละเอียดเพิ่มเติม"
            name="detail"
            value={formValues.detail}
            onChange={handleChange}
          />
          {/* <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback> */}
        </div>
        <div className="check">
          <div>สถานะ<span style={{ color: "red" }}> *</span></div>
          <Form.Check
            value="1"
            inline
            label="ว่าง"
            name="status"
            type="radio"
            onChange={handleChange}
            checked={formValues.status === "1"}
          />
          <Form.Check
            value="0"
            inline
            label="จองแล้ว"
            name="status"
            type="radio"
            onChange={handleChange}
            checked={formValues.status === "0"}
          />
        </div>
        <div></div>
        <div className="warpper_button">
          <button className="viewdata_submit">เพิ่มห้องพัก</button>
        </div>
      </Form>
    </div>
  );
};

export default Room_add;
