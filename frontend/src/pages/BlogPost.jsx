// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";

// export default function BlogPost() {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [name, setName] = useState("");
//   const [comment, setComment] = useState("");


//   useEffect(() => {
//     api.get(`/posts/${id}`)
//       .then(res => setPost(res.data))
//       .catch(err => console.error(err));
//   }, [id]);

//   const submitComment = async (e) => {
//   e.preventDefault();
//   await api.post(`/posts/${id}/comments`, {
//     name,
//     comment
//   });
//   setName("");
//   setComment("");
// };


//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="container mt-5">
//   <div className="card shadow-lg p-4">
//     <h1 className="text-primary mb-3">{post.title}</h1>
//     <p className="text-muted">{new Date(post.created_at).toLocaleString()}</p>
//     <hr />
//     <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
//   </div>
//   <hr />

// <h5>Comments</h5>

// <form onSubmit={submitComment} className="mb-3">
//   <input
//     type="text"
//     placeholder="Your name"
//     value={name}
//     onChange={e => setName(e.target.value)}
//     className="form-control mb-2"
//     required
//   />

//   <textarea
//     placeholder="Write a comment..."
//     value={comment}
//     onChange={e => setComment(e.target.value)}
//     className="form-control mb-2"
//     required
//   />

//   <button className="btn btn-primary btn-sm">Post Comment</button>
// </form>
// {post.comments && post.comments.length === 0 && (
//   <p>No comments yet.</p>
// )}

// {post.comments && post.comments.map((c, index) => (
//   <div key={index} className="border p-2 mb-2 rounded">
//     <strong>{c.name}</strong>
//     <p className="mb-0">{c.comment}</p>
//   </div>
// ))}


// </div>

//   );
// }

import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import api from "../services/api";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  const submitComment = async e => {
    e.preventDefault();
    await api.post(`/posts/${id}/comments`, { name, comment });
    setName("");
    setComment("");
    const res = await api.get(`/posts/${id}`);
    setPost(res.data);
  };

  if (!post) return null;

  const handleDelete = async () => {
  if (!window.confirm("Delete this post?")) return;

  try {
    await api.delete(`/posts/${post.id}`);
    navigate("/");
  } catch (err) {
    alert("Failed to delete post");
  }
};


  return (
    <div className="container reading-width">
      <div className="card border-0 shadow-sm p-4 rounded-4">
        <h1 className="fw-bold mb-1">{post.title}</h1>
        <p className="text-muted mb-4">By {post.author}</p>

        <div className="mb-5" style={{ whiteSpace: "pre-wrap" }}>
          {post.content}
        </div>
      
        <div className="d-flex gap-3 mt-4">
  <button
    className="btn btn-outline-primary"
    onClick={() => navigate(`/edit/${post.id}`)}
  >
    ✏️ Edit
  </button>

  <button
    className="btn btn-outline-danger"
    onClick={handleDelete}
  >
    🗑 Delete
  </button>
</div>


        <h5 className="fw-bold mb-3">Comments</h5>

        {post.comments.map((c, i) => (
          <div key={i} className="mb-2">
            <strong>{c.name}</strong>
            <p className="mb-1">{c.comment}</p>
          </div>
        ))}

        <form onSubmit={submitComment} className="mt-4">
          <input
            className="form-control mb-2"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <textarea
            className="form-control mb-2"
            placeholder="Write a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
          <button className="btn btn-primary">Post Comment</button>
        </form>
      </div>
    </div>
  );
}
