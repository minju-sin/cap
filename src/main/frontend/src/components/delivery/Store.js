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
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

    useEffect(() => {
        axios.get(`/store/category?category=${category}`)
            .then(response => {
                setStores(response.data);
            })
            .catch(error => {
                console.error('가게 목록을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [category]);

    // 검색 요청 함수
    const handleSearch = () => {
        // 검색어를 사용하여 서버로 검색 요청을 보냄
        axios.get(`/store/category?category=${category}&search=${searchTerm}`)
            .then((response) => {
                setStores(response.data);
            })
            .catch((error) => {
                console.error('가게 검색 중 오류가 발생했습니다:', error);
            });
    };

    return (
        <div>
            <div>
                <Link to="/store/category/KOREAN">한식</Link>
                <Link to="/store/category/JAPANESE">일식</Link>
                <Link to="/store/category/CHINESE">중식</Link>
                <Link to="/store/category/NIGHT">야식</Link>
                <Link to="/store/category/CHICKEN">치킨</Link>
                <Link to="/store/category/PIZZA">피자</Link>
            </div>
            <h1>{category} 카테고리 가게 목록</h1>
            <div>
                <input
                    type="text"
                    placeholder="가게를 검색하세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className="store-list">
                {stores.map(store => (
                    <div key={store.storeId} className="store-item">
                        <Link to={`/store/${store.storeId}`}>
                            <h2>{store.sname}</h2>
                            <p>평점 ⭐{store.sgrade}</p>
                            <p>리뷰 {formatNumberWithCommas(store.sreview)}</p>
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
