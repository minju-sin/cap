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
    //  주문 항목을 보여주는 상태
    const [orderItemsDisplay, setOrderItemsDisplay] = useState([]);
    //  주문 항목의 수량을 관리하는 상태
    const [itemQuantities, setItemQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);    //  총 주문 가격 상태


    // 주문하기 버튼을 클릭할 때 호출되는 함수
    const placeOrder = () => {
        // 여기에서 주문을 서버로 보내는 로직을 구현할 수 있습니다.
        // 주문 내역은 orderItems에, 총 주문 가격은 totalOrderPrice에 있습니다.
        // 또한 배달팁도 totalOrderPrice에 반영되어야 합니다.
        // 서버로 주문을 보내는 코드를 추가해주세요.
    };

    // 메뉴를 주문 항목에 추가하는 함수
    const addToOrder = (menu) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.menuId === menu.menuId);
            if (existingItem) {
                // 메뉴가 이미 주문 항목에 있다면 수량만 증가
                setItemQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [menu.menuId]: (prevQuantities[menu.menuId] || 1) + 1,
                }));
                return prevItems.map((item) =>
                    item.menuId === menu.menuId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // 새 메뉴를 주문 항목에 추가
                setItemQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [menu.menuId]: 1,
                }));
                return [...prevItems, { ...menu, quantity: 1 }];
            }
        });
        setShowModal(false); // 모달을 닫음
    };

    // 수량을 증가시키는 함수
    const incrementQuantity = (menuId) => {
        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [menuId]: (prevQuantities[menuId] || 1) + 1,
        }));
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.menuId === menuId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // 수량을 감소시키는 함수
    const decrementQuantity = (menuId) => {
        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [menuId]: Math.max((prevQuantities[menuId] || 1) - 1, 1),
        }));
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.menuId === menuId
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
    };


    // 주문 항목을 보여주는 함수
    const displayOrderItems = () => {
        setOrderItemsDisplay(
            orderItems.map((item) => {
                const itemQuantity = itemQuantities[item.menuId] || 1;
                const itemTotalPrice = item.mmoney * itemQuantity;

                return (
                    <div key={item.menuId} className="order-item">
                        <span>{item.mname}</span>
                        <span>가격: {formatNumberWithCommas(itemTotalPrice)}원</span>
                        <button onClick={() => decrementQuantity(item.menuId)}>-</button>
                        <span>수량: {itemQuantity}</span>
                        <button onClick={() => incrementQuantity(item.menuId)}>+</button>
                    </div>
                );
            })
        );
    };


    // 주문 항목이나 수량이 변경될 때마다 총 주문 가격을 업데이트하는 useEffect
    useEffect(() => {
        const newTotalPrice = orderItems.reduce((sum, item) => {
            const itemTotalPrice = item.mmoney * (itemQuantities[item.menuId] || 1);
            return sum + itemTotalPrice;
        }, 0);

        setTotalPrice(newTotalPrice);
    }, [orderItems, itemQuantities]);


    // 주문 항목을 보여주는 useEffect
    useEffect(() => {
        displayOrderItems();
    }, [orderItems]);


    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
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
                        <button onClick={() => addToOrder(selectedMenu)}>담기</button>
                    )}
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}

            <div>
                <h2 className="order">주문표<button>그룹주문</button></h2>
                <div className="order-list">{orderItemsDisplay}</div>
                <div className="total-price">
                    <span>총 주문 가격: {formatNumberWithCommas(totalPrice + (menus.length > 0 ? menus[0].store.stip : 0))}원</span>
                </div>
                <button onClick={placeOrder}>주문하기</button>
            </div>

        </div>
    );
}

export default StoreDetail;
