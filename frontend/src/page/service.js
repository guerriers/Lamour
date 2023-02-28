import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import "../css/service.css";
import "../css/manage_user.css";
import FilterComponent from "../component/FilterComponent";
import "bootstrap/dist/css/bootstrap.min.css";

import DataTable from "react-data-table-component";

import { FaTrashAlt } from "react-icons/fa";
import { Form } from "react-bootstrap";

const Service_room = () => {

  const addData = {
    room_id: "",
    electricity_bill: "",
    water_bill: "",
    common_fee: "",
    total_bill: "",
    status: "0",
  };
  const [serviceRoom, setServiceRoom] = useState([]);
  const [addService, setAddService] = useState(addData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/service`
        );
        const data = await response.json();
        setServiceRoom(data.data);
      } catch (error) {
        alert(error)
      }
    };
    fetchData();

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(setAddService);
    }
  }, [formErrors, isSubmit]);
  const handleReset = () => {
    setIsSubmit(false);
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddService({ ...addService, [name]: value });
  };
  const deleteHandler = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/service/${id}`, {
        method: "DELETE",
      });
      alert("Service Deleted Successfully");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
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
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addService),
      }).then((response) => response.json())
        .then((res) => {
          if (res.statusCode === 201) {
            alert("บันทึกข้อมูลค่าบริการสำเร็จ");
            setIsSubmit(true);
            handleReset();
          }
          if (res.statusCode === 401) {
            console.log()
            alert(res.message);
          }
          
        })
    };
  }

  const columns = [
    {
      name: "ลำดับ",
      selector: (row,index) => index+1,
      width: "10%",
      center: true,
    },
    {
      name: "เลขห้อง",
      selector: (row) => row.room_id,
      center: true,
      sortable:true,
      width: "10%",
    },
    {
      name: "ยอดเงิน",
      selector: (row) => row.total_bill,
      center: true,
    },
    {
      id:'status',
      name: "สถานะ",
      selector: (row) => row.status,
      width: "15%",
      center: true,
      sortable:true,
      cell: (row) => {
        return (
          <div className="tbu_actions">
            <div>
              <Badge className="Badge" pill bg={row.status === "0" ? 'danger' : row.status === "1" ? 'warning' : 'success'}
              >{row.status === "0" ? 'รอการชำระ' : row.status === "1" ? 'รอการตรวจสอบ' : 'ชำระแล้ว'}</Badge>
            </div>
          </div>
        );
      },
    },
    {
      name: "รายละเอียด",
      selector: (row) => row.detail,
      width: "15%",
      center: true,
      cell: (row) => {
        return (
          <div className="tbu_actions">
            <Link to={`/service/detail/${row.id}`}>
              <Badge className="Badge" pill bg='dark'
              >รายละเอียด</Badge>
            </Link>
          </div>
        );
      },
    },
    {
      name: "actions",
      selector: (row) => row.actions,
      width: "10%",
      center: true,
      cell: (row) => {
        return (
          <div className="tbu_actions">
            <div style={{ cursor: "pointer" }}>
              <FaTrashAlt
                style={{ color: "#FF0000" }}
                onClick={() => deleteHandler(row.id)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filterText, setFilterText] = React.useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const filteredItems = serviceRoom.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <div className="warpper_head">
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div>
      <div className="head_viewdata">
        <h1>บันทึกการใช้บริการ</h1>
      </div>
      <Form className="wrapper_viewdataroom" noValidate
        validated={validated} onSubmit={onSubmit}>
        <div>
          <Form.Label>เลขห้อง<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="เลขห้อง"
            name="room_id"
            value={serviceRoom.room_id}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกเลขห้อง
          </Form.Control.Feedback>
        </div>
        <div>
          <Form.Label>ค่าไฟฟ้า<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="ค่าไฟฟ้า"
            name="electricity_bill"
            value={serviceRoom.electricity_bill}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกค่าไฟฟ้า
          </Form.Control.Feedback>
        </div>
        <div>
          <Form.Label>ค่าน้ำ<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Control
            type="number"
            placeholder="ค่าน้ำ"
            name="water_bill"
            value={serviceRoom.water_bill}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            กรุณากรอกค่าน้ำ
          </Form.Control.Feedback>
        </div>
        <div>
          <Form.Label>ค่าส่วนกลาง<span style={{ color: "red" }}> *</span></Form.Label>
          <Form.Select type="number" name="common_fee" value={serviceRoom.common_fee} onChange={handleChange} required>
            <option value={''}>เลือกขนาดห้อง</option>
            <option value="1180">29.5 ตร.ม. : 1,180 บาท</option>
            <option value="1220">30.5 ตร.ม. : 1,220 บาท</option>
            <option value="1340">33.5 ตร.ม. : 1,340 บาท</option>
            <option value="1460">36.5 ตร.ม. : 1,460 บาท</option>
            <option value="1520">38 ตร.ม. : 1,520 บาท</option>
            <option value="1680">42 ตร.ม. : 1,680 บาท</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            เลือกค่าส่วนกลางตามขนาดห้อง
          </Form.Control.Feedback>
        </div>
        <div className="warpper_button">
          <button className="viewdata_submit">บันทึก</button>
        </div>
      </Form>
      <hr></hr>
      <div className="head_viewdata">
        <h1 className="head_fontservice">การชำระค่าบริการ</h1>
      </div>
      <div className="wrapper_table">
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortFieldId="status"
          striped
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      </div>
    </div>
  );
};

export default Service_room;
