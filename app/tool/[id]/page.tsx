import Grid from "@/component/grid";
import { getGrid } from "@/lib/grid";

export default async function Editor({ params }: { params: { id: string } }) {
  const grid = await getGrid(params.id);

  return (
    <main className="flex flex-col">
      <h2 className="text-2xl mb-2">Editor: {params.id}</h2>
      <Grid grid={grid} />
    </main>
  );
}
