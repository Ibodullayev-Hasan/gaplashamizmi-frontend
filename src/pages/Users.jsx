import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../services/get.service";
import "../style/users.style.css";
import { useAuth } from "../context/auth";

const Users = ({ onSelectUser }) => {
  const { refetch } = useAuth();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim().length <= 0) {
        setUsers([]);
        setShowResults(false); // input bo‘sh bo‘lsa natijalarni yashir
        return;
      }

      setLoading(true);
      try {
        const response = await getData(`users/name/${query}`);
        if (response?.status === 401) {
          await refetch();
          return fetchUsers();
        }

        setUsers(
          response?.success && Array.isArray(response.data) ? response.data : []
        );
        setShowResults(true);
      } catch (error) {
        console.error("Xatolik:", error);
        setUsers([]);
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query, refetch]);

  return (
    <div className="users-section">
      <div className="search-wrapper">
        <div className="search-box">
          <input
            id="search-input"
            type="text"
            placeholder="Search users by name or email..."
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setShowResults(val.trim().length > 0);
            }}
            spellCheck="false"
            autoComplete="off"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      {showResults && (
        <div className="search-results">
          {loading && <p>Qidirilmoqda...</p>}
          {!loading && users.length === 0 && <p>Hech narsa topilmadi</p>}
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => {
                  onSelectUser(user);
                  setShowResults(false); // tanlagandan keyin yashir
                  setQuery(""); // inputni tozalash optional
                }}
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
