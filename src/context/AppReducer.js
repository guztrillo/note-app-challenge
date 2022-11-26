const appReducer = (state, action) => {
     switch (action.type) {
          case 'ADD_NOTE':
               return {
                    ...state,
                    notes: [...state.notes, action.payload]
               }
          case 'DEL_NOTE':
               return {
                    ...state,
                    notes: state.notes.filter(note => 
                         note.id !== action.payload
                    )
               }
          case 'ACT_NOTE':
               return {
                    ...state,
                    activeNote: state.notes.find(note => note.id === action.payload)
               }
          case 'CLEAR_ACT_NOTE':
               return {
                    ...state,
                    activeNote: null
               }
          case 'EDIT_NOTE':
               return {
                    ...state,
                    notes: state.notes.map(note => 
                         (note.id === action.payload.id) ? action.payload : note
                    )
               }
          case 'OPEN_MODAL':
               return {
                    ...state,
                    isOpen: action.payload
               }
          case 'CLOSE_MODAL':
               return {
                    ...state,
                    isOpen: action.payload
               }
          default:
               return {
                    ...state
               }
     }
}

export default appReducer;