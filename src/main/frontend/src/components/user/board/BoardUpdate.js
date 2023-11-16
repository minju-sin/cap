// src/components/user/board/BoardUpdate.js
/*
* 게시글 수정 페이지
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BoardUpdate() {
    const { articleId } = useParams(); // URL에서 articleId를 가져옴
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

    useEffect(() => {
        // 게시글 수정을 위한 초기 데이터 로딩
        axios.get(`/board/${articleId}`)
            .then((response) => {
                const articleData = response.data;
                setTitle(articleData.title);
                setOrderLink(articleData.orderLink);
                setContent(articleData.content);
                setAddress(articleData.address);
            })
            .catch((error) => {
                console.error('게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [articleId]);

    //  게시글 수정
    const handleSubmit = () => {
        // 수정된 게시글 내용을 서버에 보내고 저장하는 로직
        axios.post(`/board/${articleId}/update`, { title, content, orderLink, address})
            .then((response) => {
                // 수정 성공 시, 다른 페이지로 리다이렉트 또는 알림 처리
                window.location.href = '/board';
                console.log('게시글이 수정되었습니다.');
            })
            .catch((error) => {
                console.error('게시글 수정 중 오류가 발생했습니다:', error);
            });
    };


    return (
        <div>
            <h1>게시글 수정 페이지</h1>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>수정 완료</button>
        </div>
    );
}

export default BoardUpdate;
