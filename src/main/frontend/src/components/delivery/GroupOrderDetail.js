//  src/components/delivery/GroupOrderDetail.js

/*
그룹 주문 최종 페이지
* 요청사항 + 배달지 + 호스트(방장)의 전화번호 입력
* 입력은 호스트(방장)만 가능함
*/

// src/components/user/board/Board.js
/*
* 게시판 페이지
* 작성된 게시글을 테이블 형태로 나타냄
* 순번, 제목, 작성자, 작성일 순서로 테이블 구성
* 로그인 성공 후  `글쓰기` 버튼 이용 가능
* 로그인 전에는 `글쓰기` 버튼 보이지 않도록 구현함
*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GroupOrderDetail() {

    useEffect(() => {

    }, []);



    return (
        <div>
            <h1>배달지 입력 페이지</h1>
            <p>
                배달지 + 요청사항 입력창이 보이고,
                주문표를 옆에 보여준다.
                그리고 모두 입력했으면 주문버튼을 눌러 그룹 주문을 끝낸다.
            </p>


        </div>
    );
}

export default GroupOrderDetail;
