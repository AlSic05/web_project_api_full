import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_url"
          name="avatar"
          placeholder="Enlace a la imagen"
          type="url"
          required
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
