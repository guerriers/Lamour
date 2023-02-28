import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/data_room.css";

const Data_user = ({ match }) => {
  const history = useHistory();
  const [userDetail, setUserDetail] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/user/${match.params.id}`
        );
        const data = await response.json();
        if(data.data){
          setUserDetail(data.data);
          setHasLoaded(true);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, [history, match]);
  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          <div>
            <div className="head_viewdata">
              <h1>ข้อมูลผู้พักอาศัย</h1>
            </div>
            <div className="wrapper_viewdataroom">
              <div>
                <Form.Label>เลขห้อง</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="เลขห้อง"
                  value={userDetail.room_id}
                  name="room_id"
                  disabled
                />
              </div>
              <div>
                <Form.Label>ชั้น</Form.Label>
                <Form.Select value={userDetail.floor} name="floor" disabled>
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
                <Form.Label>ขนาดห้อง</Form.Label>
                <Form.Select
                  type="text"
                  name="size"
                  value={userDetail.size}
                  disabled
                >
                  <option value={""}>เลือกขนาดห้อง</option>
                  <option value="ทิศเหนือ">ทิศเหนือ</option>
                  <option value="ทิศใต้">ทิศใต้</option>
                  <option value="ทิศตะวันออก">ทิศตะวันออก</option>
                  <option value="ทิศตะวันตก">ทิศตะวันตก</option>
                </Form.Select>
              </div>
              <div>
                <Form.Label>ทิศทางของห้อง</Form.Label>
                <Form.Select
                  type="text"
                  name="direction"
                  value={userDetail.direction}
                  disabled
                >
                  <option value={""}>เลือกทิศทางของห้อง</option>
                  <option value="1">ทิศเหนือ</option>
                  <option value="2">ทิศใต้</option>
                  <option value="3">ทิศตะวันออก</option>
                  <option value="4">ทิศตะวันตก</option>
                </Form.Select>
              </div>
              <div>
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อ"
                  value={userDetail.firstname}
                  name="firstname"
                  disabled
                />
              </div>
              <div>
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="นามสกุล"
                  value={userDetail.lastname}
                  name="lastname"
                  disabled
                />
              </div>
              <div>
                <Form.Label>เบอร์โทร</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เบอร์โทร"
                  value={userDetail.phone}
                  name="phone"
                  disabled
                />
              </div>
              <div>
                <Form.Label>ทะเบียนรถ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ทะเบียนรถ"
                  value={userDetail.car_registration}
                  name="car_registration"
                  disabled
                />
              </div>
              <div>
                <Form.Label>ชื่อผู้ใช้</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อผู้ใช้"
                  value={userDetail.username}
                  name="username"
                  disabled
                />
              </div>
              <div>
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="รหัสผ่าน"
                  value={userDetail.password}
                  name="password"
                  disabled
                />
              </div>
              <div>
                <Form.Label>วันที่เข้าพัก</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="วันที่เข้าพัก"
                  value={userDetail.date}
                  name="date"
                  disabled
                />
              </div>

              <div className="warpper_button">
                <button
                  className="viewdata_submit"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  ย้อนกลับ
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>Loading....</Fragment>
      )}
    </Fragment>
  );
};

export default Data_user;
