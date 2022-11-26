import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { AddNoteModal } from './AddNoteModal';

export const Header = () => {
  const {openModal, clearActNote} = useContext(GlobalContext);

  const handleCreateNote = () => {
      clearActNote();
      openModal()
  }

  return (
    <header className="notes-header">
     <section className="notes-header-title">
          <h1>My Notes</h1>
     </section>
     <section className='notes-header-action'>
          <button onClick={handleCreateNote}>New Note</button>
          <button>Archived Notes</button>
     </section>
     <AddNoteModal/>
    </header>
  )
}
