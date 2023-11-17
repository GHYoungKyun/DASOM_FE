import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './MeetingRequest.css';

function EditRequest() {
    const [req, setReq] = useState(null);
    const userId = localStorage.getItem('userId');
    const { id } = useParams();

    const navigate = useNavigate();
    const postData = async () => {
        try {
            // POST 요청 보낼 엔드포인트 URL
            const apiUrl = `http://140.238.14.81:8080/request/${id}`;

            // 보낼 데이터
            const dataToSend = {
                title: req.title,
                content: req.content,
                userId: req.userId
            };

            // Axios를 사용하여 POST 요청 보내기
            const response = await axios.put(apiUrl, dataToSend);
            // 성공적으로 응답 받았을 때의 처리
            console.log('응답 데이터:', response.data);
            if(response.data) {
                navigate("/main");
            }
        } catch (error) {
            // 오류 발생 시의 처리
            console.error('에러 발생:', error);
        }
    };

    function handleSubmit(event) {
        console.log(req.title);
        console.log(req.content);
        console.log(req.userId);
        console.log(id);
        //console.log(numPeople);
        //console.log(univ);
        //console.log(location);
        postData();
    }

    //request 상세조회 api 필요!!
    const getReq = async () => {
        const resp = await (await axios.get(`http://140.238.14.81:8080/request/detail/${id}`));
        setReq(resp.data);
        console.log(resp.data);
    }
    useEffect(() => {
        getReq();
    }, []);


    return (
        <div className="makeBlock">
            <h1 className="header">미팅 신청</h1>
            <hr />
            <label className="contentsInput">
                <div>제목</div>
                <div className="inputValue">
                    <input value={req.title} type="text" id="writeHeader"  onChange={(event) => setReq({...req, title: event.target.value})}/>
                </div>
            </label>
            <label className="contentsInput">
                <div className="inputValue">
                    <textarea value={req.content} placeholder="메시지를 입력해주세요!" id="writeContent"  onChange={(event) => setReq({...req, content: event.target.value})}/>
                </div>
            </label>
            <div>
                <button onClick={handleSubmit} type="submit" className="submitSet">전송하기</button>
            </div>
        </div>
    );
}

export default EditRequest;