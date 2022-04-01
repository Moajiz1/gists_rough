import Navbar from "./Components/Navbar/Navbar";
import TableInfo from "./Components/Table/TableInfo";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./Components/User Profile/UserProfile";
import AddGist from "./Components/Add Gist/AddGist";
import UserGists from "./Components/Personal Gists/UserGists";
import StarGists from "./Components/Starred Gists/StarGists";

// import { githubProvider } from '../config/authMethod';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* <div className="ui">{showSearch()}</div> */}
        <Routes>
          <Route path="/" element={<TableInfo />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/personalgists" element={<UserGists />} />
          <Route path="/starredgists" element={<StarGists />} />
          <Route path="/form" element={<AddGist />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
