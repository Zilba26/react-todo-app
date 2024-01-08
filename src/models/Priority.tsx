export enum Priority {
  LIGHT = "Light",
  NORMAL = "Normal",
  HIGHT = "Hight",
}

export function getPriorityColor(priority: Priority | undefined) {
  switch (priority) {
    case Priority.LIGHT:
      return "green";
    case Priority.NORMAL:
      return "transparent";
    case Priority.HIGHT:
      return "red"
    default:
      return ""
  }
}