import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePublicationDetails } from "../shared/hooks/usePublicationDetails";
import { useAddComment } from "../shared/hooks/useAddComment";
import "./PublicationDetails.css";

export const PublicationDetail = () => {
  const { id } = useParams();
  const { publication, loading, setPublication } = usePublicationDetails(id);
  const { submitComment } = useAddComment();
  const [commentInput, setCommentInput] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleCommentSubmit = async () => {
    if (commentInput.trim()) {
      const res = await submitComment(id, {
        comment: commentInput,
        user: username || "Anónimo", 
      });
      if (res.success) {
        setPublication((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), res.comment],
        }));
        setCommentInput("");
        setUsername(""); 
      } else {
        alert("No se pudo agregar el comentario.");
      }
    }
  };

  const handleGoBack = () => {
    navigate("/"); 
  };

  if (loading) return <p>Cargando publicación...</p>;
  if (!publication) return <p>Publicación no encontrada</p>;

  return (
    <div className="publication-detail">

      <div className="publication-content">
        <h2>{publication.title}</h2>
        <p>{publication.text}</p>
        <p><strong>Autor:</strong> {publication.user}</p>
        <p><strong>Fecha:</strong> {new Date(publication.createdAt).toLocaleDateString()}</p>
        <p><strong>Categoría:</strong> {publication.category?.name}</p>

        <h3>Comentarios</h3>
        {publication.comments && publication.comments.length > 0 ? (
          <ul className="comments-list">
            {publication.comments.map((comment) => (
              <li key={comment._id}>
                <strong>{comment.user}:</strong> {comment.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>

      <div className="comment-form">
        <h4>Agregar Comentario</h4>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Escribe tu nombre..."
          />
        </div>
        <textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          rows={3}
          placeholder="Escribe tu comentario..."
        />
        <button onClick={handleCommentSubmit}>Agregar</button>

        <button onClick={handleGoBack} className="back-button">
          Regresar a las Publicaciones
        </button>
      </div>
    </div>
  );
};
