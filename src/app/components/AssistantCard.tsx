import React from "react";

type Assistant = {
  id: string;
  name: string;
  language: string;
  tone: string;
};

type Props = {
  assistant: Assistant;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTrain: (id: string) => void;
};

export default function AssistantCard({ assistant, onEdit, onDelete, onTrain }: Props) {
  return (
    <div className="card">
      <h3>{assistant.name}</h3>
      <p>Idioma: {assistant.language}</p>
      <p>Tono: {assistant.tone}</p>
      <div className="actions">
        <button onClick={() => onEdit(assistant.id)}>Editar</button>
        <button onClick={() => onDelete(assistant.id)}>Eliminar</button>
        <button onClick={() => onTrain(assistant.id)}>Entrenar</button>
      </div>
    </div>
  );
}
