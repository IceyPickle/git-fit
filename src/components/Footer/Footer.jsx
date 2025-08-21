// src/components/Footer/Footer.jsx

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Git Fit. All rights reserved.</p>
    </footer>
  );
}
