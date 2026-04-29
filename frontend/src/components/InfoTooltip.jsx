import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup popup_is-opened">
      <div className="popup__content popup__content_type_tooltip">
        <button onClick={onClose} className="popup__close" type="button" />

        <div className="popup__icon">
          <img
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? "Éxito" : "Error"}
            className="popup__icon-image"
          />
        </div>

        <p className="popup__message">
          {isSuccess
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
