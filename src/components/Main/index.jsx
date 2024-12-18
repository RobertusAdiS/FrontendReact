import { useState } from "react";
import Product from "../Product";
import UserDetails from "../UserDetails";
import styles from "./styles.module.css";

const Main = () => {
  //state to toggle user details
  const [showUserDetails, setShowUserDetails] = useState(false);

  //function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  //function to toggle user details
  const toggleUserDetails = () => {
    setShowUserDetails((prev) => !prev);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Hynee</h1>
        <div className={styles.button_group}>
          {/* button toggle user details */}
          <button className={styles.white_btn} onClick={toggleUserDetails}>
            {showUserDetails ? "Hide profile" : "Profile"}
          </button>
          {/* button to logout */}
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className={styles.content}>
        <div className={styles.product_container}>
          <Product />
        </div>
        {/* Conditionally render UserDetails component */}
        {showUserDetails && (
          <div className={styles.user_details_container}>
            <UserDetails />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
