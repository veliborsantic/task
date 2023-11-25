import styles from "./header.module.scss";

const Header = () => {
  return (
    <div className={`bg-primary ${styles.header}`}>
      <div className='p-3 d-flex justify-content-end align-items-center'>
        <button className='mx-auto'>Add tasks</button>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
