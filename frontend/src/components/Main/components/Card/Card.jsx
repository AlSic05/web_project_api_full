import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({
  card,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, likes } = card;

  const isLiked = likes?.some((like) => like._id === currentUser?._id) ?? false;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(card)}
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleCardDeleteClick}
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
