"use client";

import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const simulatedResponses = [
  "Entendido, ¿en qué más puedo ayudarte?",
  "Esa es una excelente pregunta. Déjame explicarte...",
  "Claro, con gusto te ayudo con eso.",
  "¿Podrías darme más detalles sobre tu consulta?",
  "Perfecto, he registrado esa información."
];

interface TrainingEntry {
  entry: string;
  response: string;
}

export default function TrainAssistantPage({ params }: PageProps) {
  const { id } = use(params);

  const [entries, setEntries] = useState<TrainingEntry[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedResponse, setSelectedResponse] = useState("");

  /* ===== Cargar entrenamiento desde localStorage ===== */
  useEffect(() => {
    const saved = localStorage.getItem(`training-${id}`);
    if (saved) {
      let parsed: TrainingEntry[] = [];
      try {
        parsed = JSON.parse(saved);
        // Verificar si no es un array sino un string plano (formato antiguo)
        if (!Array.isArray(parsed)) throw new Error("Formato antiguo");
      } catch {
        // migrar formato antiguo: string plano → [{entry, response:""}]
        parsed = [{ entry: saved, response: "" }];
        localStorage.setItem(`training-${id}`, JSON.stringify(parsed));
      }

      setEntries(parsed);
      setCurrentEntry(parsed[0].entry);
      setSelectedResponse(parsed[0].response || "");
    } else {
      setEntries([{ entry: "", response: "" }]);
    }
  }, [id]);

  /* ===== Guardar la entrada actual ===== */
  const handleSaveCurrent = () => {
    const updatedEntries = [...entries];
    updatedEntries[currentIndex] = { entry: currentEntry, response: selectedResponse };
    setEntries(updatedEntries);
    localStorage.setItem(`training-${id}`, JSON.stringify(updatedEntries));
  };

  /* ===== Navegación ===== */
  const handleNext = () => {
    handleSaveCurrent();
    if (currentIndex < entries.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentEntry(entries[currentIndex + 1].entry);
      setSelectedResponse(entries[currentIndex + 1].response || "");
    } else {
      const updated = [...entries, { entry: "", response: "" }];
      setEntries(updated);
      setCurrentIndex(updated.length - 1);
      setCurrentEntry("");
      setSelectedResponse("");
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    handleSaveCurrent();
    setCurrentIndex(currentIndex - 1);
    setCurrentEntry(entries[currentIndex - 1].entry);
    setSelectedResponse(entries[currentIndex - 1].response || "");
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "800px" }}>
      <h1>Entrenamiento del Asistente</h1>
      <p>
        <strong>ID del asistente:</strong> {id}
      </p>

      {/* Entrada y respuesta */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="Escriba aquí su entrada de entrenamiento..."
          style={{ flex: 1, minHeight: "120px", padding: "1rem" }}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <label>
            <strong>Respuesta:</strong>
          </label>
          <select
            value={selectedResponse}
            onChange={(e) => setSelectedResponse(e.target.value)}
            style={{ flex: 1, minHeight: "120px", padding: "0.5rem" }}
          >
            <option value="">Seleccione una respuesta</option>
            {simulatedResponses.map((resp, idx) => (
              <option key={idx} value={resp}>
                {resp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botones de navegación */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Anterior
        </button>
        <button onClick={handleNext}>Siguiente</button>
        <button onClick={handleSaveCurrent}>Guardar</button>
      </div>
    </main>
  );
}
