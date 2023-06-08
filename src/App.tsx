import React, { useState } from 'react';
import './App.css';

interface Note {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editNoteId, setEditNoteId] = useState<number | null>(null);

  const addNote = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      if (editNoteId !== null) {
        const updatedNotes = notes.map((note) => {
          if (note.id === editNoteId) {
            return {
              ...note,
              title,
              content,
            };
          }
          return note;
        });
        setNotes(updatedNotes);
        setEditNoteId(null);
      } else {
        const newNote: Note = {
          id: Date.now(),
          title,
          content,
        };
        setNotes([...notes, newNote]);
      }
      setTitle('');
      setContent('');
    }
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    if (editNoteId === id) {
      setEditNoteId(null);
    }
  };

  const editNote = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setEditNoteId(id);
    }
  };

  return (
    <div className="app">
      <h1>Notebook</h1>
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addNote}>
          {editNoteId !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>
      <div className="note-list">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button className="edit-button" onClick={() => editNote(note.id)}>Edit</button>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
