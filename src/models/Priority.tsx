export enum Priority {
  LIGHT = "Légère",
  NORMAL = "Normale",
  HIGHT = "Haute",
  NONE = "Aucune",
}

export function getPriorityColor(priority: Priority | undefined) {
  switch (priority) {
    case Priority.NONE:
      return "transparent";
    case Priority.LIGHT:
      return "green";
    case Priority.NORMAL:
      return "transparent";
    case Priority.HIGHT:
      return "red";
    default:
      return "";
  }
}
