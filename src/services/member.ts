import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export type Member = {
  id: string;
  groupId: string;
  userId: string;
  profile: string;
};

export type Members = Array<Member>;

export const membersApi = createApi({
  reducerPath: "members",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    getMemberById: builder.query({
      async queryFn(id) {
        try {
          const q = query(collection(db, "members"), where("id", "==", id));

          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            return { error: { message: "Member not found" } };
          }
          const doc = querySnapshot.docs[0];
          const member: Member = { id: doc.id, ...doc.data() } as Member;
          return { data: member };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Member"],
    }),

    getMembersByGroupId: builder.query({
      async queryFn(id) {
        try {
          const membersRef = query(
            collection(db, "members"),
            where("groupId", "==", id)
          );
          const querySnaphot = await getDocs(membersRef);
          let members: Member[] = [];
          querySnaphot?.forEach((doc) => {
            members.push({ id: doc.id, ...doc.data() } as Member);
          });
          return { data: members };
        } catch (error) {
          return { error };
        }
      },
    }),
    getAllMembers: builder.query({
      async queryFn() {
        try {
          const membersRef = collection(db, "members");
          const querySnaphot = await getDocs(membersRef);
          let members: Member[] = [];
          querySnaphot?.forEach((doc) => {
            members.push({ id: doc.id, ...doc.data() } as Member);
          });
          return { data: members };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetMemberByIdQuery,
  useGetMembersByGroupIdQuery
} = membersApi;
