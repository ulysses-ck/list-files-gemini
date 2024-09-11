"use server";

import { fileManager } from "@/gemini";
import { revalidatePath } from "next/cache";

export async function deleteFile(formData) {
  const fileName = formData.get("fileName");
  const result = await fileManager.deleteFile(fileName);
  revalidatePath("/");

  return { result: result };
}
