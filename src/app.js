import Data from "./data";
import DetailsPage from "./pages/details";
import GroupsPage from "./pages/groups";
import Moment from "moment";
import React from "react";
import { cloneDeep, isNil, values } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.reduce();
  }

  groupCompletedTotal(tasks, group) {
    let total = 0;

    group.taskIds.forEach((id) => {
      if(tasks[id].completedAt !== null) {
        total++;
      }
    });

    return(total);
  }

  groupTasks() {
    if(this.state.activeGroupName === null) { return([]); }

    const group = this.state.groups[this.state.activeGroupName];

    return(group.taskIds.map((taskId) => {
      return(this.state.tasks[taskId]);
    }));
  }

  handleCheckTask(id) {
    let tasks = cloneDeep(this.state.tasks);
    let groups = cloneDeep(this.state.groups);
    const task = tasks[id];
    const group = groups[task.group];

    if(!task.isLocked) {
      tasks = this.updateCompleted(tasks, id);
      tasks = this.updateLocks(tasks, id);
      groups[task.group].completedTotal = this.groupCompletedTotal(tasks, group);

      this.setState({
        groups: groups,
        tasks: tasks
      });
    }
  }

  handleSelectGroup(groupName) {
    this.setState({activeGroupName: groupName});
  }

  reduce() {
    const data = cloneDeep(Data);
    let groups = this.reduceGroups(data);
    let tasks = this.reduceTasks(data);

    return({
      activeGroupName: null,
      groups: groups,
      tasks: tasks
    });
  }

  isTaskLocked(tasks, task) {
    let locked = false;

    for(let i = 0; i < task.dependencyIds.length; i++) {
      if(tasks[task.dependencyIds[i]].completedAt === null) {
        locked = true;
        break;
      }
    }

    return(locked);
  }

  reduceGroups(data) {
    let groups = {};

    data.forEach((task) => {
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

    return(groups);
  }

  reduceTasks(data) {
    let tasks = {};

    data.forEach((task) => {
      tasks[task.id] = task;
    });

    data.forEach((task) => {
      tasks[task.id].isLocked = this.isTaskLocked(tasks, task);

      task.dependencyIds.forEach((depId) => {
        if(isNil(tasks[depId].parentIds)) {
          tasks[depId].parentIds = [task.id];
        } else {
          tasks[depId].parentIds.push(task.id);
        }
      });
    });

    return(tasks);
  }

  updateCompleted(tasks, id) {
    let task = tasks[id];

    if(task.completedAt === null) {
      task.completedAt = Moment();
    } else {
      task.completedAt = null;
    }
    tasks[id] = task;

    return(tasks);
  }

  updateLocks(tasks, id) {
    let task = tasks[id];

    if(!isNil(task.parentIds)) {
      task.parentIds.forEach((parentId) => {
        tasks[parentId].isLocked = this.isTaskLocked(tasks, tasks[parentId]);
      });
    }

    return(tasks);
  }

  render() {
    if(this.state.activeGroupName === null) {
      return(<GroupsPage groups={values(this.state.groups)} onSelectGroup={ (groupName) => this.handleSelectGroup(groupName) }/>);
    } else {
      return(<DetailsPage tasks={this.groupTasks()} groupName={this.state.activeGroupName} onBack={() => this.handleSelectGroup(null)} onCheckTask={(id) => this.handleCheckTask(id)}/>);
    }
  }
}

module.exports = App;
