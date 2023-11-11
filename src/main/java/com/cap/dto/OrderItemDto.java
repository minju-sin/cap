package com.cap.dto;

public class OrderItemDto {
    private Long menuId; // 메뉴 ID
    private int quantity; // 메뉴 수량

    // 기본 생성자
    public OrderItemDto() {
    }

    // 매개변수가 있는 생성자
    public OrderItemDto(Long menuId, int quantity) {
        this.menuId = menuId;
        this.quantity = quantity;
    }

    // 게터와 세터
    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // toString 메소드 (옵션)
    @Override
    public String toString() {
        return "OrderItemDto{" +
                "menuId=" + menuId +
                ", quantity=" + quantity +
                '}';
    }
}
