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
  





const checkResponseStatus = (e) => {
  const responseStatus = e?.response.status;
  if (responseStatus) {
    (responseStatus === 401 || responseStatus === 403) && logout();
  }
};