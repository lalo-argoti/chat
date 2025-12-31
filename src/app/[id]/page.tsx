interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SaludoIdPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Hola {id}</h1>
    </main>
  );
}
