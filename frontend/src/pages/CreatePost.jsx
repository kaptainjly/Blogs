import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import api from "../services/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // alert(content); 

    try {
      await api.post("/posts", {
        title,
        content,
        author
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-primary mb-4 text-center">Create New Post</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control form-control-lg mb-3"
            required
          />
          <div className="editor-wrapper mb-4">
          <Editor
            onChange={setContent}   
          />
          </div>

          <input
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control mt-3"
            required
          />

          <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Editor from "../components/Editor";
// import api from "../services/api";

// export default function CreatePost() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [content, setContent] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     await api.post("/posts", { title, author, content });
//     navigate("/");
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "850px" }}>
//       <div className="card border-0 shadow-lg rounded-4 p-4">
//         <h1 className="fw-bold text-center mb-1" style={{ color: "var(--primary)" }}>
//           Create New Post
//         </h1>
//         <p className="text-muted text-center mb-4">
//           Share your thoughts with the world
//         </p>

//         <form onSubmit={handleSubmit}>
//           <input
//             className="form-control mb-3"
//             placeholder="Post title"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             required
//           />

//           <div className="editor-wrapper mb-3">
//             <Editor onChange={setContent} />
//           </div>

//           <input
//             className="form-control mb-3"
//             placeholder="Author name"
//             value={author}
//             onChange={e => setAuthor(e.target.value)}
//             required
//           />

//           <button className="btn btn-primary w-100 btn-lg">
//             Publish
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
