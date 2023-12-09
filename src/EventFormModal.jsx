import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#000000",
  },
};

const EventFormModal = ({ isOpen, onRequestClose, onSubmit, event }) => {
  const [eventTitle, setEventTitle] = useState(event ? event.title : "");

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      ...event,
      title: eventTitle,
    };

    onSubmit(updatedEvent);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>{event ? "Actualizar Evento" : "Crear Nuevo Evento"}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Título del Evento:
          <input type="text" value={eventTitle} onChange={handleTitleChange} />
        </label>
        {/* Puedes agregar más campos según tus necesidades */}
        <button type="submit">Guardar</button>
        <button onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
};

export default EventFormModal;
