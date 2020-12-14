import Lista from "./lista";
import Lista1 from "./lista1";
import ListPage from "./listPage";
import CreateTask from "./createTask";
import Api from "./api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ListPage />
        </Route>
        <Route path="/addTask">
          <CreateTask />
        </Route>
        <Route path="/editTask"></Route>
        <Route path="/api">
          <Api />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
