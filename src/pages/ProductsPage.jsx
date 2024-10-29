import { useState } from "react";
import { getCookie, ccc } from "utils/cookie";
import { useNavigate } from "react-router-dom";
import Pagination from "components/pagination";
import { grabber } from "services/queries";
import { useDeleteProduct, useDeleteProducts } from "services/mutations";
import Loader from "components/Loader";
import { CiLogout } from "react-icons/ci";
import styles from "./ProductsPage.module.css";
import ProductsList from "components/productsList";
import hiddens from "services/hides";
import { BsSearch } from "react-icons/bs";
import DeleteModal from "components/DeleteModal";
import AddModal from "components/AddModal";
import { toast } from "react-toastify";
import { GiSettingsKnobs } from "react-icons/gi";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

function ProductsPage() {
  const token = getCookie("token");
  const hides = hiddens(token);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: "",
    ids: [],
  });
  const [addModal, setAddModal] = useState({ show: false, product: null });
  const [showCheckbox, toggleCheckboxVisibility] = useState(false);
  const [selectedItems, updateSelectedItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle(styles.dark);
  };

  const { isLoading, data, error, isPending } = grabber(page);
  const { mutate } =
    selectedItems.length > 1
      ? useDeleteProducts(setDeleteModal)
      : useDeleteProduct(setDeleteModal);

  const handleProductSelection = (id) => {
    updateSelectedItems((current) =>
      current.includes(id)
        ? current.filter((productId) => productId !== id)
        : [...current, id]
    );
  };

  const initiateDelete = (e, id) => {
    e.preventDefault();
    if (showCheckbox && selectedItems.length === 0) {
      toast.error("هیچ محصولی انتخاب نشده است!");
      return;
    }
    if (showCheckbox && selectedItems.length > 1) {
      setDeleteModal({
        show: true,
        message: "آیا از حذف این محصولات اطمینان دارید؟",
        ids: selectedItems,
      });
    } else {
      setDeleteModal({
        show: true,
        message: "آیا از حذف این محصول مطمئنید؟",
        ids: [id],
      });
    }
  };

  const confirmDeletion = () => {
    if (selectedItems.length > 1) {
      mutate(selectedItems);
    } else {
      mutate(deleteModal.ids);
    }
  };

  const handleLogout = () => {
    ccc("token");
    navigate("/login");
  };

  const openAddModal = (e) => {
    e.preventDefault();
    setAddModal({ show: true, product: null });
  };

  const openEditModal = (e, product) => {
    e.preventDefault();
    setAddModal({ show: true, product: product });
  };

  const closeDeleteMode = () => {
    toggleCheckboxVisibility(false);
    updateSelectedItems([]);
  };

  if (isLoading) return <Loader />;

  if (error) return <div>هیچ محصولی وجود ندارد</div>;

  const products = data?.data;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {deleteModal.show && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          confirmDelete={confirmDeletion}
          message={deleteModal.message}
        />
      )}
      {addModal.show && (
        <AddModal setAddModal={setAddModal} product={addModal.product} />
      )}

      <header>
        <div className={styles.search}>
          <BsSearch />
          <input
            type="text"
            placeholder="جستجوی کالا"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <div className={styles.user}>
          <img src="src/assets/profile.png" alt="" />
          <div>
            <p>{hides.username}</p>
            <span className={styles.userRole}>مدیر</span>
          </div>
          <CiLogout size="27px" title="خروج" onClick={handleLogout} />
        </div>
      </header>

      <div className={styles.add}>
        <div className={styles.title}>
          <GiSettingsKnobs />
          <span>مدیریت کالا</span>
        </div>

        <button onClick={toggleTheme}>تغییر تم</button>

        <div>
          <button onClick={openAddModal}>افزودن محصول</button>
        </div>
      </div>

      {isPending ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th>
                {!showCheckbox ? (
                  <FiMoreHorizontal
                    size="25px"
                    onClick={() => toggleCheckboxVisibility(true)}
                  />
                ) : (
                  <div className={styles.groupDelete}>
                    <BsTrash
                      size="20px"
                      color="#F43F5E"
                      onClick={(e) => initiateDelete(e, null)}
                    />
                    <IoCloseSharp
                      size="20px"
                      onClick={closeDeleteMode}
                      color="#862b3a"
                    />
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductsList
                  key={product.id}
                  product={product}
                  selectedProducts={selectedItems}
                  productSelectHandler={handleProductSelection}
                  showCheckbox={showCheckbox}
                  deleteHandler={initiateDelete}
                  showEditModal={openEditModal}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                  هیچ محصولی یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {data.totalPages > 1 && (
        <Pagination page={page} setPage={setPage} pages={data.totalPages} />
      )}
    </div>
  );
}

export default ProductsPage;
