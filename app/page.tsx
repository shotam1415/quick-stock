import Home from "@/app/_features/home/page";
import { db } from "@/app/_db/index";
import { eq, or, ilike, sql } from "drizzle-orm";
import { posts, userNotes, tags, userNoteTags } from "@/app/_db/schema";

export default async function HOME({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = searchParams.q;


  const conditions = q
    ? or(
      ilike(posts.title, `%${q}%`),
      ilike(userNotes.content, `%${q}%`),
      ilike(tags.name, `%${q}%`)
    )
    : sql`true`; // qが空の場合は常にtrue


  const localPosts = await db.select({
    id: posts.id,
    title: posts.title,
    url: posts.url,
    content: userNotes.content,
    tags: sql`json_agg(json_build_object('name', ${tags.name}, 'colorCode', ${tags.colorCode}))`.as('tags') // tagsを配列として集約
  })
    .from(posts)
    .innerJoin(userNotes, eq(posts.id, userNotes.postId))
    .innerJoin(userNoteTags, eq(userNotes.id, userNoteTags.userNoteId))
    .innerJoin(tags, eq(userNoteTags.tagId, tags.id))
    .where(conditions)
    .groupBy(
      posts.id,
      userNotes.id
    ); // 必要なカラムをすべてGROUP BYに追加


  console.log(localPosts);

  return (
    <Home localPosts={localPosts} />
  )
}
