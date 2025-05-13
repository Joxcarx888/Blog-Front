import { useState } from "react";
import { addComment } from "../../services/index"; 

export const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitComment = async (postId, commentData) => {
    setLoading(true);
    setError(null);

    const response = await addComment(postId, commentData);

    if (response.error) {
      setError("Error al agregar comentario");
    }

    setLoading(false);
    return response;
  };

  return {
    submitComment,
    loading,
    error,
  };
};
