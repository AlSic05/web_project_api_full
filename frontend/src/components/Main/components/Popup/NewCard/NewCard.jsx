import { useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("card-name"),
      link: formData.get("link"),
    };

    handleAddPlaceSubmit(data);
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Title"
          required
          type="text"
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
