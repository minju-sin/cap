//  src/components/delivery/GroupOrderPage.js

/*
그룹 주문 페이지
* 주문하고 싶은 메뉴를 선택해 모달창에서 주문표에 담는다.
* 주문표에 있는 사용자 모두 결제를 해야 배달지 입력이 가능함
* 배달지 입력은 호스트(방장)만 가능하도록 구현함
* 프론트엔드는 메뉴 클릭시 나오는 모달창 디자인 무조건 수정
*/

import React, { useState, useEffect } from 'react';
import {useParams, useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import storeImage from "../images/storeImage.png";

// 스타일 태그 내의 CSS - 모달창 디자인 (프론트엔드는 이부분 디자인 수정해야함)
const modalStyle = `
        .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1040;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30%;
            background-color: white;
            padding: 20px;
            z-index: 1050;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        }
        
        .menu-modal h2 {
            margin-top: 0;
            color: #333;
            font-size: 1.5rem;
        }
        
        .menu-modal p {
            color: #666;
            font-size: 1rem;
        }
        
        .menu-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .menu-modal button:hover {
            background-color: #0056b3;
        }
        
        .menu-modal .close-button {
            background-color: #6c757d;
        }
        
        .menu-modal .close-button:hover {
            background-color: #545b62;
        }
        
        @media (max-width: 768px) {
            .menu-modal {
                width: 80%;
                padding: 10px;
            }
        }
        
        @media (max-width: 480px) {
            .menu-modal {
                width: 90%;
                padding: 5px;
            }
        }
    `;

// 숫자를 세 자리마다 콤마로 형식화하는 함수
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GroupOrderPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 사용자 로그인 상태
    const [showModal, setShowModal] = useState(false); // 모달 상태 변수 추가
    const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 정보 (모달창으로 보여줌)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const storeId = queryParams.get('storeId'); // 쿼리 파라미터에서 storeId를 가져옴
    const [menus, setMenus] = useState([]);
    const [user, setUser] = useState([]);
    const [quantity, setQuantity] = useState(1); // 모달창 내부에 수량을 관리할 상태 변수를 추가
    const [orders, setOrders] = useState([]); // 주문 목록 상태 변수
    const [groupOrderId, setGroupOrderId] = useState(null); // groupOrderId 상태 추가
    const [groupedOrders, setGroupedOrders] = useState({}); // 그룹화된 주문 목록을 상태에 저장
    const [totalOrderPrice, setTotalOrderPrice] = useState(0);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [isOrganizer, setIsOrganizer] = useState(false); // 현재 사용자가 호스트인지 여부
    /* 결제 여부 */
    const [paymentStatus, setPaymentStatus] = useState(() => {
        const savedStatus = localStorage.getItem(`paymentStatus_${groupOrderId}`);
        return savedStatus ? JSON.parse(savedStatus) : {};
    });


    // 로그인 후 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            const userIdResponse = await axios.get('/get-user-id');
            const usernameResponse = await axios.get('/get-user-name');

            setUser({
                userId: userIdResponse.data,
                username: usernameResponse.data
            });
        } catch (error) {
            console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    // 수량 증가 함수
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // 수량 감소 함수
    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    // 주문 목록에 메뉴를 추가하는 함수
    const addToOrder = async (menu, quantity) => {
        if (!groupOrderId || !user.userId) {
            console.error('그룹 주문 ID가 없거나 사용자가 인증되지 않았습니다.');
            return; // groupOrderId가 없으면 early return 처리
        }

        // 백엔드에 전송할 주문 데이터
        const orderData = {
            menuId: menu.menuId,
            quantity: quantity,
            userId: user.userId, // 사용자 ID를 주문 데이터에 포함
            username: user.username // 사용자 이름을 주문 데이터에 포함
        };

        try {
            // 백엔드에 주문 아이템 추가 요청
            await axios.post(`/order/add-item/${groupOrderId}`, orderData);


            // 성공적으로 추가된 경우, UI에 반영
            setOrders(currentOrders => [...currentOrders, {
                menuId: menu.menuId,
                mimage:menu.mimage,
                mname: menu.mname,
                mmoney: menu.mmoney,
                quantity: quantity,
                userId: user.userId,
                username: user.username
            }]);

            // 모달창 닫기
            setShowModal(false);
        } catch (error) {
            // 오류 처리
            console.error('주문 아이템 추가 중 오류 발생:', error);
        }
    };

    // 주문 목록을 불러오는 함수
    const fetchOrderItems = async () => {
        if (groupOrderId) {
            try {
                const response = await axios.get(`/order/items/${groupOrderId}`);
                if (Array.isArray(response.data)) {
                    setOrders(response.data);
                } else {
                    console.error('주문 목록이 배열이 아닙니다, 받은 데이터:', response.data);
                }
            } catch (error) {
                console.error('주문 항목을 가져오는 중 오류가 발생했습니다:', error);
            }
        }
    };

    //  메뉴 선택하면 모달창 표시하는 함수
    const toggleModal = (menu) => {
        setSelectedMenu(menu);
        setShowModal(!showModal);
        setQuantity(1);
    };

    // 주문 목록을 그룹화하고 총액을 계산하는 함수
    const groupOrdersByUserId = (orders, deliveryTip) => {
        const groupedOrders = orders.reduce((acc, order) => {
            // 사용자 ID별로 주문을 그룹화
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    username: order.username,
                    userId: order.userId,
                    orders: [],
                    totalAmount: 0,
                    tipAmount: 0
                };
            }
            acc[order.userId].orders.push(order);
            // 각 주문의 총액을 누적
            acc[order.userId].totalAmount += order.mmoney * order.quantity;
            return acc;
        }, {});

        // 사용자별로 나눈 배달팁 계산
        const userCount = Object.keys(groupedOrders).length;
        const tipPerUser = deliveryTip / userCount;

        // 각 사용자의 총액에 배달팁을 더함
        Object.values(groupedOrders).forEach(group => {
            group.tipAmount = tipPerUser;
            group.totalAmount += tipPerUser;
        });

        return groupedOrders;
    };


    useEffect(() => {
        axios.get('/get-user-id')
            .then(response => {
                if (response.status === 200) {
                    setLoggedInUserId(response.data);
                }
            })
            .catch(error => {
                console.error('사용자 ID를 가져오는 중 오류 발생:', error);
            });

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

        //  groupOrderId 가져옴
        const fetchGroupOrderId = async () => {
            try {
                // 페이지 URL에서 groupOrderLink 추출
                const groupOrderLink = window.location.href;

                // 백엔드에 groupOrderLink를 이용해 groupOrderId 요청
                const response = await axios.get('/order/get-group-order-id', {
                    params: { groupOrderLink }
                });

                // 응답으로 받은 groupOrderId를 상태에 저장
                setGroupOrderId(response.data);
            } catch (error) {
                console.error('그룹 주문 ID를 가져오는 중 오류가 발생했습니다:', error);
                // 에러 핸들링 로직 추가
            }
        };

        fetchGroupOrderId(); // 함수 호출
    }, [storeId]);

    useEffect(() => {

        fetchOrderItems(); // 주문 목록을 불러옵니다.
    }, [groupOrderId]);

    // 주문 목록 상태가 바뀔 때마다 주문 목록을 그룹화
    useEffect(() => {
        if (Array.isArray(orders) && menus.length > 0) {
            const grouped = groupOrdersByUserId(orders, menus[0].store.stip);
            setGroupedOrders(grouped);
        }
    }, [orders, menus]);

    useEffect(() => {
        fetchUserInfo(); // 사용자 정보를 가져옴
    }, []);

    useEffect(() => {
        const calculateTotalOrderPrice = () => {
            const total = Object.values(groupedOrders).reduce((sum, group) => {
                return sum + group.totalAmount;
            }, 0);
            setTotalOrderPrice(total);
        };

        if (Object.keys(groupedOrders).length > 0) {
            calculateTotalOrderPrice();
        }
    }, [groupedOrders]);

    useEffect(() => {
        // groupOrderId가 설정되면 로컬 스토리지에서 해당 그룹의 결제 상태를 로드
        if (groupOrderId) {
            const savedStatus = localStorage.getItem(`paymentStatus_${groupOrderId}`);
            if (savedStatus) {
                setPaymentStatus(JSON.parse(savedStatus));
            }
        }
    }, [groupOrderId]);

    useEffect(() => {
        // 결제 상태가 변경될 때마다 로컬 스토리지에 저장
        if (groupOrderId) {
            localStorage.setItem(`paymentStatus_${groupOrderId}`, JSON.stringify(paymentStatus));
        }
    }, [paymentStatus, groupOrderId]);
    

    // 결제 성공 처리 함수
    const handlePaymentSuccess = (userId) => {
        setPaymentStatus(prevStatus => ({
            ...prevStatus,
            [userId]: true
        }));
    };

    useEffect(() => {
        // 백엔드로부터 현재 사용자가 호스트인지 확인
        const checkIfOrganizer = async () => {
            try {
                const response = await axios.get(`/order/is-organizer/${groupOrderId}`);
                setIsOrganizer(response.data); // 응답에 따라 isOrganizer 상태를 설정
            } catch (error) {
                console.error('호스트 여부 확인 중 오류 발생:', error);
            }
        };

        if (groupOrderId) {
            checkIfOrganizer();
        }
    }, [groupOrderId]);

    // 모든 사용자의 결제가 완료되었는지 확인하는 함수
    const allPaymentsCompleted = () => {
        return Object.keys(groupedOrders).every(
            userId => paymentStatus[userId] === true
        );
    };

    // 아임포트 결제 모듈 초기화
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
        script.onload = () => {
            window.IMP.init('imp53253720'); //  아임포트 가맹점 식별코드
        };
        document.head.appendChild(script);
    }, []);

    // 결제 처리 함수
    const handlePayment = (userId, totalAmount, username) => {
        const { IMP } = window; // 아임포트 모듈
        const paymentData = {
            pg: 'html5_inicis', // PG사
            pay_method: 'card', // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: totalAmount, // 결제금액
            name: `${username} - 그룹 주문 결제`, // 주문명
            buyer_name: username, // 구매자 이름
        };

        IMP.request_pay(paymentData, response => {
            if (response.success) {
                // 결제 성공 시 로직
                console.log('결제 성공', response);
                handlePaymentSuccess(userId)
            } else {
                // 결제 실패 시 로직
                console.error('결제 실패', response);
            }
        });
    };

    // 주문최소금액을 넘어야 주문하기 버튼 활성화되는 함수
    const canPlaceOrder = () => {
        return totalOrderPrice >= (menus.length > 0 ? menus[0].store.sorderMinimum : 0);
    };

    return (
        <>
        <style>{modalStyle}</style>
        <div>
            <h1>그룹 주문 페이지</h1>
            <p>여기서 호스트와 참가자가 같이 주문을 할 수 있도록 함</p>
            <div>
                <h1>가게 정보</h1>
                {/* 가게 이름, 평점, 리뷰수, 최소 주문 금액, 배달 요금,
                    배달 예상 시간, 영업 시간, 전화번호, 주소 순서로 작성함 */}
                {menus.length > 0 ?
                    <img
                        src={menus[0].store.simage}
                        alt="가게 썸네일"
                        onError={(e) => {
                            e.target.onerror = null; // 이후 재시도 방지
                            e.target.src = storeImage; // 기본 이미지 경로로 교체
                        }}
                    /> : null}
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
                        <img
                            src={menu.mimage}
                            alt="음식 썸네일"
                            onError={(e) => {
                                e.target.onerror = null; // 이후 재시도 방지
                                e.target.src = storeImage; // 기본 이미지 경로로 교체
                            }}
                        />
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
                    <img
                        src={selectedMenu.mimage}
                        alt="음식 썸네일"
                        onError={(e) => {
                            e.target.onerror = null; // 이후 재시도 방지
                            e.target.src = storeImage; // 기본 이미지 경로로 교체
                        }}
                    />
                    <h2>{selectedMenu.mname}</h2>
                    <p>{selectedMenu.mintro}</p>
                    <p>{formatNumberWithCommas(selectedMenu.mmoney)}원</p>
                    <div className="quantity-selector">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>
                    {isAuthenticated && (
                        <button onClick={() => addToOrder(selectedMenu, quantity)}>담기</button>
                    )}
                    <button onClick={() => setShowModal(false)}>닫기</button>
                </div>
            )}

            <div>
                <h2 className="order">주문표</h2>
                <div className="order-list">
                    {Object.entries(groupedOrders).map(([userId, group]) => (
                        <div key={userId}>
                            <input
                                type="checkbox"
                                checked={paymentStatus[userId] === true}
                                readOnly
                            />
                            <span>{group.username} (학번: {userId})</span>
                            {group.orders.map((order, index) => (
                                <div key={index}>
                                    <img
                                        src={order.mimage}
                                        alt="음식 썸네일"
                                        onError={(e) => {
                                            e.target.onerror = null; // 이후 재시도 방지
                                            e.target.src = storeImage; // 기본 이미지 경로로 교체
                                        }}
                                    />
                                    <span>{order.mname} - 수량: {order.quantity}개 - 총액: {formatNumberWithCommas(order.mmoney * order.quantity)}원</span>
                                    <button>삭제</button>
                                </div>
                            ))}
                            {/*
                            개별적으로 결제한 뒤 모두 결제 성공하면 주문하기 누를 수 있음
                            결제 시 배달팁도 합산해서 계산됨 - 결제 성공 시 버튼 비활성화
                            */}
                            {loggedInUserId == userId && (
                                <button disabled={paymentStatus[userId] === true}
                                        onClick={() => handlePayment(userId, group.totalAmount, group.username)}>
                                    {formatNumberWithCommas(group.totalAmount)}원 결제하기
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {menus.length > 0 && totalOrderPrice > 0 && (
                    <>
                        <p>배달팁: {formatNumberWithCommas(menus[0].store.stip)}원</p>
                        <p>주문표 총 가격: {formatNumberWithCommas(totalOrderPrice)}원</p>
                    </>
                )}

                {/* 모두 결제성공하고, 배달최소금액 만족, 호스트(방장)만 버튼 누를 수 있다. */}
                <Link to={`/group-order/delivery/${groupOrderId}`}>
                    <button disabled={!allPaymentsCompleted() || !isOrganizer || !canPlaceOrder()}>
                        배달지입력
                    </button>
                </Link>
            </div>
        </div>
        </>
    );
}

export default GroupOrderPage;
