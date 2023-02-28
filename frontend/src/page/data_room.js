import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import "../css/data_room.css";

const Data_room = ({ match }) => {
  const history = useHistory();
  const [roomDetail, setRoomDetail] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/room/${match.params.id}`
        );
        const data = await response.json();
        if(data.data){
          setRoomDetail(data.data);
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
              <h1>ข้อมูลห้องพัก</h1>
            </div>
            <div className="wrapper_viewdataroom">
              <div>
                <Form.Label>เลขห้อง</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เลขห้อง"
                  value={roomDetail.room_id ?? ""}
                  disabled
                />
              </div>
              <div>
                <Form.Label>ชั้น</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชั้น"
                  value={roomDetail.floor ?? ""}
                  disabled
                />
              </div>
              <div>
                <Form.Label>ขนาดห้อง</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ขนาดห้อง"
                  value={roomDetail.size ?? ""}
                  disabled
                />
              </div>
              <div>
                <Form.Label>ทิศทางของห้อง</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ทิศทางของห้อง"
                  value={roomDetail.direction ?? ""}
                  disabled
                />
              </div>
              <div>
                <Form.Label>ราคาห้องพัก</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ราคาห้องพัก"
                  value={roomDetail.price ?? ""}
                  disabled
                />
              </div>
              <div>
                <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="รายละเอียดเพิ่มเติม"
                  value={roomDetail.detail ?? ""}
                  disabled
                />
              </div>
              <div className="check">
                <Form.Check
                  checked={roomDetail.status === "1"}
                  inline
                  label="ว่าง"
                  name="status_room"
                  type="radio"
                  id="1"
                  disabled
                />
                <Form.Check
                  checked={roomDetail.status === "0"}
                  inline
                  label="จองแล้ว"
                  name="status_room"
                  type="radio"
                  id="1"
                  disabled
                />
              </div>
              <div></div>
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
        <Fragment>Loading...</Fragment>
      )}
    </Fragment>
  );
};

export default Data_room;
