import { UploadTypeEnum } from 'src/app/enums/upload.type.enum';

export interface StorageInterface {
  uploadFile(
    file: File,
    filename: string,
    uploadTypeEnum: UploadTypeEnum
  ): Promise<any>;

  deleteFile(storageUrl: string, uploadTypeEnum: UploadTypeEnum): void;
}
