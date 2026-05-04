    import { useEffect, useState } from "react";
    import Header from "./Header";
    import Footer from "./Footer";

    export default function Layout({ children }) {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setShowTop(window.scrollY > 600);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
        <Header />
        {children}
        <Footer />

        <span
        className={`scrolltotop ${showTop ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
        <i className="ion-ios-arrow-thin-up"></i>
        </span>
        </>
    );
    }