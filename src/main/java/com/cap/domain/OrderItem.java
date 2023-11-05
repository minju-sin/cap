package com.cap.domain;

import com.cap.domain.delivery.Menu;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
* 주문 내역 DB
* 주문 id, 주문한 메뉴, 주문한 메뉴의 수량
* 총액을 db에 저장하지 않는 이유는 유도 속성이기 때문이다.
*/
@Getter //  get 함수를 일괄적으로 만듦
@Setter
@NoArgsConstructor  //  기본 생성자 만들어 줌
@Entity //  DB 테이블 역할
public class OrderItem {
    @Id() //  primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;


    @JoinColumn(name = "orderId")    //  외래키 orderId 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    private Order order;
    

    @JoinColumn(name = "menuId")    //  외래키 menuId 관련을 맺음
    @ManyToOne(optional = false)    //  다대일 관계
    private Menu menu;

    private int quantity;   //  주문한 메뉴의 수량

    @Builder
    public OrderItem(Long orderItemId, Order order, Menu menu, int quantity) {
        this.orderItemId = orderItemId;
        this.order = order;
        this.menu = menu;
        this.quantity = quantity;
    }
}
