/*
* 사용자 관리 페이지
* 관리자만 접근 가능
* 관리자를 제외한 나머지 모든 사용자 정보를 테이블 형식으로 저장
* 사용자 삭제 가능 -> db에 저장된 사용자 삭제
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function Management() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // 서버로부터 사용자 목록을 가져오는 요청을 보냅니다.
        axios.get('/management')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('사용자 목록을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, []);

    const handleDeleteUser = (userId) => {
        // 사용자 삭제 요청 보내기
        axios.post(`/management/delete/${userId}`)
            .then(response => {
                // 삭제 요청이 성공하면 사용자 목록을 업데이트합니다.
                if (response.data === '사용자 삭제 성공') {
                    setUsers(users.filter(user => user.userId !== userId));
                } else {
                    // 삭제 실패 시 에러 처리
                    console.error('사용자 삭제에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error('사용자 삭제 요청 중 오류가 발생했습니다:', error);
            });
    };

    return (
        <div>
            <h1>사용자 관리</h1>
            <Link to={`/`}>
                <button type="button">메인 페이지 이동</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>학과</th>
                    <th>전화 번호</th>
                    <th>주소</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.department}</td>
                        <td>{user.phone}</td>
                        <td>{user.address} {user.detailsAddress}</td>
                        <td>
                            <button onClick={() => handleDeleteUser(user.userId)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Management;

