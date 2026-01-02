import React from "react";
import Link from "next/link";

export type Assistant = {
  id: string;
  name: string;
  language: string;
  tone: string;
  responseLength?: {
    short: number;
    medium: number;
    long: number;
  };
  audioEnabled?: boolean;
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
        {assistant.responseLength && (
                    <p>
                        <strong>Respuestas:</strong>{" "}
                        C {assistant.responseLength.short}% ·
                        M {assistant.responseLength.medium}% ·
                        L {assistant.responseLength.long}%
                    </p>
                    )}

                    <p>
                    <strong>Audio:</strong>{" "}
                    {assistant.audioEnabled ? "Habilitado" : "Deshabilitado"}
                    </p>
      </section>

<footer className="card-actions">
  <button
    type="button"
    className="btn-secondary"
    onClick={() => onEdit(assistant)}
  >
    Editar
  </button>

  <Link href={`/${assistant.id}`}>
    <button type="button" className="btn-primary">
      Entrenar
    </button>
  </Link>

  <button
    type="button"
    className="btn-danger"
    onClick={() => onDelete(assistant.id)}
  >
    Eliminar
  </button>
</footer>

    </article>
  );
}
