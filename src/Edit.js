import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './Write.css';
import profile from './profile_image.jpg';

function Edit() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [board, setBoard] = useState({});

    const writer = localStorage.getItem('nickname');
    const userId = localStorage.getItem('userId');

    const editData = async () => {
        try {
            // POST 요청 보낼 엔드포인트 URL
            const apiUrl = `http://140.238.14.81:8080/post/${id}`;

            // 보낼 데이터
            const dataToSend = {
                title: board.title,
                content: board.content,
                openKakaoAddress: board.openKakaoAddress,
                userId: userId,
                gender: board.gender,
                number: board.number,
                //alcohol: alcohol,
                location: board.location
            };

            // Axios를 사용하여 POST 요청 보내기
            const response = await axios.put(apiUrl, dataToSend);
            // 성공적으로 응답 받았을 때의 처리
            console.log('응답 데이터:', response.data);
            alert("수정되었습니다!")
            navigate(`/read/${id}`);
        } catch (error) {
            // 오류 발생 시의 처리
            console.error('에러 발생:', error);
        }
    };
    function submit() {
        console.log(board.title);
        console.log(board.content);
        console.log(userId);
        console.log(board.gender);
        console.log(board.number);
        console.log(board.openKakaoAddress);
        //console.log(univ);
        console.log(board.location);
        editData();
    }

    const getBoard = async () => {
        const resp = await (await axios.get(`http://140.238.14.81:8080/post/${id}`));
        setBoard(resp.data);
        console.log(resp.data);
    }
    useEffect(() => {
        getBoard();
    }, []);

    return(
        <>
        {board && (
            <div className="makeBlock">
                <div className="Project">
                    <Link to="/main">
                        <div className="project_title"><strong>DASOM</strong></div>
                    </Link>
                    <div className="profile">
                        <Link to="/mypage">
                            <img src={profile} width="40" height="40"/>
                        </Link>
                    </div>
                </div>
                <h1 className="header"> 과팅 or 미팅 정보를 입력해주세요.</h1>
                <hr />
                <p>모집성별</p>
                <select value={board.gender} onChange={(event) => setBoard({...board, gender: event.target.value})} className="sizeSet">
                    <option value="MALE">남</option>
                    <option value="FEMALE">여</option>
                </select>
                <p>모집인원</p>
                <select value={board.number} onChange={(event) => setBoard({...board, number: event.target.value})} className="sizeSet">
                    <option value="ONE">1:1</option>
                    <option value="TWO">2:2</option>
                    <option value="THREE">3:3</option>
                    <option value="FOUR">4:4</option>
                    <option value="FIVE">5:5</option>
                </select>
                <p>미팅지역</p>
                <select value={board.location} onChange={(event) => setBoard({...board, location: event.target.value})} className="sizeSet">
                    <option value="강남구">강남구</option>
                    <option value="강동구">강동구</option>
                    <option value="강서구">강서구</option>
                    <option value="강북구">강북구</option>
                    <option value="관악구">관악구</option>
                    <option value="광진구">광진구</option>
                    <option value="구로구">구로구</option>
                    <option value="금천구">금천구</option>
                    <option value="노원구">노원구</option>
                    <option value="동대문구">동대문구</option>
                    <option value="도봉구">도봉구</option>
                    <option value="동작구">동작구</option>
                    <option value="마포구">마포구</option>
                    <option value="서대문구">서대문구</option>
                    <option value="성동구">성동구</option>
                    <option value="성북구">성북구</option>
                    <option value="서초구">서초구</option>
                    <option value="송파구">송파구</option>
                    <option value="영등포구">영등포구</option>
                    <option value="용산구">용산구</option>
                    <option value="양천구">양천구</option>
                    <option value="은평구">은평구</option>
                    <option value="종로구">종로구</option>
                    <option value="중구">중구</option>
                    <option value="중랑구">중랑구</option>
                </select>
                <h1 className="header">과팅 or 미팅에 대해 소개해주세요.</h1>
                <hr />
                <p>제목</p>
                <input value={board.title} type="text" id="title" onChange={(event) => setBoard({...board, title: event.target.value})} placeholder="글 제목을 입력해주세요."/>
                <p>오픈카카오톡 주소</p>
                <input value={board.openKakaoAddress} type="text" id="title" onChange={(event) => setBoard({...board, openKakaoAddress: event.target.value})} placeholder="오픈카카오톡 주소 입력."/>
                <textarea value={board.content} id="content" onChange={(event) => setBoard({...board, content: event.target.value})} placeholder="글 내용을 입력해주세요."/>
                <Link to="/main">
                    <button className="cancel_button">취소</button>
                </Link>
                <button onClick={submit} className="upload_button">글 수정</button>
            </div>
        )}
        </>
    );
}

export default Edit;