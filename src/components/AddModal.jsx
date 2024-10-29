import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import styles from "./AddModal.module.css";
import { useAddProduct, useUpdateProduct } from "services/mutations";

function AddModal({ setAddModal, product }) {
  const [formData, updateFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { mutate, isPending } = product
    ? useUpdateProduct(setAddModal)
    : useAddProduct(setAddModal);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (product) {
      mutate({ id: product.id, ...formData });
    } else {
      mutate(formData);
    }
  };

  useEffect(() => {
    if (product) {
      updateFormData({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
      setValue("name", product.name);
      setValue("quantity", product.quantity);
      setValue("price", product.price);
    }
  }, [product]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>{product ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h2>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            onChange={handleInputChange}
          >
            <div className={styles.formControl}>
              <label htmlFor="name">نام کالا</label>
              <input
                type="text"
                name="name"
                placeholder="نام کالا"
                value={formData.name}
                onChange={handleInputChange}
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className={styles.error}>نام کالا اجباری است!</span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="quantity">تعداد موجودی</label>
              <input
                type="number"
                name="quantity"
                placeholder="تعداد موجودی"
                value={formData.quantity}
                onChange={handleInputChange}
                id="quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && errors.quantity.type === "required" && (
                <span className={styles.error}>تعداد را وارد کنید!</span>
              )}
            </div>
            <div className={styles.formControl}>
              <label htmlFor="price">قیمت</label>
              <input
                type="text"
                name="price"
                placeholder="قیمت"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                {...register("price", { required: true })}
              />
              {errors.price && errors.price.type === "required" && (
                <span className={styles.error}>قیمت را وارد کنید!</span>
              )}
            </div>
            <div className={styles.buttons}>
              <button type="submit" className={styles.add} disabled={isPending}>
                {product ? "ثبت اطلاعات جدید" : "ایجاد"}
              </button>

              <button
                type="button"
                className={styles.cancel}
                onClick={() => setAddModal(false)}
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
