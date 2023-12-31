import './Notification.css';
import './default.css'
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Notification({ onClose }) {
    const [noticeList, setNoticeList] = useState([]);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const navigate2 = useNavigate();

    // 유저 로그인 여부 확인 및 페이지 리다이렉트
    useEffect(() => {
      const isUserLoggedIn = () => {
        const userId = localStorage.getItem('userId');
        return userId !== null;
      };
  
      const handlePageRedirect = () => {
        if (!isUserLoggedIn()) {
          // 유저가 로그인되어 있지 않다면 '/' 페이지로 이동
          navigate2('/');
        }
      };
  
      handlePageRedirect();
    }, [navigate2]);

    const statusEnumMapping = {
        REQUEST: "신청",
        YES: "수락",
        NO: "거절"
    };

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
                                <div className="notification_partition">
                                </div>
                                <div className="notification_content">
                                    {val.requestTime ?
                                        val.requestTime[0] + '/' + val.requestTime[1] + '/' + val.requestTime[2] : ''
                                    }
                                </div>
                                <div className="notification_partition">
                                </div>
                                <div className="notification_content">
                                    {val.postTitle}
                                </div>
                                <div className="notification_partition">
                                </div>
                                <div className="notification_content" id={val.kind === "YES" ? "" : "notification_content"}>
                                    
                                    {val.kind === "YES" ? val.openKakao : val.requestContent}
                                
                                </div>
                                <div className="notification_partition">
                                </div>
                                <div className="notification_content">
                                    {statusEnumMapping[val.kind]}
                                </div>
                            </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default Notification;