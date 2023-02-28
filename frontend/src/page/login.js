import "../css/login.css";
import { Fragment,useState, useEffect } from "react";
import auth from "../component/route/auth";
import Loader from "../component/Loader";

const Loginpage = ({ history, location }) => {
  const initialValues = {
    username: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is Required";
    }
    if (!values.password) {
      errors.username = "Password is Required";
    }
    return errors;
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (!auth.isAuthenticated) {
      history.push(redirect);
    }
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
    // eslint-disable-next-line
  }, []);
  const onSubmit = async (roomData) => {
    roomData.preventDefault();
    setFormErrors(validate(formValues));
    setLoader(true);

    await fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.statusCode === 200) {

          alert("เข้าสู่ระบบสำเร็จ");
          if (res.data.status === "1") {
            localStorage.setItem("username", JSON.stringify(res.data.username));
            localStorage.setItem("status", res.data.status);
            setIsSubmit(true);
            auth.authenticated = true;
            auth.isAdmin = true;
            setLoader(false);
            // history.push("/home");
            // window.location.reload();
          } else {
            localStorage.setItem("username", JSON.stringify(res.data.username));
            localStorage.setItem("status", res.data.status);
            setIsSubmit(true);
            auth.authenticated = true;
            auth.isAdmin = false;
            history.push("/service_bill");
            window.location.reload();
            setLoader(false);
          }
        }
        if (res.statusCode === 401) {
          setIsSubmit(false);
          auth.authenticated = false;
          alert(res.message);
          window.location.reload();
          setLoader(false);
        }
      })

  };
  return (
    <>
    <div className="box_login">
      <div className="box_border">
        <div className="box_contect">
          <div className="head_contect">
            <img
              className="img_logo"
              src={"../assets/img/logo.png"}
              alt="logo"
            />
            <p className="p">ระบบจัดการคอนโดมิเนียม </p>
            <p className="p">กรณีศึกษา ลามูร์คอนโด (Lamour Condo)</p>
          </div>
          <form className="form_warpper" onSubmit={onSubmit}>
            <input
              className="input"
              type="text"
              name="username"
              placeholder="ชื่อผู้ใช้"
              value={formValues.username}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="รห้สผ่าน"
              value={formValues.password}
              onChange={handleChange}
            />
            <button className="button_submit" type="submit">
              เข้าสู่ระบบ
            </button>
          </form>
          <p className="p">{formErrors.username}</p>
        </div>
      </div>
    </div>
    <Fragment>{loader ? (<Fragment><Loader /></Fragment>) : ""}</Fragment>
    </>
  );
};

export default Loginpage;
