import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GroupOrderDetail() {
    const [groupedOrders, setGroupedOrders] = useState({});
    const { groupOrderId } = useParams(); // useParams 훅을 사용하여 URL에서 groupOrderId 추출

    // 주문 목록을 사용자 ID별로 그룹화하는 함수
    const groupOrdersByUserId = (orders) => {
        return orders.reduce((acc, order) => {
            if (!acc[order.userId]) {
                acc[order.userId] = {
                    username: order.username,
                    orders: []
                };
            }
            acc[order.userId].orders.push(order);
            return acc;
        }, {});
    };

    // 서버에서 주문 데이터를 가져오는 함수
    const fetchOrderItems = async () => {
        try {
            const response = await axios.get(`/order/items/${groupOrderId}`);
            const grouped = groupOrdersByUserId(response.data);
            setGroupedOrders(grouped);
        } catch (error) {
            console.error('주문 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        if (groupOrderId) {
            fetchOrderItems();
        }
    }, [groupOrderId]);

    return (
        <div>
            <h1>배달지 입력 페이지</h1>
            <p>배달지 + 요청사항 입력창이 보이고, 주문표를 옆에 보여준다.</p>
            <div className="order-list">
                <h2>주문 내역</h2>
                {Object.entries(groupedOrders).map(([userId, group]) => (
                    <div key={userId}>
                        <h3>{group.username}</h3>
                        {group.orders.map((order, index) => (
                            <div key={index}>
                                <span>{order.mname} - 수량: {order.quantity}개 - 총액: {formatNumberWithCommas(order.mmoney * order.quantity)}원</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroupOrderDetail;
