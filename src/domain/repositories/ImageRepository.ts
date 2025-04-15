import { Image } from "../entities/Image";

export interface ImageRepository {
    findById(id: string): Promise<Image | null>;
    save(image: Image): Promise<void>;
}