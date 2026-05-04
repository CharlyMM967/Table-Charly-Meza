    import { useState } from "react";

    function CaseNav({ prev, next }) {
    return (
        <ul className="post-nav clearfix">
        <li className="post-prev">
            {prev && (
            <a href={prev.href}>
                <span>{prev.label}</span>
                <h4>{prev.title}</h4>
            </a>
            )}
        </li>

        <li className="post-next">
            {next && (
            <a href={next.href}>
                <span>{next.label}</span>
                <h4>{next.title}</h4>
            </a>
            )}
        </li>
        </ul>
    );
    }

    function CaseGallery({ images }) {
    const [current, setCurrent] = useState(0);
    const visibleCount = 3;
    const maxIndex = Math.max(images.length - visibleCount, 0);

    const next = () => {
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <div className="case-carousel-wrap">
        <button
            type="button"
            className="case-carousel-arrow case-carousel-prev"
            onClick={prev}
        >
            ←
        </button>

        <div className="case-carousel">
            <div
            className="case-carousel-track"
            style={{
                transform: `translateX(-${current * (100 / visibleCount)}%)`,
            }}
            >
            {images.map((image) => (
                <div className="case-carousel-item" key={image}>
                <img src={image} alt="" />
                </div>
            ))}
            </div>
        </div>

        <button
            type="button"
            className="case-carousel-arrow case-carousel-next"
            onClick={next}
        >
            →
        </button>
        </div>
    );
    }

    function ProjectHeroCarousel({ images }) {
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrent((prev) => (prev <= 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div className="project-hero-carousel">
        <button
            type="button"
            className="project-hero-arrow project-hero-prev"
            onClick={prev}
        >
            ←
        </button>

        <div
            className="project-hero-track"
            style={{
            transform: `translateX(calc(50% - ${current * 52}% - 26%))`,
            }}
        >
            {images.map((image, index) => (
            <div
                className={`project-hero-slide ${
                index === current ? "active" : ""
                }`}
                key={image}
            >
                <img src={image} alt="" />
            </div>
            ))}
        </div>

        <button
            type="button"
            className="project-hero-arrow project-hero-next"
            onClick={next}
        >
            →
        </button>
        </div>
    );
    }

    function CaseMeta({ meta }) {
    return (
        <ul className="post-meta">
        {meta.map((m) => {
            if (m.toLowerCase().includes("category")) {
            const cleanCategory = m.replace("Category -", "").trim();

            return (
                <li
                className="post-category"
                key={m}
                dangerouslySetInnerHTML={{
                    __html: cleanCategory.includes("<strong>")
                    ? cleanCategory
                    : `Category - <a href="#">${cleanCategory}</a>`,
                }}
                />
            );
            }

            return (
            <li
                className="post-date"
                key={m}
                dangerouslySetInnerHTML={{ __html: m }}
            />
            );
        })}
        </ul>
    );
    }

    export default function CasePage({ item }) {
    if (!item) return null;

    if (item.template === "project" || item.template === "static-project") {
        return (
        <div id="content-wrapper">
            <div className="project-single-wrap mar-top-0">
            {item.template === "project" && item.gallery && item.gallery.length > 0 && (
                <ProjectHeroCarousel images={item.gallery} />
                )}

                {item.template === "static-project" && item.image && (
                <div className="project-static-hero">
                    <img src={item.image} alt={item.title} />
                </div>
                )}

            <div className="container">
                <div className="row">
                <div className="col-md-8 offset-md-2 text-center">
                    <h1 className="post-title mar-top-50">{item.title}</h1>
                    <CaseMeta meta={item.meta} />
                </div>

                <div className="col-md-8 offset-md-2">
                    <div
                    className="post-content-wrap"
                    dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                    />
                </div>
                </div>

                <CaseNav prev={item.prev} next={item.next} />
            </div>
            </div>
        </div>
        );
    }

    if (!item.title || !item.image || !item.contentHtml) {
        return (
        <div id="content-wrapper">
            <div className="container">
            <div
                className="post-single-wrap mar-top-0"
                dangerouslySetInnerHTML={{ __html: item.fullHtml }}
            />
            </div>
        </div>
        );
    }

    return (
        <div id="content-wrapper">
        <div className="container">
            <div className="post-single-wrap mar-top-0">
            <div className="row">
                <article className="post">
                <div className="col-md-10 offset-md-1 post-img">
                    <img src={item.image} alt="" />
                    </div>

                    <div className="col-md-8 offset-md-2 text-center">
                    <h1 className="post-title mar-top-50">{item.title}</h1>
                    <CaseMeta meta={item.meta} />
                    </div>

                    <div className="col-md-8 offset-md-2">
                    <div
                        className="post-content-wrap"
                        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                    />

                    {item.gallery && item.gallery.length > 0 && (
                        <CaseGallery images={item.gallery} />
                    )}
                    </div>
                </article>
            </div>

            <CaseNav prev={item.prev} next={item.next} />
            </div>
        </div>
        </div>
    );
    }