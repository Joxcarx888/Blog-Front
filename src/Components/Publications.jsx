import { useListPublications } from "../shared/hooks";
import { LoadingSpinner } from "../dashboard/loadingSpinner";
import './Publications.css'; 

export const ListPublications = () => {
  const { publications, isLoading } = useListPublications();

  return (
    <div className="list-publication-container">
      <h2 className="list-publication-title">Lista de Publicaciones</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="cards-grid">
          {publications.map(({ _id, title, text, user, createdAt }) => (
            <div key={_id} className="publication-card">
              <div className="publication-title">{title}</div>
              <div className="publication-text">{text}</div>
              <div className="publication-author">Autor: {user}</div>
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


  
