"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {


  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a className="title-large">SPEED</a>
        </div>
        <div className="navbar-links">
          <ul className="menu-horizontal title-large font-bold">
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="dropdown-menu">
                    <>
                      <li>
                        <Link className="hover-highlight" href="/pages/browse">
                          Browse
                        </Link>
                      </li>
                      <li>
                        <Link className="hover-highlight" href="/pages/search">
                          Search
                        </Link>
                      </li>
                      <li>
                        <Link className="hover-highlight" href="/pages/submit">
                          Submit
                        </Link>
                      </li>
                      <li>
                        <Link className="hover-highlight" href="/pages/moderate">
                          Moderate
                        </Link>
                      </li>
                      <li>
                        <Link className="hover-highlight" href="/pages/analyse">
                          Analyse
                        </Link>
                      </li>
                      <li>
                        <Link className="hover-highlight" href="/pages/admin">
                          Admin
                        </Link>
                      </li>
                    </>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
