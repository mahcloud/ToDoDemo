import React from "react";
import Style from "./details.style";
import { cx } from "emotion";
import { isNil, orderBy } from "lodash";

class DetailsPage extends React.Component {
  renderTasks() {
    return(orderBy(this.props.tasks, ["isLocked"], ["asc"]).map((task) => {
      const classes = cx({
        task: true,
        locked: task.isLocked,
        completed: !isNil(task.completedAt)
      });

      return(
        <div key={task.id} className={classes} onClick={() => this.props.onCheckTask(task.id)}>
          <div className="task-name">{task.task}</div>
        </div>
      );
    }));
  }

  render() {
    return(
      <Style className="details-page">
        <div className="title-bar">
          <h3>{this.props.groupName}</h3>
          <a href="" onClick={() => this.props.onBack()}>ALL GROUPS</a>
        </div>
        <div className="tasks">
          {this.renderTasks()}
        </div>
      </Style>
    );
  }
}

module.exports = DetailsPage;
