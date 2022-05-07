import React from "react";
import "./App.css";
import { ProjectListPage } from "./pages/project-list";
import { TsReactTest } from "./pages/test/try-use-arry";
import { LoginPage } from "./pages/login";

function App() {
  return (
    <div className="App">
      {/*<ProjectListPage />*/}
      {/*<TsReactTest />*/}
      <LoginPage />
    </div>
  );
}

export default App;
