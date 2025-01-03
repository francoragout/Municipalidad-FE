"use client";

import { Table } from "@tanstack/react-table";
import { Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import DataTableCreateForm from "./data-table-create-form";
import { toast } from "sonner";
import { DeleteTasks } from "@/lib/tasks/tasks.api";
import { useRouter } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRowsCount = table.getSelectedRowModel().rows.length;
  const router = useRouter();

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const tasksIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );

    DeleteTasks(tasksIds).then((response) => {
      if (response.success) {
        toast.success(response.message);
        table.resetRowSelection();
        router.refresh();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {selectedRowsCount > 1 && (
          <Button
            className="h-8"
            onClick={handleDeleteSelected}
            size="sm"
            variant="outline"
          >
            <div className="space-x-2 flex">
              <Trash className="h-4 w-4" />
              <span className="hidden sm:flex">Delete Tasks</span>
            </div>
          </Button>
        )}
        <DataTableViewOptions table={table} />
        <DataTableCreateForm />
      </div>
    </div>
  );
}
