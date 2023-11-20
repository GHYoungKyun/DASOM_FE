import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import './MyPage.css'
import { getByDisplayValue } from '@testing-library/react';

function MyPage() {
  const boxStyle = {
    border: '2px solid',
    borderColor: 'gray',
    borderRadius: '40px',
    height: '200px',
    margin: '30px',
    marginRight: '70px',
  }

  const contentStyle = {
    marginLeft: '30px',
  }

  const univStyle = {
    fontSize: '12px',
    padding: '7px',
    backgroundColor: 'gray',
    color: 'white',
    borderRadius: '14px',
    textAlign: 'center',
  }

  const countStyle = {
    fontSize: '12px',
    padding: '7px',
    paddingLeft: '30px',
    paddingRight: '30px',
    backgroundColor: 'rgb(26, 188, 156)',
    color: 'white',
    borderRadius: '14px',
    textAlign: 'center',
  }

  const headerStyle = {
    marginBottom: '40px',
  }

  const userStyle = {
    fontSize: '12px',
  }
  const [currentPage, pageChange] = useState('1');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  function MyRequest() {

    const [reqList, setReqList] = useState(null);
    const [req, setReq] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [reqCurrentPage, setReqCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const getReqList = async () => {
      try{
        const resp = await (await axios.get(`http://140.238.14.81:8080/request/${userId}?size=5&page=${reqCurrentPage}&sort=createdDate,desc`));
        setReqList(resp.data);
        setTotalPages(resp.data.totalPages);
        console.log(resp.data);
      } catch (error) {
        navigate('/error');
      }
    }

    useEffect(() => {
      getReqList();
    }, [reqCurrentPage]);

    const editReq = async () => {
      try {
        // POST 요청 보낼 엔드포인트 URL
        const apiUrl = `http://140.238.14.81:8080/request/${req.requestId.id}`;

        // 보낼 데이터
        const dataToSend = {
          title: req.title,
          content: req.content,
          userId: userId
        };

        // Axios를 사용하여 POST 요청 보내기
        const response = await axios.put(apiUrl, dataToSend);
        // 성공적으로 응답 받았을 때의 처리
        console.log('응답 데이터:', response.data);
        alert("수정되었습니다!")
        window.location.reload();
      } catch (error) {
        // 오류 발생 시의 처리
        navigate('/error');
        console.error('에러 발생:', error);
      }
    };

    const reqDelete = async (reqId) => {
      try{
        const resp = await (await axios.delete(`http://140.238.14.81:8080/request/${reqId}`));
        console.log(resp.data);

        alert("신청이 삭제되었습니다!");
      } catch (error) {
        navigate('/error');
      }
    }

    function handleDelete(reqId) {
      reqDelete(reqId);
    }

    function handleUpdate(req) {
      setIsUpdate(true);
      setReq(req);
    }

    function handleUpdateRequest() {
      editReq();
      setIsUpdate(false);
      console.log(req);
    }

    const handlePageClick = (selectedPage) => {
      setReqCurrentPage(selectedPage.selected);
      console.log(selectedPage.selected);
    };

    return (
        <>
        {reqList && reqList.content.map((val, idx) => (
            <>
            {isUpdate && (req.requestId.id == val.requestId.id) ? (
                  <div>
                    <div style={boxStyle}>
                      <p style={contentStyle} />
                      <span style={univStyle}>
              </span>
                      <h3 style={headerStyle}>
                        <input type="text" value={req.title} onChange={(event) => setReq({...req, title: event.target.value})} />
                      </h3>
                      <h3 style={headerStyle}>
                        <input type="text" value={req.content} onChange={(event) => setReq({...req, content: event.target.value})} />
                      </h3>
                      <hr />
                      <span style={userStyle}>
                    {req.nickname}
              </span>
                    </div>
                      <button onClick={() => handleUpdateRequest()}>확인</button>
                  </div>
            ) : (
                  <div>
                    <div style={boxStyle}>
                      <p style={contentStyle} />
                      <span style={univStyle}>
              </span>
                      <h3 style={headerStyle}>
                        {val.title}
                      </h3>
                      {val.content}
                      <hr />
                      <span style={userStyle}>
                    {val.nickname}
              </span>
                    </div>
                    {(val.result == null) && (
                        <>
                          {/*<Link to={`/editreq/${val.requestId.id}`}>*/}
                          <button onClick={() => handleUpdate(val)}>수정</button>
                          {/*</Link>*/}
                          <button onClick={() => handleDelete(val.requestId.id)}>삭제</button>
                        </>
                    )}
                  </div>
            )}
            </>
        ))}
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
        </>
    );
  }
  function MyPost() {
    const [postList, setPostList] = useState(null);
    const [postCurrentPage, setPostCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const getPostList = async () => {
      try{
        const resp = await (await axios.get(`http://140.238.14.81:8080/post/${userId}?size=5&page${postCurrentPage}&sort=createdDate,desc`));
        setPostList(resp.data);
        setTotalPages(resp.data.totalPages);
      } catch (error) {
        navigate('/error');
      }
    }

    useEffect(() => {
      getPostList();
    }, [currentPage]);

    const handlePageClick = (selectedPage) => {
      setPostCurrentPage(selectedPage.selected);
    };

    return (
        <>
          {postList && postList.content.map((val, idx) => (
              <Link to={`/read/${val.postId.id}`}>
                <div>
                  <div style={boxStyle}>
                    <p style={contentStyle} />
                    <span style={univStyle}>
                    {val.gender}
                    </span>
                    <h3 style={headerStyle}>
                      {val.title}
                    </h3>
                    <hr />
                    <span style={userStyle}>
                    {val.nickname}
                    </span>
                  </div>
                </div>
              </Link>
          ))}
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
        </>
    );
  }

  //request와 participate 함수 형태가 같고 가지고 오는 데이터만 다르기 때문에 output 함수에서 request 함수에 주는 값을 다르게 만들어서 participate 함수까지 구현

  function Info() {
    const ages = Array.from({length: 10}, (_, i) => i + 20);
    const imgContainerStyle = {
      position: 'relative',
      display: 'inline-block',
      width: '200px',
      height: '230px', // Change this
      marginTop: '30px'
    };
  
    const imgStyle = {
      display: 'block',
      width: '100%',
      height: '87%', // Change this
    };
  
    const buttonStyle = {
     position:'absolute', 
     bottom:'0', 
     right:'0'
  };


    const userId = localStorage.getItem('userId');
    const [userInfo, setUserInfo] = useState({});
    const [isDuplicated, setIsDuplicated] = useState(true);
    const [nickname, setNickname] = useState(localStorage.getItem('nickname'));
    const navigate = useNavigate();

    const getUser = async () => {
      try {
        const resp = await (await axios.get(`http://140.238.14.81:8080/users/${userId}`));
        setUserInfo(resp.data);
        console.log(resp.data);
      } catch (error) {
        navigate('/error');
      }
    }

    useEffect(() => {
      getUser();
    }, []);


    const getDupId = async () => {
      try {
        const resp = await (await axios.get(`http://140.238.14.81:8080/users/nickname/${userInfo.nickname}`));
        console.log(resp.data);

        if(!resp.data) {
          setIsDuplicated(false);
        }
      } catch (error) {
        navigate('/error');
      }
    }

    function handleDupId() {
      getDupId();
    }

    const editUser = async () => {
      try {
        // POST 요청 보낼 엔드포인트 URL
        const apiUrl = `http://140.238.14.81:8080/users/${userId}`;

        // 보낼 데이터
        const dataToSend = {
          nickname: userInfo.nickname
        };

        // Axios를 사용하여 POST 요청 보내기
        const response = await axios.put(apiUrl, dataToSend);
        // 성공적으로 응답 받았을 때의 처리
        console.log('응답 데이터:', response.data);
        alert("수정되었습니다!")
      } catch (error) {
        // 오류 발생 시의 처리
        navigate('/error');
      }
    };

    function handleEdit() {
      console.log(userInfo.nickname);
      localStorage.setItem('nickname', userInfo.nickname);
      editUser();
    }

    const handleQuit = async () => {
      try{
        const resp = await (await axios.delete(`http://140.238.14.81:8080/users/${userId}`));
        navigate('/');
      } catch (error) {
        navigate('/error');
      }
    }

    return (
      <>
        {userInfo && (
            <div>
              <label>
                <h3>닉네임</h3>
                <input type="text" value={userInfo.nickname} onChange={(event) => setUserInfo({...userInfo, nickname: event.target.value})} className="nickNameInput"/>
                {isDuplicated && (<button onClick={handleDupId}>닉네임 중복 확인 </button>)}
                {!isDuplicated && (<button onClick={handleEdit}>닉네임 수정</button>)}
              </label>
              <h3>{userInfo.school}</h3>
              <label>
              </label><br />
              <label>
                <button onClick={handleQuit}>회원탈퇴</button>
              </label>
            </div>
            //현재 받은 패널티 출력하는 함수
        )}
      </>
    );
  }

  function output() {
    if(currentPage === '1'){
      return <MyRequest />;
    }
    if(currentPage === '2'){
      return <MyPost />;
    }
    if(currentPage === '3'){
      return <Info />;
    }
  }

  function Colorchange(Value) {
    const disabledStyle = {
      color: 'gray',
      fontSize: '20px',
      border: 'none',
      backgroundColor: 'transparent',
      marginRight: '10px',
    }
    const enabledStyle = {
      color: 'black',
      fontSize: '20px',
      border: 'none',
      backgroundColor: 'transparent',
      marginRight: '10px',
    }
    if(currentPage === Value){
      return enabledStyle;
    }
    else {
      return disabledStyle;
    }
    //어떻게 통합된 value를 세개의 Colorchange 함수에 전달할 것인가?
  }

  return (
    <div className="main">
      <Link to="/main">
        <div className="pageName">
          <strong>DASOM</strong>
        </div>
      </Link>
      <h1>마이페이지</h1>
      <button onClick={() => pageChange('1')} style={Colorchange('1')}>
        신청한 미팅
      </button>
      <button onClick={() => pageChange('2')} style={Colorchange('2')}>
        작성한 게시글
      </button>
      <button onClick={() => pageChange('3')} style={Colorchange('3')}>
        내 정보
      </button>
      {output()}
    </div>
  );
}

export default MyPage;