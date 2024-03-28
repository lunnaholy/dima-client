import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React from "react";

export interface Column {
  label: string;
  key: string;
  render?: (value: any, row: any) => any;
  sort?: boolean;
  type?: string;
}

interface TableBuilderProps {
  rowsPerPage?: number;
  columns: Column[];
  data: any[];
}

export function TableBuilder({ rowsPerPage = 10, columns, data }: TableBuilderProps) {
  const [page, setPage] = React.useState(1);
  const [tableData, setTableData] = React.useState<any[]>([]);
  const [sortDescriptor, setSortDescriptor] = React.useState<any>({ column: "id", direction: "ascending" });
  const [pages, setPages] = React.useState(1);

  React.useEffect(() => {
    if (data[0] && !data[0].id) {
      data = data.map((item, index) => {
        item.id = index;
        return item;
      });
    }

    setTableData(data.sort((a, b) => a.id < b.id ? 1 : -1));
    setPages(Math.ceil(data.length / rowsPerPage));
  }, [data]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tableData.slice(start, end);
  }, [page, data, tableData]);

  const renderCell = React.useCallback((row: any, columnKey: React.Key) => {
    const cellValue = row[columnKey as keyof any];

    const column = columns.find((column) => column.key === columnKey);

    if (column?.type == "date") {
      return new Date(cellValue).toLocaleDateString();
    }

    if (column?.type == "datetime") {
      return new Date(cellValue).toLocaleString().slice(0, -3);
    }

    if (column?.render) {
      return column.render(cellValue, row);
    }

    return cellValue;
  }, [columns]);

  const sort = (items: any[], sortDescriptor: { column: string; direction: string; }) => {
    const { column, direction } = sortDescriptor;
    const sorted = [...items];

    if (!items[0][column]) return items;

    sorted.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (direction === 'ascending') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  };

  const onSortChange = (e: any) => {
    setSortDescriptor(e);
    const sorted = sort(tableData, e);
    setTableData(sorted);
  };

  return (
    <>
      <Table
        isStriped isHeaderSticky
        onSortChange={onSortChange as any}
        sortDescriptor={sortDescriptor}
        bottomContent={
          <>
            {pages > 1 && (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  color="default"
                  variant="flat"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            )}
          </>
        }>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key} allowsSorting={column.sort || false}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={items} emptyContent={"Нет данных."}>
          {(item) => (
            <TableRow key={(item as any).id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}