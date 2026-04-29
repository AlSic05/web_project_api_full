import { useState, useContext } from "react";
import NewCard from "./components/Popup/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/EditProfile/EditProfile.jsx";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar.jsx";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card.jsx";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  console.log("currentUser:", currentUser);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  const [selectedCard, setSelectedCard] = useState(null);

  function handleOpenImagePopup(card) {
    setSelectedCard(card);
  }

  function handleCloseImagePopup() {
    setSelectedCard(null);
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="imagen avatar"
            className="profile__image"
          />
          <div
            className="profile__image-overlay"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__image-edit-icon"
              src="../images/edit-icon.svg"
              alt="Editar"
            />
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenImagePopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      <ImagePopup
        card={selectedCard}
        isOpen={!!selectedCard}
        onClose={handleCloseImagePopup}
      />
    </main>
  );
}

export default Main;
