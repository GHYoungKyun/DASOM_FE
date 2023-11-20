import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h2>에러가 발생했습니다. 죄송합니다.</h2>
            {/* 기타 에러 메시지나 유용한 정보를 여기에 추가할 수 있습니다. */}
            <Link to="/main">
                <button>홈으로 돌아가기</button>
            </Link>
        </div>
    );
};

export default ErrorPage;