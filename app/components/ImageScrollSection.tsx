'use client';

import React, { useRef, useState, useEffect } from 'react';
import styles from './ImageScrollSection.module.css';

const autoScrollIntervalDelay = 1000 * 5;

const assets = [
    "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
    "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg",
    "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg",
    "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg"
];

export default function ImageScrollSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const autoScrollInterval = useRef<NodeJS.Timeout | undefined>(undefined);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Triple the assets to create a buffer for infinite scrolling
    const infiniteAssets = [...assets, ...assets, ...assets];

    useEffect(() => {
        if (containerRef.current) {
            // Initialize scroll position to the middle set
            const scrollWidth = containerRef.current.scrollWidth;
            const oneSetWidth = scrollWidth / 3;
            containerRef.current.scrollLeft = oneSetWidth;
        }
    }, []);

    function handleScroll() {
        const container = containerRef.current;

        if (!container) return;

        // In case interval needs to be cleared
        clearInterval(autoScrollInterval.current);

        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;
        const oneSetWidth = container.scrollWidth / 3;

        // Calculate active index relative to the original set
        // We need to handle the case where we are in the first or third set
        // The index should be modulo assets.length
        const rawIndex = Math.round(scrollLeft / containerWidth);
        const updatedIndex = rawIndex % assets.length;

        setCurrentIndex(updatedIndex);

        // Infinite scroll logic: jump when reaching ends
        // If we scroll too far left (into the first set), jump to the middle set
        if (scrollLeft < oneSetWidth * 0.5) {
            container.scrollLeft += oneSetWidth;
        }
        // If we scroll too far right (into the third set), jump back to the middle set
        else if (scrollLeft > oneSetWidth * 2.5) {
            container.scrollLeft -= oneSetWidth;
        }
    }

    const scrollPrev = () => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
    };

    const scrollNext = () => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        autoScrollInterval.current = setInterval(() => {
            if (!container) return;

            // Auto scroll just moves to the next slide
            // The handleScroll function will take care of the infinite loop logic
            const containerWidth = container.clientWidth;
            container.scrollBy({ left: containerWidth, behavior: 'smooth' });

        }, autoScrollIntervalDelay);

        return () => {
            clearInterval(autoScrollInterval.current);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <button className={`${styles.navButton} ${styles.prevButton}`} onClick={scrollPrev} aria-label="Previous slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <div ref={containerRef} className={styles.container} onScroll={handleScroll}>
                {infiniteAssets.map((image, i) => {
                    // Map the index back to the original data source
                    const originalIndex = i % assets.length;
                    const cardData = [
                        {
                            title: 'Morning Flow',
                            subtitle: 'Start your day right',
                        },
                        {
                            title: 'Deep Focus',
                            subtitle: 'Get in the zone',
                        },
                        {
                            title: 'Night Calm',
                            subtitle: 'Prepare for sleep',
                        },
                    ][originalIndex % 3];

                    return (
                        <div
                            key={`${image}-${i}`}
                            className={`${styles.image} ${currentIndex === originalIndex ? styles.current : ""}`}
                            style={{
                                backgroundImage: `url(${image})`,
                                transitionDuration: `${autoScrollIntervalDelay * 0.25}ms`
                            }}
                        >
                            <div className={styles.content}>
                                <h3>{cardData.title}</h3>
                                <p>{cardData.subtitle}</p>
                                <button className={styles.button}>
                                    <span className="text-sm">Start Session</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.indicators}>
                {assets.map((_, indicatorIndex) => (
                    <div
                        key={indicatorIndex}
                        className={`${styles.indicator} ${currentIndex === indicatorIndex ? styles.indicatorActive : ''
                            }`}
                    />
                ))}
            </div>

            <button className={`${styles.navButton} ${styles.nextButton}`} onClick={scrollNext} aria-label="Next slide">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}
