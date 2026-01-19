import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar bg-white shadow-sm mb-4">
      <div className="container d-flex justify-content-between">
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "var(--primary)" }}
        >
        Eko Essence
        </Link>

        <Link to="/create" className="btn btn-primary">
          New Post
        </Link>
      </div>
    </nav>
  );
}
