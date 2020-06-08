import { Component, Vue, Prop } from "vue-property-decorator"
import WithRender from "./TodoList.html"
import Todo from "../../types/Todo"

@WithRender
@Component
export default class TodoList extends Vue {
  private msg = "Todo list"
  @Prop() private todosList!: Array<Todo>
  @Prop() private completedTodo!: Array<Todo>

  statusChange(id: string, type: string): void {
    this.$emit("changeStatus", id, type)
  }
}
