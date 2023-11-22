package com.cap.repository;

import com.cap.domain.Article;
import com.cap.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    void deleteByUser(User user);
}
