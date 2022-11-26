import { createContext, useEffect, useReducer } from 'react';
import data from '../data.js';
import appReducer from './AppReducer';

export const GlobalContext = createContext(data);

const initialState = {
     notes: data,
     isOpen: false,
     activeNote: null
}

export const ContextProvider = ({ children }) => {
     
     const [state, dispatch] = useReducer(appReducer, initialState, () => {
          const localData = localStorage.getItem('notes');
          return {
               ...initialState,
               notes: localData ? JSON.parse(localData) : data
          }
     });

     useEffect(() => {
       localStorage.setItem('notes', JSON.stringify(state.notes))
     }, [state.notes])
     

     const addNewNote = ({ title, content, id, date }) => {
          const newNote = {
               title,
               content,
               id,
               date: date.toLocaleDateString('en-GB')
          };
          dispatch({ type: "ADD_NOTE", payload: newNote })
     }

     const deleteNote = (id) => {
          dispatch({ type: "DEL_NOTE", payload: id })
     }

     const actNote = (id) => {
          openModal();
          dispatch({ type: "ACT_NOTE", payload: id })
     }

     const editNote = (note) => {
          const editedNote = {
               ...note,
               date: new Date().toLocaleDateString('en-GB')
          }
          dispatch({ type: "EDIT_NOTE", payload: editedNote })
     }

     const openModal = () => {
          dispatch({ type: "OPEN_MODAL", payload: true })
     }

     const clearActNote = () => {
          dispatch({ type: "CLEAR_ACT_NOTE" })
     }

     const closeModal = () => {
          dispatch({ type: "CLOSE_MODAL", payload: false });
          clearActNote()
     }


     return <GlobalContext.Provider
          value={{
               ...state,
               addNewNote,
               openModal,
               closeModal,
               deleteNote,
               editNote,
               clearActNote,
               actNote
          }}
     >
          {children}
     </GlobalContext.Provider>
}