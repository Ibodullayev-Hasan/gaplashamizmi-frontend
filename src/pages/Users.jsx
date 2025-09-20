import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getData } from "../services/get.service";
import "../style/users.style.css";
import { useAuth } from "../context/auth";
import { SocketContext } from "../context/SocketContext";

const Users = ({ onSelectUser, setShowTools }) => {
  const socket = useContext(SocketContext);
  const { refetch } = useAuth();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentUsers, setRecentUsers] = useState([]);

  // recent users
  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await getData("chat/recent");
console.log(res);

        if (res?.status === 401) {
          console.log('401 chat recent');
          
          await refetch();
          return fetchRecentUsers();
        }
        setRecentUsers(res.success && Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Recent users error:", err);
      }
    };

    fetchRecentUsers();

    socket.emit("recent-users");

    const handleSocketRecentUsers = (data) => {
      setRecentUsers(data);
    };

    socket.on("recent-users", handleSocketRecentUsers);

    // 🔒 cleanup
    return () => {
      socket.off("recent-users", handleSocketRecentUsers);
    };
  }, [refetch]);

  // search logic
  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim().length <= 0) {
        setUsers([]);
        setShowResults(false);
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

  useEffect(() => {
    socket.on("user-status-changed", ({ userId, is_online }) => {
      setRecentUsers((prev) =>
        prev.map((item) =>
          item.user.id === userId
            ? { ...item, user: { ...item.user, is_online } }
            : item
        )
      );
    });

    return () => {
      socket.off("user-status-changed");
    };
  }, []);

  // --------------------------------------------------- //
  return (
    <div className="users-section">
      {/* search */}
      <div className="search-wrapper">
        {/* menu btn */}
        <div
          className="users-account-bar"
          onClick={() => {
            setShowTools(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="search-box">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
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

      {/* search results */}
      {showResults && (
        <div className="search-results">
          {loading && <p>Qidirilmoqda...</p>}
          {!loading && users.length === 0 && <p>Foydalanuvchi mavjud emas</p>}
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => {
                  onSelectUser(user);
                  setShowResults(false); // tanlagandan keyin yashir
                  setQuery("");
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

      {/* recent users */}
      {!showResults && recentUsers.length > 0 ? (
        <div className="recent-users">
          <div className="scroll-recent-users">
            <ul>
              {recentUsers.map((item) => (
                <li
                  key={item.user.id}
                  onClick={() => {
                    onSelectUser(item.user); // 💡 foydalanuvchini tanlash
                  }}
                >
                  <img
                    src={item.user.avatar_uri}
                    alt={item.user.full_name}
                    width={30}
                  />
                  <div
                    className={`online-status ${
                      item.user.is_online ? "online" : "offline"
                    }`}
                  ></div>
                  <div>
                    <p>{item.user.full_name}</p>
                    <span>{item.lastMessage?.text || "..."}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Users;
