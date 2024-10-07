export type Article = {
    _id?: string;
    title?: string;
    authors?: string;
    published_date?: Date;
    journal_conference?: string;
    se_practice?: string;
    claim?: string;
    evidence_result?: string;
    research_type?: string;
    participant_type?: string;
    publisher?: string;
  };
  
  export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: '',
    published_date: undefined,
    journal_conference: '',
    se_practice: '',
    claim: '',
    evidence_result: '',
    research_type: '',
    participant_type: '',
    publisher: '',
  };