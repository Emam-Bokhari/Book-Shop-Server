export type TProduct = {
    title: string;
    category: "Fiction" | "Non-Fiction" | "Academic" | "Philosophy" | "Children" | "Science" | "Religion" | "History";
    author: string;
    description: string;
    price: number;
    image: string;
    publisher: string;
    publishedDate: Date;
    edition: string;
    language: "Bengali" | "English" | "Arabic" | "Hindi" | "Spanish" | "French" | "German";
    pages?: number;
    rating: number;
    discount?: number;
    format: "Hardcover" | "Paperback" | "eBook" | "AudioBook";
    availability?: boolean;
    isDeleted?: boolean;
}