import React from 'react';
import { Link } from 'react-router-dom';
import './Read.css';
import profile from './profile_image.jpg';

function Read() {

    return(
        <div className="makeBlock">
            <div className="Project">
                <div className="project_title"><strong>DASOM</strong></div>
                <div className="profile">
                    <Link to="/mypage">
                        <img src={profile} width="40" height="40"/>
                    </Link>
                </div>
            </div>
            <h1 className="header">광운대 소프트 F3와 미팅할 여자분들 구합니다~~</h1>
            <div className="post_info">
                <div className="writer_profile">
                    <img src={profile} width="45" height="45"/>
                </div>
                <div className="writer_id">소프트F3</div>
                <div className="write_date">2023.09.18</div>
            </div>
            <hr />
            <div className="recruit_info">
                <strong>모집성별</strong> 여성
            </div>
            <div className="recruit_info">
                <strong>모집인원</strong> 3:3
            </div>
            <div className="recruit_info">
                <strong>미팅날짜</strong> 2023/10/20
            </div>
            <div className="recruit_info">
                <strong>미팅장소</strong> 노원구
            </div>
            <hr />
            <h3 className="post_content">
                안녕 우린 광운대 소프트 F3 학번은 20, 무려 군필이라구ㅎ 선착순 세 명만 받는다.
            </h3>
            <Link to="/meetingreq">
                <button className="apply_button">신청하기</button>
            </Link>
        </div>
    );
}

export default Read;