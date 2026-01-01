import React, { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
};

export default function AssistantForm({ onClose, onSave, initialData }: Props) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initialData?.name || "");
  const [language, setLanguage] = useState(initialData?.language || "Español");
  const [tone, setTone] = useState(initialData?.tone || "Formal");

  const nextStep = () => {
    if (!name || name.length < 3) return alert("El nombre debe tener al menos 3 caracteres");
    setStep(2);
  };

  const save = () => {
    onSave({ name, language, tone });
    onClose();
  };

  return (
    <div className="modal">
      {step === 1 && (
        <>
          <h2>Datos Básicos</h2>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
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
          <button onClick={nextStep}>Siguiente</button>
          <button onClick={onClose}>Cancelar</button>
        </>
      )}
      {step === 2 && (
        <>
          <h2>Configuración de respuestas</h2>
          {/* Aquí puedes agregar inputs para short/medium/long y checkbox audio */}
          <button onClick={() => setStep(1)}>Atrás</button>
          <button onClick={save}>Guardar</button>
        </>
      )}
    </div>
  );
}
