/* src/pages/jsx/Regimen.jsx */
import { useState } from "react";
import { listByDay, clearRegimen } from "../../utils/regimen";
import "../css/Regimen.css";

export default function Regimen() {
  const [byDay, setByDay] = useState(listByDay());

  const refresh = () => setByDay(listByDay());
  const onClear = () => { clearRegimen(); refresh(); };

  return (
    <div className="regimen">
      <h1>Training Regimen</h1>
      <p className="sub">Here’s your weekly plan. Assignments per day coming soon.</p>

      <div className="regimen-grid">
        {Object.entries(byDay).map(([day, items]) => (
          <div key={day} className="regimen-day">
            <h3>{day === "unassigned" ? "Unassigned" : day.toUpperCase()}</h3>
            {items.length === 0 ? (
              <p className="empty">No exercises yet</p>
            ) : (
              <ul>
                {items.map((it) => (
                  <li key={it.key}>
                    {it.name} <span className="cat">({it.category})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <button className="btn clear" onClick={onClear}>Clear Regimen</button>
    </div>
  );
}
