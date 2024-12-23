export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export type TodoDraft = Omit<TodoType, "id">;

export type TypeToastType = "success" | "error" | "info" | "warning";

export type ToastType = {
  isVisible: boolean;
  message: string;
  type: TypeToastType;
  duration?: number;
  onClose?: () => void;
};

export type responseApiType = {
  data: any;
  message: string;
  success: boolean;
};
