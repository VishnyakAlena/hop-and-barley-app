import Image from "next/image";
import Link from 'next/link'; 
import './footerStyle.css'

export default function Footer() {

    return (
        <footer>
            <div className="footer-container container">
                <div className="footer__hops-logo-wrapper">
                    <Image src="/images/background/image-footer.svg" width={484} height={264} alt="Hop & Barley Hops Logo" className="footer__hops-logo" />
                </div>
                <nav className="footer__nav">
                    <ul>
                        <li><Link className="footer__nav-link" href="#">Contact</Link></li>
                        <li><Link className="footer__nav-link" href="#">FAQ</Link></li>
                        <li><Link className="footer__nav-link" href="#">Community</Link></li>
                        <li><Link className="footer__nav-link" href="#">Resources</Link></li>
                        <li><Link className="footer__nav-link" href="#">License</Link></li>
                    </ul>
                </nav>
                <p className="footer__copyright">© Hop & Barley 2025. All rights reserved</p>
                </div>
        </footer>
    )
}