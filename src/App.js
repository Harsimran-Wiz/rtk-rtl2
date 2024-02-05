
import { useGetUserQuery } from "./slices/api";
import UserComponent from "./components/UserComponent";


function App() {
 const { data, isError, isLoading } = useGetUserQuery();
  
  return (
    <div>
      <h1>React App with Redux Toolkit Query</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {isError}</p>}
      {data && <UserComponent />}
    </div>
  );
}

export default App;
