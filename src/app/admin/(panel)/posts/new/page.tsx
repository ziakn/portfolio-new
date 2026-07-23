import { getCategories, getCurrentPublishDate } from '@/data/posts';
import PostForm from '../PostForm';
import { createPostAction } from '../actions';

export default function NewPostPage() {
  const categories = getCategories(true);

  return (
    <>
      <div className="admin-header">
        <h1>New post</h1>
      </div>
      <PostForm
        action={createPostAction}
        categories={categories}
        values={{ publish_date: getCurrentPublishDate(), author: 'Zia Muhammad' }}
        submitLabel="Create post"
      />
    </>
  );
}
