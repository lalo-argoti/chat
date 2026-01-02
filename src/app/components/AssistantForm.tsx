"use client";

import React, { useState } from "react";
import { Assistant } from "./AssistantCard";

type Props = {
  onClose: () => void;
  onSave: (data: Assistant) => void;
  initialData?: Assistant;
};

export default function AssistantForm({ onClose, onSave, initialData }: Props) {
  const [step, setStep] = useState(1);

  // Paso 1: Datos básicos
  const [name, setName] = useState(initialData?.name ?? "");
  const [language, setLanguage] = useState(initialData?.language ?? "Español");
  const [tone, setTone] = useState(initialData?.tone ?? "Formal");

  // Paso 2: Configuración de respuestas
  const [short, setShort] = useState(initialData?.responseLength.short ?? 30);
  const [medium, setMedium] = useState(initialData?.responseLength.medium ?? 50);
  const [long, setLong] = useState(initialData?.responseLength.long ?? 20);
  const [audioEnabled, setAudioEnabled] = useState(initialData?.audioEnabled ?? false);

  // Validar paso 1
  const nextStep = () => {
    if (!name || name.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres");
      return;
    }
    setStep(2);
  };

  // Validar suma de respuestas
  const validateResponses = () => {
    const total = short + medium + long;
    if (total !== 100) {
      alert("La suma de respuestas debe ser 100%");
      return false;
    }
    return true;
  };

  // Guardar cambios
  const save = () => {
    if (!validateResponses()) return;

    const updated: Assistant = {
      id: initialData?.id ?? crypto.randomUUID(), // nuevo asistente si no hay id
      name,
      language,
      tone,
      responseLength: { short, medium, long },
      audioEnabled,
    };

    onSave(updated);
    onClose();
    setStep(1);
  };

  return (
    <div className="modal">
      {step === 1 && (
        <>
          <h2>Datos Básicos</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>Español</option>
            <option>Inglés</option>
            <option>Portugués</option>
          </select>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option>Formal</option>
            <option>Casual</option>
            <option>Profesional</option>
            <option>Amigable</option>
          </select>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <button onClick={nextStep}>Siguiente</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Configuración de Respuestas</h2>

          <label>
            Cortas (%)
            <input type="number" value={short} onChange={(e) => setShort(+e.target.value)} />
          </label>

          <label>
            Medias (%)
            <input type="number" value={medium} onChange={(e) => setMedium(+e.target.value)} />
          </label>

          <label>
            Largas (%)
            <input type="number" value={long} onChange={(e) => setLong(+e.target.value)} />
          </label>

          <label style={{ marginTop: "0.5rem" }}>
            <input
              type="checkbox"
              checked={audioEnabled}
              onChange={(e) => setAudioEnabled(e.target.checked)}
            />
            Habilitar respuestas de audio
          </label>

          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <button onClick={() => setStep(1)}>Atrás</button>
            <button onClick={save}>Guardar</button>
          </div>
        </>
      )}
    </div>
  );
}
