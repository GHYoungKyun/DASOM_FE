import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Read.css';
import { useParams, useNavigate } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log(id);

    const [board, setBoard] = useState({});

    const genderEnumMapping = {
        MALE: "남",
        FEMALE: "여",
    };

    const numberEnumMapping = {
        ONE: "1:1",
        TWO: "2:2",
        THREE: "3:3",
        FOUR: "4:4",
        FIVE: "5:5"
    };

    const getBoard = async () => {
        try {
            const resp = await (await axios.get(`http://140.238.14.81:8080/post/detail/${id}`));
            setBoard(resp.data);
            console.log(resp.data);
        } catch (error) {
            navigate('/error');
        }
    }
    useEffect(() => {
        getBoard();
    }, []);

    const handleDelete = async () => {
        try {
            const sendUserId = {
                userId: localStorage.getItem('userId')
            }
            const resp = await (await axios.post(`http://140.238.14.81:8080/post/${id}`, sendUserId));
            alert("삭제되었습니다.");
            navigate('/main');
        } catch(error) {
            navigate('/error');
        }
    }

    return(
        <div className="makeBlock">
            <div className="Project">
                <Link to="/main">
                    <div className="project_title"><strong>DASOM</strong></div>
                </Link>
                <div className="profile">
                    <Link to="/mypage">{localStorage.getItem('nickname')}</Link>
                    님
                    <br/>
                    <Link to="/notification">알림함</Link>
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
                <strong>모집성별</strong> {genderEnumMapping[board.gender]}
            </div>
            <div className="recruit_info">
                <strong>모집인원</strong> {numberEnumMapping[board.number]}
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

        </div>
    );
}

export default Read;