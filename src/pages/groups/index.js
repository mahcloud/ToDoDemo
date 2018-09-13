import React from "react";
import Style from "./groups.style";

class GroupsPage extends React.Component {
  renderGroups() {
    return(this.props.groups.map((group) => {
      return(
        <div key={group.name} className="group" onClick={() => this.props.onSelectGroup(group.name)}>
          <div className="group-name">{group.name}</div>
          <div className="group-completed-total">{group.completedTotal} OF {group.total} TASKS COMPLETE</div>
        </div>
      );
    }));
  }

  render() {
    return(
      <Style className="groups-page">
        <h3>Things To Do</h3>
        {this.renderGroups()}
      </Style>
    );
  }
}

module.exports = GroupsPage;
