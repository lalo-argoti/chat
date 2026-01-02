import React from "react";
import Link from "next/link";

export type Assistant = {
  id: string;
  name: string;
  language: string;
  tone: string;
};

type Props = {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onDelete: (id: string) => void;
};

export default function AssistantCard({
  assistant,
  onEdit,
  onDelete,
}: Props) {
  return (
    <article className="card" aria-label={`Asistente ${assistant.name}`}>
      <header className="card-header">
        <h3>{assistant.name}</h3>
      </header>

      <section className="card-meta">
        <p>
          <strong>Idioma:</strong> {assistant.language}
        </p>
        <p>
          <strong>Tono:</strong> {assistant.tone}
        </p>
      </section>

      <footer className="card-actions">
        <button type="button" onClick={() => onEdit(assistant)}>
          Editar
        </button>

        <Link href={`/${assistant.id}`}>
          <button type="button">Entrenar</button>
        </Link>

        <button
          type="button"
          onClick={() => onDelete(assistant.id)}
          className="danger"
        >
          Eliminar
        </button>
      </footer>
    </article>
  );
}
