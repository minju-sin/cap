//  src/components/admin/notice/NoticeDetail.js

import React, { useState } from 'react';
import axios from 'axios';

function NoticeDetail() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        const notice = { title, content };

        // 서버로 공지사항 데이터를 보내는 POST 요청
        axios.post('/notice/detail', notice)
            .then(response => {
                // 공지사항 작성 성공 시 작업을 수행
                console.log('공지사항이 작성되었습니다.');
                window.location.href = "/notice"; // 게시판 페이지로 리다이렉트

            })
            .catch(error => {
                // 오류 처리
                console.error('공지사항 작성 중 오류가 발생했습니다:', error);
            });
    }

    return (
        <div>
            <h1>공지사항 작성 페이지</h1>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                placeholder="본문"
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>작성</button>
        </div>
    );
}

export default NoticeDetail;
