import { useEffect } from 'react';
import { usePosts } from '../context/PostsContext';
import PostCard from '../components/PostCard';

function PostsPage() {
  const { getPosts, posts } = usePosts();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (posts.length == 0)
    return <h1>There are no registered posts in the list</h1>;

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </div>
  );
}

export default PostsPage;
