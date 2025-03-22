// Define the structure for topics
export interface Topic {
  id: string;
  name: string;
}

// Define the structure for a subject
export interface Subject {
  name: string;
  topics: Topic[];
}

// Define the structure for the subjects object
export interface Subjects {
  [key: string]: Subject;
}

// Define valid subject keys as a type
export type SubjectKey = 'physics' | 'competitive-programming' | 'mathematics';