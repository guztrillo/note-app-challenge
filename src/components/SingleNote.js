import { useContext } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi'
import { GlobalContext } from '../context/GlobalContext';
import Swal from 'sweetalert2'


export const SingleNote = ({title, content, date, id}) => {

  const {deleteNote, actNote} = useContext(GlobalContext);

  const handleDeleteNote = (id) => {
    Swal.fire({
      icon: 'error',
      title: 'Are you sure you want to delete this note?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
      reverseButtons: true,
      confirmButtonColor: '#EB4747',
      denyButtonColor: '#51557E',
      color: '#1B2430',
      background: '#F0EBE3'
    }).then((result)=> {
      if(result.isConfirmed) {
        deleteNote(id);
      }
      else {
        return
      }
    })
  }

  return (
    <article className="note-single">
      <header>
        <h3>
          {title}
        </h3>
      </header>
      <p className="note-single-content">{content}</p>
      <footer className="note-single-footer">
        <small>Last Edited: {date}</small>
        <section className="note-single-action">
          <button>
            <BiArchiveIn className="note-icon" />
          </button>
          <button type="button" onClick={()=>actNote(id)}>
            <AiOutlineEdit className="note-icon"/>
          </button>
          <button type="button" onClick={()=>handleDeleteNote(id)}>
            <AiOutlineDelete className="note-icon" />
          </button>
        </section>
      </footer>
    </article>
  )
}
