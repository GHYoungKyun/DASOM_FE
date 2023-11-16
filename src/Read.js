import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Read.css';
import { useParams, useNavigate } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState({});
    const getBoard = async () => {
        const resp = await (await axios.get(`http://140.238.14.81:8080/post/${id}`));
        setBoard(resp.data);
        console.log(resp.data);
    }
    useEffect(() => {
        getBoard();
    }, []);
    const handleDelete = async () => {
        const resp = await (await axios.delete(`http://140.238.14.81:8080/post/${id}`));
        alert("삭제되었습니다.");
        navigate('/main');
    }

    return(
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
            <h1 className="header">{board.title}</h1>
            <div className="post_info">
                <div className="writer_id">{board.nickname}</div>
                <div className="write_date">
                    {board.createdDate ?
                        board.createdDate[0] + '/' + board.createdDate[1] + '/' + board.createdDate[2] :  ''
                    }
                </div>
            </div>
            <hr />
            <div className="recruit_info">
                <strong>모집성별</strong> {board.gender}
            </div>
            <div className="recruit_info">
                <strong>모집인원</strong> {board.number}
            </div>
            <div className="recruit_info">
                <strong>미팅장소</strong> {board.location}
            </div>
            <hr />
            <h3 className="post_content">
                {board.content}
            </h3>
            {(localStorage.getItem('nickname') != board.nickname) && (
                <Link to={`/meetingreq/${id}`}>
                    <button className="apply_button">신청하기</button>
                </Link>
            )}
            {(localStorage.getItem('nickname') == board.nickname) && (
                <>
                <Link to={`/applicant/${id}`}>
                    <button className="apply_button">신청자 목록조회</button>
                </Link>
                <Link to={`/edit/${id}`} >
                    <button className="apply_button">수정</button>
                </Link>
                <button onClick={handleDelete} className="apply_button">삭제</button>
                </>
            )}
            <Link to={`/meetingreq/${id}`}>
                <button className="apply_button">신청하기</button>
            </Link>

        </div>
    );
}

export default Read;