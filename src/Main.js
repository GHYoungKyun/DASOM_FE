import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import './Main.css';
import './default.css'
import banner from './images/banner_image.png';
import gender from './images/gender.png';
import left from './images/left.png';
import right from './images/right.png';

function Main() {
    const [boardList, setBoardList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [genderFilter, setGenderFilter] = useState('ALL');
    const userId = localStorage.getItem('userId');
    const [selectedOption, setSelectedOption] = useState('전체');
    const [isOpen, setIsOpen] = useState(false);
    const options = ['전체', '남', '여'];
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const openNotification = () => {
        setIsNotificationOpen(true);
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

    const postsPerPage = 5;

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        if(value == '전체'){
            setGenderFilter('ALL');
        }
        else if(value == '남'){
            setGenderFilter('MALE');
        }
        else if(value == '여'){
            setGenderFilter('FEMALE');
        }
        setIsOpen(false);
    };

    const getBoardList = async () => {
        try{
            const apiUrl = `http://140.238.14.81:8080/post?size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            console.log(resp.data);
            console.log(resp.data.content);

        } catch (error) {
            console.error(error);
        }
    };

    const getFilteredBoardList = async () => {
        try{
            const apiUrl = `http://140.238.14.81:8080/post/gender/${genderFilter}?size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            console.log(resp.data);
            console.log(resp.data.content);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBoardList();
    }, [currentPage]);

    function applyGenderFilter() {
        console.log(genderFilter);
        if(genderFilter == 'ALL') {
            getBoardList();
        } else {
            getFilteredBoardList();
        }
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };

    return(
        <div className="desktop">
            <div className="div">
                <div className="banner-top">
                    <Link to="/main" style={{textDecoration: 'none'}}>
                        <div className="text-wrapper">DASOM</div>
                    </Link>
                    <div id="profile">
                        <Link to="/mypage">{localStorage.getItem('nickname')}</Link>님
                        <div>
                            <Link to="#" onClick={openNotification}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 45 49" fill="none">
                                    <path d="M44.118 35.5487C42.8389 33.3454 40.9375 27.1112 40.9375 18.9688C40.9375 14.0788 38.995 9.38917 35.5373 5.93147C32.0796 2.47377 27.3899 0.53125 22.5 0.53125C17.6101 0.53125 12.9204 2.47377 9.46273 5.93147C6.00503 9.38917 4.06251 14.0788 4.06251 18.9688C4.06251 27.1135 2.15884 33.3454 0.879741 35.5487C0.553099 36.1088 0.379933 36.7452 0.377707 37.3936C0.375481 38.042 0.544274 38.6795 0.867062 39.2419C1.18985 39.8043 1.65522 40.2716 2.21624 40.5967C2.77726 40.9218 3.41409 41.0933 4.06251 41.0938H13.4679C13.8933 43.1752 15.0246 45.0459 16.6704 46.3894C18.3162 47.7329 20.3755 48.4667 22.5 48.4667C24.6245 48.4667 26.6838 47.7329 28.3296 46.3894C29.9754 45.0459 31.1067 43.1752 31.5321 41.0938H40.9375C41.5857 41.0929 42.2223 40.9211 42.783 40.5959C43.3437 40.2706 43.8087 39.8032 44.1312 39.2409C44.4538 38.6786 44.6223 38.0412 44.62 37.393C44.6177 36.7448 44.4445 36.1086 44.118 35.5487ZM22.5 44.7812C21.3565 44.7809 20.2412 44.4261 19.3076 43.7658C18.374 43.1054 17.668 42.1719 17.2868 41.0938H27.7132C27.332 42.1719 26.6261 43.1054 25.6925 43.7658C24.7589 44.4261 23.6436 44.7809 22.5 44.7812ZM4.06251 37.4062C5.83712 34.3548 7.75002 27.2841 7.75002 18.9688C7.75002 15.0568 9.30403 11.3051 12.0702 8.53893C14.8364 5.77276 18.5881 4.21875 22.5 4.21875C26.412 4.21875 30.1637 5.77276 32.9298 8.53893C35.696 11.3051 37.25 15.0568 37.25 18.9688C37.25 27.2771 39.1583 34.3479 40.9375 37.4062H4.06251Z" fill="#292929"/>
                                </svg>    
                            </Link>
                            <div className = "notification">
                                {isNotificationOpen && <Notification onClose={closeNotification} />}
                            </div>
                        </div>
                        <Link to="/write">
                            <button className="write_button">새 게시물 작성</button>
                        </Link>
                    </div>
                </div>
                <div className="banner">
                    <div className="banner_word">
                        <div className="banner_logo">
                            다솜
                        </div>
                        <div className="banner_words">
                             : 사랑을 뜻하는 순우리말<br />
                            에서 아는 선배 없이도 미팅해요
                        </div>
                    </div>
                    <div className="banner_image">
                        <img src={banner} />
                    </div>
                </div>
                {/*여기까지가 기본 페이지 스타일*/}
                <div className="frame-2">
                    <div className="banner_bottom">
                        <div className="gender_filter">
                        <div className="filter">
                        <div className="dd-wrapper" onClick={toggling}>
                            <button 
                                className="dd-header"
                                style={{ 
                                    color: (selectedOption === '남' || selectedOption === '여') ? '#118196' : '#292929',
                                    fontWeight: (selectedOption === '남' || selectedOption === '여') ? 'bold' : 'normal',
                                }}    
                            >
                                <img src = {gender} className = "filter_image"/>
                                {selectedOption}
                            </button>
                            {isOpen && (
                                <ul className="dd-list">
                                    {options.map(option => (
                                        <li className="dd-list-item" onClick={onOptionClicked(option)}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            </div>
                    </div>
                            <button onClick={applyGenderFilter} className="filter_button">게시글 필터 적용</button>
                        </div>
                    </div>
                    <div className="box_array">
                        {boardList && boardList.content.map((val,idx) => (
                            <Link to={`/read/${val.postId.id}`} style={{width: '300px', margin: '60px', textDecoration: 'none'}}>
                            <div className="box_style">
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
                    <ReactPaginate
                        previousLabel={<img src={left} alt="이전" className="page_label" />}
                        nextLabel={<img src={right} alt="다음" className="page_label" />}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
        </div>
    );
}

export default Main;