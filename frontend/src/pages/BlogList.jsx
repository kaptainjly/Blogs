// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";

// export default function BlogList() {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     api.get("/posts")
//        .then(res => setPosts(res.data))
//        .catch(err => console.error(err));
//   }, []);

//   const filteredPosts = posts.filter(post =>
//     post.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4 text-center text-primary">Blog Feed</h1>

//       <input
//         type="text"
//         placeholder="Search posts..."
//         className="form-control search-input"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />

//       {filteredPosts.map(post => (
//         <div key={post.id} className="card mb-3">
//           <div className="card-body">
//             <Link to={`/posts/${post.id}`} className="text-decoration-none">
//               <h4 className="card-title text-dark">{post.title}</h4>
//             </Link>
//             <p className="text-muted small">{new Date(post.created_at).toLocaleString()}</p>

//             <div className="mt-2">
//               <button className="btn btn-sm btn-outline-primary btn-like">👍 Like</button>
//               <button className="btn btn-sm btn-outline-secondary btn-share">🔗 Share</button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {filteredPosts.length === 0 && <p className="text-center mt-4">No posts found.</p>}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";

// export default function BlogList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     api.get("/posts").then(res => setPosts(res.data));
//   }, []);

//   return (
//     <div className="container reading-width">
//       {posts.map(post => (
//         <div key={post.id} className="card blog-card border-0 p-4 mb-4">
//           <h2 className="fw-bold mb-1">{post.title}</h2>
//           <p className="text-muted small">
//             By <span className="fw-medium">{post.author}</span>
//           </p>

//           <Link
//             to={`/posts/${post.id}`}
//             className="stretched-link"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState(""); //  search input
  const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   api.get("/posts").then(res => setPosts(res.data));
  // }, []);

  useEffect(() => {
  setLoading(true);
  api.get("/posts")
    .then(res => setPosts(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);


  // Filter posts based on search input (title, content, or author)
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
  return (
    <div className="container text-center mt-5">
      <div className="spinner-border text-primary mb-3" role="status"></div>
      <p>Loading posts...</p>
    </div>
  );
}

  return (
    <div className="container reading-width mt-5">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-4 shadow-sm border-primary"
      />

      {filteredPosts.length === 0 && (
    <p className="text-center text-muted mt-5">
      No posts found 😕
    </p>
)}

      {/* Posts list */}
      {filteredPosts.map(post => (
        <div key={post.id} className="card blog-card border-0 p-4 mb-4 position-relative">
          <h2 className="fw-bold mb-1">{post.title}</h2>
          <p className="text-muted small">
            By <span className="fw-medium">{post.author}</span>
          </p>

          {/* Show preview of content */}
          <p className="mt-2">
            {post.content.length > 120 
              ? post.content.slice(0, 120) + "..." 
              : post.content
            }
          </p>

          {/* Read More link */}
          <Link
            to={`/posts/${post.id}`}
            className="stretched-link text-decoration-none fw-semibold"
          >
            Read More
          </Link>
        </div>
      ))}

<<<<<<< HEAD
     
=======
      {/* No posts found message */}
      {filteredPosts.length === 0 && (
        <p className="text-center text-muted mt-4">Loading...</p>
      )}
>>>>>>> d1d0198a87cf80233126da7779ccbcbdd8c7cef9
    </div>
  );
}


