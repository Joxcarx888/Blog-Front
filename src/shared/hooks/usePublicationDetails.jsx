import { useState, useEffect } from 'react';
import { getPostDetails } from '../../services'; 

export const usePublicationDetails = (id) => {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await getPostDetails(id);
        if (response?.success) {
          setPublication(response.post);
        } else {
          console.error('No se pudo obtener la publicación.');
        }
      } catch (error) {
        console.error('Error al cargar publicación:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPublication();
  }, [id]);

  return { publication, loading, setPublication };
};
