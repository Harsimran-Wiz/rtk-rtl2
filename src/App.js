import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import axios from "axios";
import UserComponent from "./components/UserComponent";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://mocki.io/v1/1a81b254-2cb4-498e-981e-7e4d38e3398f"
      );
      const data = await response.data;
      dispatch(setUser(data))
    }

    fetchData()
  }, [dispatch])
  return <div>
    <h1>React App with Redux Toolkit</h1>
    <UserComponent/>
  </div>;
}

export default App;
