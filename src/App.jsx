import { useEffect, useState } from "react";
import "./App.css";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./redux/contacts/contactsOps";
import { addContact } from "./redux/contacts/contactsOps";
import {
  selectContacts,
  selectIsLoading,
  selectIsError,
} from "./redux/contacts/selectors";
import Loader from "./components/Loader/Loader";
import PageTitle from "./components/PageTitle/PageTitle";

const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    dispatch(addContact({ id: nanoid(), ...newContact }));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <PageTitle>Your Phonebook</PageTitle>
      <ContactForm onAdd={handleAddContact} />
      {isLoading && <Loader />}
      {isError && <Error />}
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;
