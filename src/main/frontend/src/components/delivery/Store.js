//  src/components/delivery/Store.js

/*
음식점 카테고리 별 페이지
* 한식, 일식, 중식, 야식, 치킨, 피자로 구분해서 음식점 보여줌
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';


// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Store() {
    const { category } = useParams();
    const [stores, setStores] = useState([]);

    useEffect(() => {
        axios.get(`/store/category?category=${category}`)
            .then(response => {
                setStores(response.data);
            })
            .catch(error => {
                console.error('가게 목록을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [category]);

    return (
        <div>
            <h1>{category} 카테고리 가게 목록</h1>
            <div className="store-list">
                {stores.map(store => (
                    <div key={store.storeId} className="store-item">
                        <Link to={`/store/${store.storeId}`}>
                            <h2>{store.sname}</h2>
                            <p>평점 ⭐{store.sgrade}</p>
                            <p>리뷰 {store.sreview}</p>
                            <p>최소 주문 금액: {formatNumberWithCommas(store.sorderMinimum)}원</p>
                            <p>배달 예상 시간: {store.stime}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Store;
