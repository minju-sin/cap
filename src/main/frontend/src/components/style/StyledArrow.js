import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from '../HomeCss';
import allowUp from "../images/arrow_circle_up.png";
import allowDown from "../images/arrow_circle_down.png";

const ScrollToTopAndBottom = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // 맨 위로 올라가는 스크롤 이미지는 스크롤을 내렸을 때만 뜨도록 함
    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScrollToTop && window.pageYOffset > 200){
                setShowScrollToTop(true);
            } else if (showScrollToTop && window.pageYOffset <= 200){
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', checkScrollTop);

        return () => {
            window.removeEventListener('scroll', checkScrollTop);
        };
    }, [showScrollToTop]);

    // 맨 위로 이동하는 함수 
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 맨 아래로 이동하는 함수 
    function scrollToBottom() {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    return (
        <>
            {showScrollToTop && (
                <ArrowUp onClick={scrollToTop} src={allowUp} alt="맨 위로 이동" />
            )}
            <ArrowDown onClick={scrollToBottom} src={allowDown} alt="맨 아래로 이동" />
        </>
    );
};

export default ScrollToTopAndBottom;
