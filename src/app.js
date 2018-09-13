import Data from "./data";
import DetailsPage from "./pages/details";
import GroupsPage from "./pages/groups";
import React from "react";
import { cloneDeep, isNil, values } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.reduce();
  }

  handleSelectGroup(groupName) {
    this.setState({activeGroupName: groupName});
  }

  reduce() {
    const data = cloneDeep(Data);
    let groups = {};
    let tasks = {};

    data.forEach((task) => {
      tasks[task.id] = task;
      if(isNil(groups[task.group])) {
        groups[task.group] = {
          completedTotal: task.completedAt === null ? 0 : 1,
          name: task.group,
          taskIds: [task.id],
          total: 1
        };
      } else {
        if(task.completedAt !== null) {
          groups[task.group].completedTotal += 1;
        }
        groups[task.group].taskIds.push(task.id);
        groups[task.group].total += 1;
      }
    });

    return({
      activeGroupName: null,
      groups: groups,
      tasks: tasks
    });
  }

  groupTasks() {
    if(this.state.activeGroupName === null) { return([]); }

    const group = this.state.groups[this.state.activeGroupName];

    return(group.taskIds.map((taskId) => {
      return(this.state.tasks[taskId]);
    }));
  }

  render() {
    if(this.state.activeGroupName === null) {
      return(<GroupsPage groups={values(this.state.groups)} onSelectGroup={ (groupName) => this.handleSelectGroup(groupName) }/>);
    } else {
      return(<DetailsPage tasks={this.groupTasks()} groupName={this.state.activeGroupName} onBack={() => this.handleSelectGroup(null)}/>);
    }
  }
}

module.exports = App;
