import React, {Fragment, useEffect, useState } from "react";

import Boxroom from "../component/boxroom";



import '../css/homepage.css';

const Home = () => {

  const [room, setRoom] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/room`);
        const data = await response.json();
        if(data.data){
          setRoom(data.data);
          setHasLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
<Fragment>{hasLoaded? (<Fragment>
  <div>
      <div className="head_page">
        <h1>ทะเบียนห้องพัก</h1>
        <p>มีจำนวนทั้งหมด {room.length} ห้อง</p>
      </div>
      <div className="wrapper_room">
        {room.map((room, key) => {
          return (
            <Boxroom
              key={key}
              data={room}
            />
          )
        })}
      </div>
    </div>

</Fragment>):(<Fragment>

  Loading....
</Fragment>)}</Fragment>
  )
}

export default Home; 