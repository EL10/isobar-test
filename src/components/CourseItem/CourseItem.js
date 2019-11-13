import React from "react";

const CourseItem = ({course}) => (
  <div className="CourseItem">
    <div className="CourseItem__image">
      <img src={course["image"]} alt=""/>
    </div>
    <div className="CourseItem__details">
      <div className="CourseItem__name">
        <span>{ course["name"] }</span>
      </div>
      <div className="CourseItem__description">
        <span>{ course["description"] }</span>
      </div>
      <div className="CourseItem__author">
        <span>{ course["author"] }</span>
      </div>
      <div className="CourseItem__publish-date">
        <span>{ course["publishDate"] }</span>
      </div>
      <div className="CourseItem__duration">
        <span>{ course["duration"] }</span>
      </div>
    </div>
  </div>
);

export default CourseItem;