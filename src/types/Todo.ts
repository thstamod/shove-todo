export default interface Todo {
  id: number
  title: string | null
  duration: number | null //in minutes
  start: number | null //start point. init or after pause
  pause: boolean
  complete: boolean //if task is completed
  overdue: boolean
  run: number | null //the minutes until pause or complete
}
