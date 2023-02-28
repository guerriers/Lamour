import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../css/data_room.css";

const Room_edit = ({ match, history }) => {
  const initialValuesEdit = {
    room_id: "",
    floor: 0.0,
    size: "",
    direction: "",
    price: "",
    detail: "",
    status: null,
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [roomEdit, setRoomEdit] = useState(initialValuesEdit);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomEdit({ ...roomEdit, [name]: value });
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
        `${process.env.REACT_APP_BASE_URL}/api/room/${roomEdit.room_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomEdit),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("แก้ไขห้องพักสำเร็จ");
            setIsSubmit(true);
            history.push("/manageroom");
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
          `${process.env.REACT_APP_BASE_URL}/api/room/${match.params.id}`
        );
        const data = await response.json();
        if (data.data) {
          setRoomEdit(data.data);
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
              <h1>แก้ไขทะเบียนห้องพัก</h1>
            </div>
            <Form
              className="wrapper_viewdataroom"
              noValidate
              validated={validated}
              onSubmit={onSubmit}
            >
              <div>
                <Form.Label>เลขห้อง</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="เลขห้อง"
                  value={roomEdit.room_id}
                  name="room_id"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div>
                <Form.Label>
                  ชั้น<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Select
                  value={roomEdit.floor}
                  name="floor"
                  onChange={handleChange}
                  required
                >
                  <option value={''}>เลือกชั้น</option>
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
                  value={roomEdit.size}
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
                  value={roomEdit.direction}
                  onChange={handleChange}
                  required
                >
                  <option value={''}>เลือกทิศทางของห้อง</option>
                  <option value="ทิศเหนือ">ทิศเหนือ</option>
                  <option value="ทิศใต้">ทิศใต้</option>
                  <option value="ทิศตะวันออก">ทิศตะวันออก</option>
                  <option value="ทิศตะวันตก">ทิศตะวันตก</option>
                </Form.Select>
              </div>
              <div>
                <Form.Label>
                  ราคาห้องพัก<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ราคาห้องพัก"
                  value={roomEdit.price}
                  name="price"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="รายละเอียดเพิ่มเติม"
                  value={roomEdit.detail}
                  name="detail"
                  onChange={handleChange}
                />
              </div>
              <div className="check">
                <div>
                  สถานะ<span style={{ color: "red" }}> *</span>
                </div>
                <Form.Check
                  inline
                  label="ว่าง"
                  name="status"
                  type="radio"
                  checked={roomEdit.status === "1"}
                  onChange={handleChange}
                  value={roomEdit.status === "1" ? "0" : "1"}
                />
                <Form.Check
                  inline
                  label="จองแล้ว"
                  name="status"
                  type="radio"
                  checked={roomEdit.status === "0"}
                  onChange={handleChange}
                  value={roomEdit.status === "0" ? "1" : "0"}
                />
              </div>
              <div></div>
              <div className="warpper_button">
                <button className="viewdata_submit">แก้ไขห้องพัก</button>
              </div>
            </Form>
          </div>
        </Fragment>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Fragment>
  );
};

export default Room_edit;
