"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerPostSchema } from "@/app/_validations/form-schema";
import { db } from "@/app/_db/index";
import { posts, userNotes, userNoteTags } from "@/app/_db/schema";
import { revalidatePath } from 'next/cache'

/* import type Id statement added */
import type { Id } from "react-toastify";

export type Status = {
    type: 'default' | 'loading' | 'success' | 'error',
    toastId: Id /* Added a toastId field of type Id */
};

export async function registerPost(prevState: unknown, formData: FormData) {

    await new Promise((res) => setTimeout(res, 2000));


    const validatedFields = registerPostSchema.safeParse({
        url: formData.get('url') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        ogp: formData.get('ogp') as string,
    });

    const tags = (formData.get('tags') as string).split(','); // タグをカンマで分割して配列に変換


    // バリデーションに失敗した場合はエラーメッセージを次の状態として返す
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create User",
        };
    }

    try {
        const rawFormData = {
            url: formData.get('url') as string,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            ogp: formData.get('ogp') as string,
        }

        const post = await db.insert(posts).values(
            {
                accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
                title: rawFormData.title,
                description: rawFormData.description,
                ogp: rawFormData.ogp,
                url: rawFormData.url,
            },
        ).returning({ id: posts.id });


        const userNote = await db.insert(userNotes).values([
            {
                postId: post[0].id, // 既存の投稿IDを使用
                accountId: 'b0a6c309-a047-4d21-9b41-49d8b0eb5e23', // 既存のユーザーIDを使用
                content: 'これは最初のユーザーノートです。とても興味深い内容でした。',
            },
        ]).returning({ id: userNotes.id });

        const insertTags = tags.map((tag: string) => {
            return {
                userNoteId: userNote[0].id, // 既存のユーザーノートIDを使用
                tagId: tag,
            }
        })

        await db.insert(userNoteTags).values(insertTags);

        return {
            type: "success"
        };

    } catch (error) {
        console.log(error)
        console.log('redirect失敗')
        return {
            type: "error"
        };
    }

    //成功時のリダイレクト
    //memo:try-catchの中に書くとエラーが出る
    // revalidatePath("/");
    // redirect("/?modal=true&modal-type=success&modal-result=success");

}