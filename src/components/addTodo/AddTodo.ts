import { Component, Vue, Emit, Mixins, Watch } from "vue-property-decorator"
import WithRender from "./AddTodo.html"
import { Validate } from "../../mixins/validation"

@WithRender
@Component
export default class AddTodo extends Mixins(Validate) {
  private title = ""
  private duration: number | null = 0
  private valid = false
  private validationRules = {
    rules: {
      title: {
        validators: {
          notEmpty: (val: string) => val !== "",
          greaterThan5: (val: string) => val.length > 5,
        },
        messages: {
          notEmpty: () => "field is required",
          greaterThan5: (key: any, value: any) =>
            `${key} min length 5, but got ${value.length}`,
        },
      },
      duration: {
        validators: {
          notEmpty: (val: string) => val !== "",
          notZero: (val: number) => val > 0,
        },
        messages: {
          notEmpty: () => "field is required",
          notZero: () => "0 is not allowed value",
        },
      },
    },
    options: {},
  }

  @Emit()
  saveTodo(): void {
    this.$validity.$touch()
    if (this.$validity.valid) {
      this.$validity.$reset()
      const id = Date.now()
      const candidate = {
        id,
        title: this.title,
        duration: this.duration,
        start: null,
        pause: false,
        complete: false,
        overdue: false,
        run: 0,
      }
      this.$emit("todoCandidate", id, candidate)
      this.title = ""
      this.duration = 0
    }
  }
}
