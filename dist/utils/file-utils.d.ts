import { IFileData } from '../types';
/** Конвертация файла в base64 */
export declare const getBase64: (file: File) => Promise<IFileData>;
interface IOptions {
    maxSize?: number;
    accept?: string;
}
interface IValidationResult {
    valid: boolean;
    error: string;
}
/**
 * Валидация файла
 * @param file
 * @param options - параметры валидации {maxSize: number, accept: string}
 *
 */
export declare const validateFile: (file: File, options?: IOptions | undefined) => IValidationResult;
export {};
