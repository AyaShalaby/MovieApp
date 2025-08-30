import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <i className="fa-solid fa-triangle-exclamation text-warning fs-1 mb-3"></i>
        <h1 className="fw-bold">404</h1>
        <h2 className="mb-3">Oops! Page Not Found</h2>
        <p className="text-muted">The page you are looking for does not exist.</p>
        <div className="d-flex gap-3 mt-3">
          <Link className="btn btn-style" to="/">
            Go Home
          </Link>
          
        </div>
      </div>
    </>
  );
}
