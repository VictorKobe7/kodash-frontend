import {
  Paper,
  Table as TableReact,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Box,
  Card
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  type HeaderGroup,
  flexRender,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues
} from "@tanstack/react-table";
import { useState } from "react";
import { DebouncedInput } from "./DebouncedInput";
import { TablePagination } from "./TablePagination";

export function Table({ data, columns, CreateButton }: any) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false
  });

  return (
    <Card>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 2 }}>
        <DebouncedInput
          value={globalFilter ?? ""}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder="Buscar..."
        />
        <CreateButton />
      </Stack>

      <Stack>
        <TableContainer component={Paper} sx={{ maxHeight: 352 }}>
          <TableReact stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<any>) => (
                <TableRow key={Math.random()}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={Math.random()} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={Math.random()}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={Math.random()} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableReact>
        </TableContainer>

        <Box sx={{ px: 2, py: 1 }}>
          <TablePagination
            {...{
              setPageSize: table.setPageSize,
              setPageIndex: table.setPageIndex,
              getState: table.getState,
              getPageCount: table.getPageCount
            }}
          />
        </Box>
      </Stack>
    </Card>
  );
}
