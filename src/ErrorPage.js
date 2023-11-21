import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';
import './default.css';
import errorImage from './images/error_image.png'

const ErrorPage = () => {
    return (
        <div className="background">
            <div className="errorPage">
                <div>
                    <div className="Oops">
                        Oops!
                    </div>
                    <div className="error_report">
                        에러가 발생했습니다! <br /><br />
                        다시 시도해주세요
                    </div>
                    {/* 기타 에러 메시지나 유용한 정보를 여기에 추가할 수 있습니다. */}
                    <Link to="/main">
                        <button className="home_button">홈으로 돌아가기</button>
                    </Link>
                </div>
                <div className="error_image">
                    <img src={errorImage} style={{width: "600px", height: "600px"}}/>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;