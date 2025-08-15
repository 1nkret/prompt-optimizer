import { z } from "zod";


export const ImproveResponse = z.object({
    improvedSystemPrompt: z.string().min(1),
});
