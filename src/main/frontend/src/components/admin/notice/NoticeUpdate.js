// src/components/admin/notice/NoticeUpdate.js
/* 공지사항 수정 페이지*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function NoticeUpdate() {
    const { noticeId } = useParams(); // URL에서 noticeId를 가져옴
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // 공지사항 수정을 위한 초기 데이터 로딩
        axios.get(`/notice/${noticeId}`)
            .then((response) => {
                const noticeData = response.data;
                setTitle(noticeData.title);
                setContent(noticeData.content);
            })
            .catch((error) => {
                console.error('공지사항 데이터를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [noticeId]);

    //  공지사항 수정
    const handleSubmit = () => {
        // 수정된 공지사항 내용을 서버에 보내고 저장하는 로직
        axios.post(`/notice/${noticeId}/update`, { title, content })
            .then((response) => {
                // 수정 성공 시, 다른 페이지로 리다이렉트 또는 알림 처리
                window.location.href = '/notice';
                console.log('공지사항이 수정되었습니다.');
            })
            .catch((error) => {
                console.error('공지사항 수정 중 오류가 발생했습니다:', error);
            });
    };


    return (
        <div>
            <h1>공지사항 수정 페이지</h1>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="본문"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>수정 완료</button>
        </div>
    );
}

export default NoticeUpdate;
