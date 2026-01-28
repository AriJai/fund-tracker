import type { Dispatch } from "@reduxjs/toolkit";

export type User = {
  id: string;
  username: string;
};

export type AuthRequest = {
  username: string;
  password: string;
}

export type AuthResponse = {
  user: User
}

export type setCredentialsPayload = {
  user: User;
};

export type RegisterThunk = (
  username: string,
  password: string
) => (dispatch: Dispatch) => Promise<void>

export type LoginThunk = (
  username: string,
  password: string
) => (dispatch: Dispatch) => Promise<void>

export type LoginResponse = {
  message: string,
  user: User;
};

export type LogoutThunk = () => (dispatch: Dispatch) => Promise<void>;