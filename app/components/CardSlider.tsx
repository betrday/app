'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
    const isScrollingRef = useRef(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Triple the cards for infinite scroll
    const infiniteCards = [...cards, ...cards, ...cards].map((card, index) => ({
        ...card,
        uniqueId: `${card.id}-${index}`,
    }));

    // Initialize to middle set
    useEffect(() => {
        if (sliderRef.current) {
            const scrollWidth = sliderRef.current.scrollWidth;
            const oneSetWidth = scrollWidth / 3;
            sliderRef.current.scrollLeft = oneSetWidth;
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev >= 9) {
                    scroll('right');
                    return 0;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Reset timer when sliding to a new card
    useEffect(() => {
        setTimeLeft(0);
    }, [activeIndex]);

    const handleScroll = () => {
        if (!sliderRef.current || isScrollingRef.current) return;
        const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
        const oneSetWidth = scrollWidth / 3;

        // Calculate the index within one set of cards
        const currentCardIndex = Math.round(scrollLeft / clientWidth);
        const index = currentCardIndex % cards.length;
        if (index !== activeIndex) {
            setActiveIndex(index);
        }

        // Infinite scroll logic - only jump when we're near the edges and not dragging
        if (!isDragging) {
            if (scrollLeft < oneSetWidth * 0.2) {
                isScrollingRef.current = true;
                sliderRef.current.scrollLeft += oneSetWidth;
                setTimeout(() => { isScrollingRef.current = false; }, 50);
            } else if (scrollLeft > oneSetWidth * 2.8) {
                isScrollingRef.current = true;
                sliderRef.current.scrollLeft -= oneSetWidth;
                setTimeout(() => { isScrollingRef.current = false; }, 50);
            }
        }

        // Parallax / Mirror Wipe Effect (reduced for stability)
        infiniteCards.forEach((_, i) => {
            const content = document.getElementById(`card-content-${i}`);
            if (content) {
                const cardLeft = i * clientWidth;
                const offset = scrollLeft - cardLeft;
                const shift = Math.max(-100, Math.min(100, offset * 0.15));
                content.style.transform = `translateX(${shift}px)`;
            }
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };

    const scroll = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'auto', // Instant scroll, no sliding animation
            });
        }
    };

    const scrollToIndex = (index: number) => {
        if (sliderRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
            const oneSetWidth = scrollWidth / 3;

            // Find which set we're currently in
            const currentSet = Math.floor(scrollLeft / oneSetWidth);

            // Calculate target position in the current set
            const targetPosition = (currentSet * oneSetWidth) + (index * clientWidth);

            sliderRef.current.scrollTo({
                left: targetPosition,
                behavior: 'auto' // Instant scroll, no sliding animation
            });
            setTimeLeft(0); // Reset timer when user manually clicks
        }
    };

    return (
        <div className="w-full flex flex-col">
            <div
                ref={sliderRef}
                className="w-full overflow-x-auto snap-x snap-mandatory flex [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onScroll={handleScroll}
                onClick={(e) => e.preventDefault()}
            >
                {infiniteCards.map((card, index) => (
                    <div
                        key={card.uniqueId}
                        className="flex-shrink-0 w-full h-[500px] bg-[#F2F2F2] snap-center relative overflow-hidden flex flex-col items-center justify-center p-6 select-none border-b border-[rgba(255,255,255,0.26)] rounded-b-[60px]"
                    >
                        {/* Parallax Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 pointer-events-none" />

                        <div
                            id={`card-content-${index}`}
                            className="relative z-10 flex flex-col items-center gap-2 text-center mt-auto mb-8 transition-transform duration-75 ease-out will-change-transform pointer-events-none"
                            style={{
                                animation: index === activeIndex ? 'glassWipe 0.8s ease-in-out' : 'none'
                            }}
                        >
                            {/* Logo and text row */}
                            <div className="flex items-center gap-2 mb-3">
                                <Image
                                    src="/media_library/betrday.svg"
                                    alt="Betr Day"
                                    width={16}
                                    height={16}
                                    className="brightness-0"
                                />
                                <div className="w-px h-4 bg-[#1a1a1a]/30"></div>
                                <span className="text-xs font-medium text-[#1a1a1a]/60 uppercase tracking-wide">betr day</span>
                            </div>

                            <h3 className="text-3xl font-bold text-[#1a1a1a]">{card.title}</h3>
                            <p className="text-[#1a1a1a]/80 text-lg font-medium mb-4">{card.subtitle}</p>

                            {card.id === 1 ? (
                                <a
                                    href="https://stripe.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 rounded-full font-semibold text-white transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm pointer-events-auto"
                                    style={{
                                        backgroundColor: 'rgba(51, 51, 54, 0.82)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.33)',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333336'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(51, 51, 54, 0.82)'}
                                >
                                    <span className="text-sm">Виж всички</span>
                                </a>
                            ) : (
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
                            )}
                        </div>

                        {/* Indicators inside card */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
                            {cards.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        scrollToIndex(idx);
                                    }}
                                    className="relative flex items-center justify-center cursor-pointer"
                                >
                                    <div
                                        className={`h-1.5 rounded-full overflow-hidden transition-all duration-300 ease-in-out bg-[#D9D9D9] ${idx === activeIndex ? 'w-8' : 'w-3'
                                            }`}
                                    >
                                        {idx === activeIndex && (
                                            <div
                                                className="h-full bg-[#1a1a1a] origin-left transition-transform duration-1000 ease-linear"
                                                style={{
                                                    transform: `scaleX(${timeLeft / 9})`,
                                                    willChange: 'transform'
                                                }}
                                            />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
