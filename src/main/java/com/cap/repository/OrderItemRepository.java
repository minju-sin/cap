package com.cap.repository;

import com.cap.domain.User;
import com.cap.domain.delivery.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByGroupOrderId(Long groupOrderId);

    void deleteByUser(User user);

    // 주문 항목을 삭제하는 쿼리 메서드
    @Transactional
    @Modifying
    @Query("DELETE FROM OrderItem oi WHERE oi.menu.id = :menuId AND oi.quantity = :quantity AND oi.user.userId = :userId")
    int deleteByMenuIdAndQuantityAndUserId(Long menuId, int quantity, String userId);
}
