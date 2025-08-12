import React from "react";
import bible from "../assets/bible.jpg";
import Bible from "../assets/Teaching.svg"
import { motion } from "framer-motion";

export default function About() {
  return (
<motion.section
  initial={{ opacity: 0, y: -50, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <section className="about-wrapper">
    <h2 className="about-head">About Us</h2>

    <div className="about-container">
      <motion.img
        src={Bible}
        alt="Open Bible"
        className="about-img"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      />

      <motion.div
        className="about-text"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
      >
        <p>
          Welcome to <strong>Bib's</strong> — your go-to platform for discovering
          powerful and uplifting Bible verses.
          <br />
          <br />
          We built this space to help you connect with God’s word — anytime, anywhere.
          Whether you're seeking daily encouragement, deep scripture study, or simply
          exploring spiritual truth, <strong>Bib's</strong> makes it easy to search, save,
          and reflect on the beauty of the Bible.
        </p>
      </motion.div>
    </div>

    <motion.div
      className="about-text mission"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
    >
      <p><strong>Our mission is simple:</strong> To spread light through the Word.</p>
      <br />
      <p>✨ What you can do here:</p>
      <ul>
        <li>🔍 Search any Bible passage like <em>“John 3:16”</em> or <em>“Psalm 23”</em></li>
        <li>📖 Discover multiple verses in one search</li>
        <li>💾 Save your favorite scriptures for quick access</li>
        <li>🧘 Reflect daily with a clean and beautiful interface</li>
      </ul>
      <p style={{ marginTop: "1rem" }}>
        Built with ❤️ by believers in both <strong>code</strong> and <strong>Christ</strong>.
      </p>
    </motion.div>
  </section>
</motion.section>

  );
}
