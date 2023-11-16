//  src/components/user/board/BoardDetail.js
/*
* 게시글 작성 페이지
*/

import React, { useState } from 'react';
import axios from 'axios';

function BoardDetail() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [orderLink, setOrderLink] = useState('');
    const [address, setAddress] = useState('');

    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 가져와서 입력 필드를 업데이트
                setAddress(data.address);
            },
        }).open();
    };

    const handleSubmit = () => {
        const article = { title, content, orderLink, address};

        // 서버로 게시글 데이터를 보내는 POST 요청
        axios.post('/board/detail', article)
            .then(response => {
                // 게시글 작성 성공 시 작업을 수행
                console.log('게시글이 작성되었습니다.');
                window.location.href = "/board"; // 게시판 페이지로 리다이렉트

            })
            .catch(error => {
                // 오류 처리
                console.error('게시글 작성 중 오류가 발생했습니다:', error);
            });
    }

    return (
        <div>
            <h1>게시글 작성 페이지</h1>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="그룹주문링크"
                value={orderLink}
                onChange={e => setOrderLink(e.target.value)}
            />
            <input type="text" value={address} readOnly />
            <button onClick={openAddressSearch}>
                검색
            </button>
            <textarea
                placeholder="본문"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>작성</button>
        </div>
    );
}

export default BoardDetail;
