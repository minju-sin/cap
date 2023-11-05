package com.cap.domain.delivery;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/* 주문 내역 db */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "orderId", nullable = false)
    private CustomOrder order; // 항목이 속한 주문

    @ManyToOne
    @JoinColumn(name = "menuId", nullable = false)
    private Menu menu; // 주문한 메뉴 항목

    private int quantity; // 주문한 메뉴 항목 수량


    @Builder
    public OrderItem(CustomOrder order, Menu menu, int quantity) {
        this.order = order;
        this.menu = menu;
        this.quantity = quantity;
    }
}

