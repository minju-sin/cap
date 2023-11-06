package com.cap.repository;

import com.cap.domain.delivery.GroupOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupOrderRepository extends JpaRepository<GroupOrder, Long> {
}
