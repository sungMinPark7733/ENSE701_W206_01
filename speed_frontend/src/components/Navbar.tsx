"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/pages/login");
  };

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
                  {!isLoggedIn ? (
                    <li>
                      <Link className="hover-highlight" href="/pages/login">
                        Login
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link className="hover-highlight" href="/pages/browse">
                          Browse
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
                      <li>
                        <button className="hover-highlight" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </>
                  )}
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