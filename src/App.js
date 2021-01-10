import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Page1 from "./component/Page1";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Route path="/" exact component={Page1} />
      </div>
    </BrowserRouter>
  );
}

export default App;
