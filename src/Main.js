import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import './Main.css';

function Main() {
    const [boardList, setBoardList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [genderFilter, setGenderFilter] = useState('ALL');
    const [numFilter, setNumFilter] = useState('ALL');
    const userId = localStorage.getItem('userId');
    const [keyword, setKeyword] = useState('');

    const postsPerPage = 5;

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

    const getGenFilteredBoardList = async () => {
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

    const getNumFilteredBoardList = async () => {
        const apiUrl = `http://140.238.14.81:8080/post/number/${numFilter}?size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

        const resp = await axios.get(apiUrl);
        setBoardList(resp.data);
        console.log(resp.data);
        console.log(resp.data.content);
    }

    const getFilteredBoardList = async () => {
        try{
            const apiUrl = `http://140.238.14.81:8080/post/filter?number=${numFilter}&gender=${genderFilter}&size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            console.log(resp.data);
            console.log(resp.data.content);

        } catch (error) {
            console.error(error);
        }
    }
    const getSearchBoardList = async () => {
        try{
            const apiUrl = `http://140.238.14.81:8080/post/search?keyword=${keyword}`;

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

    function applyFilter(event) {
        console.log(genderFilter);
        console.log(numFilter);
        if(genderFilter == 'ALL' && numFilter == 'ALL') {
            getBoardList();
        }
        else if(genderFilter == 'ALL' && numFilter != 'ALL') {
            getNumFilteredBoardList();
        }
        else if(genderFilter != 'ALL' && numFilter == 'ALL') {
            getGenFilteredBoardList();
        }
        else {
            getFilteredBoardList();
        }
    }

    function handleSearch() {
        getSearchBoardList();
    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected + 1);
    };

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
                        <br/>
                        <Link to="/notification">알림함</Link>
                    </div>
                    <Link to="/write">
                        <button className="write_button">새 게시물 작성</button>
                    </Link>
                </div>
                <div className="Frame">사진</div>
                <div className="frame-2">
                    <div className="gender_filter">
                        <p>모집성별</p>
                        <select value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)} style={sizeSet}>
                            <option value="ALL">전체</option>
                            <option value="MALE">남</option>
                            <option value="FEMALE">여</option>
                        </select>
                    </div>
                    <div className="num_filter">
                        <p>모집인원</p>
                        <select value={numFilter} onChange={(event) => setNumFilter(event.target.value)} style={sizeSet}>
                            <option value="ALL">전체</option>
                            <option value="ONE">1:1</option>
                            <option value="TWO">2:2</option>
                            <option value="THREE">3:3</option>
                            <option value="FOUR">4:4</option>
                            <option value="FIVE">5:5</option>
                        </select>
                        <button onClick={applyFilter}>게시글 필터 적용</button>
                    </div>
                    <input value={keyword} onChange={(event) => setKeyword(event.target.value)} type="text" className="searchbar" placeholder="게시물 검색"/>
                    <button className="search_button" onClick={() => handleSearch()}>검색</button>



                    {boardList && boardList.content.map((val,idx) => (
                        <Link to={`/read/${val.postId.id}`}>
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
                <ReactPaginate
                    previousLabel={'이전'}
                    nextLabel={'다음'}
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