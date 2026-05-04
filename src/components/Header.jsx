    import { useEffect, useRef, useState } from 'react';

    const links = [
    { href: '/', label: 'Selected Work' },
    { href: '/insights.html', label: 'Insights' },
    { href: '/about-me.html', label: 'About me' },
    { href: 'mailto:charly.meza.st@gmail.com', label: 'Contact' },
    ];

    export default function Header() {
    const [open, setOpen] = useState(false);
    const current = window.location.pathname;

    const [hideHeader, setHideHeader] = useState(false);
    const lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
        const scrollTop = window.scrollY;

        if (scrollTop <= 80) {
            setHideHeader(false);
        } else if (scrollTop > lastScrollTop.current) {
            setHideHeader(true);
        } else {
            setHideHeader(false);
        }

        lastScrollTop.current = scrollTop;
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header id="header" className={`scroll-hide ${hideHeader ? "hide" : ""}`}>
        <div className="header-wrapper">
            <div className="container">
            <div id="logo">
                <a href="/">
                <img src="/images/logo.png" alt="Logo" />
                </a>
            </div>

            <nav>
                <button
                type="button"
                className={`menu-button ${open ? "menu-close" : "menu-open"}`}
                onClick={() => setOpen(!open)}
                aria-label="Open menu"
                >
                <i className="open-icon ion-android-menu"></i>
                <i className="close-icon ion-android-close"></i>
                </button>

                <ul className={`flexnav standard ${open ? 'flexnav-show' : ''}`} data-breakpoint="800">
                {links.map((link) => (
                    <li key={link.href}>
                    <a
                        className={current === link.href && current !== '/' ? 'active' : ''}
                        href={link.href}
                    >
                        {link.label}
                    </a>
                    </li>
                ))}
                </ul>
            </nav>
            </div>
        </div>
        </header>
    );
    }