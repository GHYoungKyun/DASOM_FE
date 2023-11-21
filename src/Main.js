import './Main.css';
import './default.css';
import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import banner from './images/banner_image.png';

function Main() {
    const [boardList, setBoardList] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [genderFilter, setGenderFilter] = useState('ALL');
    const [numFilter, setNumFilter] = useState('ALL');
    const userId = localStorage.getItem('userId');
    const [selectedOption, setSelectedOption] = useState('전체');
    const [isOpen, setIsOpen] = useState(false);
    const [numIsOpen, setNumIsOpen] = useState(false);
    const [numSelectedOption, setNumSelectedOption] = useState('전체')
    const options = ['전체', '남', '여'];
    const numOptions = ['전체', '1 : 1', '2 : 2', '3 : 3', '4 : 4', '5 : 5']
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const navigate2 = useNavigate();

    // 유저 로그인 여부 확인 및 페이지 리다이렉트
    useEffect(() => {
      const isUserLoggedIn = () => {
        const userId = localStorage.getItem('userId');
        return userId !== null;
      };
  
      const handlePageRedirect = () => {
        if (!isUserLoggedIn()) {
          // 유저가 로그인되어 있지 않다면 '/' 페이지로 이동
          navigate2('/');
        }
      };
  
      handlePageRedirect();
    }, [navigate2]);


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

    const openNotification = () => {
        setIsNotificationOpen(true);
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

    const postsPerPage = 5;

    const toggling = () => setIsOpen(!isOpen);

    const numToggling = () => setNumIsOpen(!numIsOpen);

    const onOptionClicked = value => () => {
        setSelectedOption(value);
        if(value === '전체'){
            setGenderFilter('ALL');
        }
        else if(value === '남'){
            setGenderFilter('MALE');
        }
        else if(value === '여'){
            setGenderFilter('FEMALE');
        }
        setIsOpen(false);
    };

    const onNumOptionClicked = value => () => {
        setNumSelectedOption(value);
        if(value === '전체'){
            setNumFilter('ALL');
        }
        else if(value === '1 : 1'){
            setNumFilter('ONE');
        }
        else if(value === '2 : 2'){
            setNumFilter('TWO');
        }
        else if(value === '3 : 3'){
            setNumFilter('THREE');
        }
        else if(value === '4 : 4'){
            setNumFilter('FOUR');
        }
        else if(value === '5 : 5'){
            setNumFilter('FIVE');
        }
        setNumIsOpen(false);
    }

    const getBoardList = async () => {
        try{
            setCurrentPage(0);
            const apiUrl = `http://140.238.14.81:8080/post?size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            setTotalPages(resp.data.totalPages);
            console.log(resp.data);
            console.log(resp.data.content);

        } catch (error) {
            navigate('/error');
        }
    };

    const getGenFilteredBoardList = async () => {
        try{
            setCurrentPage(0);
            const apiUrl = `http://140.238.14.81:8080/post/gender/${genderFilter}?size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            setTotalPages(resp.data.totalPages);
            console.log(resp.data);
            console.log(resp.data.content);

        } catch (error) {
            navigate('/error');
        }
    }

    const getNumFilteredBoardList = async () => {
        try {
            const apiUrl = `http://140.238.14.81:8080/post/number/${numFilter}?size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            setTotalPages(resp.data.totalPages);
            console.log(resp.data);
            console.log(resp.data.content);
        } catch (error) {
            navigate('/error');
        }
    }

    const getFilteredBoardList = async () => {
        try{
            setCurrentPage(0);
            const apiUrl = `http://140.238.14.81:8080/post/filter?number=${numFilter}&gender=${genderFilter}&size=${postsPerPage}&page=${currentPage}&sort=createdDate,desc`;

            const resp = await axios.get(apiUrl);
            setBoardList(resp.data);
            setTotalPages(resp.data.totalPages);
            console.log(resp.data);
            console.log(resp.data.content);

        } catch (error) {
            navigate('/error');
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
            navigate('/error');
        }
    }

    useEffect(() => {
        if(!userId) {
            navigate('/');
        }
        if(genderFilter == 'ALL' && numFilter == 'ALL') {
            getBoardList(currentPage);
        }
        else if(genderFilter == 'ALL' && numFilter != 'ALL') {
            getNumFilteredBoardList(currentPage);
        }
        else if(genderFilter != 'ALL' && numFilter == 'ALL') {
            getGenFilteredBoardList(currentPage);
        }
        else {
            getFilteredBoardList(currentPage);
        }
    }, [currentPage, genderFilter, numFilter]);

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
        setCurrentPage(selectedPage.selected);
    };

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    }

    return(
        <div className="desktop">
            {userId && (
            <div className="div">
                <div className="banner-top">
                    <Link to="/main" style={{textDecoration: 'none'}}>
                        <div className="text-wrapper">DASOM</div>
                    </Link>
                    <div id="profile">
                        <div className="top-nickname">
                            <Link to="/mypage" id="nickname_to_mypage" title="마이페이지">
                                {localStorage.getItem('nickname')}
                            </Link>님
                        </div>
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
                        <button onClick={handleLogout} className="logout_button">
                            로그아웃
                        </button>
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
                    <div className="banner_bottom_main">
                        <div className="gender_filter">
                        <div className="filter">
                        <div className="dd-wrapper" onClick={toggling}>
                            <button 
                                className="dd-header-main"    
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2014 18.705C19.4665 18.0275 17.5564 17.9416 15.7676 18.4606C13.9788 18.9796 12.4114 20.0746 11.3085 21.5755C10.2057 23.0765 9.62906 24.8995 9.66821 26.7617C9.70735 28.6238 10.3601 30.421 11.525 31.8742C12.69 33.3275 14.3021 34.3556 16.1111 34.799C17.9201 35.2424 19.8249 35.0763 21.5298 34.3265C23.2348 33.5767 24.6446 32.285 25.5404 30.652C26.4363 29.0191 26.768 27.1361 26.4843 25.2952C26.4601 25.1384 26.4672 24.9783 26.5049 24.8242C26.5426 24.67 26.6104 24.5248 26.7042 24.3968C26.7981 24.2689 26.9162 24.1606 27.0519 24.0783C27.1876 23.996 27.3382 23.9412 27.495 23.9171C27.6519 23.893 27.812 23.9 27.9661 23.9378C28.1203 23.9755 28.2655 24.0432 28.3934 24.1371C28.5214 24.231 28.6296 24.3491 28.7119 24.4848C28.7942 24.6205 28.849 24.771 28.8731 24.9279C29.2376 27.2946 28.8107 29.7154 27.6586 31.8147C26.5066 33.914 24.6939 35.5744 22.5019 36.5382C20.3098 37.502 17.8608 37.7153 15.5351 37.1451C13.2094 36.5749 11.1369 35.2529 9.63925 33.3845C8.14159 31.516 7.30251 29.2054 7.25222 26.8114C7.20192 24.4173 7.94322 22.0735 9.36108 20.1438C10.7789 18.2141 12.7941 16.8063 15.0938 16.1389C17.3935 15.4715 19.8493 15.5818 22.0799 16.4526C22.2297 16.5088 22.3669 16.5942 22.4835 16.7039C22.6 16.8135 22.6937 16.9452 22.7589 17.0914C22.8242 17.2375 22.8597 17.3951 22.8636 17.5551C22.8674 17.7151 22.8394 17.8742 22.7812 18.0233C22.7231 18.1724 22.6359 18.3084 22.5247 18.4235C22.4135 18.5386 22.2806 18.6305 22.1336 18.6938C21.9866 18.7571 21.8285 18.7906 21.6685 18.7923C21.5085 18.794 21.3497 18.7651 21.2014 18.705Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9167 47.125V37.4583C16.9167 37.1379 17.044 36.8305 17.2706 36.6039C17.4972 36.3773 17.8046 36.25 18.125 36.25C18.4455 36.25 18.7528 36.3773 18.9794 36.6039C19.206 36.8305 19.3334 37.1379 19.3334 37.4583V47.125C19.3334 47.4455 19.206 47.7528 18.9794 47.9794C18.7528 48.206 18.4455 48.3333 18.125 48.3333C17.8046 48.3333 17.4972 48.206 17.2706 47.9794C17.044 47.7528 16.9167 47.4455 16.9167 47.125Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2917 41.0833C13.2917 40.7629 13.419 40.4555 13.6456 40.2289C13.8722 40.0023 14.1796 39.875 14.5 39.875H21.75C22.0705 39.875 22.3778 40.0023 22.6044 40.2289C22.831 40.4555 22.9584 40.7629 22.9584 41.0833C22.9584 41.4038 22.831 41.7111 22.6044 41.9378C22.3778 42.1644 22.0705 42.2917 21.75 42.2917H14.5C14.1796 42.2917 13.8722 42.1644 13.6456 41.9378C13.419 41.7111 13.2917 41.4038 13.2917 41.0833ZM34.9233 18.4428C33.5842 18.0648 32.1725 18.0229 30.8134 18.321C29.4543 18.619 28.1896 19.2478 27.1316 20.1515C26.0736 21.0552 25.2549 22.206 24.7481 23.5018C24.2412 24.7976 24.0618 26.1985 24.2259 27.5802C24.2455 27.7382 24.2337 27.8985 24.1911 28.0519C24.1486 28.2054 24.0762 28.3489 23.978 28.4742C23.8798 28.5995 23.7578 28.7042 23.619 28.7822C23.4803 28.8603 23.3274 28.9101 23.1693 28.9289C23.0112 28.9477 22.851 28.9351 22.6978 28.8917C22.5446 28.8484 22.4015 28.7752 22.2767 28.6764C22.1519 28.5775 22.0478 28.455 21.9705 28.3158C21.8932 28.1766 21.8441 28.0236 21.8261 27.8654C21.5438 25.4874 22.0543 23.0828 23.2783 21.0246C24.5024 18.9664 26.3715 17.3697 28.5957 16.4824C30.8199 15.5951 33.2748 15.4667 35.5794 16.1172C37.8841 16.7677 39.9095 18.1607 41.3415 20.08C42.7736 21.9993 43.532 24.3376 43.4993 26.7321C43.4665 29.1265 42.6444 31.4432 41.1604 33.3226C39.6764 35.202 37.6136 36.5391 35.292 37.1263C32.9705 37.7135 30.52 37.518 28.3209 36.5702C28.1752 36.5074 28.0432 36.4166 27.9326 36.3028C27.822 36.1891 27.7348 36.0546 27.6761 35.9072C27.5576 35.6095 27.5622 35.2768 27.689 34.9825C27.8157 34.6881 28.0542 34.4562 28.352 34.3376C28.6497 34.2191 28.9824 34.2238 29.2767 34.3505C30.3398 34.8085 31.4856 35.0435 32.6432 35.0408C33.8008 35.0381 34.9455 34.7979 36.0064 34.3349C37.0674 33.872 38.022 33.1962 38.8113 32.3494C39.6005 31.5026 40.2075 30.5028 40.5947 29.4119C40.9819 28.321 41.1411 27.1623 41.0624 26.0074C40.9837 24.8525 40.6688 23.726 40.1371 22.6978C39.6055 21.6695 38.8684 20.7613 37.9716 20.0294C37.0747 19.2975 36.0372 18.7575 34.9233 18.4428Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M39.6249 20.7918C39.3984 20.5652 39.2711 20.2579 39.2711 19.9375C39.2711 19.6171 39.3984 19.3098 39.6249 19.0832L48.6874 10.0207C48.7989 9.90528 48.9322 9.81322 49.0796 9.74989C49.227 9.68657 49.3856 9.65323 49.546 9.65184C49.7065 9.65045 49.8656 9.68102 50.0141 9.74178C50.1626 9.80253 50.2975 9.89225 50.411 10.0057C50.5244 10.1192 50.6141 10.2541 50.6749 10.4026C50.7356 10.5511 50.7662 10.7102 50.7648 10.8706C50.7634 11.0311 50.7301 11.1896 50.6668 11.337C50.6034 11.4845 50.5114 11.6178 50.396 11.7293L41.3335 20.7918C41.1069 21.0183 40.7996 21.1456 40.4792 21.1456C40.1588 21.1456 39.8515 21.0183 39.6249 20.7918Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M49.4498 18.125C49.2911 18.1229 49.1344 18.0896 48.9886 18.027C48.8428 17.9644 48.7107 17.8737 48.6 17.76C48.4892 17.6463 48.402 17.512 48.3431 17.3646C48.2843 17.2172 48.2551 17.0596 48.2572 16.9009L48.3176 12.099L43.5157 12.1594C43.1952 12.1636 42.8862 12.0403 42.6567 11.8166C42.4271 11.593 42.2958 11.2873 42.2917 10.9668C42.2875 10.6463 42.4108 10.3373 42.6345 10.1078C42.8581 9.87824 43.1638 9.74694 43.4843 9.74277L50.7657 9.65094L50.6739 16.9324C50.6718 17.091 50.6385 17.2478 50.5759 17.3936C50.5133 17.5394 50.4225 17.6715 50.3089 17.7822C50.1952 17.893 50.0609 17.9802 49.9135 18.039C49.7661 18.0979 49.6085 18.1271 49.4498 18.125Z" fill="black"/>
                                </svg>
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
                        <div className="num-dropdown" onClick={numToggling}>
                            <button
                                className="num-dropdown-header"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                    <path d="M23.5 23.5C25.8372 23.5 28.0787 22.5715 29.7314 20.9189C31.384 19.2662 32.3125 17.0247 32.3125 14.6875C32.3125 12.3503 31.384 10.1088 29.7314 8.45612C28.0787 6.80346 25.8372 5.875 23.5 5.875C21.1628 5.875 18.9213 6.80346 17.2686 8.45612C15.616 10.1088 14.6875 12.3503 14.6875 14.6875C14.6875 17.0247 15.616 19.2662 17.2686 20.9189C18.9213 22.5715 21.1628 23.5 23.5 23.5ZM29.375 14.6875C29.375 16.2456 28.756 17.74 27.6543 18.8418C26.5525 19.9435 25.0581 20.5625 23.5 20.5625C21.9419 20.5625 20.4475 19.9435 19.3457 18.8418C18.244 17.74 17.625 16.2456 17.625 14.6875C17.625 13.1294 18.244 11.635 19.3457 10.5332C20.4475 9.43147 21.9419 8.8125 23.5 8.8125C25.0581 8.8125 26.5525 9.43147 27.6543 10.5332C28.756 11.635 29.375 13.1294 29.375 14.6875ZM41.125 38.1875C41.125 41.125 38.1875 41.125 38.1875 41.125H8.8125C8.8125 41.125 5.875 41.125 5.875 38.1875C5.875 35.25 8.8125 26.4375 23.5 26.4375C38.1875 26.4375 41.125 35.25 41.125 38.1875ZM38.1875 38.1758C38.1846 37.4531 37.7351 35.2794 35.7435 33.2878C33.8283 31.3725 30.2239 29.375 23.5 29.375C16.7731 29.375 13.1718 31.3725 11.2565 33.2878C9.26488 35.2794 8.81838 37.4531 8.8125 38.1758H38.1875Z" fill="#292929"/>
                                </svg>
                                {numSelectedOption}
                            </button>
                            {numIsOpen && (
                                <ul className="num-dropdown-list">
                                    {numOptions.map(num_option => (
                                        <li className="num-dropdown-list-item" onClick={onNumOptionClicked(num_option)}>
                                            {num_option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                            <button onClick={applyFilter} className="filter_button">게시글 필터 적용</button>
                        </div>
                        <div className="search">
                            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} type="text" className="searchbar" placeholder="게시물 검색"/>
                            <button className="search_button" onClick={() => handleSearch()}>검색</button>
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
                                        {genderEnumMapping[val.gender]}
                                    </span>
                                    <span>
                                        |
                                    </span>
                                    <span className = "box_count">
                                        {numberEnumMapping[val.number]}
                                    </span>
                                    <span>
                                        |
                                    </span>
                                    <span className = "box_date">
                                        {val.createdDate
                                            ? [
                                                val.createdDate[0],
                                                val.createdDate[1],
                                                val.createdDate[2],
                                            ].join('/') +
                                            ' ' +
                                            [
                                                val.createdDate[3].toString().padStart(2, '0'),
                                                val.createdDate[4].toString().padStart(2, '0'),
                                            ].join(':')
                                            : ''}
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
                    <div className="our-info-block">
                        <div className="our-info-left">
                            <div className="our-info-header">
                                DASOM
                            </div>
                            <div className="our-info-meant">
                                사랑을 뜻하는 순우리말, 아는 선배 없이 미팅해요
                            </div>
                            <div className="our-info-member">
                                <div className="our-info-developers">
                                    Developers
                                </div>
                                <div className="our-info-front">
                                    Front End: 권범준 김영균
                                </div>
                                <div className="our-info-back">
                                    Back End: 이아린 임주혁
                                </div>
                            </div>
                        </div>
                        <div className="our-info-right">
                            <div className="our-info-reps">
                                <div>
                                    <Link to="https://github.com/GHYoungKyun/DASOM_FE" className="our-info-link">
                                        <div className="our-info-github">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M14.9883 2.23535C7.74316 2.23242 1.875 8.09766 1.875 15.3369C1.875 21.0615 5.5459 25.9277 10.6582 27.7148C11.3467 27.8877 11.2412 27.3984 11.2412 27.0645V24.7939C7.26563 25.2598 7.10449 22.6289 6.83789 22.1895C6.29883 21.2695 5.02441 21.0352 5.40527 20.5957C6.31055 20.1299 7.2334 20.7129 8.30273 22.292C9.07617 23.4375 10.585 23.2441 11.3496 23.0537C11.5166 22.3652 11.874 21.75 12.3662 21.2725C8.24707 20.5342 6.53027 18.0205 6.53027 15.0322C6.53027 13.582 7.00781 12.249 7.94531 11.1738C7.34766 9.40137 8.00098 7.88379 8.08887 7.6582C9.79102 7.50586 11.5605 8.87695 11.6982 8.98535C12.665 8.72461 13.7695 8.58692 15.0059 8.58692C16.248 8.58692 17.3555 8.73047 18.3311 8.99414C18.6621 8.74219 20.3027 7.56445 21.8848 7.70801C21.9697 7.93359 22.6084 9.41602 22.0459 11.165C22.9951 12.2432 23.4785 13.5879 23.4785 15.041C23.4785 18.0352 21.75 20.5518 17.6191 21.2783C17.973 21.6263 18.2539 22.0412 18.4455 22.499C18.6372 22.9567 18.7357 23.4481 18.7354 23.9443V27.2402C18.7588 27.5039 18.7354 27.7646 19.1748 27.7646C24.3633 26.0156 28.0986 21.1143 28.0986 15.3398C28.0986 8.09766 22.2275 2.23535 14.9883 2.23535Z" fill="black"/>
                                                </svg>
                                            </div>
                                            <div className="our-info-link-text">
                                                Front End
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="https://github.com/SiwonHae/DASOM_BE" className="our-info-link">
                                        <div className="our-info-github">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                                    <path d="M14.9883 2.23535C7.74316 2.23242 1.875 8.09766 1.875 15.3369C1.875 21.0615 5.5459 25.9277 10.6582 27.7148C11.3467 27.8877 11.2412 27.3984 11.2412 27.0645V24.7939C7.26563 25.2598 7.10449 22.6289 6.83789 22.1895C6.29883 21.2695 5.02441 21.0352 5.40527 20.5957C6.31055 20.1299 7.2334 20.7129 8.30273 22.292C9.07617 23.4375 10.585 23.2441 11.3496 23.0537C11.5166 22.3652 11.874 21.75 12.3662 21.2725C8.24707 20.5342 6.53027 18.0205 6.53027 15.0322C6.53027 13.582 7.00781 12.249 7.94531 11.1738C7.34766 9.40137 8.00098 7.88379 8.08887 7.6582C9.79102 7.50586 11.5605 8.87695 11.6982 8.98535C12.665 8.72461 13.7695 8.58692 15.0059 8.58692C16.248 8.58692 17.3555 8.73047 18.3311 8.99414C18.6621 8.74219 20.3027 7.56445 21.8848 7.70801C21.9697 7.93359 22.6084 9.41602 22.0459 11.165C22.9951 12.2432 23.4785 13.5879 23.4785 15.041C23.4785 18.0352 21.75 20.5518 17.6191 21.2783C17.973 21.6263 18.2539 22.0412 18.4455 22.499C18.6372 22.9567 18.7357 23.4481 18.7354 23.9443V27.2402C18.7588 27.5039 18.7354 27.7646 19.1748 27.7646C24.3633 26.0156 28.0986 21.1143 28.0986 15.3398C28.0986 8.09766 22.2275 2.23535 14.9883 2.23535Z" fill="black"/>
                                                </svg>
                                            </div>
                                            <div className="our-info-link-text">
                                                Back End
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="our-info-license">
                                This work is licensed under the MIT license.
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!userId && (
                <>
                    <div>
                        DASOM을 이용하려면 로그인해 주세요...
                    </div>
                    <button onClick={handleLogout}>
                        로그인
                    </button>
                </>
            )}
            </div>
    );
}

export default Main;