import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Applicant.css';

function Applicant() {
    const [reqList, setReqList] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const getReqList = async () => {
        const resp = await (await axios.get(`http://140.238.14.81:8080/request/post/${id}`));
        setReqList(resp.data);

        reqList.map((val, idx) => console.log(val));
    }

    useEffect(() => {
        getReqList();
    }, []);

    const [reqId, setReqId] = useState(0);

    const handleAccept = async (reqId) => {
        const resp = await (await axios.put(`http://140.238.14.81:8080/request/result/${reqId}?result=YES`));
        alert("미팅 요청이 수락되었습니다!");
        navigate("/main");
    }
    const handleRefuse = async (reqId) => {
        const resp = await (await axios.delete(`http://140.238.14.81:8080/request/${reqId}`));
        alert("미팅 요청이 거절되었습니다!");
        window.location.reload();
    }


    return(
        <div>
            <h2>신청자 목록</h2>
            <ul>
                {reqList && reqList.map((val,idx) => (
                    <li key={val.reqId}>
                        {val.title}/{val.content}/{val.userId.id}
                        <button onClick={() => handleAccept(val.requestId)}>수락</button>
                        <button onClick={() => handleRefuse(val.requestId)}>거절</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Applicant;