import { createContext, useContext, useState } from 'react';
import {
  createCommentRequest,
  getCommentsRequest,
  deleteCommentRequest,
  getCommentRequest,
  updateCommentRequest,
} from '../api/comments.js';

const CommentContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a Comment Provider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await getCommentsRequest();
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (comment) => {
    try {
      await createCommentRequest(comment);
      getComments();
      // console.log(comment);
    } catch (error) {
      console.log(error);
    }
  }; //Fin de

  const deleteComment = async (id) => {
    try {
      const res = await deleteCommentRequest(id);
      // console.log(res.status);
      if (res.status == 200)
        setComments(comments.filter((comment) => comment._id != id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getComment = async (id) => {
    try {
      const res = await getCommentRequest(id);
      //console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateComment = async (id, comment) => {
    try {
      const res = await updateCommentRequest(id, comment);
      console.log(res);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        createComment,
        getComments,
        deleteComment,
        getComment,
        updateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
