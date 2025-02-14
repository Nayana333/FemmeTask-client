import * as Yup from "yup";

export interface TodoFormValues {
  title: string;
  completed: boolean;
  user: string;
}

export const initialValues: TodoFormValues = {
  title: "",
  completed: false,
  user: "", 
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Title is required"),
  completed: Yup.boolean(),
  user: Yup.string().required("User ID is required"),
});
