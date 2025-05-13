import { useListPublications } from "../shared/hooks";
import { LoadingSpinner } from "../dashboard/loadingSpinner";
import './Publications.css'; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ListPublications = () => {
  const { publications, isLoading } = useListPublications();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleClick = (id) => {
    navigate(`/publication/${id}`);
  };

  const handleFilter = () => {
    if (selectedCategory) {
      const filteredList = publications.filter(
        (pub) => pub.category?.name === selectedCategory
      );
      setFiltered(filteredList);
    } else {
      setFiltered([]);
    }
  };

  const displayedPublications = filtered.length > 0 ? filtered : publications;

  return (
    <div className="list-publication-container">
      <h2 className="list-publication-title">Lista de Publicaciones</h2>

      <div className="filter-bar">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Selecciona una categoría --</option>
          <option value="Taller">Taller</option>
          <option value="PracticaSupervisada">Práctica Supervisada</option>
          <option value="Tecnologia">Tecnología</option>
        </select>
        <button onClick={handleFilter}>Buscar</button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="cards-grid">
          {displayedPublications.map(({ _id, title, text, user, category, createdAt }) => (
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
