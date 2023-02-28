import React, { Fragment, useState, useEffect } from "react";

import axios from "axios";

import { Form } from "react-bootstrap";
import { printResident, printMonth, printYear } from "../component/pdfFunc";

function Mon() {
  const [getResident, setGetResident] = useState([]);
  const [getMonth, setGetMonth] = useState([]);
  const [getYear, setGetYear] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedResident, setSelectedResident] = useState("");
  const testData = [
    ["May", "52110", "13000", "5000", "30000"],
    ["April", "52110", "13000", "5000", "30000"],
    ["April", "52110", "13000", "5000", "30000"],
  ];

  const printalert = () => {
    alert("กรุณาเลือกประเภท");
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  const years = [
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setUserEdit({ ...userEdit, [name]: value });
    
    if (value === "0") {
      setDataLoaded(true);
      setSelectedMenu("0");
    }
    if (value === "1") {
      setDataLoaded(false);
      const fetchData = async () => {
        await axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/report/month`)
          .then((res) => {
            setGetMonth(res.data.data);
            setDataLoaded(true);
          });
      };
      fetchData();
      setSelectedMenu("1");
    }
    if (value === "2") {
      setDataLoaded(false);
      const fetchData = async () => {
        await axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/report/year`)
          .then((res) => {
            setGetYear(res.data.data);
            setDataLoaded(true);
          });
      };
      fetchData();
      setSelectedMenu("2");
    }
    if (value === "3") {
      setDataLoaded(false);
      const fetchData = async () => {
        await axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/report/resident`)
          .then((res) => {
            setGetResident(res.data.data);
            setDataLoaded(true);
          });
      };
      fetchData();
      setSelectedMenu("3");
    }
  };

  const handleMonth = (e) => {
    const { name, value } = e.target;
    setSelectedMonth(value)
    // setUserEdit({ ...userEdit, [name]: value });
    setSelectedMonth(value)

  };

  const handleYear = (e) => {
    const { name, value } = e.target;
    setSelectedYear(value)
    // setUserEdit({ ...userEdit, [name]: value });
    setSelectedYear(value)
  };
  

  useEffect(() => {
    setHasLoaded(true);

    // eslint-disable-next-line
  }, [hasLoaded, dataLoaded]);
  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          {" "}
          <div>
            <div className="head_viewdata">
              <h1>จัดพิมพ์รายงาน</h1>
            </div>
            <div style={{ width: "300px", margin: "0px auto" }}>
              <div>
                <Form.Label>ประเภทรายงาน</Form.Label>
                <Form.Select onChange={handleChange}>
                  <option value="0">เลือกประเภท</option>
                  <option value="1">รายงานสรุปชำระค่าบริการรายเดือน</option>
                  <option value="2">รายงานสรุปชำระค่าบริการรายปี</option>
                  <option value="3">รายงานแสดงรายชื่อผู้พักอาศัย</option>
                </Form.Select>
              </div>
              <div style={{ margin: "20px 0px" }}>
                <Form.Label>เดือน</Form.Label>
                <Form.Select onChange={handleMonth} >
                  <option value="0">เลือกเดือน</option>
                  {dataLoaded &&months.map((month, key) => {
                      return(
                        <option value={month}key={key}>{month}</option>
                          )
                  })}
                </Form.Select>
              </div>

              <div style={{ margin: "20px 0px" }}>
                <Form.Label>ปี</Form.Label>
                <Form.Select onChange={handleYear} >
                  <option value="0">เลือกปี</option>
                  {years.map((year, key) => {
                      return(
                    <option value={year}key={key}>{year}</option>
                      )
                  })}
                </Form.Select>
              </div>
              <div className="warpper_button" style={{ margin: "20px 0px" }}>
                <button
                  className="viewdata_submit"
                  disabled={!dataLoaded}
                  onClick={() => {
                    if (selectedMenu === "0") {
                      printalert();
                    }
                    if (selectedMenu === "1") {
                      printMonth(getMonth,selectedMonth);
                    }
                    if (selectedMenu === "2") {
                      printYear(getYear,selectedYear);
                    }
                    if (selectedMenu === "3") {
                      printResident(getResident);
                    }
                  }}
                >
                  พิมพ์รายงาน
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Loading...</p>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Mon;
