//a design to structure user input which contains unique id, a task, status of the task and if task is to be a priority which has a special class
export default interface TaskItems {
  id: string;
  task: string;
  status: boolean;
  priority: boolean;
  index: number;
}
