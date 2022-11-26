import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import { GlobalContext } from '../context/GlobalContext'

const customStyles = {
     content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#E4DCCF',
          width: '350px',
          height: '450px',
          border: '2px solid #1B2430',
          borderRadius: '20px'
     },
};

Modal.setAppElement('#root');

export const AddNoteModal = () => {

     const { isOpen, addNewNote, closeModal, activeNote, editNote } = useContext(GlobalContext);

     const [formValues, setFormValues] = useState({
          title: '',
          content: '',
          id: uuidv4(),
          date: new Date()
     });

     const resetValues = () => {
          setFormValues({
               title: '',
               content: '',
               id: uuidv4(),
               date: new Date()
          });
     }

     const [invalidTitle, setInvalidTitle] = useState(false);

     useEffect(() => {
            let timer = setTimeout(() => setInvalidTitle(false), 2000);
            return () => {
              clearTimeout(timer);
            };
     },[invalidTitle]);

     const { title, content} = formValues;

     useEffect(() => {
          if(activeNote) {
               setFormValues(activeNote)
          }
     }, [activeNote, setFormValues])


     const handleInputChange = ({ target }) => {
          setFormValues({
               ...formValues,
               [target.name]: target.value
          })
     }

     const handleSubmit = (e) => {
          e.preventDefault();

          if (title.trim().length < 3) {
               return setInvalidTitle(true);
          }
          
          setInvalidTitle(false);

          if (activeNote) {
               editNote(formValues);
          }
          else {
               addNewNote(formValues);
          }
          handleClose();
     };

     const handleClose = () => {
          setInvalidTitle(false);
          closeModal();
          resetValues();
     }

     // function afterOpenModal() {
     //      // references are now sync'd and can be accessed.
     //      subtitle.style.color = '#f00';
     // }


     return (
          <Modal
               isOpen={isOpen}
               // onAfterOpen={afterOpenModal}
               onRequestClose={handleClose}
               closeTimeoutMS={200}
               style={customStyles}
               overlayClassName="modal-overlay"
          >
               <section className="note-modal">
               <h2>{
                    activeNote ? 'Edit Note' : 'Create New Note'
               }</h2>
               <form className="note-modal-form" onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                         type="text"
                         placeholder='Note Title'
                         name="title"
                         id="title"
                         value={title}
                         onChange={handleInputChange}
                         className={`${invalidTitle && 'is-invalid'}`}
                         autoComplete="off"
                    />
                    <label htmlFor="note-content">Content</label>
                    <textarea
                         type="text"
                         placeholder="Note Body"
                         name="content"
                         id="content"
                         value={content}
                         onChange={handleInputChange}
                         rows="10"
                    >
                    </textarea>
                    <div className="node-modal-actions">
                         <button type="button" onClick={handleClose}>Cancel</button>
                         <button type="submit">Save</button>
                    </div>
               </form>
               </section>

          </Modal>
     )
}
