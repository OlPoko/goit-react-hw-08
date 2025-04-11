import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(logIn(values)).unwrap(); 
      toast.success("✅ Logged in successfully!");
      actions.resetForm();
    } catch (error) {
      toast.error("❌ Login failed. Please try again.");
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            <span>Email</span>
            <Field type="email" name="email" />
            <ErrorMessage className={css.error} name="email" component="div" />
          </label>

          <label className={css.label}>
            <span>Password</span>
            <Field type="password" name="password" />
            <ErrorMessage
              className={css.error}
              name="password"
              component="div"
            />
          </label>

          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </>
  );
}
