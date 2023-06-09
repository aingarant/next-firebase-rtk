import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { User } from "@/types";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      async queryFn() {
        try {
          const usersRef = collection(db, "users");
          const querySnaphot = await getDocs(usersRef);
          let users: User[] = [];
          querySnaphot?.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as User);
          });
          return { data: users };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),

    fetchUserByEmail: builder.query({
      async queryFn(email) {
        try {
          const q = query(collection(db, "users"), where("email", "==", email));
          const querySnapshot = await getDocs(q);
          let users: User[] = [];
          querySnapshot?.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as User);
          });
          return { data: users };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useFetchUsersQuery, useFetchUserByEmailQuery } = usersApi;
