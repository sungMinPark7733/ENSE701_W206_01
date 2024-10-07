"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/home");
  };

  return (
    <div className="pt-5">
      <div className="navbar bg-blue-100 shadow-xl w-[97%] m-auto rounded-md">
        <div className="flex-1 text-3xl">
          <a className="btn btn-ghost text-3xl">SPEED</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-3xl font-bold">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="bg-blue-200 rounded-t-none p-2 text-lg">
                  <li>
                    <Link className="hover:bg-blue-300" href="/pages/browse">Browse</Link>
                  </li>
                  <li>
                    <Link className="hover:bg-blue-300" href="/pages/submit/page">Submit New Article</Link>
                  </li>
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
