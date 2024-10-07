export class CreateArticleDto {
    title: string;
    authors: string;  // Multiple authors can be stored as a single string or an array if needed
    published_date: Date;
    journal_conference: string;  // Name of the journal or conference
    se_practice: string;  // SE practice related to the article
    claim: string;  // The claim the article is discussing
    evidence_result: string;  // Result of the evidence (e.g., agree, disagree)
    research_type: string;  // Type of research (e.g., case study, experiment)
    participant_type: string;  // Type of participant (e.g., Student, Practitioner)
    publisher: string;  // Publisher of the article
  }