import z from "zod";

export const CreateCategoryNameSchema = z.object({
  name: z.string(),
});

export type CreateCategoryName = z.infer<typeof CreateCategoryNameSchema>;
