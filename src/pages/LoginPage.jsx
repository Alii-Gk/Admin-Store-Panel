import { useLogin } from "services/mutations";
import styles from "./AuthPage.module.css";
import logo from "assets/Union.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCookie } from "utils/cookie";
import { useForm } from "react-hook-form";

function LoginPage({ formData, setFormData }) {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const { username, password } = formData;

    mutate(
      { username, password },
      {
        onSuccess: (response) => {
          toast.success(" با موفقیت وارد شدید !");
          setCookie("token", response?.token);
          navigate("/products");
        },
        onError: () => {
          toast.error("نام کاربری یا رمز عبور صحیح نیست");
        },
      }
    );
  };

  return (
    <div className={styles.auth}>
      <img src={logo} alt="" />
      <h1>فرم ورود</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onChange={handleInputChange}
      >
        <input
          name="username"
          type="text"
          placeholder="نام کاربری"
          className={styles.input}
          {...register("username", { required: true })}
        />
        {errors.username && errors.username.type === "required" && (
          <span>نام کاربری اجباری است!</span>
        )}

        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          className={styles.input}
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>رمز عبور اجباری است</span>
        )}

        <button type="submit">ورود</button>
        <Link to="/register">ایجاد حساب کاربری !</Link>
      </form>
    </div>
  );
}

export default LoginPage;
