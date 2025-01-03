"use client"

import { Row } from "@tanstack/react-table"
import { taskSchema } from "@/lib/schema"
import DataTableEditForm from "./data-table-edit-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteTask } from "@/lib/tasks/tasks.api";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const router = useRouter();

  const handleDelete = async () => {
    DeleteTask(task.id ?? "").then((response) => {
      if (response.success) {
        toast.success(response.message);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col">
          <DataTableEditForm task={task} />
          <Button
            variant="ghost"
            className="flex justify-start pl-2"
            onClick={handleDelete}
            size="sm"
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Eliminar</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}