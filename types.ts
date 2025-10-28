export interface FormData {
  architecturalStyle: string;
  roomLayoutPriority: string;
  colorScheme: string;
  vastuCompliance: boolean;
  ecoFriendlyFeatures: string[];
  bedrooms: string;
  bathrooms: string;
  additionalRooms: string[];
}

export interface GeneratedImage {
  view: string;
  src: string;
  prompt: string;
}
