package com.cap.controller;

/*
* 가게 카테고리별 목록 페이지 /store/category?category={category}
* 가게 상세 페이지 /store/{storeId}
*/

import com.cap.domain.delivery.Menu;
import com.cap.domain.delivery.Store;
import com.cap.domain.delivery.StoreRole;
import com.cap.repository.MenuRepository;
import com.cap.repository.StoreRepository;
import com.cap.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/store")
public class StoreController {

    @Autowired private StoreService storeService;
    @Autowired private StoreRepository storeRepository;
    @Autowired private MenuRepository menuRepository;

    //  가게 카테고리 별 페이지
    @GetMapping("/category")
    public List<Store> getStoresByCategory(@RequestParam("category") StoreRole category) {
        // StoreService에서 가게 카테고리에 해당하는 가게 리스트를 가져오는 메서드 구현
        List<Store> stores = storeService.getStoresByCategory(category);
        return stores;
    }

    // 가게 상세 페이지 - 가게 정보 + 메뉴
    @GetMapping("/{storeId}")
    public List<Menu> getMenusByStore(@PathVariable Long storeId){
        // 해당 가게의 모든 메뉴 가져오기
        List<Menu> menus = menuRepository.findByStoreStoreId(storeId);

        return menus;
    }

}
