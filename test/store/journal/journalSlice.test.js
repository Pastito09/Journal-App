
import { addNewEmptyNote, clearNotesLogout, deleteNoteById, journalSlice, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "../../../src/store/journal";


const initialState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
};

describe('Pruebas en journalSlice', () => { 

    

    test('debe regresar el estado inicial y llamarse "journal"', () => { 
        const state = journalSlice.reducer( initialState, {} );

        expect( state ).toEqual( initialState );
        expect( journalSlice.name ).toBe( 'journal' );
        
    });

    test('savingNewNote debe cambiar al isSaving a True', () => { 
        const state = journalSlice.reducer( initialState, savingNewNote() );
        
        expect( state.isSaving ).toBeTruthy();
        
    });

     test('addNewEmptyNote debe agregar una nueva nota y poner el isSaving en False', () => { 
        const state = journalSlice.reducer( initialState, addNewEmptyNote('hola') );
        
        expect( state.isSaving ).toBeFalsy();
        expect( state.notes.length ).toBeGreaterThan( 0 )
       
    });

    test('setActiveNote debe agregar un objeto a active y messageSaved = "" ', () => { 
        const activeNote = {
            id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: [], 
        }
        
        const state = journalSlice.reducer( initialState, setActiveNote(activeNote) );
        
        expect( state.active ).toBe(activeNote);
        expect(state.messageSaved ).toBe('')
        
    });

    test('setNotes debe de crear una nueva nota', () => {  
        const state = journalSlice.reducer( initialState, setNotes(["hola mundo"]) );
        
        expect(state.notes.length).toBeGreaterThan( 0 );
        
    });
    test('setSaving debe de poner isSaving en True y messageSaved en "" ', () => {  
        const state = journalSlice.reducer( initialState, setSaving() );
        
        expect( state.isSaving ).toBeTruthy();
        expect( state.messageSaved ).toBe('');
        
    });

    test('updateNote debe poner isSaving en False y actualizar una nota', () => {
        const initialState2 = {
            isSaving: true,
            messageSaved: '',
            notes: [],
            active: {
                id: 'ABC123',
                title: 'che',
                body: 'fjikd',
                date: 1234567,
                imageUrls: [], 
        }  
    };  
        const state = journalSlice.reducer( initialState2, updateNote(initialState2.active));
        
        expect( state.isSaving ).toBeFalsy();

    });

    test('setPhotosToActiveNote isSaving en false y cargar una nueva imagen', () => {  
        const initialState2 = {
            isSaving: true,
            messageSaved: '',
            notes: [],
            active: {
                id: 'ABC123',
                title: 'che',
                body: 'fjikd',
                date: 1234567,
                imageUrls: [], 
        }  
    };
        const state = journalSlice.reducer( initialState2, setPhotosToActiveNote(['photo.jpg']) );
        expect( state.isSaving ).toBeFalsy();
        expect( state.active.imageUrls.length ).toBeGreaterThan( 0 ); 
        ;
    });

    test('clearNotesLogout debe limpiar messageSaved, notes y active en null, tambien isSaving en False', () => {  
        const initialState2 = {
            isSaving: true,
            messageSaved: 'salvado',
            notes: ['campera'],
            active: {
                id: 'ABC123',
                title: 'che',
                body: 'fjikd',
                date: 1234567,
                imageUrls: [], 
        } 
    }; 
        const state = journalSlice.reducer( initialState2, clearNotesLogout() );
        
        expect( state ).toStrictEqual( { isSaving: false, messageSaved: '', notes: [], active: null } );
        
    });

    test('deleteNoteById debe limpiar las notas y active en null', () => {  
        const initialState2 = {
            isSaving: true,
            messageSaved: 'salvado',
            notes: ['campera'],
            active: {
                id: 'ABC123',
                title: 'che',
                body: 'fjikd',
                date: 1234567,
                imageUrls: [], 
        } 
    }; 
        const state = journalSlice.reducer( initialState2, deleteNoteById() );
        expect( state.notes.length ).toBe( 0 );
        expect( state.active ).toBe( null );    
    });



 });