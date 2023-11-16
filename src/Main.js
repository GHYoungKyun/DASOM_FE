import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Main.css';

function Main() {
    const [boardList, setBoardList] = useState([]);
    const sizeSet = {
        width: '90px',
        height: '30px',
    };

    const boxStyle = {
        border: '2px solid',
        borderColor: 'gray',
        borderRadius: '40px',
        height: '250px',
        width: '250px',
        position: 'absolute'
    };

    const contentStyle = {
        marginLeft: '30px',
    };

    const univStyle = {
        fontSize: '12px',
        padding: '7px',
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: '14px',
        textAlign: 'center',
    };

    const countStyle = {
        fontSize: '12px',
        padding: '7px',
        paddingLeft: '30px',
        paddingRight: '30px',
        backgroundColor: 'rgb(26, 188, 156)',
        color: 'white',
        borderRadius: '14px',
        textAlign: 'center',
    };

    const headerStyle = {
        marginBottom: '40px',
    };

    const userStyle = {
        fontSize: '12px',
    };

    const getBoardList = async () => {
        const resp = await (await axios.get('http://140.238.14.81:8080/post'));
        setBoardList(resp.data);

        boardList.map((val, idx) => console.log(val));
    }

    useEffect(() => {
        getBoardList();
    }, []);

    return(
        <div className="desktop">
            <div className="div">
                <div className="frame">
                    <Link to="/main">
                        <div className="text-wrapper"><strong>DASOM</strong></div>
                    </Link>
                    <div className="profile">
                        <Link to="/mypage">{localStorage.getItem('nickname')}</Link>
                        님
                    </div>
                    <Link to="/write">
                        <button className="write_button">새 게시물 작성</button>
                    </Link>
                </div>
                <div className="Frame">사진</div>
                <div className="frame-2">
                    <div className="gender_filter">
                        <p>모집성별</p>
                        <select style={sizeSet}>
                            <option value="전체">전체</option>
                            <option value="남">남</option>
                            <option value="여">여</option>
                        </select>
                    </div>
                    <div className="num_filter">
                        <p>모집인원</p>
                        <select style={sizeSet}>
                            <option value="1:1">1:1</option>
                            <option value="2:2">2:2</option>
                            <option value="3:3">3:3</option>
                            <option value="4:4">4:4</option>
                            <option value="5:5">5:5</option>
                        </select>
                    </div>
                    <input type="text" className="searchbar" placeholder="게시물 검색"/>
                    <button className="search_button">검색</button>

                    {boardList && boardList.map((val,idx) => (
                        <Link to={`/read/${idx}`}>
                          <div style={{...boxStyle, top: 300*Math.floor(idx / 4) + 780, left: 300*(idx%4) + 100 }}>
                              <p style={contentStyle} />
                          <span style={univStyle}>
                              {val.gender} 모집
                          </span>
                          <h3 style={headerStyle}>
                              {val.title}
                          </h3>
                          <span style={countStyle}>
                            {val.number}
                          </span>
                          <hr />
                          <span style={userStyle}>
                              {val.nickname}
                          </span>
                          </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;