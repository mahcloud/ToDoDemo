import React from "react";
import Style from "./details.style";

class DetailsPage extends React.Component {
  renderTasks() {
    return(this.props.tasks.map((task) => {
      return(
        <div key={task.id} className="task" onClick={() => this.props.onCheckTask(task.id)}>
          <div className="task-name">{task.task}</div>
        </div>
      );
    }));
  }

  render() {
    return(
      <Style className="details-page">
        <h3>{this.props.groupName}</h3>
        <a onClick={() => this.props.onBack()}>ALL GROUPS</a>
        {this.renderTasks()}
      </Style>
    );
  }
}

module.exports = DetailsPage;
