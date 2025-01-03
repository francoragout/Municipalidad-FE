import { Metadata } from "next";
import { z } from "zod";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { taskSchema } from "@/lib/schema";
import { TableSkeleton } from "@/components/skeleton";
import { Suspense } from "react";
import { ModeToggle } from "@/components/theme-toggle-button";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

type Task = z.infer<typeof taskSchema>;

const URL = process.env.API_URL || "http://localhost:5000";

async function getTasks(): Promise<Task[]> {
  const data = await fetch(`${URL}/api/tasks`, {
    cache: "no-store",
  });
  const tasks = await data.json();
  return tasks.map((task: Task) => taskSchema.parse(task));
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <div className="container mx-auto h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable data={tasks} columns={columns} />
      </Suspense>
    </div>
  );
}
