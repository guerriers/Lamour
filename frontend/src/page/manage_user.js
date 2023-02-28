import "../css/service.css";
import "../css/manage_user.css";

import React, { useMemo,useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';
import DataTable from "react-data-table-component";
import { Badge } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt,FaPlus } from "react-icons/fa";
import FilterComponent from "../component/FilterComponent";
import { Link } from "react-router-dom";
const Manage_user = () => {

  const [tableUser, setTableUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user`);
        const data = await response.json();
        setTableUser(data.data);
      } catch (error) {
        console.log(error)     
      }
    };
    fetchData();
  }, []);
  const deleteHandler = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`, {
        method: "DELETE",
      });
        alert("ลบข้อมูลผู้ใช้สำเร็จ");
        window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };
  const columns = [
    {
      name: "ลำดับ",
      selector: (row,index) => index+1,
      width: "10%",
      center: true
    },
    {
      id:'room_id',
      name: "เลขห้อง",
      selector: (row) => row.room_id,
      width: "10%",
      center: true,
      sortable:true,
    },
    {
      name: "ชื่อ",
      selector: (row) => row.firstname,
      center: true
    },
    {
      name: "นามสกุล",
      selector: (row) => row.lastname,
      center: true
    },
    {
      name: "วันที่เข้าพัก",
      selector: (row) => moment(row.date).format('DD/MM/YYYY'),
      width: "15%",
      center: true,
    },
    {
      name: "รายละเอียด",
      selector: (row) => row.detail,
      width: "15%",
      center: true,
      cell: (row) => {
        return (
          <div className="tbu_actions">
            <Link to={`/manageuser/user_data/${row.id}`}>
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
            <Link to={`/manageuser/user_edit/${row.id}`}>
            <FaPencilAlt
              style={{ color: "#005BFF" }}
              onClick={() => console.log(row.id)}
            />
            </Link>
            <div style={{cursor:"pointer"}}>
            <FaTrashAlt
              style={{ color: "#FF0000" }}
              onClick={()=>deleteHandler(row.id)}
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

  const filteredItems = tableUser.filter(
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
      <Link to="/manageuser/user_add"><button className="add_user"><FaPlus/>เพิ่มบัญชีผู้ใช้</button></Link>
      </div>
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div>
      <div className="head_viewdata">
        <h1>จัดการบัญชีผู้ใช้</h1>
      </div>
      <div className="wrapper_table">
        <DataTable
          columns={columns}
          data={filteredItems}
          defaultSortFieldId="room_id"
          striped
          pagination
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      </div>
    </div>
  );
};

export default Manage_user;
