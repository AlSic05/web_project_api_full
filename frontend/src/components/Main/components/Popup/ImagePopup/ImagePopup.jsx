export default function ImagePopup({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content popup__content_content_image">
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>

        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}
