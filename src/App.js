import "./App.css";
import QuestionContent from "./pages/QuestionContent";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import PreviousYrSubPaper from "./pages/PreviousYrSubPaper";
import SetQuestion from "./components/SetQuestion";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/previousYear" exact component={PreviousYrSubPaper} />
          <Route path="/setQuestion" exact component={SetQuestion} />
          <Route
            path="/previousYear/:subject"
            exact
            component={QuestionContent}
          />
          <Route
            path="/edit/:Class/:Chapter/:Subject/:QuestionNo/:Id"
            exact
            component={SetQuestion}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;