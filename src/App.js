
import React, { Component } from "react";
import CourseSearch from "./containers/CourseSearch/CourseSearch";

class App extends Component {
  render() {
    return (
      <div className="PageWrapper">
        <CourseSearch />
      </div>
    );
  }
}

export default App;