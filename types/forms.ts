export interface FormQuestion {
  id: string;
  text: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'textarea'
    | 'rating'
    | 'switch';
  required: boolean;
  options?: string[];
  scale?: number;
}

export interface FormPage {
  pageNumber: number;
  questions: FormQuestion[];
}

export interface FormData {
  id: string;
  title: string;
  description: string;
  isMultiPage: boolean;
  pages: FormPage[];
}

export interface FormsResponse {
  forms: FormData[];
}
