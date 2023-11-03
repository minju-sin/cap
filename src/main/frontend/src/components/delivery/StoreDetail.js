//  src/components/delivery/StoreDetail.js

/*
음식점 상세 페이지
* 가게 정보
* 메뉴
* 메뉴 클릭하면 모달창 나옴 -> 모달창에서 `주문 담기` 기능 사용 가능
* 음식점 상세 페이지에서 주문 기능 추가할거임 (단, 주문은 로그인한 상태여야 함)
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function StoreDetail({ match }) {
    const [menus, setMenus] = useState([]);
    const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보
    const { storeId } = useParams();

    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
    };

    const addToCart = (menu) => {
        // TODO: 선택한 메뉴를 장바구니에 추가하는 로직을 구현하기
        // 이 부분은 장바구니 기능과 연동
        console.log(`메뉴를 장바구니에 추가: ${menu.mname}`);
    };

    useEffect(() => {
        axios.get(`/store/${storeId}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('가게 메뉴를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [storeId]);

    return (
        <div>
            <div>
                <h1>가게 정보</h1>
                {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                    배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                {menus.length > 0 ? <p>{menus[0].store.sname}</p> : null}
                {menus.length > 0 ? <p>⭐{menus[0].store.sgrade}</p> : null}
                {menus.length > 0 ? <p>{formatNumberWithCommas(menus[0].store.sreview)}</p> : null}
                {menus.length > 0 ? <p>{formatNumberWithCommas(menus[0].store.sorderMinimum)}원</p> : null}
                {menus.length > 0 ? <p>{formatNumberWithCommas(menus[0].store.stip)}원</p> : null}
                {menus.length > 0 ? <p>{menus[0].store.stime}</p> : null}
                {menus.length > 0 ? <p>{menus[0].store.sopen}</p> : null}
                {menus.length > 0 ? <p>{menus[0].store.sphone}</p> : null}
                {menus.length > 0 ? <p>{menus[0].store.saddress}</p> : null}
            </div>

            <h1>가게 메뉴 리스트</h1>
            <div className="menu-list">
                {menus.map(menu => (
                    <div key={menu.menuId} className="menu-item" onClick={() => toggleModal(menu)}>

                        {/*  메뉴 이름 - 메뉴 소개 - 가격 순서로 작성함 */}
                        <h2>{menu.mname}</h2>
                        <p>{menu.mintro}</p>
                        <p>{formatNumberWithCommas(menu.mmoney)}원</p>
                    </div>
                ))}
            </div>

            {/* 모달 내용 추가 */}
            {showModal && selectedMenu && (
                <div className="menu-modal">
                    <h2>{selectedMenu.mname}</h2>
                    <p>{selectedMenu.mintro}</p>
                    <p>{formatNumberWithCommas(selectedMenu.mmoney)}원</p>
                    {/* "담기" 버튼을 클릭하여 메뉴를 장바구니에 추가 */}
                    <button onClick={() => addToCart(selectedMenu)}>담기</button>
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}
        </div>
    );
}

export default StoreDetail;
