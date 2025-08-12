import React from "react";
import { motion } from "framer-motion";
import NotFoundSVG from "../assets/404 Error-amico.svg"; // adjust path
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center"}}
    >
      <div className="notfound-container">
        <img src={NotFoundSVG} alt="404 Not Found" className="notfound-image" />
        <h1>Oops! Page not found</h1>
        <p>The page you are looking for doesn’t exist.</p>
        <Link to="/" className="notfound-link">
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
