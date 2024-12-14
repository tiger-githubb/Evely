import Organizationstable from "./_components/table/data-table";

export default function OrganizationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Organisations</h1>
      <Organizationstable />
    </div>
  );
}
