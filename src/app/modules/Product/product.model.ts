import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/moduleSpecific/queryFilters';

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      enum: {
        values: [
          'fiction',
          'nonFiction',
          'academic',
          'philosophy',
          'children',
          'science',
          'religion',
          'history',
          "biography",
          "art",
          "poetry",
          "romance",
          "mystery",
          "fantasy",
          "travel",
          "selfHelp",
          "psychology",
          "politics",
          "cookbook",
          "humor",
          "graphicNovels",
          "health",
          "technology",
          "business",
          "education",
          "sports",
        ],
        message: '{VALUE} is not valid category',
      },
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    aboutAuthor: {
      type: String,
      trim: true,
      required: true,
    },
    shipping: {
      type: String,
      trim: true,
      required: true,
    },
    returnsPolicy: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    publisher: {
      type: String,
      trim: true,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    edition: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      enum: {
        values: [
          'bengali',
          'english',
          'arabic',
          'hindi',
          'spanish',
          'french',
          'german',
          "italian", "portuguese", "russian", "chinese", "japanese", "korean", "turkish", "urdu", "swedish", "dutch", "polish", "greek", "hebrew", "persian", "thai", "vietnamese"
        ],
        message: '{VALUE} is not a valid language',
      },
      required: true,
    },
    pages: {
      type: Number,
      trim: true,
    },
    rating: {
      type: Number,
      trim: true,
      required: true,
    },
    discount: {
      type: Number,
      trim: true,
    },
    format: {
      type: String,
      enum: {
        values: ['hardcover', 'paperback', 'eBook', 'audioBook', "pdf", "audiobookMP3", "audiobookCD", "comicBook", "interactiveBook", "flipBook", "boxSet", "deluxeEdition"],
        message: '{VALUE} is not a valid format',
      },
      required: true,
    },
    quantity: {
      type: Number,
      trim: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// query middleware for soft delete by utils
productSchema.pre('find', excludeDeletedQuery);
productSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
productSchema.pre('aggregate', excludeDeletedAggregation);

export const Product = model<TProduct>('Product', productSchema);
