import Template from "@/component/template";
import { getTemplate } from "@/lib/template";

export default async function Editor({ params }: { params: { id: string } }) {
  const template = await getTemplate(params.id);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl mb-2">Editor: {params.id}</h2>
      <Template template={template} />
    </div>
  );
}
