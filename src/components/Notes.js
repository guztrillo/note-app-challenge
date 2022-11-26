import { useContext } from 'react'
import { SingleNote } from './SingleNote'
import { GlobalContext } from '../context/GlobalContext'

export const Notes = () => {
  const {notes} = useContext(GlobalContext);

  if(notes.length > 0 ) {
    return (
      <section className="notes container">
           {
               notes.map(note =>
                 <SingleNote key={note.id} {...note}/>
               )
           }
      </section>
   )
  }
  else if (notes.length === 0) {
    return (
      <section className="container notes">
        <h2 className='notes-nothing'>Nothing here yet, write what cross your mind 😊</h2>
      </section>
    )
  }
}
