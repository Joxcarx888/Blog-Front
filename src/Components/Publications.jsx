import { useListPublications } from "../shared/hooks";
import { LoadingSpinner } from "../dashboard/loadingSpinner";
import './Publications.css'; 
import { useNavigate } from "react-router-dom";

export const ListPublications = () => {
  const { publications, isLoading } = useListPublications();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/publication/${id}`);
  };

  return (
    <div className="list-publication-container">
      <h2 className="list-publication-title">Lista de Publicaciones</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="cards-grid">
          {publications.map(({ _id, title, text, user, category, createdAt }) => (
            <div key={_id} className="publication-card" onClick={() => handleClick(_id)}>
              <div className="publication-title">{title}</div>
              <div className="publication-text">{text}</div>
              <div className="publication-author">Autor: {user}</div>
              <div className="publication-category">Categoria: {category?.name}</div>
              <div className="publication-date">
                {new Date(createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
