package com.cap.domain;

import com.cap.domain.delivery.StatusRole;
import com.cap.domain.delivery.Store;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

/*
* 주문 DB
* 주문 아이디, 주문 시간, 사용자 id, 가게 id, 주문 상태
*/

@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class Order {
    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;   //  주문 id

    @Column(nullable = false)
    private Timestamp oTime;    //  주문 시간


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)   //  일대다 관계
    //    하나의 주문(Order)은 여러 주문 내역(OrderItem)을 가질 수 있다.
    //    예를 들어, 한 주문에 피자, 스파게티, 음료수 등 다양한 메뉴들이 주문 내역으로 기록될 수 있다.
    private List<OrderItem> orderItems; // 주문 내역 목록


    @JoinColumn(name = "userId")    //  외래키 userId와 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    //  주문은 하나의 사용자에 의해 작성되지만, 하나의 사용자는 여러 개의 주문표 작성할 수 있다.
    private User user;  //  사용자 id


    @JoinColumn(name = "storeId")    //  외래키 storeId 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    //  주문은 하나의 가게만 할 수 있고, 하나의 가게는 여러 개의 주문표 작성할 수 있다.
    private Store store;    //  가게 id

    @Enumerated(EnumType.STRING)    //  열거형 타입을 문자열로 저장
    @Column(nullable = false, length = 20)
    private StatusRole statusRole;  //  주문 상태

    @Builder
    public Order(Long orderId, Timestamp oTime, List<OrderItem> orderItems,
                 User user, Store store, StatusRole statusRole){
        this.orderId = orderId;
        this.oTime = oTime;
        this.orderItems = orderItems;
        this.user = user;
        this.store = store;
        this.statusRole = statusRole;
    }

}
