import { taskSchema } from "@/lib/schema";
import { z } from "zod";

export async function CreateTask(values: z.infer<typeof taskSchema>) {
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return {
    success: response.ok,
    message: "Task created successfully",
  };
}

export async function UpdateTask(
  values: z.infer<typeof taskSchema>,
  id: string
) {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return {
      success: response.ok,
      message: "Task updated successfully",
    };
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}

export async function DeleteTask(id: string) {
  const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE",
  });

  return {
    success: response.ok,
    message: "Task deleted successfully",
  };
}

export async function DeleteTasks(tasksIds: string[]) {
  try {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasksIds), // Enviando el array directamente
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete tasks: ${errorText}`);
    }

    return {
      success: true,
      message: "Task/s deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return {
      success: false,
    };
  }
}
