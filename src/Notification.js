import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Notification.css';
<<<<<<< HEAD

function Notification() {
=======
import './default.css'

function Notification({ onClose }) {
>>>>>>> 0b23d86faba1cb9048d1ca28045bc05bdc0f2a49
    const [noticeList, setNoticeList] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const getNoticeList = async () => {
        try{
            const apiUrl = `http://140.238.14.81:8080/notice/${userId}`;

            const resp = await axios.get(apiUrl);
            setNoticeList(resp.data);

            noticeList.map((val, idx) => console.log(val));
        } catch (error) {
            navigate('/error');
        }
    };

    useEffect(() => {
        getNoticeList();
    }, []);

    return(
<<<<<<< HEAD
        <div>
            <h2>알림함</h2>
            <ul>
                {noticeList && noticeList.map((val,idx) => (
                    <li key={idx}>
                        {val.requestName}/
                        {val.requestContent}/
                        {val.requestTime ?
                            val.requestTime[0] + '/' + val.requestTime[1] + '/' + val.requestTime[2] : ''
                        }/
                        {val.postTitle}
                        {val.openKakao}
                        {val.kind}
                    </li>
                ))}
            </ul>
        </div>


=======
        <div className="modal">
            <div className="modal-content">
                <div className="notification_top">
                    <div className="notification_header">
                        알림함
                    </div>
                    <button onClick={onClose} className="notification_close">
                        닫기
                    </button>
                </div>
                <ul>
                    {noticeList && noticeList.map((val,idx) => (
                        <li key={idx} className="notification_list">
                            <div className="notification_content">
                                {val.requestName}
                            </div>
                            <div className="notification_content">
                                {val.requestContent}
                            </div>
                            <div className="notification_content">
                                {val.requestTime ?
                                    val.requestTime[0] + '/' + val.requestTime[1] + '/' + val.requestTime[2] : ''
                                }
                            </div>
                            <div className="notification_content">
                                {val.postTitle}
                            </div>
                            <div className="notification_content">
                                {val.kind}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

>>>>>>> 0b23d86faba1cb9048d1ca28045bc05bdc0f2a49
    );
}

export default Notification;