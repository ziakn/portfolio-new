import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getPostById } from '@/data/posts';
import PostForm from '../../PostForm';
import { updatePostAction } from '../../actions';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);
  const post = getPostById(postId);
  if (!post) notFound();

  const categories = getCategories(true);
  // Bind the post id into the update action.
  const action = updatePostAction.bind(null, postId);

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Edit post</h1>
          <p className="admin-subtitle">/blog/{post.slug}</p>
        </div>
        <Link href={`/blog/${post.slug}`} target="_blank" className="admin-btn secondary">
          View ↗
        </Link>
      </div>
      <PostForm
        action={action}
        categories={categories}
        values={{
          slug: post.slug,
          title: post.title,
          publish_date: post.publish_date,
          category: post.category,
          excerpt: post.excerpt,
          content: post.content,
          img: post.img,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          focus_keyword: post.focus_keyword,
          keywords: post.keywords,
          canonical: post.canonical,
          og_image: post.og_image,
          author: post.author,
        }}
        submitLabel="Save changes"
      />
    </>
  );
}
