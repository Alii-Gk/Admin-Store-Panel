import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "services/mutations";
import { useForm } from "react-hook-form";
import logo from "assets/Union.png";
import styles from "./AuthPage.module.css";

import { toast } from "react-toastify";

function RegisterPage({ formData, setFormData }) {
  const navigate = useNavigate();
  const { mutate } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmission = async () => {
    const { username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("گذرواژه‌ها مطابقت ندارند، دقت کنید.");
      return;
    }

    mutate(
      { username, password },
      {
        onSuccess: () => {
          toast.success(" ثبت نام شما موفقیت آمیز بود!");
          setFormData({ username: "", password: "", confirmPassword: "" });
          navigate("/login");
        },
        onError: () => {
          toast.error("قبلا با این کاربر ثبت نام کرده اید");
        },
      }
    );
  };

  return (
    <div className={styles.auth}>
      <img src={logo} alt="" />
      <h1>فرم ثبت‌ نام</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmission)}
        onChange={handleInputChange}
      >
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          className={styles.input}
          id="username"
          {...register("username", { required: true })}
        />
        {errors.username && errors.username.type === "required" && (
          <span>نام کاربری اجباری است.</span>
        )}

        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          className={styles.input}
          {...register("password", { required: true })}
        />
        {errors.password && errors.password.type === "required" && (
          <span>رمز عبور اجباری است.</span>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          className={styles.input}
        />

        <button type="submit">ثبت‌ نام</button>
      </form>

      <Link to="/login">حساب کاربری دارید؟</Link>
    </div>
  );
}

export default RegisterPage;
