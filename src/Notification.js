import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Notification.css';

function Notification() {
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


    );
}

export default Notification;