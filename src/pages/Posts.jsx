import { useState } from "react";
import "./Posts.css";
import "./Delete.css";
import "./Edit.css";
import { formatDistanceToNow } from "date-fns";

function Posts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  
  const handleCreate = () => {
    const newPost = {
      id: Date.now(), // id único
      title,
      content,
      username: localStorage.getItem("username"),
      createdAt: new Date()
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  
  /*const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };*/

  /*const handleEdit = (id) => {
    const postToEdit = posts.find(post => post.id === id);
    if(postToEdit){
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    //handleDelete(id); 
      setPosts(posts.filter(post => post.id !== id));
    }
  };*/

  // 🔹 Funções do modal
  const confirmDelete = (id) => {
    setPostToDelete(id);
    setShowDeleteModal(true); // abre o modal
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
    setShowDeleteModal(false); // fecha o modal
  };

  const handleConfirmDelete = () => {
    setPosts(posts.filter(post => post.id !== postToDelete)); // deleta
    setPostToDelete(null);
    setShowDeleteModal(false); // fecha o modal
  };

  ////////////////  edit  ///////////////////////////
  const confirmEdit = (post) => {
  setPostToEdit(post);
  setEditTitle(post.title);
  setEditContent(post.content);
  setShowEditModal(true);
};

const handleCancelEdit = () => {
  setPostToEdit(null);
  setShowEditModal(false);
};

const handleSaveEdit = () => {
  setPosts(posts.map(p => 
    p.id === postToEdit.id ? { ...p, title: editTitle, content: editContent } : p
  ));
  setPostToEdit(null);
  setShowEditModal(false);
};



////////////////////////

  
return (
  <div>
    <header className="header">CodeLeap Network</header>

    <div className="main-container">
      {/* Criar post */}
      <div className="create-post">
        <h2>What's on your mind?</h2>
        <label>Title</label>
        <input
          placeholder="Hello world"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Content</label>
        <textarea
          placeholder="Content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button disabled={!title || !content} onClick={handleCreate}>
          Create
        </button>
      </div>

      {/* Lista de posts */}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="post-header">
            <h3>{post.title}</h3>
            <div className="post-actions">
              {post.username === localStorage.getItem("username") && (
                <>
                  <button className="edit-btn" onClick={() => confirmEdit(post)}>
                    <i className="bx bx-edit"></i>
                  </button>
                  <button className="delete-btn" onClick={() => confirmDelete(post.id)}>
                    <i className="material-icons" style={{ fontSize: "30px" }}>
                      delete_forever
                    </i>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="post-content">
            <div className="post-header-row">
              <p className="username">@{post.username}</p>
              <p className="timestamp">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
            <p className="content">{post.content}</p>
          </div>
        </div>
      ))}

      {/* Modal de delete */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-text">
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={handleCancelDelete}>Cancel</button>
              <button className="delete-btn" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edit */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-text">
            <p>Edit item</p>
            <label>Title</label>
            <input 
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Hello world"
            />
            <label className="edit-label">Content</label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Content here"
            ></textarea>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
              <button className="save-btn" onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default Posts;