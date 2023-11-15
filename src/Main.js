import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Main.css';
import "react-datepicker/dist/react-datepicker.css";
import banner from './images/banner_image.png';
import user from './images/user.png';
import gender from './images/gender.png';

function Main() {
    const [boardList, setBoardList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('전체');
    const options = ['전체', '남', '여'];
    const [isRatioDropdownOpen, setRatioDropdownOpen] = useState(false);
    const [selectedRatioOption, setRatioOption] = useState('1:1');
    const count_options = ['1:1', '2:2', '3:3', '4:4', '5:5'];

    const sizeSet = {
        width: '90px',
        height: '30px',
    };

    const getBoardList = async () => {
        const resp = await (await axios.get('http://140.238.14.81:8080/post'));
        setBoardList(resp.data);

        boardList.map((val, idx) => console.log(val));
    }

    useEffect(() => {
        getBoardList();
    }, []);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    const toggleRatioDropdown = () => setRatioDropdownOpen(!isRatioDropdownOpen);

    const onRatioOptionClicked = value => () => {
        setRatioOption(value);
        setRatioDropdownOpen(false);
    };

    return(
        <div className="desktop">
            <div className = "top">
                <div>
                    <Link to="/main" className = "header">
                        DASOM
                    </Link>
                </div>
                <div className = "write">
                    <Link to="/write">
                        <button className="write_button">새 게시물 작성</button>
                    </Link>
                </div>
                <div className = "mypage">
                    <Link to="/mypage">
                        마이페이지
                    </Link>
                </div>
            </div>
            <div className="banner">
                <span className = "banner_word">
                    어쩌구<br />저쩌구
                </span>
                <img src = {banner} className = "banner_image"/>
            </div>
            <div className = "middle">
                <div className = "filter_set">
                    <div className="filter">
                        <div className="dd-wrapper" onClick={toggling}>
                            <button className="dd-header">
                                <img src = {gender} className = "filter_image"/>
                                {selectedOption}
                            </button>
                            {isOpen && (
                                <ul className="dd-list">
                                {options.map(option => (
                                    <li className="dd-list-item" onClick={onOptionClicked(option)} key={option}>
                                        {option}
                                    </li>
                                ))}
                                </ul>
                            )}
                            </div>
                    </div>
                    <div className="filter">
                        <div className="dd-wrapper" onClick={toggleRatioDropdown}>
                            <button className="dd-header">
                                <img src = {user} className = "filter_image"/>
                                {selectedRatioOption}
                            </button>
                            {isRatioDropdownOpen && (
                                <ul className="dd-list">
                                {count_options.map(option => (
                                    <li className="dd-list-item" onClick={onRatioOptionClicked(option)} key={option}>
                                        {option}
                                    </li>
                                ))}
                                </ul>
                            )}
                            </div>
                        </div>
                </div>
                <div className = "search">
                    <div className = "search_bar_block">
                        <input type="text" className="search_bar" placeholder="게시물 검색"/>
                    </div>
                    <div className = "search_button_block">
                        <button className="search_button">검색</button>
                    </div>
                </div>
            </div>
            <div style = {{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '1300px', margin: 'o auto'}}>
                        {boardList && boardList.map((val,idx) => (
                            <Link to={`/read/${idx}`} style={{width: '300px', margin: '60px', textDecoration: 'none'}}>
                                    <div className = "box_style">
                                        <div className = "box_header">
                                            {val.title}
                                        </div>
                                        <div className = "box_info">
                                            <span className = "box_gender">
                                                {val.gender}
                                            </span>
                                            <span>
                                                |
                                            </span>
                                            <span className = "box_count">
                                                {val.number}
                                            </span>
                                        </div>
                                        <div className = "box_line">
                                        </div>
                                        <div className = "box_username">
                                            {val.nickname}
                                        </div>
                                    </div>
                            </Link>                    
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Main;