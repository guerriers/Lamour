import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/data_room.css";

const User_edit = ({ match, history }) => {
  const initialValuesEdit = {
    room_id: "",
    floor: "",
    size: 0.0,
    direction: "",
    firstname: "",
    lastname: "",
    phone: "",
    car_registration: "",
    username: "",
    password: "",
    date: null,
    date_out: null,
  };
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userEdit, setUserEdit] = useState(initialValuesEdit);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEdit({ ...userEdit, [name]: value });
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
      await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/user/${match.params.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userEdit),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("แก้ไขข้อมูลผู้ใช้สำเร็จ");
            setIsSubmit(true);
            history.push("/manageuser");
          }
          if (res.statusCode === 401) {
            alert(res.message);
          }
        });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/user/${match.params.id}`
        );
        const data = await response.json();
        if(data.data){
          setUserEdit(data.data);
          setHasLoaded(true);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          <div>
            <div className="head_viewdata">
              <h1>แก้ไขบัญชีผู้พักอาศัย</h1>
            </div>
            <Form
              className="wrapper_viewdataroom"
              noValidate
              validated={validated}
              onSubmit={onSubmit}
            >
              <div>
                <Form.Label>
                  เลขห้อง<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="เลขห้อง"
                  value={userEdit.room_id}
                  name="room_id"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Form.Label>
                  ชั้น<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Select
                  value={userEdit.floor}
                  name="floor"
                  onChange={handleChange}
                  required
                >
                  <option value={""}>เลือกชั้น</option>
                  <option value="ชั้น 1">ชั้น 1</option>
                  <option value="ชั้น 2">ชั้น 2</option>
                  <option value="ชั้น 3">ชั้น 3</option>
                  <option value="ชั้น 4">ชั้น 4</option>
                  <option value="ชั้น 5">ชั้น 5</option>
                  <option value="ชั้น 6">ชั้น 6</option>
                  <option value="ชั้น 7">ชั้น 7</option>
                </Form.Select>
              </div>
              <div>
                <Form.Label>
                  ขนาดห้อง<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Select
                  type="text"
                  name="size"
                  value={userEdit.size}
                  onChange={handleChange}
                  required
                >
                  <option value={''}>เลือกขนาดห้อง</option>
                  <option value="29.5 ตร.ม.">29.5 ตร.ม.</option>
                  <option value="30.5 ตร.ม.">30.5 ตร.ม.</option>
                  <option value="33.5 ตร.ม.">33.5 ตร.ม. </option>
                  <option value="36.5 ตร.ม.">36.5 ตร.ม.</option>
                  <option value="38 ตร.ม.">38 ตร.ม.</option>
                  <option value="42 ตร.ม.">42 ตร.ม.</option>
                </Form.Select>
              </div>
              <div>
                <Form.Label>
                  ทิศทางของห้อง<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Select
                  type="text"
                  name="direction"
                  value={userEdit.direction}
                  onChange={handleChange}
                  required
                >
                  <option value={""}>เลือกทิศทางของห้อง</option>
                  <option value="ทิศเหนือ">ทิศเหนือ</option>
                  <option value="ทิศใต้">ทิศใต้</option>
                  <option value="ทิศตะวันออก">ทิศตะวันออก</option>
                  <option value="ทิศตะวันตก">ทิศตะวันตก</option>
                </Form.Select>
              </div>
              <div>
                <Form.Label>
                  ชื่อ<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อ"
                  value={userEdit.firstname}
                  name="firstname"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Form.Label>
                  นามสกุล<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="นามสกุล"
                  value={userEdit.lastname}
                  name="lastname"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Form.Label>
                  เบอร์โทร<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="เบอร์โทร"
                  value={userEdit.phone}
                  name="phone"
                  onChange={handleChange}
                  className="no-arrow"
                  required
                />
              </div>
              <div>
                <Form.Label>ทะเบียนรถ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ทะเบียนรถ"
                  value={userEdit.car_registration}
                  name="car_registration"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Form.Label>
                  ชื่อผู้ใช้<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  value={userEdit.username}
                  name="username"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                <Form.Label>
                  รหัสผ่าน<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="รหัสผ่าน"
                  value={userEdit.password}
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Form.Label>
                  วันที่เข้าพัก<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder="วันที่เข้าพัก"
                  value={userEdit.date}
                  name="date"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="warpper_button">
                <button className="viewdata_submit">แก้ไขบัญชี</button>
              </div>
            </Form>
          </div>
        </Fragment>
      ) : (
        <Fragment>Loading....</Fragment>
      )}
    </Fragment>
  );
};

export default User_edit;
