import React, {useState} from 'react';
import './MeetingRequest.css'

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
    }

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

  function handleSubmit() {
    //제출 로직
  }

  const numPeopleChange = (event) => {
    setNumPeople(parseInt(event.target.value));
  };  

  return (
    <div className="makeBlock">
      <h1 className="header">미팅 신청</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label className="contentsInput">
          <div>
            제목
          </div>
          <div className="inputValue">
            <input type="text" id="writeHeader"/>
          </div>
          <div className="inputValue">
            <textarea defaultValue="메시지를 입력하세요!" id="writeContent"/>
          </div>
        </label>
        <label>
          <div>
            인원수
          </div>
          <div className="inputValue">
            <select onChange={numPeopleChange} className="selectSet">
              <option value='2'>2명</option>
              <option value='3'>3명</option>
              <option value='4'>4명</option>
            </select>
          </div>
        </label>
        <label>
          <div>
            MBTI
          </div>
          <div className="inputValue">
            {[...Array(numPeople)].map((_, i) => (
              <React.Fragment key={i}>
                {mbtiSelect()}
              </React.Fragment>
            ))}
          </div>
        </label>
        <label>
          <div>
            평균주량
          </div>
          <div className="inputValue">
            <select className="selectSet">
              <option value="0">0병</option>
              <option value="0.5">0.5병</option>
              <option value="1">1병</option>
              <option value="1.5">1.5병</option>
              <option value="2">2병</option>
              <option value="2.5">2.5병</option>
              <option value="3">3병</option>
            </select>
          </div>
        </label>
        <div>
          <button type="submit" className="submitSet">전송하기</button>
        </div>
      </form>
    </div>
  );
}

export default MeetingRequest;