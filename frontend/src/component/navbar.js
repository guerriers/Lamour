import React, { Fragment, useState,useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import "../css/component/navbar.css";
import { FaSignOutAlt } from "react-icons/fa";
import auth from "./route/auth";

const Navbar_component = () => {
  const getUsername = localStorage.getItem("username");
  const getStatus = localStorage.getItem("status");
  const username = JSON.parse(getUsername);
  const status = JSON.parse(getStatus);
  const [hasLoaded, setHasLoaded] = useState(false);
  const logoutHandler = async () => {
    localStorage.removeItem("username");
    localStorage.removeItem("status");
    window.location.reload();
  };
  useEffect(() => {
if(!username&&status){
    setHasLoaded(false);
  }
  setHasLoaded(true);	

  }, [username,status]);

  return (
    <Fragment>
      {hasLoaded ? (
        <Fragment>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Nav.Link
                as={Link}
                to={status === "1" ? "/home" : "/service_bill"}
              >
                <Navbar.Brand>ระบบจัดการคอนโดมิเนียม</Navbar.Brand>
              </Nav.Link>

              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                ></Nav>
                {status === "1" ? (
                  <>
                    <LinkContainer to="/home">
                      <Nav.Link>หน้าแรก</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/manageroom">
                      <Nav.Link>จัดการทะเบียนห้องพัก</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/manageuser">
                      <Nav.Link>จัดการบัญชีผู้ใช้</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/service">
                      <Nav.Link>บันทึกการใช้บริการ</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/report">
                      <Nav.Link>จัดพิมพ์รายงาน</Nav.Link>
                    </LinkContainer>
                  </>
                ) : null}

                <div className="acc" onClick={logoutHandler}>
                  {" "}
                  {username}{" "}
                  <FaSignOutAlt
                    style={{ color: "#F7951F", cursor: "pointer" }}
                  />
                </div>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Fragment>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Fragment>
  );
};

export default Navbar_component;
