// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Editor from "../components/Editor";
// import api from "../services/api";

// export default function EditPost() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     api.get(`/posts/${id}`).then(res => {
//       setTitle(res.data.title);
//       setAuthor(res.data.author);
//       setContent(res.data.content);
//     });
//   }, [id]);

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       await api.put(`/posts/${id}`, {
//         title,
//         content,
//         author
//       });
//       navigate(`/posts/${id}`);
//     } catch (err) {
//       alert("Failed to update post");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card p-4 shadow-lg">
//         <h2 className="text-center text-primary mb-4">Edit Post</h2>

//         <form onSubmit={handleUpdate}>
//           <input
//             className="form-control mb-3"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             required
//           />

//           <Editor onChange={setContent} />

//           <input
//             className="form-control mt-3"
//             value={author}
//             onChange={e => setAuthor(e.target.value)}
//             required
//           />

//           <button className="btn btn-success w-100 mt-4">
//             Save Changes
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// // src/pages/EditPost.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";
// import Editor from "../components/Editor";

// export default function EditPost() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState(""); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the existing post
//     api.get(`/posts/${id}`)
//       .then(res => {
//         setTitle(res.data.title);
//         setAuthor(res.data.author);
//         setContent(res.data.content); 
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/posts/${id}`, { title, author, content });
//       navigate(`/posts/${id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Error updating post");
//     }
//   };

//   if (loading) return <p className="text-center mt-5">Loading post...</p>;
 


//   return (
//     <div className="container mt-5">
//       <div className="card shadow-lg p-4">
//         <h1 className="text-primary mb-4 text-center">Edit Post</h1>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="form-control form-control-lg mb-3"
//             required
//           />

//           <Editor
//             value={content}        
//             onChange={setContent}  
//           />
 

//           <input
//             type="text"
//             placeholder="Author name"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="form-control mt-3"
//             required
//           />

//           <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
//             Update Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Editor from "../components/Editor";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setContent(res.data.content); 
      })
      .finally(() => setLoading(false));
  }, [id]);

  
  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/posts/${id}`, { title, author, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating post");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading post...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-primary mb-4 text-center">Edit Post</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control form-control-lg mb-3"
            required
          />

          <Editor
            value={content}        
            onChange={handleContentChange}  
          />

          <input
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control mt-3"
            required
          />

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

