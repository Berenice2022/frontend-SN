import { createContext, useContext, useState } from 'react';
import {
  createPostRequest,
  getPostsRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
} from '../api/posts';

const PostContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a Post Provider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await getPostsRequest();
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (post) => {
    try {
      await createPostRequest(post);
      getPosts();
      //console.log(post);
    } catch (error) {
      console.log(error);
    }
  }; //Fin de createProduct

  const deletePost = async (id) => {
    try {
      const res = await deletePostRequest(id);
      // console.log(res.status);
      if (res.status == 200) setPosts(posts.filter((post) => post._id != id)); //if (res.status == 200) setPosts(posts.filter(post => post._id != id))
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      //console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequest(id, post);
      console.log(res);
      getPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        getPosts,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
