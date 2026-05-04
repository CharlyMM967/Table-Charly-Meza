    import { useEffect, useRef, useState } from "react";
    import Masonry from "masonry-layout";

    export default function PortfolioGrid({ items }) {
    const gridRef = useRef(null);
    const masonryRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!gridRef.current) return;

        // ocultar mientras calcula
        setReady(false);

        masonryRef.current = new Masonry(gridRef.current, {
        itemSelector: ".portfolio-item",
        percentPosition: true,
        gutter: 0,
        });

        const images = gridRef.current.querySelectorAll("img");
        let loadedImages = 0;

        const handleImageLoad = () => {
        loadedImages++;
        if (loadedImages === images.length) {
            masonryRef.current.layout();
            setReady(true); // 🔥 mostrar cuando todo esté listo
        }
        };

        images.forEach((img) => {
        if (img.complete) {
            handleImageLoad();
        } else {
            img.addEventListener("load", handleImageLoad);
        }
        });

        // fallback por si algo falla
        setTimeout(() => {
        masonryRef.current?.layout();
        setReady(true);
        }, 500);

        return () => {
        masonryRef.current?.destroy();
        };
    }, [items]);

    return (
        <div className="portfolio-wrap">
        <div className="filters">
            <h6>What I’ve been working on</h6>
        </div>

        <div
            id="portfolio-container"
            ref={gridRef}
            className={`portfolio-container portfolio-overlay dark text-overlay isotope ${
            ready ? "masonry-ready" : ""
            }`}
        >
            {items.map((item) => (
            <div className={`portfolio-item ${item.classes}`} key={item.href}>
                <a href={item.href}>
                <div className="portfolio-content">
                    <div className="portfolio-img-content">
                    <img src={item.image} alt="" />
                    </div>

                    <div className="portfolio-text-content">
                    <div className="portfolio-text">
                        <h3>{item.title}</h3>
                        <h4>{item.category}</h4>
                    </div>
                    </div>
                </div>
                </a>
            </div>
            ))}
        </div>
        </div>
    );
    }