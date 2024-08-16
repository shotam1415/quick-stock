"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { registerPostSchema } from "@/app/_validations/form-schema";
import { db } from "@/app/_db/index";
import { posts, userNotes, userNoteTags } from "@/app/_db/schema";
import { revalidateTag } from 'next/cache'

export async function registerPost(prevState: unknown, formData: FormData) {

    const submission = parseWithZod(formData, {
        schema: registerPostSchema,
    });


    if (submission.status !== "success") {
        return submission.reply();
    }
    const rawFormData = {
        url: formData.get('url') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        ogp: formData.get('ogp') as string,
    }

    const post = await db.insert(posts).values(
        {
            categoryId: 'A2BF75E4-7E59-2A00-89C9-E77E1A2D34A5', // 既存のカテゴリーIDを使用
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

    await db.insert(userNoteTags).values([
        {
            userNoteId: userNote[0].id, // 既存のユーザーノートIDを使用
            tagId: '1357f428-a510-8b9f-471f-f9ad027b4e77', // 既存のタグIDを使用
        },
    ]);


    console.log('投稿とユーザーノートの作成が完了しました。');

    revalidateTag('/')
    redirect("/?result=success");
}