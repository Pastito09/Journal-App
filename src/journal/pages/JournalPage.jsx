

import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { savingNewNote, startNewNote } from "../../store/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"



export const JournalPage = () => {
  
  const dispatch = useDispatch();

  const onClickNewNote = () => {

    dispatch( startNewNote() );
    
  }

  const { isSaving, active } = useSelector( state => state.journal )
  
  return (
    <JournalLayout>
    {/*<Typography >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora molestias, ducimus excepturi quos sit consequatur libero maiores vitae itaque incidunt exercitationem, similique aliquam! Consequatur numquam suscipit qui dolorum veniam voluptates?</Typography>*/}
    
     { !!( active ) ? <NoteView /> : <NothingSelectedView />}
    
    <IconButton
      disabled={ isSaving } 
      onClick={ onClickNewNote }
      size='large'
      sx={{
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
        position: 'fixed',
        right: 50,
        bottom: 50
      }}
    >
      <AddOutlined sx={{ fontSize: 30 }} />

    </IconButton>

    </JournalLayout>
  )
}
