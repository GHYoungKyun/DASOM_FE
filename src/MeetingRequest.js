import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import './MeetingRequest.css';

function MeetingRequest() {
  const [numPeople, setNumPeople] = useState(2);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
  const userId = localStorage.getItem('userId');
  const { id } = useParams();

  const navigate = useNavigate();
  const postData = async () => {
    try {
      // POST 요청 보낼 엔드포인트 URL
      const apiUrl = 'http://140.238.14.81:8080/request';

      // 보낼 데이터
      const dataToSend = {
        title: title,
        content: content,
        userId: userId,
        postId: id
        //number: numPeople
      };

      // Axios를 사용하여 POST 요청 보내기
      const response = await axios.post(apiUrl, dataToSend);
      // 성공적으로 응답 받았을 때의 처리
      console.log('응답 데이터:', response.data);
      if(response.data) {
        navigate("/main");
      }
    } catch (error) {
      // 오류 발생 시의 처리
      navigate('/error');
    }
  };

  function handleSubmit(event) {
    console.log(title);
    console.log(content);
    console.log(userId);
    console.log(id);
    //console.log(numPeople);
    //console.log(univ);
    //console.log(location);
    postData();
  }

  return (
    <div className="makeBlock">
      <h1 className="header">미팅 신청</h1>
      <hr />
        <label className="contentsInput">
          <div>제목</div>
          <div className="inputValue">
            <input type="text" id="writeHeader"  onChange={(event) => setTitle(event.target.value)}/>
          </div>
        </label>
        <label className="contentsInput">
          <div className="inputValue">
            <textarea placeholder="메시지를 입력해주세요!" id="writeContent"  onChange={(event) => setContent(event.target.value)}/>
          </div>
        </label>
        <div>
          <button onClick={handleSubmit} type="submit" className="submitSet">전송하기</button>
        </div>
    </div>
  );
}

export default MeetingRequest;
