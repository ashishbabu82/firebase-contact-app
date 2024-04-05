import Nav from "./components/Nav";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setcontacts] = useState([]);
  const { open, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contact");

        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((docs) => {
            return {
              id: docs.id,
              ...docs.data(),
            };
          });
          setcontacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  // search funtionality
  const filterContact = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "contact");

    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((docs) => {
        return {
          id: docs.id,
          ...docs.data(),
        };
      });

const filter = contactList.filter((contact)=>contact.name.toLowerCase().includes(value.toLowerCase()))


      setcontacts(filter);
      return filter;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Nav />
        <div className="relative flex items-center ">
          <FiSearch className="absolute ml-1 text-2xl text-white " />
          <input
            onChange={filterContact}
            type="text"
            name="search"
            className="h-10 flex-grow rounded-md border border-white bg-transparent  pl-9 text-lg font-medium text-white"
          />
          <AiFillPlusCircle
            onClick={onOpen}
            className=" ml-3 cursor-pointer text-5xl text-white"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? <NotFoundContact/> : contacts.map((contact) => (
            <ContactCard contact={contact} key={contact.id} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} onOpen={open} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
