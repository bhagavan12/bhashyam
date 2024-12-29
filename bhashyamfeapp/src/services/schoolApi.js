import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const schoolApi = createApi({
  reducerPath: 'schoolApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600/branches' }),
  endpoints: (builder) => ({
    getbranches: builder.query({
      query: () => `/`,
    }),
    addBranch: builder.mutation({
      query: (branch) => ({
        url: '/addbranch',
        method: 'POST',
        body: branch
      })
    }),
    login: builder.mutation({
      query: (principal) => ({
        url: '/login',
        method: 'POST',
        body: principal
      })
    }),
    // getcomplaintsBranch : builder.query({
    //   query : ()=>({
    //       url : '/principalcomplaints',
    //       method : 'GET',
    //       headers : {
    //         'authorization' : window.localStorage.getItem('token')
    //       }
    //   })
    // }),
    getcomplaintsBranch: builder.query({
      query: ({ search = "", status = "all" }) => ({
        url: `/principalcomplaints?search=${encodeURIComponent(search)}&status=${status}`,
        method: "GET",
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      }),
    }),

    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/deletebranch/${id}`,
        method: 'DELETE',
      })
    }),
    updatebranch: builder.mutation({
      query: ({ id, updbranch }) => ({
        url: `/updatebranch/${id}`,
        method: 'PUT',
        body: updbranch
      })
    })
  }),
})

export const { useGetbranchesQuery, useAddBranchMutation, useLoginMutation, useGetcomplaintsBranchQuery, useDeleteBranchMutation, useUpdatebranchMutation } = schoolApi;   