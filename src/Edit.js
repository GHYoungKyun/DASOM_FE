import React, {useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './Write.css';

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
                number: board.number
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

        editData();
    }

    const getBoard = async () => {
        const resp = await (await axios.get(`http://140.238.14.81:8080/post/detail/${id}`));
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