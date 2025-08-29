/* src/pages/Categories/Categories.jsx */

import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORY_LIST } from "../../data/exercises";
import "./Categories.css";

function CatThumb({ slug, emoji, alt }) {
  const [imgOk, setImgOk] = useState(true);
  const src = `/categories/${slug}.jpg`; // put images in /public/categories/<slug>.jpg

  return (
    <div className="cat-thumb" aria-label={alt}>
      {imgOk ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgOk(false)}
          loading="lazy"
        />
      ) : (
        <span className="cat-emoji" role="img" aria-label={alt}>
          {emoji}
        </span>
      )}
    </div>
  );
}

export default function Categories() {
  return (
    <div className="categories">
      <h1>Workout Categories</h1>
      <p className="sub">Pick a muscle group to explore demo workouts.</p>

      <div className="cat-grid">
        {CATEGORY_LIST.map((g) => (
          <Link key={g.slug} to={`/categories/${g.slug}`} className="cat-card">
            <CatThumb slug={g.slug} emoji={g.emoji} alt={g.name} />
            <div className="cat-text">
              <div className="cat-title">{g.name}</div>
              <div className="cat-desc">Exercises • Demos</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
