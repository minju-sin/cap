// src/components/user/Profile.js
/*
* 학과, 비밀번호, 전화번호, 주소만 변경 가능
* 다른 것은 변경이 되지 않는다.
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState({
        userId: '',
        username: '',
        department: '',
        password: '',
        phone: '',
        address: '',
        detailsAddress: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    // address 상태와 이를 업데이트할 setAddress 함수
    const [address, setAddress] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');


    useEffect(() => {
        // 서버로부터 사용자 정보를 가져오기
        axios.get('/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                // 에러 처리
                console.error('프로필 정보를 가져오는 데 실패했습니다:', error);
            });
    }, []);

    //  회원 정보 수정 버튼
    const handleEdit = () => {
        setIsEditing(true);
    };

    //  회원 정보 업데이트 버튼
    const handleSave = () => {
        // 서버로 수정된 사용자 정보를 보내고 업데이트
        axios.post('/profile/update', user)
            .then(response => {
                setUser(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                // 에러 처리
                console.error('프로필 정보를 업데이트하는 데 실패했습니다:', error);
            });
    };

    // 회원 탈퇴 버튼
    const handleDelete = () => {
        // 회원 탈퇴 API를 호출
        axios.delete('/profile/delete')
            .then(response => {
                // 탈퇴에 성공하면 로그인 페이지로 리다이렉트 또는 다른 작업 수행
                window.location.href = '/login'; // 탈퇴 성공 후 로그인 페이지로 이동
            })
            .catch(error => {
                // 에러 처리
                console.error('회원탈퇴에 실패했습니다:', error);
            });
    };


    //  주소 API
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                // 선택한 주소를 selectedAddress 상태에 설정
                setSelectedAddress(data.address);
                // 도로명 주소를 user 상태에 설정
                setUser({ ...user, address: data.address });
            },
        }).open();
    };

    return (
        <div>
            <h1>마이 페이지</h1>
            <form>
                <div>
                    <label>아이디(학번):</label>
                    <input type="text" value={user.userId} readOnly />
                </div>
                <div>
                    <label>이름:</label>
                    <input type="text" value={user.username} readOnly />
                </div>
                <div>
                    <label>학과:</label>
                    {isEditing ? (
                        <input type="text" value={user.department} onChange={(e) => setUser({ ...user, department: e.target.value })} />
                    ) : (
                        <input type="text" value={user.department} readOnly />
                    )}
                </div>
                <div>
                    <label>비밀번호:</label>
                    {isEditing ? (
                        <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    ) : (
                        <input type="password" value={user.password} readOnly />
                    )}
                </div>
                <div>
                    <label>전화 번호:</label>
                    {isEditing ? (
                        <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                    ) : (
                        <input type="text" value={user.phone} readOnly />
                    )}
                </div>
                <div>
                    <label>도로명 주소:</label>
                    {isEditing ? (
                        <>
                            <input type="text" value={selectedAddress} readOnly />
                            <button type="button" onClick={openAddressSearch}>주소 검색</button>
                        </>
                    ) : (
                        <input type="text" value={user.address} readOnly />
                    )}
                </div>
                <div>
                    <label>상세 주소:</label>
                    {isEditing ? (
                        <input type="text" value={user.detailsAddress} onChange={(e) => setUser({ ...user, detailsAddress: e.target.value })} />
                    ) : (
                        <input type="text" value={user.detailsAddress} readOnly />
                    )}
                </div>
                {isEditing ? (
                    <button type="button" onClick={handleSave}>저장</button>
                ) : (
                    <div>
                        <button type="button" onClick={handleEdit}>정보 수정</button>
                        <button type="button" onClick={handleDelete}>회원 탈퇴</button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Profile;
