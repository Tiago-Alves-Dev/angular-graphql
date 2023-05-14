import { UploadTypeEnum } from 'src/app/shared/enums/upload.type.enum';

export interface StorageInterface {
  uploadFile(file: File, filename: string, uploadTypeEnum: UploadTypeEnum): Promise<any>;

  deleteFile(storageUrl: string, uploadTypeEnum: UploadTypeEnum): void;
}
