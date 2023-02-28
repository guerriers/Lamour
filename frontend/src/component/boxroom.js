
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../css/component/boxroom.css'

const boxroom = ({data}) => {
    return(
        
        <div className="wrapper_dataroom">
            <div className="number_room">
                <h1 className="number_room">ห้อง : {data.room_id}</h1><Badge className="Badge" pill bg={data.status === "1" ? 'success':'danger'}>{data.status === "1" ? 'ว่าง':'จองแล้ว'}</Badge>
            </div>
            <div className="data_room">
                <div className="head_data">
                    <p className="p_boxroom">ชั้น</p>
                    <p className="p_boxroom">ขนาด</p>
                    <p className="p_boxroom">ราคา</p>
                    <p className="p_boxroom">ทิศทาง</p>
                </div>
                <div className="body_data">
                    <p className="p_boxroom">: {data.floor}</p>
                    <p className="p_boxroom">: {data.size} ตร.ม</p>
                    <p className="p_boxroom">: {data.price} บาท</p>
                    <p className="p_boxroom">: {data.direction}</p>
                </div>
            </div>
            <div className="warpper_button">
            <Link to={`/manageroom/room_data/${data.room_id}`}><button className="view_details">รายละเอียดเพิ่มเติม</button></Link>
            </div>
        </div>
    )
}

export default boxroom;