type Props = {
  onCreate: () => void;
};

export default function NewAssistantCard({ onCreate }: Props) {
  return (
    <button
      onClick={onCreate}
      className="card new-card"
      aria-label="Crear nuevo asistente"
    >
      <span className="plus">+</span>
      <span>Nuevo asistente</span>
    </button>
  );
}
