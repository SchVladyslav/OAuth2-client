export class Environment {
  static production = false;
  static version = "v1.0.0";
  static apiHost = "http://localhost:5000/api";
  static projectSecret = "$2b$04$LEE2W1o4Lc/kBEujam0h9Of/dAp9tP8SbQfEtyALCFzsiaci6muUK";
  static projectID = "users_list.oauth.app";
  static redirectURL = "http://localhost:4200/users";
}

export const environment = new Environment();
