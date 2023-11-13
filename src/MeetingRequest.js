import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './MeetingRequest.css';

function MeetingRequest() {
  const [numPeople, setNumPeople] = useState(2);

  function mbtiSelect() {
    const makeInline = {
      display: 'inline',
    };

    const sizeSet = {
      width: '90px',
      height: '40px',
      marginRight: '10px',
    };


    return (
      <div style={makeInline}>
        <select style={sizeSet}>
          <option value="entj">ENTJ</option>
          <option value="entp">ENTP</option>
          <option value="enfj">ENFJ</option>
          <option value="enfp">ENFP</option>
          <option value="estj">ESTJ</option>
          <option value="esfj">ESFJ</option>
          <option value="esfp">ESFP</option>
          <option value="estp">ESTP</option>
          <option value="intj">INTJ</option>
          <option value="intp">INTP</option>
          <option value="infj">INFJ</option>
          <option value="infp">INFP</option>
          <option value="istj">ISTJ</option>
          <option value="isfj">ISFJ</option>
          <option value="istp">ISTP</option>
          <option value="isfp">ISFP</option>
        </select>
      </div>
    );
  }

  function alcoholAmountSelect() {
    const amountOptions = ['0', '0.5', '1', '1.5', '2', '2.5', '3'];

    const makeInline = {
      display: 'inline',
    };

    const sizeSet = {
      width: '90px',
      height: '40px',
      marginRight: '10px',
    };

    return (
      <div style={makeInline}>
        <select style={sizeSet}>
          {amountOptions.map((amount) => (
            <option key={amount} value={amount}>
              {amount}병
            </option>
          ))}
        </select>
      </div>
    );
  }
  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();
  const postData = async () => {
    try {
      // POST 요청 보낼 엔드포인트 URL
      const apiUrl = 'http://140.238.14.81:8080/request';

      // 보낼 데이터
      const dataToSend = {
        title: title,
        content: content,
        userId: userId
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
      console.error('에러 발생:', error);
    }
  };

  function handleSubmit(event) {
    console.log(title);
    console.log(content);
    console.log(userId);
    //console.log(numPeople);
    //console.log(univ);
    //console.log(location);
    postData();
  }

  const numPeopleChange = (event) => {
    setNumPeople(parseInt(event.target.value));
  };

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
            <textarea placeholder="메시지를 입력하세요!" id="writeContent"  onChange={(event) => setContent(event.target.value)}/>
          </div>
        </label>
        <label>
          <div>인원수</div>
          <div className="inputValue">
            <select onChange={numPeopleChange} className="selectSet">
              <option value='2'>2명</option>
              <option value='3'>3명</option>
              <option value='4'>4명</option>
            </select>
          </div>
        </label>
        <label>
          <div>MBTI</div>
          <div className="inputValue">
            {[...Array(numPeople)].map((_, i) => (
              <React.Fragment key={i}>
                {mbtiSelect()}
              </React.Fragment>
            ))}
          </div>
        </label>
        <label>
          <div>평균주량</div>
          <div className="inputValue">
            {[...Array(numPeople)].map((_, i) => (
              <React.Fragment key={i}>
                {alcoholAmountSelect()}
              </React.Fragment>
            ))}
          </div>
        </label>
        <div>
          <button onClick={handleSubmit} type="submit" className="submitSet">전송하기</button>
        </div>
    </div>
  );
}

export default MeetingRequest;
