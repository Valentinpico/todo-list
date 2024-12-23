export type UserType = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type UserDraftType = Omit<UserType, "id"> & { password2: string };

export type loginType = {
  emailOrUsername: string;
  password: string;
};

export type UserDTO = Omit<UserType, "password">;
