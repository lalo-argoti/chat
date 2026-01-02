"use client";

import { useState, useEffect } from "react";
import AssistantCard, { Assistant } from "./components/AssistantCard";
import AssistantForm from "./components/AssistantForm";
import NewAssistantCard from "./components/NewAssistantCard";
import { exampleAssistants } from "../data/exampleData";

export default function Home() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [editing, setEditing] = useState<Assistant | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* ===== Inicializar desde localStorage ===== */
  useEffect(() => {
    const saved = localStorage.getItem("assistants");

    if (saved) {
      setAssistants(JSON.parse(saved));
    } else {
      setAssistants(exampleAssistants);
      localStorage.setItem("assistants", JSON.stringify(exampleAssistants));
    }
  }, []);

  /* ===== Crear ===== */
  const handleCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  /* ===== Editar ===== */
  const handleEdit = (assistant: Assistant) => {
    setEditing(assistant);
    setShowModal(true);
  };

  /* ===== Guardar (crear o editar) ===== */
  const handleSave = (data: Assistant) => {
    const updatedList = editing
      ? assistants.map(a => (a.id === data.id ? data : a))
      : [...assistants, { ...data, id: crypto.randomUUID() }];

    setAssistants(updatedList);
    localStorage.setItem("assistants", JSON.stringify(updatedList));

    setShowModal(false);
    setEditing(null);
  };

  /* ===== Eliminar ===== */
  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este asistente?")) return;

    const updatedList = assistants.filter(a => a.id !== id);
    setAssistants(updatedList);
    localStorage.setItem("assistants", JSON.stringify(updatedList));
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Asistentes IA</h1>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {assistants.map(assistant => (
          <AssistantCard
            key={assistant.id}
            assistant={assistant}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {/* Tarjeta n+1 */}
        <NewAssistantCard onCreate={handleCreate} />
      </section>

      {/* ===== Modal Crear / Editar ===== */}
      {showModal && (
        <AssistantForm
          initialData={editing ?? undefined}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
        />
      )}
    </main>
  );
}
