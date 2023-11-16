import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import InfoProfilesPage from './pages/InfoProfilesPage';
import InfoProfilesFormPage from './pages/InfoProfilesFormPage';
import ProtectedRoute from './ProtectedRoute';
import { InfoProfileProvider } from './context/InfoProfilesContext';

import PostsPage from './pages/PostsPage';
import PostsFormPage from './pages/PostsFormPage';
import { PostProvider } from './context/PostsContext';

import LikesPage from './pages/LikesPage';
import LikesFormPage from './pages/LikesFormPage';
import { LikeProvider } from './context/LikesContext';

import CommentsPage from './pages/CommentsPage';
import CommentsFormPage from './pages/CommentsFormPage';
import { CommentProvider } from './context/CommentsContext';

import InterestsPage from './pages/InterestsPage';
import InterestsFormPage from './pages/InterestsFormPage';
import { InterestProvider } from './context/InterestsContext';

import EventsPage from './pages/EventsPage';
import EventsFormPage from './pages/EventsFormPage';
import { EventProvider } from './context/EventsContext';

import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import image from './img/fondo.jpg';

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
      }}
    >
      <AuthProvider>
        <InfoProfileProvider>
          <EventProvider>
            <InterestProvider>
              <CommentProvider>
                <LikeProvider>
                  <PostProvider>
                    <BrowserRouter>
                      <main className='container mx-auto px-10 '>
                        <Navbar />
                        <Routes>
                          <Route path='/' element={<HomePage />} />
                          <Route path='/login' element={<LoginPage />} />
                          <Route path='/register' element={<RegisterPage />} />

                          <Route element={<ProtectedRoute />}>
                            <Route path='/profile' element={<ProfilePage />} />

                            <Route
                              path='/infoprofiles'
                              element={<InfoProfilesPage />}
                            />
                            <Route
                              path='/add-infoprofile'
                              element={<InfoProfilesFormPage />}
                            />
                            <Route
                              path='/infoprofiles/:id'
                              element={<InfoProfilesFormPage />}
                            />

                            <Route path='/posts' element={<PostsPage />} />
                            <Route
                              path='/add-post'
                              element={<PostsFormPage />}
                            />
                            <Route
                              path='/posts/:id'
                              element={<PostsFormPage />}
                            />

                            <Route path='/likes' element={<LikesPage />} />
                            <Route
                              path='/add-like'
                              element={<LikesFormPage />}
                            />
                            <Route
                              path='/likes/:id'
                              element={<LikesFormPage />}
                            />

                            <Route
                              path='/comments'
                              element={<CommentsPage />}
                            />
                            <Route
                              path='/add-comment'
                              element={<CommentsFormPage />}
                            />
                            <Route
                              path='/comments/:id'
                              element={<CommentsFormPage />}
                            />

                            <Route path='/events' element={<EventsPage />} />
                            <Route
                              path='/add-event'
                              element={<EventsFormPage />}
                            />
                            <Route
                              path='/events/:id'
                              element={<EventsFormPage />}
                            />

                            <Route
                              path='/interests'
                              element={<InterestsPage />}
                            />
                            <Route
                              path='/add-interest'
                              element={<InterestsFormPage />}
                            />
                            <Route
                              path='/interests/:id'
                              element={<InterestsFormPage />}
                            />
                          </Route>
                          <Route path='*' element={<NotFound />} />
                        </Routes>
                      </main>
                    </BrowserRouter>
                  </PostProvider>
                </LikeProvider>
              </CommentProvider>
            </InterestProvider>
          </EventProvider>
        </InfoProfileProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
