import AddPostForm from "./components/AddPostForm"
import PostsList from "./components/PostsList"
import { Routes, Route, Navigate } from 'react-router-dom';
import SinglePostPage from "./components/SinglePostPage";
import Layout from "./components/Layout";
import EditPostForm from "./components/EditPostForm";
import UsersList from "./components/UsersList";
import UserPage from "./components/UserPage";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want 
        if nothing matches it reach here
        replace flag -> means the bad page which does not exist will be replaced with the / -> page (Home)*/}
        <Route path="*" element={<Navigate to="/" replace />} />


      </Route>
    </Routes>
  );
}

export default App
