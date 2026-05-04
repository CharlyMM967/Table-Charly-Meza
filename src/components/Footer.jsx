    import { useEffect, useState } from "react";

    export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setShowTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
        <div className="container">
            <footer id="footer">
            <div className="row">
                <div className="col-xs-12 col-md-6 copyrights">
                <p>&copy;2026 Table</p>
                </div>
                <div className="col-xs-12 col-md-6 footer-socials">
                <a href="https://www.linkedin.com/in/charly-meza-50a085156/">
                    Linkedin
                </a>
                </div>
            </div>
            </footer>
        </div>

        <span
            className={`scrolltotop ${showTop ? "show" : ""}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
            <i className="ion-ios-arrow-thin-up"></i>
        </span>
        </>
    );
    }