import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import ResultTable from './ResultTalble' 
import { UserProvider } from './UserContext';
import '../styles/global.css'
const router = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/quiz', element: <Quiz /> },
  { path: '/result', element: <Result /> },
  { path: '/history', element: <ResultTable /> },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
