package com.cap.repository;

import com.cap.domain.delivery.CustomOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomOrderRepository extends JpaRepository<CustomOrder, Long> {

}
