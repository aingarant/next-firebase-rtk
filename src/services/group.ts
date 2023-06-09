import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Group } from "@/types";

export const groupsApi = createApi({
  reducerPath: "groups",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Group"],
  endpoints: (builder) => ({
    getGroups: builder.query({
      async queryFn() {
        try {
          const groupsRef = collection(db, "groups");
          const querySnaphot = await getDocs(groupsRef);
          let groups: Group[] = [];
          querySnaphot?.forEach((doc) => {
            groups.push({ id: doc.id, ...doc.data() } as Group);
          });
          console.log("ehll");
          return { data: groups };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Group"],
    }),

    getGroupById: builder.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "groups", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Group"],
    }),
  }),
});

export const { useGetGroupsQuery, useGetGroupByIdQuery } = groupsApi;
