'use client';
import { useRef, useState, useEffect } from 'react';

const cards = [
    {
        id: 1,
        title: 'Morning Flow',
        subtitle: 'Start your day right',
    },
    {
        id: 2,
        title: 'Deep Focus',
        subtitle: 'Get in the zone',
    },
    {
        id: 3,
        title: 'Night Calm',
        subtitle: 'Prepare for sleep',
    },
];

export default function CardSlider() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const [activeIndex, setActiveIndex] = useState(0);

    // Triple the cards to create a buffer for infinite scrolling
    const infiniteCards = [...cards, ...cards, ...cards].map((card, index) => ({
        ...card,
        uniqueId: `${card.id}-${index}`,
    }));

    useEffect(() => {
        if (sliderRef.current) {
            // Initialize scroll position to the middle set
            const scrollWidth = sliderRef.current.scrollWidth;
            const oneSetWidth = scrollWidth / 3;
            sliderRef.current.scrollLeft = oneSetWidth;
        }
    }, []);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, offsetWidth } = sliderRef.current;
        const oneSetWidth = scrollWidth / 3;

        // Calculate active index
        const cardWidth = offsetWidth * 0.85 + 16; // approximate card width + gap
        const relativeScroll = scrollLeft % oneSetWidth;
        const index = Math.round(relativeScroll / cardWidth) % cards.length;
        setActiveIndex(index);

        // If we scroll too far left (into the first set), jump to the middle set
        if (scrollLeft < oneSetWidth * 0.5) {
            sliderRef.current.scrollLeft += oneSetWidth;
        }
        // If we scroll too far right (into the third set), jump back to the middle set
        else if (scrollLeft > oneSetWidth * 2.5) {
            sliderRef.current.scrollLeft -= oneSetWidth;
        }
    };

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            scroll('right');
        }, 9000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setIsPaused(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsPaused(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth * 0.85;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div
                ref={sliderRef}
                className="w-full mt-6 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 pl-6 pr-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={handleScroll}
                onMouseEnter={() => setIsPaused(true)}
            >
                {infiniteCards.map((card) => (
                    <div
                        key={card.uniqueId}
                        className="flex-shrink-0 w-[85%] h-[500px] rounded-[12px] bg-[#F2F2F2] snap-start relative overflow-hidden flex flex-col justify-end p-6 select-none border border-[rgba(255,255,255,0.26)]"
                    >
                        <div className="relative z-10 flex flex-col items-start gap-2">
                            <h3 className="text-3xl font-bold text-[#1a1a1a]">{card.title}</h3>
                            <p className="text-[#1a1a1a]/80 text-lg font-medium mb-4">{card.subtitle}</p>

                            <button
                                className="px-6 py-3 rounded-full font-semibold text-white transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm"
                                style={{
                                    backgroundColor: 'rgba(51, 51, 54, 0.82)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.33)',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333336'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(51, 51, 54, 0.82)'}
                            >
                                <span className="text-sm">Start Session</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between px-6">
                {/* Indicators */}
                <div className="flex gap-2">
                    {cards.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full overflow-hidden transition-all duration-300 bg-[#D9D9D9] ${index === activeIndex ? 'w-6' : 'w-2'
                                }`}
                        >
                            {index === activeIndex && !isPaused && (
                                <div
                                    className="h-full bg-[#1a1a1a]"
                                    style={{
                                        animation: 'progress 9s linear forwards'
                                    }}
                                />
                            )}
                            {index === activeIndex && isPaused && (
                                <div className="h-full bg-[#1a1a1a] w-full" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => scroll('left')}
                        className="p-3 rounded-full bg-[#F2F2F2] text-[#1a1a1a] hover:bg-[#e5e5e5] transition-colors"
                        aria-label="Scroll left"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-3 rounded-full bg-[#F2F2F2] text-[#1a1a1a] hover:bg-[#e5e5e5] transition-colors"
                        aria-label="Scroll right"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
