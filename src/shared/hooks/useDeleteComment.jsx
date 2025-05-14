import { useState } from "react";
import { deleteComment } from "../../services";

export const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitDelete = async (id) => {
    setLoading(true);
    setError(null);

    const response = await deleteComment(id);

    if (response.error) {
      setError("Error al eliminar el comentario");
    }

    setLoading(false);
    return response;
  };

  return {
    submitDelete,
    loading,
    error,
  };
};
