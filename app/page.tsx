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
  const search = searchParams.search;


  const conditions = search
    ? or(
      ilike(posts.title, `%${search}%`),
      ilike(userNotes.content, `%${search}%`),
      ilike(tags.name, `%${search}%`)
    )
    : sql`true`; // qが空の場合は常にtrue


  const localPosts = await db.select({
    id: posts.id,
    title: posts.title,
    description: posts.description,
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
    );


  const localTags = await db.select({
    id: tags.id,
    name: tags.name,
  }).from(tags);


  return (
    <Home localPosts={localPosts} localTags={localTags} />
  )
}
