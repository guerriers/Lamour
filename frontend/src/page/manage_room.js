import "../css/service.css";
import "../css/manage_user.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Badge } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import FilterComponent from "../component/FilterComponent";
const Manage_room = ({ history }) => {
  const [tableRoom, setTableRoom] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/room`
        );
        const data = await response.json();
        setTableRoom(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/room/${id}`, {
        method: "DELETE",
      });
      alert("ลบทะเบียนห้องพักสำเร็จ");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };
  const columns = [
    {
      id:'id',
      name: "ลำดับ",
      selector: (row,index) => index+1,
      width: "10%",
      center: true,
    },
    {
      id:'room_id',
      name: "เลขห้อง",
      selector: (row) => row.room_id,
      width: "15%",
      sortable:true,
      center: true,
    },
    {
      id:'floor',
      name: "ชั้น",
      selector: (row) => row.floor,
      width: "10%",
      center: true,
    },
    {
      id:'size',
      name: "ขนาดห้องพัก",
      selector: (row) => row.size,
      center: true,
    },
    {
      id:'direction',
      name: "ทิศของห้อง",
      selector: (row) => row.direction,
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
            <Badge
              className="Badge"
              pill
              bg={row.status === "1" ? "success" : "danger"}
            >
              {row.status === "1" ? "ว่าง" : "จองแล้ว"}
            </Badge>
          </div>
        );
      },
    },
    {
      id:'detail',
      name: "รายละเอียด",
      selector: (row) => row.detail,
      width: "15%",
      center: true,
      cell: (row) => {
        return (
          <div className="tbu_actions">
            <Link to={`/manageroom/room_data/${row.room_id}`}>
              <Badge className="Badge" pill bg='dark'
              >รายละเอียด</Badge>
            </Link>
          </div>
        );
      },
    },
    {
      id:'actions',
      name: "actions",
      selector: (row) => row.actions,
      width: "10%",
      center: true,
      cell: (row) => {
        return (
          <div className="tbu_actions">
            <Link to={`/manageroom/room_edit/${row.room_id}`}>
              <FaPencilAlt
                style={{ color: "#005BFF" }}
                onClick={() => console.log(row.room_id)}
              />
            </Link>
            <div style={{ cursor: "pointer" }}>
              <FaTrashAlt
                style={{ color: "#FF0000" }}
                onClick={() => deleteHandler(row.room_id)}
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
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = tableRoom.filter(
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
        <Link to="/manageroom/room_add">
          <button className="add_user">
            <FaPlus />
            เพิ่มทะเบียนห้องพัก
          </button>
        </Link>
      </div>
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <div>
      <div className="head_viewdata">
        <h1>จัดการทะเบียนห้องพัก</h1>
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

export default Manage_room;
