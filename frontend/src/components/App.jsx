import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/Api.js";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { register, authorize, getUserInfo } from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const data = await authorize(email, password);

      if (data.token) {
        localStorage.setItem("jwt", data.token);

        const userData = await getUserInfo(data.token);
        console.log("USERDATA REAL:", userData);

        setCurrentUser(userData.data);
        setIsLoggedIn(true);

        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await register(email, password);

      setIsSuccess(true);
      setIsTooltipOpen(true);

      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      console.error(err);

      setIsSuccess(false);
      setIsTooltipOpen(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/signin");
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res.data || res);
        handleClosePopup();
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (avatarData) => {
    api
      .updateAvatar(avatarData.avatar)
      .then((res) => {
        setCurrentUser(res.data || res);
        handleClosePopup();
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .addCard(cardData.name, cardData.link)
      .then((res) => {
        const newCard = res.data || res;
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch(console.error);
  };
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        const initialCards = res.data || res;

        if (Array.isArray(initialCards)) {
          setCards(initialCards);
        } else {
          console.error(
            "La respuesta de tarjetas no es un array:",
            initialCards,
          );
        }
      })
      .catch(console.error);
  }, []);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  }

  if (isCheckingAuth) {
    return <p>Cargando...</p>;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>

        {isLoggedIn && <Footer />}

        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={() => {
            setIsTooltipOpen(false);
            setIsSuccess(false);
          }}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
