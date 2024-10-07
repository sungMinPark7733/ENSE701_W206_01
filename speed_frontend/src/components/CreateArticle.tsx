import { useState } from 'react';

export default function CreateArticle() {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    published_date: '',
    journal_conference: '',
    claim: '',
    evidence_result: '',
    research_type: '',
    participant_type: '',
    publisher: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // POST request to the backend API
    const response = await fetch('/api/articles', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Article submitted successfully');
    } else {
      alert('Error submitting article');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
      {/* Other form fields for authors, journal, claim, etc. */}
      <button type="submit">Submit Article</button>
    </form>
  );
}