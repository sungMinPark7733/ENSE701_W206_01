"use client"

import React, { useState } from "react";
import NavBar from "./nav/Navbar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";
import SubmitArticlePage from "@/app/pages/submit/page";
import BrowsePage from "@/app/pages/browse/page";
import AdminPage from "@/app/pages/admin/page";
import AnalyzePage from "@/app/pages/analyse/page";
import ModerateArticlePage from "@/app/pages/moderate/page";

const PopulatedNavBar = () => {
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const renderPage = () => {
    if (currentPage === "submit") {
      return <SubmitArticlePage />;
    } else if (currentPage === "browse") {
      return <BrowsePage />;
    } else if (currentPage === "admin") {
        return <AdminPage />;
      } else if (currentPage === "analyse") {
        return <AnalyzePage />;
      } else if (currentPage === "moderate") {
        return <ModerateArticlePage />;
      }
    return null; // Default, or you can render a home/landing page
  };

  return (
    <>
      <NavBar>
        <NavItem onClick={() => setCurrentPage(null)}>SPEED</NavItem>
        <NavItem onClick={() => setCurrentPage(null)} end>
          Home
        </NavItem>
        <NavItem dropdown>
          Menu
          <NavDropdown>
            <NavItem onClick={() => setCurrentPage("submit")}>Submit new</NavItem>
            <NavItem onClick={() => setCurrentPage("browse")}>View articles</NavItem>
            <NavItem onClick={() => setCurrentPage("admin")}>Admin</NavItem>
            <NavItem onClick={() => setCurrentPage("analyse")}>Analyzer</NavItem>
            <NavItem onClick={() => setCurrentPage("moderate")}>Modertaor</NavItem>
          </NavDropdown>
        </NavItem>
      </NavBar>
      {renderPage()}
    </>
  );
};

export default PopulatedNavBar;