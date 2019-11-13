
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextInput from "../../components/Inputs/TextInput/TextInput";
import Select from "../../components/Inputs/Select/Select";

import CourseItem from "../../components/CourseItem/CourseItem";

function convertTimestampToMs(timestamp) {
  const timestampSegments = timestamp.split(":")

  const timestampObject = {
    days: timestampSegments[0],
    hours: timestampSegments[1],
    minutes: timestampSegments[2]
  }

  const conversionTable = {
    minutes: 60*1000,
    hours: 60*60*1000,
    days: 24*60*60*1000,
  };

  return Object.keys(timestampObject).reduce((fin, timeKey) => (
    fin + timestampObject[timeKey] * conversionTable[timeKey]
  ), 0)
}

function stringToDate(dateString) {
  const dateParts = dateString.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

function sortCourses(courses, sortByProperty) {
  switch(sortByProperty) {
    case "publishDate":
      return courses.sort((a, b) => {
        const aDate = stringToDate(a.publishDate);
        const bDate = stringToDate(b.publishDate);
        return bDate - aDate
      })
      break;
    case "duration":
      return courses.sort((a, b) => {
        const aDuration = convertTimestampToMs(a.duration);
        const bDuration = convertTimestampToMs(b.duration);
        return bDuration - aDuration
      })
      break;
  }
}

class CourseSearch extends Component {

  state = {
    userSearchQuery: "",
    sortFilter: "publishDate"
  };

  updateSearchQuery = (searchQueryKey, searchQueryValue) => {
    this.setState({[searchQueryKey]: searchQueryValue});
  }

  updateFilter = (filterType, filterValue) => {
    this.setState({[filterType]: filterValue});
  }

  render() {
    const {
      userSearchQuery,
      sortFilter
    } = this.state;
    const { courses } = this.props;

    let filteredCourses = courses;

    if (userSearchQuery) {
      filteredCourses = filteredCourses.filter(course => {
        return course["name"].toLowerCase().includes(userSearchQuery.toLowerCase());
      });
    }

    if (sortFilter) {
      filteredCourses = [...sortCourses(filteredCourses, sortFilter)]
    }

    return (
      <div className="CourseSearch">
        <h1>Search Courses</h1>
        <div className="CourseSearch__search">
          <TextInput
            label="Search Courses"
            value={userSearchQuery}
            type="text"
            onFieldChange={e => this.updateSearchQuery("userSearchQuery", e.target.value)}
          />
          <button onClick={() => this.updateSearchQuery("userSearchQuery", "")}>Clear Search</button>
        </div>
        <div className="CourseSearch__filters">
          <Select
            name="sortBy"
            label="Sort By"
            value={sortFilter}
            options={[
              {
                name: "Sort By",
                value: "",
                disabled: true
              },
              {
                name: "Publish Date",
                value: "publishDate"
              },
              {
                name: "Duration",
                value: "duration"
              }
            ]}
            onFieldChange={(e) => this.updateFilter("sortFilter", e.target.value)}
          />
        </div>
        

        <div className="CourseList">
          <div className="CourseList__items">
            {
              filteredCourses.map((course, i) => (
                <CourseItem course={course} key={i} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

CourseSearch.propTypes = {
  courses: PropTypes.array
};

const mapStateToProps = store => {
  return {
    courses: store.courses.courses
  };
};

export default connect(mapStateToProps, null)(CourseSearch);