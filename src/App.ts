import { Component, Vue } from "vue-property-decorator"
import WithRender from "./App.html"
import AddTodo from "./components/addTodo/AddTodo"
import TodoList from "./components/todoList/TodoList"
import ProgressBar from "./components/progressBar/ProgressBar"
import Todo from "./types/Todo"

@WithRender
@Component({
  components: {
    AddTodo,
    ProgressBar,
    TodoList,
  },
})
export default class App extends Vue {
  private mainTitle = "shove-Todo"
  private todosList: {
    [key: number]: Todo
  } = {}
  private completedTodo: {
    [key: number]: Todo
  } = {}

  todoCandidate(id: number, candidate: Todo): void {
    this.todosList = { ...this.todosList, [id]: candidate }
  }
  changeStatus(id: number, change: string): void {
    const ch = this.handleChanges(id, change)

    this.todosList = {
      ...this.todosList,
      [id]: { ...this.todosList[id], ...ch },
    }
    if (change === "complete") {
      this.completeTodo(id)
    }
  }

  handleChanges(id: number, change: string): any {
    switch (change) {
      case "start":
        return { start: Date.now(), pause: false }
      case "pause": {
        const start = this.todosList[id].start as number
        const run =
          this.todosList[id].run +
          this.getDifferenceInMinutes(start, Date.now())
        return { pause: true, run: run, start: null }
      }
      case "complete": {
        const start = this.todosList[id].start as number
        const run =
          this.todosList[id].run +
          this.getDifferenceInMinutes(start, Date.now())
        return { complete: true, run: run, start: null }
      }
      default:
        return {}
    }
  }

  completeTodo(id: number): void {
    this.completedTodo = { ...this.completedTodo, [id]: this.todosList[id] }
    delete this.todosList[id]
  }
  getDifferenceInMinutes(previous: number, next: number): any {
    return Math.floor((next - previous) / 1000 / 60)
  }
  get computedStatus(): any {
    let todoLength = 0
    let notStarted = 0
    let paused = 0
    let running = 0
    let completed = 0
    let overdue = 0
    todoLength = Object.keys(this.todosList).length
    completed = Object.keys(this.completedTodo).length
    for (const [key, value] of Object.entries(this.todosList)) {
      if (!value.start && !value.pause) {
        notStarted++
      }
      if (value.pause) {
        paused++
      }
      if (value.duration && value.run && value.duration < value.run) {
        overdue++
      }
      if (value.start) {
        running++
      }
    }
    return {
      notStarted,
      paused,
      overdue,
      running,
      completed,
      sum: completed + todoLength,
    }
  }
}
