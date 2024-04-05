import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const conatctValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

const AddAndUpdateContact = ({ onClose, onOpen, isUpdate, contact }) => {
  // add funtionality
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contact);
      toast.success("Added Contact Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contact", id);
      await updateDoc(contactRef, contact);
      toast.success("Updated Contact Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal onClose={onClose} onOpen={onOpen}>
        <Formik
          validationSchema={conatctValidationSchema}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(value) => {
            console.log(value);
            isUpdate ? updateContact(value, contact.id) : addContact(value);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className="text-xs text-red-800">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="h-10 border" />
              <div className="text-xs text-red-800">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="self-end border bg-green-950 px-3 py-1.5 text-white">
              {isUpdate ? "Update" : "Add"} Button
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
