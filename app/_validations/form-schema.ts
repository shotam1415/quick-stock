import { z } from 'zod';

export const formSchema = z.object({
    url: z.string().url(),
});

export const registerPostSchema = z.object({
    title: z.string(),
    description: z.string(),
    ogp: z.string().url(),
});