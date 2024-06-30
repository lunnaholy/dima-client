import React, { useCallback } from "react";
import { getNormalizedDate, getNormalizedDateTime } from "../../../utils";
import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { UserChip } from "../chips/userChip";
import { RenterChip } from "../chips/renterChip";
import { FaCopy } from "react-icons/fa6";

export enum ColumnType {
  Date = "date",
  DateTime = "datetime",
  String = "string",
  Number = "number",
  Boolean = "boolean",
  User = "user",
  Renter = "renter",
  Custom = "custom"
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => any;
  type?: ColumnType;
}

interface TableBuilderProps {
  rowsPerPage?: number;
  columns: Column[];
  data: any[];
}

type SortDescriptor = {
  column: string;
  direction: 'ascending' | 'descending';
};

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

  const onSortChange = (e: any) => {
    setSortDescriptor(e);
    const sorted = sort(tableData, e);
    setTableData(sorted);
  };

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tableData.slice(start, end);
  }, [page, data, tableData]);

  function sort<T extends T[]>(items: T[], sortDescriptor: SortDescriptor): T[] {
    const { column, direction } = sortDescriptor;

    if (items.length === 0 || !(column in items[0])) return items;

    return [...items].sort((a, b) => {
      const aValue = a[column as keyof T];
      const bValue = b[column as keyof T];

      if (aValue === bValue) return 0;

      const order = direction === 'ascending' ? 1 : -1;
      return (aValue > bValue ? 1 : -1) * order;
    });
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
          {(column) => <TableColumn key={column.key} allowsSorting={column.sortable || false}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={items} emptyContent={"Нет данных."}>
          {(item) => (
            <TableRow key={(item as any).id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {renderCell(item, column)}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

function CopyableElement({ children }: { children: any }) {
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(children);
  }, []);

  return (
    <div className="flex flex-row gap-2 items-center">
      { children }
      <FaCopy className="text-foreground-400 hover:text-foreground-500 cursor-pointer transition-all" onClick={onClick} />
    </div>
  )
}

function renderCell(row: any, column: Column) {
  switch (column.type) {
    case ColumnType.Date:
      return <CopyableElement>{ getNormalizedDate(row[column.key]) }</CopyableElement>

    case ColumnType.DateTime:
      return <CopyableElement>{ getNormalizedDateTime(row[column.key]) }</CopyableElement>

    case ColumnType.Number:
      return <CopyableElement>{ row[column.key].toString() }</CopyableElement>

    case ColumnType.Boolean:
      return <CopyableElement>{ row[column.key] ? "да" : "нет" }</CopyableElement>
 
    case ColumnType.String:
      return <CopyableElement>{ row[column.key] }</CopyableElement>

    case ColumnType.User:
      return <UserChip userId={row[column.key]} />
      
    case ColumnType.Renter:
      return <RenterChip renterId={row[column.key]} />

    case ColumnType.Custom:
      return column.render!(row[column.key], row);

    default:
      return "н/д";
  }
}