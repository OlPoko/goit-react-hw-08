import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Must be at least 6 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("✅ Registration successful!");
        actions.resetForm();
      })
      .catch(() => {
        toast.error("❌ Something went wrong. Please try again.");
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          <span>Username</span>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="span" className={css.error} />
        </label>

        <label className={css.label}>
          <span>Email</span>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="span" className={css.error} />
        </label>

        <label className={css.label}>
          <span>Password</span>
          <Field type="password" name="password" />
          <ErrorMessage
            name="password"
            component="span"
            className={css.error}
          />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
