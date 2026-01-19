// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import BlogList from "./pages/BlogList";
// import BlogPost from "./pages/BlogPost";
// import CreatePost from "./pages/CreatePost";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//         <Link className="navbar-brand" to="/">Eko Essence</Link>
//         <div className="ms-auto">
//           <Link className="btn btn-outline-light" to="/create">
//             New Post
//           </Link>
//         </div>
//       </nav>

//       <Routes>
//         <Route path="/" element={<BlogList />} />
//         <Route path="/create" element={<CreatePost />} />
//         <Route path="/posts/:id" element={<BlogPost />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/posts/:id" element={<BlogPost />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />

      </Routes>
    </BrowserRouter>
  );
}

