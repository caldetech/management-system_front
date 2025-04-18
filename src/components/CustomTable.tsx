"use client";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";
import { useState } from "react";

export type GenericRecord = {
  id: string;
  [key: string]: unknown;
};

type CustomTableProps<T extends GenericRecord> = {
  data: T[];
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
};

export default function CustomTable<T extends GenericRecord>({
  data,
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}: CustomTableProps<T>) {
  const columnNames = data?.length
    ? Object.keys(data[0]).filter((key) => key !== "id")
    : [];

  const [columnIndex, setColumnIndex] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex flex-col">
      <table className="table-fixed border-x border-t border-[#EFEFEF] w-full">
        <thead>
          <tr className="border-b border-[#EFEFEF]">
            <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
              {columnNames[columnIndex - 1]
                ? columnNames[columnIndex - 1][0].toUpperCase() +
                  columnNames[columnIndex - 1].substring(1)
                : ""}
            </th>
            <th className="w-1/3 p-2 text-xs text-left text-muted-foreground select-none">
              {columnNames[columnIndex]
                ? columnNames[columnIndex][0].toUpperCase() +
                  columnNames[columnIndex].substring(1)
                : ""}
            </th>
            <th className="w-1/3 p-2">
              <div className="flex gap-2 justify-end">
                <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                  <ChevronLeft
                    className={`${
                      columnIndex === 1 ? "opacity-20" : "opacity-100"
                    } size-4`}
                    onClick={() => {
                      if (columnIndex > 1) setColumnIndex(columnIndex - 1);
                    }}
                  />
                </span>
                <span className="flex w-6 h-6 bg-[#F5F7F9] rounded-full items-center justify-center cursor-pointer">
                  <ChevronRight
                    className={`${
                      columnIndex < columnNames.length - 1
                        ? "opacity-100"
                        : "opacity-20"
                    } size-4`}
                    onClick={() => {
                      if (columnIndex < columnNames.length - 1)
                        setColumnIndex(columnIndex + 1);
                    }}
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr className="border-b border-[#EFEFEF]" key={item.id}>
              <td className="p-2 text-xs text-left text-muted-foreground select-none">
                {!item[columnNames[columnIndex - 1]]
                  ? "Não definido"
                  : String(item[columnNames[columnIndex - 1]])}
              </td>

              <td className="p-2 text-xs text-left text-muted-foreground select-none">
                {!item[columnNames[columnIndex]]
                  ? "Não definido"
                  : String(item[columnNames[columnIndex]])}
              </td>

              <td className="flex justify-end">
                <span className="border border-[#EFEFEF] p-2 rounded-sm m-2 hover:bg-[#F3F4F6] cursor-pointer">
                  <Eye className="size-4" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination>
        <PaginationContent className="justify-end">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <span className="text-xs text-muted-foreground px-2">
              Página {currentPage} de {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
