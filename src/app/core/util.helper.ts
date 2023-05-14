import { UserDto } from '../shared/dtos/user.dto';

export class UtilHelper {
  private static instance: UtilHelper;

  public static no_image_user =
    'https://firebasestorage.googleapis.com/v0/b/responsive-city-335418.appspot.com/o/blank.png?alt=media&token=7ba88845-5173-4072-84d6-4a4149faff5e';
  public static no_image =
    'https://firebasestorage.googleapis.com/v0/b/uploads-6680b.appspot.com/o/no-photo-available.png?alt=media&token=d86279fa-a90d-4fee-b090-c9b891cb6f0f';

  public static get getInstance() {
    if (UtilHelper.instance) {
      return UtilHelper.instance;
    }
    return this.instance;
  }

  public static getUserImage(user: UserDto): string {
    let image = this.no_image_user;
    if (user && user.image) {
      return user.image;
    }
    return image;
  }

  public static getImage(entity: any, field: string): string {
    let image = this.no_image;
    if (entity && entity[field]) {
      return entity[field];
    }
    return image;
  }
}
