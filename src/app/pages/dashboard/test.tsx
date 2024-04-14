import { Column, TableBuilder } from "../../components/tables/tableBuilder";

export function TestPage() {
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
      sortable: true
    },
    {
      key: "name",
      label: "Name",
      sortable: true
    },
    {
      key: "age",
      label: "Age",
      sortable: true
    }
  ];

  const items = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 22 },
    { id: 3, name: "Doe", age: 30 }
  ];

  return (
    <>
      <TableBuilder
        columns={columns}
        data={items}
        rowsPerPage={10}
        />
    </>
  )
}