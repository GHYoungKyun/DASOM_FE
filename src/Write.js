import React, { useState } from 'react';
import Notification from './Notification';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Write.css';
import './default.css';
import bell from './images/bells.png';
import banner from './images/banner_image.png';
import gender_image from './images/gender.png';
import user_image from './images/user.png';

function Write() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState("");
    const writer = localStorage.getItem('nickname');
    const userId = localStorage.getItem('userId');
    const [gender, setGender] = useState('MALE');
    const [num, setNum] = useState('TWO');
    const [openKakaoAddress, setOpenKakaoAddress] = useState('');
    const genderOptions = ['남', '여'];
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const [isNumOpen, setIsNumOpen] = useState(false);
    const [genderSelected, setGenderSelected] = useState('남')
    const numOptions = ['1 : 1', '2 : 2', '3 : 3', '4 : 4', '5 : 5'];
    const [numSelected, setNumSelected] = useState('2 : 2');
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [alcohol, setAlcohol] = useState('0.5병');
    const [isAlOpen, setIsAlOpen] = useState(false);
    const alOptions = ['0.5병', '1병', '1.5병', '2병', '2.5병', '3병 이상'];
    const [genderClicked, setGenderClicked] = useState(false);
    const [numClicked, setNumClicked] = useState(false);
    const [alcoholClicked, setAlcoholClicked] = useState(false);

    const openNotification = () => {
        setIsNotificationOpen(true);
    };

    const closeNotification = () => {
        setIsNotificationOpen(false);
    };

    const gender_toggling = () => setIsGenderOpen(!isGenderOpen);

    const num_toggling = () => setIsNumOpen(!isNumOpen);

    const alcohol_toggling = () => setIsAlOpen(!isAlOpen);

    const genderOptionClicked = value => () => {

        if(value == '남'){
            setGender('MALE');
        }
        else if (value == '여'){
            setGender('FEMALE');
        }
        setGenderClicked(true);
        setGenderSelected(value);
    }

    const numOptionClicked = value => () => {

        if(value == '1 : 1'){
            setNum('ONE');
        }
        else if(value == '2 : 2'){
            setNum('TWO');
        }
        else if(value == '3 : 3'){
            setNum('THREE');
        }
        else if(value == '4 : 4'){
            setNum('FOUR');
        }
        else if(value == '5 : 5'){
            setNum('FIVE');
        }
        setNumClicked(true);
        setNumSelected(value);
    }

    const alcoholOptionClicked = value => () => {
        setAlcoholClicked(true);
        setAlcohol(value);
    }

    const postData = async () => {
        try {
            // POST 요청 보낼 엔드포인트 URL
            const apiUrl = 'http://140.238.14.81:8080/post';

            // 보낼 데이터
            const dataToSend = {
                title: title,
                content: content,
                openKakaoAddress: openKakaoAddress,
                userId: userId,
                gender: gender,
                number: num,
                alcohol: alcohol
                //location: location
            };

            // Axios를 사용하여 POST 요청 보내기
            const response = await axios.post(apiUrl, dataToSend);
            // 성공적으로 응답 받았을 때의 처리
            console.log('응답 데이터:', response.data);
            if(response.data) {
                navigate("/main");
            }
        } catch (error) {
            // 오류 발생 시의 처리
            navigate('/error');
            console.error('에러 발생:', error);
        }
    };
    function submit() {
        console.log(title);
        console.log(content);
        console.log(userId);
        console.log(gender);
        console.log(num);
        console.log(openKakaoAddress);
        console.log(alcohol);
        postData();
    }
    return(
        <div className="makeBlock">
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
            <div className="write_block">
                <div className="header">
                    게시글 등록
                </div>
                <div className="dropdown">
                    <div className="dd-gender" onClick={gender_toggling}>
                        <div className="filter-explain">
                            <svg width="47" height="47" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2014 18.705C19.4665 18.0275 17.5564 17.9416 15.7676 18.4606C13.9788 18.9796 12.4114 20.0746 11.3085 21.5755C10.2057 23.0765 9.62906 24.8995 9.66821 26.7617C9.70735 28.6238 10.3601 30.421 11.525 31.8742C12.69 33.3275 14.3021 34.3556 16.1111 34.799C17.9201 35.2424 19.8249 35.0763 21.5298 34.3265C23.2348 33.5767 24.6446 32.285 25.5404 30.652C26.4363 29.0191 26.768 27.1361 26.4843 25.2952C26.4601 25.1384 26.4672 24.9783 26.5049 24.8242C26.5426 24.67 26.6104 24.5248 26.7042 24.3968C26.7981 24.2689 26.9162 24.1606 27.0519 24.0783C27.1876 23.996 27.3382 23.9412 27.495 23.9171C27.6519 23.893 27.812 23.9 27.9661 23.9378C28.1203 23.9755 28.2655 24.0432 28.3934 24.1371C28.5214 24.231 28.6296 24.3491 28.7119 24.4848C28.7942 24.6205 28.849 24.771 28.8731 24.9279C29.2376 27.2946 28.8107 29.7154 27.6586 31.8147C26.5066 33.914 24.6939 35.5744 22.5019 36.5382C20.3098 37.502 17.8608 37.7153 15.5351 37.1451C13.2094 36.5749 11.1369 35.2529 9.63925 33.3845C8.14159 31.516 7.30251 29.2054 7.25222 26.8114C7.20192 24.4173 7.94322 22.0735 9.36108 20.1438C10.7789 18.2141 12.7941 16.8063 15.0938 16.1389C17.3935 15.4715 19.8493 15.5818 22.0799 16.4526C22.2297 16.5088 22.3669 16.5942 22.4835 16.7039C22.6 16.8135 22.6937 16.9452 22.7589 17.0914C22.8242 17.2375 22.8597 17.3951 22.8636 17.5551C22.8674 17.7151 22.8394 17.8742 22.7812 18.0233C22.7231 18.1724 22.6359 18.3084 22.5247 18.4235C22.4135 18.5386 22.2806 18.6305 22.1336 18.6938C21.9866 18.7571 21.8285 18.7906 21.6685 18.7923C21.5085 18.794 21.3497 18.7651 21.2014 18.705Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9167 47.125V37.4583C16.9167 37.1379 17.044 36.8305 17.2706 36.6039C17.4972 36.3773 17.8046 36.25 18.125 36.25C18.4455 36.25 18.7528 36.3773 18.9794 36.6039C19.206 36.8305 19.3334 37.1379 19.3334 37.4583V47.125C19.3334 47.4455 19.206 47.7528 18.9794 47.9794C18.7528 48.206 18.4455 48.3333 18.125 48.3333C17.8046 48.3333 17.4972 48.206 17.2706 47.9794C17.044 47.7528 16.9167 47.4455 16.9167 47.125Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2917 41.0833C13.2917 40.7629 13.419 40.4555 13.6456 40.2289C13.8722 40.0023 14.1796 39.875 14.5 39.875H21.75C22.0705 39.875 22.3778 40.0023 22.6044 40.2289C22.831 40.4555 22.9584 40.7629 22.9584 41.0833C22.9584 41.4038 22.831 41.7111 22.6044 41.9378C22.3778 42.1644 22.0705 42.2917 21.75 42.2917H14.5C14.1796 42.2917 13.8722 42.1644 13.6456 41.9378C13.419 41.7111 13.2917 41.4038 13.2917 41.0833ZM34.9233 18.4428C33.5842 18.0648 32.1725 18.0229 30.8134 18.321C29.4543 18.619 28.1896 19.2478 27.1316 20.1515C26.0736 21.0552 25.2549 22.206 24.7481 23.5018C24.2412 24.7976 24.0618 26.1985 24.2259 27.5802C24.2455 27.7382 24.2337 27.8985 24.1911 28.0519C24.1486 28.2054 24.0762 28.3489 23.978 28.4742C23.8798 28.5995 23.7578 28.7042 23.619 28.7822C23.4803 28.8603 23.3274 28.9101 23.1693 28.9289C23.0112 28.9477 22.851 28.9351 22.6978 28.8917C22.5446 28.8484 22.4015 28.7752 22.2767 28.6764C22.1519 28.5775 22.0478 28.455 21.9705 28.3158C21.8932 28.1766 21.8441 28.0236 21.8261 27.8654C21.5438 25.4874 22.0543 23.0828 23.2783 21.0246C24.5024 18.9664 26.3715 17.3697 28.5957 16.4824C30.8199 15.5951 33.2748 15.4667 35.5794 16.1172C37.8841 16.7677 39.9095 18.1607 41.3415 20.08C42.7736 21.9993 43.532 24.3376 43.4993 26.7321C43.4665 29.1265 42.6444 31.4432 41.1604 33.3226C39.6764 35.202 37.6136 36.5391 35.292 37.1263C32.9705 37.7135 30.52 37.518 28.3209 36.5702C28.1752 36.5074 28.0432 36.4166 27.9326 36.3028C27.822 36.1891 27.7348 36.0546 27.6761 35.9072C27.5576 35.6095 27.5622 35.2768 27.689 34.9825C27.8157 34.6881 28.0542 34.4562 28.352 34.3376C28.6497 34.2191 28.9824 34.2238 29.2767 34.3505C30.3398 34.8085 31.4856 35.0435 32.6432 35.0408C33.8008 35.0381 34.9455 34.7979 36.0064 34.3349C37.0674 33.872 38.022 33.1962 38.8113 32.3494C39.6005 31.5026 40.2075 30.5028 40.5947 29.4119C40.9819 28.321 41.1411 27.1623 41.0624 26.0074C40.9837 24.8525 40.6688 23.726 40.1371 22.6978C39.6055 21.6695 38.8684 20.7613 37.9716 20.0294C37.0747 19.2975 36.0372 18.7575 34.9233 18.4428Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.6249 20.7918C39.3984 20.5652 39.2711 20.2579 39.2711 19.9375C39.2711 19.6171 39.3984 19.3098 39.6249 19.0832L48.6874 10.0207C48.7989 9.90528 48.9322 9.81322 49.0796 9.74989C49.227 9.68657 49.3856 9.65323 49.546 9.65184C49.7065 9.65045 49.8656 9.68102 50.0141 9.74178C50.1626 9.80253 50.2975 9.89225 50.411 10.0057C50.5244 10.1192 50.6141 10.2541 50.6749 10.4026C50.7356 10.5511 50.7662 10.7102 50.7648 10.8706C50.7634 11.0311 50.7301 11.1896 50.6668 11.337C50.6034 11.4845 50.5114 11.6178 50.396 11.7293L41.3335 20.7918C41.1069 21.0183 40.7996 21.1456 40.4792 21.1456C40.1588 21.1456 39.8515 21.0183 39.6249 20.7918Z" fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M49.4498 18.125C49.2911 18.1229 49.1344 18.0896 48.9886 18.027C48.8428 17.9644 48.7107 17.8737 48.6 17.76C48.4892 17.6463 48.402 17.512 48.3431 17.3646C48.2843 17.2172 48.2551 17.0596 48.2572 16.9009L48.3176 12.099L43.5157 12.1594C43.1952 12.1636 42.8862 12.0403 42.6567 11.8166C42.4271 11.593 42.2958 11.2873 42.2917 10.9668C42.2875 10.6463 42.4108 10.3373 42.6345 10.1078C42.8581 9.87824 43.1638 9.74694 43.4843 9.74277L50.7657 9.65094L50.6739 16.9324C50.6718 17.091 50.6385 17.2478 50.5759 17.3936C50.5133 17.5394 50.4225 17.6715 50.3089 17.7822C50.1952 17.893 50.0609 17.9802 49.9135 18.039C49.7661 18.0979 49.6085 18.1271 49.4498 18.125Z" fill="black"/>
                            </svg>
                            모집성별
                        </div>
                        <button
                            className="gender-header"
                        >
                            <span className={`${genderClicked ? "selected" : ""}`}>
                                {genderSelected}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30" fill="none" id="univ_toggle_arrow">
                              <g clip-path="url(#clip0_203_5)">
                                <path d="M29.7598 7.98636C29.7598 7.7344 29.6602 7.47656 29.4668 7.2832C29.0801 6.89648 28.4473 6.89648 28.0605 7.2832L14.8242 20.5195L1.78125 7.47656C1.39453 7.08984 0.76172 7.08984 0.375002 7.47656C-0.011717 7.86328 -0.011717 8.49609 0.375002 8.88281L14.1211 22.6348C14.5078 23.0215 15.1406 23.0215 15.5273 22.6348L29.4668 8.69531C29.666 8.4961 29.7598 8.24417 29.7598 7.98636Z" fill="black"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_203_5">
                                  <rect width="30" height="30" fill="white" transform="matrix(-1 0 0 -1 30 30)"/>
                                </clipPath>
                              </defs>
                            </svg>
                        </button>
                        {isGenderOpen && (
                            <ul className="gender-list">
                                {genderOptions.map(genderOption => (
                                    <li className="gender-list-item" onClick={genderOptionClicked(genderOption)}>
                                        {genderOption}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="dd-num" onClick={num_toggling}>
                        <div className="filter-explain">
                            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                <path d="M23.5 23.5C25.8372 23.5 28.0787 22.5715 29.7314 20.9189C31.384 19.2662 32.3125 17.0247 32.3125 14.6875C32.3125 12.3503 31.384 10.1088 29.7314 8.45612C28.0787 6.80346 25.8372 5.875 23.5 5.875C21.1628 5.875 18.9213 6.80346 17.2686 8.45612C15.616 10.1088 14.6875 12.3503 14.6875 14.6875C14.6875 17.0247 15.616 19.2662 17.2686 20.9189C18.9213 22.5715 21.1628 23.5 23.5 23.5ZM29.375 14.6875C29.375 16.2456 28.756 17.74 27.6543 18.8418C26.5525 19.9435 25.0581 20.5625 23.5 20.5625C21.9419 20.5625 20.4475 19.9435 19.3457 18.8418C18.244 17.74 17.625 16.2456 17.625 14.6875C17.625 13.1294 18.244 11.635 19.3457 10.5332C20.4475 9.43147 21.9419 8.8125 23.5 8.8125C25.0581 8.8125 26.5525 9.43147 27.6543 10.5332C28.756 11.635 29.375 13.1294 29.375 14.6875ZM41.125 38.1875C41.125 41.125 38.1875 41.125 38.1875 41.125H8.8125C8.8125 41.125 5.875 41.125 5.875 38.1875C5.875 35.25 8.8125 26.4375 23.5 26.4375C38.1875 26.4375 41.125 35.25 41.125 38.1875ZM38.1875 38.1758C38.1846 37.4531 37.7351 35.2794 35.7435 33.2878C33.8283 31.3725 30.2239 29.375 23.5 29.375C16.7731 29.375 13.1718 31.3725 11.2565 33.2878C9.26488 35.2794 8.81838 37.4531 8.8125 38.1758H38.1875Z" fill="#292929"/>
                            </svg>
                            모집인원
                        </div>
                        <button
                            className="num-header"
                        >
                            <span className={`${numClicked ? "selected" : ""}`}>
                                {numSelected}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30" fill="none" id="univ_toggle_arrow">
                              <g clip-path="url(#clip0_203_5)">
                                <path d="M29.7598 7.98636C29.7598 7.7344 29.6602 7.47656 29.4668 7.2832C29.0801 6.89648 28.4473 6.89648 28.0605 7.2832L14.8242 20.5195L1.78125 7.47656C1.39453 7.08984 0.76172 7.08984 0.375002 7.47656C-0.011717 7.86328 -0.011717 8.49609 0.375002 8.88281L14.1211 22.6348C14.5078 23.0215 15.1406 23.0215 15.5273 22.6348L29.4668 8.69531C29.666 8.4961 29.7598 8.24417 29.7598 7.98636Z" fill="black"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_203_5">
                                  <rect width="30" height="30" fill="white" transform="matrix(-1 0 0 -1 30 30)"/>
                                </clipPath>
                              </defs>
                            </svg>
                        </button>
                        {isNumOpen && (
                        <ul className="num-list">
                            {numOptions.map(numOption => (
                                <li className="num-list-item" onClick={numOptionClicked(numOption)}>
                                    {numOption}
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                </div>
                <div className="dd-num" id="alcohol-dd" onClick={alcohol_toggling}>
                    <div className="filter-explain">
                            <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
                                <path d="M29.375 19.0938C29.375 18.7042 29.2203 18.3306 28.9448 18.0552C28.6694 17.7797 28.2958 17.625 27.9062 17.625C27.5167 17.625 27.1431 17.7797 26.8677 18.0552C26.5922 18.3306 26.4375 18.7042 26.4375 19.0938V33.7812C26.4375 34.1708 26.5922 34.5444 26.8677 34.8198C27.1431 35.0953 27.5167 35.25 27.9062 35.25C28.2958 35.25 28.6694 35.0953 28.9448 34.8198C29.2203 34.5444 29.375 34.1708 29.375 33.7812V19.0938ZM22.0312 17.625C22.4208 17.625 22.7944 17.7797 23.0698 18.0552C23.3453 18.3306 23.5 18.7042 23.5 19.0938V33.7812C23.5 34.1708 23.3453 34.5444 23.0698 34.8198C22.7944 35.0953 22.4208 35.25 22.0312 35.25C21.6417 35.25 21.2681 35.0953 20.9927 34.8198C20.7172 34.5444 20.5625 34.1708 20.5625 33.7812V19.0938C20.5625 18.7042 20.7172 18.3306 20.9927 18.0552C21.2681 17.7797 21.6417 17.625 22.0312 17.625ZM17.625 19.0938C17.625 18.7042 17.4703 18.3306 17.1948 18.0552C16.9194 17.7797 16.5458 17.625 16.1562 17.625C15.7667 17.625 15.3931 17.7797 15.1177 18.0552C14.8422 18.3306 14.6875 18.7042 14.6875 19.0938V33.7812C14.6875 34.1708 14.8422 34.5444 15.1177 34.8198C15.3931 35.0953 15.7667 35.25 16.1562 35.25C16.5458 35.25 16.9194 35.0953 17.1948 34.8198C17.4703 34.5444 17.625 34.1708 17.625 33.7812V19.0938ZM15.4219 2.9375C13.669 2.9375 11.9878 3.63384 10.7483 4.87334C9.50884 6.11284 8.8125 7.79396 8.8125 9.54688V39.6562C8.8125 40.8249 9.27673 41.9456 10.1031 42.7719C10.9294 43.5983 12.0501 44.0625 13.2188 44.0625H30.8438C32.0124 44.0625 33.1331 43.5983 33.9594 42.7719C34.7858 41.9456 35.25 40.8249 35.25 39.6562V35.25H37.4531C39.206 35.25 40.8872 34.5537 42.1267 33.3142C43.3662 32.0747 44.0625 30.3935 44.0625 28.6406V18.3594C44.0625 16.6065 43.3662 14.9253 42.1267 13.6858C40.8872 12.4463 39.206 11.75 37.4531 11.75H35.25V9.54688C35.25 7.79396 34.5537 6.11284 33.3142 4.87334C32.0747 3.63384 30.3935 2.9375 28.6406 2.9375H15.4219ZM35.25 14.6875H37.4531C39.48 14.6875 41.125 16.3325 41.125 18.3594V28.6406C41.125 30.6675 39.48 32.3125 37.4531 32.3125H35.25V14.6875ZM11.75 9.54688C11.75 7.52 13.395 5.875 15.4219 5.875H28.6406C30.6675 5.875 32.3125 7.52 32.3125 9.54688V11.75H11.75V9.54688ZM11.75 14.6875H32.3125V39.6562C32.3125 40.0458 32.1578 40.4194 31.8823 40.6948C31.6069 40.9703 31.2333 41.125 30.8438 41.125H13.2188C12.8292 41.125 12.4556 40.9703 12.1802 40.6948C11.9047 40.4194 11.75 40.0458 11.75 39.6562V14.6875Z" fill="black"/>
                            </svg>
                        평균주량
                    </div>
                        <button
                            className="num-header"
                        >
                            <span className={`${alcoholClicked ? "selected" : ""}`}>
                                {alcohol}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30" fill="none" id="univ_toggle_arrow">
                              <g clip-path="url(#clip0_203_5)">
                                <path d="M29.7598 7.98636C29.7598 7.7344 29.6602 7.47656 29.4668 7.2832C29.0801 6.89648 28.4473 6.89648 28.0605 7.2832L14.8242 20.5195L1.78125 7.47656C1.39453 7.08984 0.76172 7.08984 0.375002 7.47656C-0.011717 7.86328 -0.011717 8.49609 0.375002 8.88281L14.1211 22.6348C14.5078 23.0215 15.1406 23.0215 15.5273 22.6348L29.4668 8.69531C29.666 8.4961 29.7598 8.24417 29.7598 7.98636Z" fill="black"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_203_5">
                                  <rect width="30" height="30" fill="white" transform="matrix(-1 0 0 -1 30 30)"/>
                                </clipPath>
                              </defs>
                            </svg>
                        </button>
                        {isAlOpen && (
                        <ul className="num-list">
                            {alOptions.map(alOption => (
                                <li className="num-list-item" onClick={alcoholOptionClicked(alOption)}>
                                    {alOption}
                                </li>
                            ))}
                        </ul>
                        )}
                </div>
                <div className="write_submit">
                    <div className="submit_header">
                        제목<br />
                        <input type="text" id="title" onChange={(event) => setTitle(event.target.value)} placeholder="글 제목을 입력해주세요"/>
                    </div>
                    <div className="openkakaotalk">
                        오픈카카오톡 주소<br />
                        <input type="text" id="title" onChange={(event) => setOpenKakaoAddress(event.target.value)} placeholder="오픈카카오톡 주소를 입력해주세요"/>
                    </div>
                    <div className="content">
                        <textarea id="content" onChange={(event) => setContent(event.target.value)} placeholder="간단한 소개글을 입력해주세요"/>
                    </div>
                </div>
                <div className="submit_button">
                    <Link to="/main">
                        <button className="cancel_button">취소</button>
                    </Link>
                    <button onClick={submit} className="upload_button">글 등록</button>
                </div>
            </div>
        </div>
    );
}

export default Write;