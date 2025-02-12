import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="content-footer footer bg-footer-theme">
      <div className="container-xxl">
        <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
          <div className="mb-2 mb-md-0">
          </div>
          <div className="d-none d-lg-inline-block">©, made with ❤️ by E3N</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
