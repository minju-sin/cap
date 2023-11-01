//  src/components/delivery/StoreDetail.js

/*
음식점 상세 페이지
* 가게 정보
* 메뉴 
* 음식점 상세 페이지에서 주문 기능 추가할거임 (단, 주문은 로그인한 상태여야 함)
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StoreDetail() {
    const { storeId } = useParams(); // 파라미터로 가게 ID 가져오기
    const [store, setStore] = useState(null);

    useEffect(() => {
        // 서버로부터 해당 가게의 상세 정보 가져오기
        axios.get(`/store/${storeId}`)
            .then(response => {
                setStore(response.data);
            })
            .catch(error => {
                console.error('가게 상세 정보를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [storeId]);

    return (
        <div>
            {store ? (
                <div>
                    <h1>{store.sname}</h1>
                    <p>주소: {store.saddress}</p>
                    <p>평점: {store.sgrade}</p>
                    <p>리뷰수: {store.sreview}</p>
                    <p>최소 주문 금액: {formatNumberWithCommas(store.sorderMinimum)}원</p>
                    <p>배달 요금: {formatNumberWithCommas(store.stip)} 원</p>
                    <p>영업 시간: {store.sopen}</p>
                    <p>배송 예상 시간: {store.stime}</p>
                    <p>휴무일: {store.closedDay}</p>
                </div>
            ) : (
                <p>가게 상세 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default StoreDetail;
