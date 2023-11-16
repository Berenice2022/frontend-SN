import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
//IoHeartCircleOutline, IoIdCardOutline, IoChatboxEllipsesOutline, IoIdCardOutline, IoAddCircle
import {
  IoPersonAdd,
  IoLogIn,
  /*IoAddCircle*/ IoLogOut,
  IoPerson,
  //IoDuplicateOutline,
  IoChevronDownSharp,
  IoBagSharp,
  IoClipboardOutline,
  IoAddSharp,
  IoAlbumsSharp,
  IoArchiveOutline,
  IoCreateOutline,
  IoBook,
  IoBagAddOutline,
  IoCheckboxOutline,
} from 'react-icons/io5';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className='border-zinc-700 bg-white my-3 border flex justify-between items-start py-5 px-10 rounded-lg'>
      <Link to={isAuthenticated ? '/posts' : '/'}>
        <h1 className='text-xl font-bold'>Social Network </h1>
      </Link>
      <ul className='flex gap-x-2'>
        {isAuthenticated ? (
          <>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button
                        className='inline-flex w-full justify-center 
                        gap-x-1.5 rounded-md bg-white 
                        px-3 py-2 text-sm ring-1 ring-inset
                          ring-zinc-700 hover:bg-zinc-200'
                      >
                        <IoAlbumsSharp className='-mr-1 h-5 w-5' />
                        Events
                        <IoChevronDownSharp
                          className='-mr-1 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
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
                        className='absolute right-0 z-10 mt-2 w-56 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none'
                      >
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/events'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoClipboardOutline className='h-5 w-5 inline-flex' />
                                My Events
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/add-event'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoAddSharp className='h-5 w-5 inline-flex' />
                                Add Event
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button
                        className='inline-flex w-full justify-center 
                         gap-x-1.5 rounded-md bg-white 
                         px-3 py-2 text-sm ring-1 ring-inset
                           ring-zinc-700 hover:bg-zinc-200'
                      >
                        <IoBook className='-mr-1 h-5 w-5' />
                        Interest
                        <IoChevronDownSharp
                          className='-mr-1 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
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
                        className='absolute right-0 z-10 mt-2 w-56 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none'
                      >
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/interests'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoCreateOutline className='h-5 w-5 inline-flex' />
                                My Interests
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/add-interest'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoArchiveOutline className='h-5 w-5 inline-flex' />
                                Add Interest
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button
                        className='inline-flex w-full justify-center 
                         gap-x-1.5 rounded-md bg-white 
                         px-3 py-2 text-sm ring-1 ring-inset
                           ring-zinc-700 hover:bg-zinc-200'
                      >
                        <IoBagSharp className='-mr-1 h-5 w-5' />
                        Post
                        <IoChevronDownSharp
                          className='-mr-1 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
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
                        className='absolute right-0 z-10 mt-2 w-56 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none'
                      >
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/posts'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoCheckboxOutline className='h-5 w-5 inline-flex' />
                                Posts
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/add-post'
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoBagAddOutline className='h-5 w-5 inline-flex' />
                                Add post
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button
                        className='inline-flex w-full justify-center 
                        gap-x-1.5 rounded-full bg-white 
                        px-3 py-2 text-sm ring-1 ring-inset
                          border-blue-900 border hover:bg-zinc-200'
                      >
                        <div className='flex mx-3 px-3'>
                          <IoPerson
                            className='h-8 w-8 rounded-full'
                            size={30}
                          />
                          {user.username}
                        </div>
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
                        className='absolute right-0 z-10 mt-2 w-56 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1
                         ring-black ring-opacity-5 focus:outline-none'
                      >
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/'
                                onClick={() => {
                                  logout();
                                }}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                <IoLogOut className='h-5 w-5 inline-flex' />
                                Logout
                              </Link>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <li>
              <Link className='bg-zinc-500 rounded-sm' to='/login'>
                <IoLogIn size={30} />
              </Link>
            </li>
            <li>
              <Link className='bg-zinc-500 rounded-sm' to='/register'>
                <IoPersonAdd size={30} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
