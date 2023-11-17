import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';
import './Applicant.css';

function Applicant() {
    const [reqList, setReqList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const [reqId, setReqId] = useState('');

    const getReqList = async () => {
        const resp = await (await axios.get(`http://140.238.14.81:8080/request/post/${id}?size=4&page=${currentPage}&sort=createdDate,desc`));
        setReqList(resp.data);
        console.log(resp.data);
    }

    useEffect(() => {
        getReqList();
    }, []);

    const sendUserId = {
        userId: localStorage.getItem('userId')
    }

    const handleAccept = async (reqId) => {
        const resp = await (await axios.put(`http://140.238.14.81:8080/request/result/${reqId}?result=YES`, sendUserId));
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
                {reqList && reqList.content.map((val,idx) => (
                    <li key={val.reqId}>
                        {val.title}/{val.content}/{val.userId.id}
                        <button onClick={() => handleAccept(val.requestId.id)}>수락</button>
                        <button onClick={() => handleRefuse(val.requestId.id)}>거절</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Applicant;