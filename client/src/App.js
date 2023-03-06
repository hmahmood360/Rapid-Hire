import './App.css';
import { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Alert from './components/layout/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PrivateRoutes from './components/routing/PrivateRoutes';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Post from './components/posts/Post';
// Redux
import { Provider } from 'react-redux'
import store from './store'




if (localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Alert />
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/profiles" element={<Profiles />} />
                <Route exact path="/profile/:id" element={<Profile />} />
                <Route element={<PrivateRoutes/>} >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-profile" element={<CreateProfile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/add-experience" element={<AddExperience />} />
                  <Route path="/add-education" element={<AddEducation />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:id" element={<Post />} />
                </Route>
            </Routes>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
