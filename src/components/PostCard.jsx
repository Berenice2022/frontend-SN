import { usePosts } from '../context/PostsContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';
import { useAuth } from '../context/AuthContext';

import { useForm } from 'react-hook-form';
import { useLikes } from '../context/LikesContext';

import { useComments } from '../context/CommentsContext';
import { useParams } from 'react-router-dom';
import { useEffect /*, useState*/ } from 'react';
import {
  IoSendSharp,
  IoHeartSharp,
  IoChatbubbleEllipsesOutline,
  IoAccessibility,
  IoCheckmarkDoneSharp,
  IoPersonOutline,
  IoEllipsisVertical,
  IoEllipsisVerticalCircleOutline,
} from 'react-icons/io5';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function FocusOnInput() {
  document.getElementById('comment').focus();
}
/* eslint-disable react/prop-types */
function PostCard({ post }) {
  const { user, users, getUsers } = useAuth();
  const { deletePost } = usePosts();

  const { register, handleSubmit } = useForm();
  const { createLike, getLikes, likes, deleteLike } = useLikes();
  const navigate = useNavigate();

  const onSubmitLike = handleSubmit((data) => {
    createLike(data);
    getLikes();
    navigate('/posts');
  });

  const {
    setValue,
    formState: { errors },
  } = useForm();
  const { createComment, getComment, updateComment, getComments, comments } =
    useComments();
  const params = useParams();

  useEffect(() => {
    async function loadtComment() {
      if (params.id) {
        const comment = await getComment(params.id);
        console.log(comment);
        setValue('comment', comment.comment);
        //console.log(dayjs(infoprofile.birthdate).utc().format('YYYY-MM-DD'))
      }
    }
    loadtComment();
    //console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitComment = handleSubmit((data) => {
    if (params.id) {
      //updateInfoProfile(params.id, data);
      updateComment(params.id, data);
    } else {
      //createInfoProfile(data);
      createComment(data);
    }
    navigate('/posts'); ///comments
  });

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { deleteComment } = useComments();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getLikes(); //getInfoProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [disable, setDisable] = useState(false);
  return (
    <div className='border-zinc-500 bg-white  border max-w-md w-full p-10 rounded-md first-letter '>
      <header className='flex justify-between'>
        <div>
          {users.map((us) => (
            <div className='flex gap-x-2 items-center' key={us._id}>
              {post.user == us._id ? (
                <>
                  <IoAccessibility />
                  <p className='text-lg'>{us.username}</p>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>

        {post.user == user.id ? (
          <>
            <div className='flex gap-x-2 items-center'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button
                    className='inline-flex w-full justify-center 
                        gap-x-1.5 rounded-md bg-white 
                        px-3 py-2 text-sm ring-1 ring-inset
                          ring-zinc-700 hover:bg-zinc-200'
                  >
                    <IoEllipsisVertical />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    className='absolute right-0 z-10 mt-2 w-25 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none'
                  >
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'flex gap-x-2 items-center px-4 py-2 text-sm text-black rounded-lg'
                            )}
                            onClick={() => {
                              deletePost(post._id);
                            }}
                          >
                            {' '}
                            <IoTrashBinSharp /> Eliminar
                          </button>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'px-4 py-2 text-sm text-black rounded-lg flex gap-x-2 items-center'
                            )}
                            to={`/posts/${post._id}`}
                          >
                            {' '}
                            <IoPencilSharp />
                            Modificar
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </>
        ) : (
          <></>
        )}
      </header>
      <p className='text-xs'>
        {dayjs(post.updatedAt).utc().format('DD/MM/YYYY')}
      </p>
      <p className='text-base py-2 '>{post.description}</p>
      <img
        className='h-48 w-48'
        src={`http://localhost:4000${post.image}`}
        alt='image'
      ></img>

      <div>
        <div>
          {likes.map((like) => (
            <div key={like._id}>
              {like.post_id == post._id ? (
                <>
                  {users.map((us) => (
                    <div
                      key={us._id}
                      className='mt-3 grid grid-cols-1 sm:col-span-3 '
                    >
                      {like.user == us._id ? (
                        <>
                          <div>
                            <IoCheckmarkDoneSharp />
                            <p className='text-xs sm:col-span-3'>
                              A {us.username} le gusto
                              <button
                                className=' px-1 py-2 '
                                onClick={() => {
                                  deleteLike(like._id);
                                }}
                              >
                                <IoTrashBinSharp size={10} />
                              </button>
                            </p>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
        <form onSubmit={onSubmitLike} className='sm:col-span-3'>
          <input type='hidden' value={post._id} {...register('post_id')} />
          <div className='sm:col-span-3'>
            <div className='mt-2 block'>
              {likes.map((like) => (
                <div key={like._id}>
                  {like.post_id == post._id ? (
                    <>
                      {like.user == user.id ? (
                        <>
                          {/*<div>
                            <label
                              className='text-blue-600 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset
             ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
             text-center sm:leading-6 flex gap-x-4 items-center'
                            >
                              <IoHeartSharp size={25} />
                              Like
                            </label>
                          </div>*/}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              <button
                type='submit'
                className='w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset
             ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
             text-center sm:leading-6 flex gap-x-4 items-center'
              >
                <IoHeartSharp size={25} />
                Like
              </button>
            </div>
          </div>
        </form>

        <div className='sm:col-span-3'>
          <div className='mt-2 block '>
            <button
              onClick={() => {
                FocusOnInput();
              }}
              className=' w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset
             ring-gray-300 placeholder:text-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600
              sm:text-sm text-center sm:leading-6 flex gap-x-4 items-center'
            >
              <IoChatbubbleEllipsesOutline size={25} />
              Comment
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className='relative mt-2 rounded-md shadow-sm '>
          <form onSubmit={onSubmitComment}>
            <input
              type='text'
              id='comment'
              className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 
                      text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-800 focus:ring-2 focus:ring-inset 
                      focus:ring-indigo-600 sm:text-sm sm:leading-6'
              name='comment'
              placeholder='Write a new comment'
              required
              {...register('comment')} //{ required: true }
            />
            {errors.comment && (
              <div className='text-red-500'>The comment is required</div>
            )}

            <input type='hidden' value={post._id} {...register('post_id')} />

            <div className='absolute inset-y-0 right-0 flex items-center'>
              <button
                type='submit'
                className='h-full text-center rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'
              >
                <IoSendSharp size={25} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='py-3'>
        {comments.map((comment) => (
          <div key={comment._id}>
            {post._id == comment.post_id ? (
              <>
                <div>
                  {users.map((us) => (
                    <div
                      key={us._id}
                      className='flex gap-x-2 items-center py-0'
                    >
                      {comment.user == us._id ? (
                        <>
                          <IoPersonOutline />
                          <p className='text-xs'>{us.username}</p>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </div>
                <div className='flex gap-x-2 items-center'>
                  <p className=' text-slate-700 text-base py-2'>
                    {comment.comment}
                  </p>
                  <p className='text-slate-700 text-xs'>
                    {dayjs(comment.updatedAt).utc().format('DD/MM/YYYY')}
                  </p>

                  {comment.user == user.id ? (
                    <>
                      <div className='flex gap-x-2 items-center'>
                        <Menu
                          as='div'
                          className='relative inline-block text-left'
                        >
                          <div>
                            <Menu.Button
                              className='inline-flex w-full justify-center 
                        gap-x-1.5 rounded-md bg-white 
                        px-3 py-2 text-sm ring-1 ring-inset
                          ring-zinc-700 hover:bg-zinc-200'
                            >
                              <IoEllipsisVerticalCircleOutline />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items
                              className='absolute right-0 z-10 mt-2 w-25 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none'
                            >
                              <div className='py-1'>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'flex gap-x-2 items-center px-4 py-2 text-sm text-black rounded-lg'
                                      )}
                                      onClick={() => {
                                        deleteComment(comment._id);
                                      }}
                                    >
                                      <IoTrashBinSharp size={10} /> Eliminar
                                    </button>
                                  )}
                                </Menu.Item>

                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'px-4 py-2 text-sm text-black rounded-lg flex gap-x-2 items-center'
                                      )}
                                      to={`/comments/${comment._id}`}
                                    >
                                      <IoPencilSharp size={10} />
                                      Modificar
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostCard;
