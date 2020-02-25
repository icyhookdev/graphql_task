const {tasks, users} = require('../DommyData');

const resolver = {
  Query: {
    greetings: () => 'hello',
    tasks: () => tasks,
    task: (next, {id}) => tasks.find(task => task.id === id),
    users: () => users,
    user: (next, {id}) => users.find(user => user.id === id)
  },
  Mutation: {
    createTask: (_, {input}) => {
      const task = {...input, id: tasks.length + 1}
      tasks.push(task);
      return task;
    }
  },
  Task: {
    user: ({userId}) => users.find(user => user.id === userId)
  },
  User: {
    tasks: ({id}) => tasks.filter(task => task.userId === id)
  }
}

module.exports = resolver