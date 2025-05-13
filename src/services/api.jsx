import axios from "axios";

  const apiClient = axios.create({
      baseURL: 'http://localhost:3333/facebook/v1/',
      timeout: 5000
  })

  export const getPublications = async () => {
    try {
      const response = await apiClient.get('post/');
      return response;
    } catch (e) {
      return { error: true, e };
    }
  };

  export const addComment = async (id, commentData) => {
    try {
      const response = await apiClient.post(`post/addcomment/${id}`, commentData);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
  export const getPostDetails = async (id) => {
    try {
      const response = await apiClient.get(`post/details/${id}`); 
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
  export const updateComment = async (id, comment) => {
    try {
      const response = await apiClient.put(`comments/${id}`, { comment });
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
  export const deleteComment = async (id) => {
    try {
      const response = await apiClient.delete(`comments/${id}`);
      return response.data;
    } catch (e) {
      return { error: true, e };
    }
  };
  
const checkResponseStatus = (e) => {
  const responseStatus = e?.response.status;
  if (responseStatus) {
    (responseStatus === 401 || responseStatus === 403) && logout();
  }
};