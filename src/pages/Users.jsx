import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../services/get.service";
import "../style/users.style.css";
import { useAuth } from "../context/auth";

const Users = ({ onSelectUser }) => {
  const { refetch } = useAuth(); // ✅ useAuth() ni eng yuqori darajada chaqiramiz

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (query.length <= 2) {
        setUsers([]);
        return;
      }

      setLoading(true);
      try {
        const response = await getData(`users/name/${query}`);

        if (response?.status === 401) {
          await refetch(); // Tokenni yangilash
          return fetchUsers(); // Qayta chaqirish
        }

        setUsers(
          response?.success && Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error("Xatolik:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(); // ✅ useEffect ichida fetchUsers chaqiriladi
  }, [query, refetch]); // 🔥 query va refetch'ga bog‘liq

  return (
    <div className="users-section">
      <div className="search-box">
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck="false"
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>

      {query.length > 2 && (
        <div className="search-results">
          {loading && <p>Qidirilmoqda...</p>}
          {!loading && users.length === 0 && <p>Hech narsa topilmadi</p>}
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => onSelectUser(user)}
              >
                <img
                  src={user.avatar_uri}
                  alt={user.full_name}
                  className="user-avatar"
                />
                <span className="user-name">{user.full_name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;

