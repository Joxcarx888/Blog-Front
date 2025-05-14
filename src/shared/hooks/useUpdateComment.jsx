import { useState } from "react";
import { updateComment } from "../../services";

export const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitUpdate = async (id, updatedComment) => {
    setLoading(true);
    setError(null);

    const response = await updateComment(id, updatedComment);

    if (response.error) {
      setError("Error al actualizar el comentario");
    }

    setLoading(false);
    return response;
  };

  return {
    submitUpdate,
    loading,
    error,
  };
};
