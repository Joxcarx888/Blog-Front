import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePublicationDetails } from "../shared/hooks";
import { useAddComment } from "../shared/hooks";
import { useUpdateComment } from "../shared/hooks";
import { useDeleteComment } from "../shared/hooks";
import toast from "react-hot-toast";
import "./PublicationDetails.css";

export const PublicationDetail = () => {
  const { id } = useParams();
  const { publication, loading, setPublication } = usePublicationDetails(id);
  const { submitComment } = useAddComment();
  const { submitUpdate } = useUpdateComment();
  const { submitDelete } = useDeleteComment();
  const [commentInput, setCommentInput] = useState("");
  const [username, setUsername] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const navigate = useNavigate();

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;

    if (editingCommentId) {
      const res = await submitUpdate(editingCommentId, {
        comment: commentInput,
        user: username || "Anónimo",
      });

      if (!res.error) {
        setPublication((prev) => ({
          ...prev,
          comments: prev.comments.map((c) =>
            c._id === editingCommentId
              ? { ...c, comment: commentInput, user: username || "Anónimo" }
              : c
          ),
        }));
        setEditingCommentId(null);
        setCommentInput("");
        setUsername("");
        toast.success("Comentario editado correctamente");
      } else {
        toast.error("Error al editar el comentario");
      }
    } else {
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
        toast.success("Comentario agregado");
      } else {
        toast.error("No se pudo agregar el comentario.");
      }
    }
  };

  const handleEdit = (comment) => {
    setCommentInput(comment.comment);
    setUsername(comment.user);
    setEditingCommentId(comment._id);
  };

  const handleDelete = async (commentId) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este comentario?");
    if (!confirmDelete) return;

    const res = await submitDelete(commentId);
    if (!res.error) {
      setPublication((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
      toast.success("Comentario eliminado");
    } else {
      toast.error("Error al eliminar el comentario");
    }
  };

  const handleGoBack = () => navigate("/");

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
            {[...publication.comments].reverse().map((comment) => (
              <li key={comment._id}>
                <strong>{comment.user}:</strong> {comment.comment}
                <div>
                  <button onClick={() => handleEdit(comment)} className="edit-button">Editar</button>
                  <button onClick={() => handleDelete(comment._id)} className="delete-button">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>        
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>

      <div className="comment-form">
        <h4>{editingCommentId ? "Editar Comentario" : "Agregar Comentario"}</h4>
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
        <button onClick={handleCommentSubmit}>
          {editingCommentId ? "Guardar Cambios" : "Agregar"}
        </button>
        {editingCommentId && (
          <button
            onClick={() => {
              setEditingCommentId(null);
              setCommentInput("");
              setUsername("");
              toast("Edición cancelada");
            }}
          >
            Cancelar
          </button>
        )}
        <button onClick={handleGoBack} className="back-button">
          Regresar a las Publicaciones
        </button>
      </div>
    </div>
  );
};
