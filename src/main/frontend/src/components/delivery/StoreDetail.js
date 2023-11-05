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
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태
    const [menus, setMenus] = useState([]);
    const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보 (모달창으로 보여줌)
    const [orderItems, setOrderItems] = useState([]); // 주문 내역 관리
    const { storeId } = useParams();

    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
    };

    // 주문표 함수
    const addToCart = (menu) => {
        // 이미 주문 내역에 메뉴가 있는지 확인
        const existingItem = orderItems.find((item) => item.menuId === menu.menuId);
        if (existingItem) {
            // 이미 주문 내역에 메뉴가 있는 경우, 수량 증가
            const updatedOrderItems = orderItems.map((item) => {
                if (item.menuId === menu.menuId) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setOrderItems(updatedOrderItems);
        } else {
            // 주문 내역에 메뉴가 없는 경우, 새로 추가
            setOrderItems([...orderItems, { ...menu, quantity: 1 }]);
        }
        setShowModal(false);
    };


    //  메뉴 수량 증가 함수
    const increaseQuantity = (menu) => {
        const updatedOrderItems = orderItems.map((item) => {
            if (item.menuId === menu.menuId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setOrderItems(updatedOrderItems);
    };

    //  메뉴 수량 감소 함수
    const decreaseQuantity = (menu) => {
        const updatedOrderItems = orderItems.map((item) => {
            if (item.menuId === menu.menuId && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setOrderItems(updatedOrderItems);
    };

    //  주문표 총액
    const calculateTotal = () => {
        let total = 0;
        orderItems.forEach((item) => {
            total += item.mmoney * item.quantity;
        });
        total += menus.length > 0 ? menus[0].store.stip : 0; // 배달팁 추가
        return total;
    };

    // 주문표 삭제
    const removeFromCart = (menu) => {
        // 해당 메뉴를 주문표에서 제거
        const updatedOrderItems = orderItems.filter((item) => item.menuId !== menu.menuId);
        setOrderItems(updatedOrderItems);
    };

    // 주문표 비우기
    const clearCart = () => {
        setOrderItems([]);
    };


    useEffect(() => {
        //  가게 메뉴 불러오기
        axios.get(`/store/${storeId}`)
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                console.error('가게 메뉴를 불러오는 중 오류가 발생했습니다:', error);
            });

        // 서버로 현재 사용자의 인증 상태 확인을 위한 요청 보내기
        axios.get('/check-auth')
            .then(response => {
                if (response.data === 'authenticated') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('인증 상태 확인 중 오류가 발생했습니다:', error);
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
                {menus.length > 0 ? <p>💰{formatNumberWithCommas(menus[0].store.sorderMinimum)}원</p> : null}
                {menus.length > 0 ? <p>💲{formatNumberWithCommas(menus[0].store.stip)}원</p> : null}
                {menus.length > 0 ? <p>⏰{menus[0].store.stime}</p> : null}
                {menus.length > 0 ? <p>{menus[0].store.sopen}</p> : null}
                {menus.length > 0 ? <p>☎️{menus[0].store.sphone}</p> : null}
                {menus.length > 0 ? <p>🏠{menus[0].store.saddress}</p> : null}
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
                    {/* "담기" 버튼을 클릭하여 메뉴를 주문표에 추가 */}
                    {isAuthenticated && ( // 사용자가 로그인한 경우에만 버튼을 보이도록 함
                        <button onClick={() => addToCart(selectedMenu)}>담기</button>
                    )}
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}

            <div>
                <h2 className="order">주문표<button>그룹주문</button></h2>
                {orderItems.length > 0 ? (
                    <button onClick={clearCart}>전체 메뉴 삭제</button>
                    ) : null}
                <ul>
                    {orderItems.map((item) => (
                        <li key={item.menuId}>
                            {/* 메뉴 이름 */}
                            {item.mname}
                            {/* 수량 */}
                            <button onClick={() => decreaseQuantity(item)}>-</button>
                            {item.quantity}
                            <button onClick={() => increaseQuantity(item)}>+</button>
                            {/* 해당 메뉴와 수량 개수를 곱한 메뉴의 총 가격 */}
                            {formatNumberWithCommas(item.mmoney * item.quantity)}원
                            {/* 해당 메뉴 삭제 버튼 추가 */}
                            <button onClick={() => removeFromCart(item)}>삭제</button>
                        </li>
                    ))}
                </ul>
                {menus.length > 0 ? <p>배달팁: {formatNumberWithCommas(menus[0].store.stip)}원</p> : null}
                <p>총액: {formatNumberWithCommas(calculateTotal())}원</p>
                <button>주문하기</button>
            </div>

        </div>
    );
}

export default StoreDetail;
