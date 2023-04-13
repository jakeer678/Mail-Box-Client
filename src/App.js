import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./components/RoutesApp/RoutesApp";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
