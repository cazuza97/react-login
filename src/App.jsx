import Login from "./pages/Login";
import Posts from "./pages/Posts";

function App() {

  const username = localStorage.getItem("username");

  if (!username) {
    return <Login />;
  }

  return <Posts />;
}

export default App;