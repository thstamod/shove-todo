import { Component, Vue } from "vue-property-decorator"
@Component
export class Validate extends Vue {
  private meta: { [key: string]: { [key: string]: any } } = {}
  get $validity(): any {
    let valid = true
    const errors: { [key: string]: string[] } = {}
    const rules = this.$data.validationRules.rules
    if (rules) {
      Object.keys(rules).forEach((rule: any) => {
        const resValidators: any[] = []
        const value = (this as any)[rule]
        if (!this.meta[rule]) {
          this.meta[rule] = { $dirty: false }
          this.meta[rule]["$prevVal"] = null
        }
        if (!this.isEqual(this.meta[rule].$prevVal, value)) {
          if (this.meta[rule].$prevVal !== null) {
            this.meta[rule].$dirty = true
          }
          this.meta[rule]["$prevVal"] = value
        }
        if (this.meta[rule].$dirty) {
          const validators = rules[rule].validators
          Object.keys(validators).forEach((validator: any) => {
            const result = validators[validator](value)
            if (!result) {
              valid = false
              if (!errors[rule]) {
                errors[rule] = []
              }
              errors[rule].push(rules[rule].messages[validator](rule, value))
            }
          })
        }
      })
    }
    const $touch = () => {
      const tmp = { ...this.meta }
      Object.keys(this.meta).forEach(
        (validator) => (tmp[validator].$dirty = true)
      )
      this.meta = tmp
    }
    const $reset = () => (this.meta = {})
    return { errors, valid, $touch, $reset }
  }
  private isEqual(prevVal: any, newVal: any) {
    return prevVal === newVal
  }
}
