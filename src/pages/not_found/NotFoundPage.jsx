import { Link } from "react-router-dom";
import "./not-found.css"

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Kecha uzr! Bunday sahifa topilmadi.</p>
      <Link to="/">Bosh sahifaga qaytish</Link>
    </div>
  );
};

export default NotFound;
