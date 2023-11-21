import './Applicant.css';
import './default.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useParams, useNavigate } from 'react-router-dom';

function Applicant() {
    const [reqList, setReqList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const [reqId, setReqId] = useState('');

    const getReqList = async () => {
        try {
            const resp = await (await axios.get(`http://140.238.14.81:8080/request/post/${id}?size=4&page=${currentPage}&sort=createdDate,desc`));
            setReqList(resp.data);
            setTotalPages(resp.data.totalPages);
            console.log(resp.data);
        } catch (error) {
            navigate('/error');
        }
    }

    useEffect(() => {
        getReqList();
    }, []);

    const sendUserId = {
        userId: localStorage.getItem('userId')
    }

    const handleAccept = async (reqId) => {
        try {
            const resp = await (await axios.put(`http://140.238.14.81:8080/request/result/${reqId}?result=YES`, sendUserId));
            alert("미팅 요청이 수락되었습니다!");
            navigate("/main");
        } catch (error) {
            navigate('/error');
        }
    }
    const handleRefuse = async (reqId) => {
        try {
            const resp = await (await axios.delete(`http://140.238.14.81:8080/request/${reqId}`));
            alert("미팅 요청이 거절되었습니다!");
            window.location.reload();
        } catch (error) {
            navigate('/error');
        }
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return(
        <div className="applicant">
            <ul>
                <li className="applicant-item" id="applicant-header">
                    <div className="space" id="space">
                        제목
                    </div>
                    <div className="space" id="space">
                        소개글
                    </div>
                    <div className="space" id="space">
                        닉네임
                    </div>
                    <div className="space" id="space">
                        관리
                    </div>
                </li>
                {reqList && reqList.content.map((val,idx) => (
                    <li key={val.reqId} className="applicant-item" id="applicant-content">
                        <div className="space">
                            {val.title}
                        </div>
                        <div className="space">
                            {val.content}
                        </div>
                        <div className="space">
                            {val.nickname}
                        </div>
                        <div className="space">
                            <button className="okay_button" onClick={() => handleAccept(val.requestId.id)}>수락</button>
                            <button className="no_button" onClick={() => handleRefuse(val.requestId.id)}>거절</button>
                        </div>
                    </li>
                ))}
            </ul>
            <ReactPaginate
                previousLabel={'이전'}
                nextLabel={'다음'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Applicant;