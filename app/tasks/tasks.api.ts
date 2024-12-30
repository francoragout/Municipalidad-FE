import { taskSchema } from "@/lib/schema";
import { z } from "zod";

const URL = process.env.API_URL || "http://localhost:5000";

export async function CreateTask(values: z.infer<typeof taskSchema>) {
  try {
    const response = await fetch(`${URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create task: ${errorText}`);
    }

    return {
      success: true,
      message: "Task created successfully",
    };
  } catch (error) {
    console.log("Failed to create task:", error);
    return {
      success: false,
      message: "Failed to create task",
    };
  }
}

export async function UpdateTask(
  values: z.infer<typeof taskSchema>,
  id: string
) {
  try {
    const response = await fetch(`${URL}/api/tasks/${id} `, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update task: ${errorText}`);
    }

    return {
      success: response.ok,
      message: "Task updated successfully",
    };
  } catch (error) {
    console.error("Failed to update task:", error);
    return {
      success: false,
      message: "Failed to update task",
    };
  }
}

export async function DeleteTask(id: string) {
  try {
    const response = await fetch(`${URL}/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete task: ${errorText}`);
    }

    return {
      success: response.ok,
      message: "Task deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete task:", error);
    return {
      success: false,
      message: "Failed to delete task",
    };
  }
}

export async function DeleteTasks(tasksIds: string[]) {
  try {
    const response = await fetch(`${URL}/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasksIds),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete tasks: ${errorText}`);
    }

    return {
      success: true,
      message: "Tasks deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return {
      success: false,
      message: "Failed to delete tasks",
    };
  }
}
