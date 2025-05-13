import { useEffect, useState } from 'react';
import { getPublications } from '../../services/index';
export const useListPublications = () => {
    const [publications, setPublications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getPublications();
          console.log("RESPUESTA PUBLICACIONES: ", response); 
          if (response?.data?.success) {
            console.log("Posts encontrados: ", response.data.posts); 
            setPublications(response.data.posts);
          } else {
            console.log("No hay publicaciones o hubo un error en la respuesta");
          }
        } catch (error) {
          console.error("Error fetching publications:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);
  
    return { publications, isLoading };
  };
