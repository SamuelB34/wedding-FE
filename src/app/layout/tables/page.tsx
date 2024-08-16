import { WebTables } from "@/shared/components/web-tables/WebTables";

export default function Tables() {
  return (
    <>
      <WebTables records={10} loading={false} />
    </>
  );
}
