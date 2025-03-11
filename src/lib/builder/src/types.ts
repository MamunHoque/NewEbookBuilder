export interface Element {
  id: string;
  type: 'text' | 'image' | 'shape' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'; // Add more types as needed
  content: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
  style?: {
    [key: string]: string | number | boolean;
  };
}

export interface Page {
  pageNumber: number;
  content: string;
}

export interface CanvasProps {
  elements: Element[];
  updateElement: (updatedElement: Element) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (element: Element | null) => void;
  selectedElement: Element | null;
  canvasSize: { width: number; height: number };
  zoom: number;
  setZoom: (zoom: number) => void;
  currentPage: number;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  addElement: (element: Element) => void;
}