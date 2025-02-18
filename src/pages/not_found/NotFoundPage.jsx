import { Link } from "react-router-dom";
import "./not-found.css"

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>GAPLASHAMIZMI 😄</h1>
      <h2>404</h2>
      <p>Not found 😞 </p>
      <Link to="/">Go Chat</Link>
    </div>
  );
};

export default NotFound;
