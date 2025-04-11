import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./HomePage.module.css";
import { FaAddressBook } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className={css.container}>
      <PageTitle>Your Contacts. Neat. Tidy. Always There.</PageTitle>
      <p className={css.description}>
        No more digging through notes or old messages. Add, edit, and find your
        people—fast, simple, stress-free.
      </p>
      <div className={css.icon}>
        <FaAddressBook size={48} color="#4e89ff" />
      </div>
    </div>
  );
}
