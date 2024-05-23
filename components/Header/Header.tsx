import React, { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import burgerBtn from "../../assets/burger-menu-svgrepo-com.svg";

type LinkType = {
    id: number;
    title: string;
    href: string;
};


type HeaderProps = {
    logo: string;
    links: LinkType[];
};


const Header = ({ logo, links}: HeaderProps) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className={styles.wrapper}>
            <Link href="/" className={styles.logo}>
            {logo}
            </Link>

            <nav>
                <ul className={styles.links}>
                    {links.map((link) => {
                        return (
                            <a href={link.href} key={link.id}>
                                {link.title}
                            </a>
                        );
                    })}
                </ul>
            </nav>


            <button onClick={()=> setMobileMenuOpen((prevState) => !prevState)}
            className={styles.burgerBtn}
            >
                <img src={burgerBtn.src} alt="burgerBtn" />
            </button>


            <div className={`${styles.mobileMenu} ${isMobileMenuOpen && styles.mobileMenuOpen}`}>
                    <ul className={styles.mobileLinks}>
                        {links.map((link) => {
                            return (
                                <a className={link.href} key={link.id}>
                                    {link.title}
                                </a>
                            );
                        })};
                    </ul>
            </div>
        </header>
    );
};

export default Header;