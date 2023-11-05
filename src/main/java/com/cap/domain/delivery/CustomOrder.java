package com.cap.domain.delivery;

import com.cap.domain.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.List;

/* 주문 db */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user; // 주문을 한 사용자

    @Column(nullable = false)
    private Date orderDate; // 주문 날짜와 시간

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems; // 주문한 항목 목록


    @Builder
    public CustomOrder(User user, Date orderDate) {
        this.user = user;
        this.orderDate = orderDate;
    }
}

