import { Component, Vue, Prop } from "vue-property-decorator"
import WithRender from "./ProgressBar.html"

@WithRender
@Component
export default class ProgressBar extends Vue {
  @Prop() private computedStatus!: any

  get notStarted(): any {
    return {
      width:
        (this.computedStatus.sum
          ? this.computedStatus.notStarted / this.computedStatus.sum
          : 0) *
          100 +
        "%",
    }
  }
  get paused(): any {
    return {
      width:
        (this.computedStatus.sum
          ? this.computedStatus.paused / this.computedStatus.sum
          : 0) *
          100 +
        "%",
    }
  }
  get overdue(): any {
    return {
      width:
        (this.computedStatus.sum
          ? this.computedStatus.overdue / this.computedStatus.sum
          : 0) *
          100 +
        "%",
    }
  }
  get running(): any {
    return {
      width:
        (this.computedStatus.sum
          ? this.computedStatus.running / this.computedStatus.sum
          : 0) *
          100 +
        "%",
    }
  }

  get completed(): any {
    return {
      width:
        (this.computedStatus.sum
          ? this.computedStatus.completed / this.computedStatus.sum
          : 0) *
          100 +
        "%",
    }
  }
}
