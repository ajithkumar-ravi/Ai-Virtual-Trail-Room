export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'T-Shirt' | 'Shirt' | 'Pants' | 'Saree';
  image: string;
  description: string;
}

export interface ContextData {
  user_size: string;
  garment_style_type: string;
  desired_look: string;
}

export interface FitAssessmentItem {
  area: string;
  recommendation: string;
  action: string;
}

export interface TryOnResult {
  generatedImage: string;
  fitAssessment: FitAssessmentItem[];
  styleRecommendations: string[];
}