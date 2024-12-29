import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const complaintApi = createApi({
  reducerPath: 'complaintApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4600/complaints' }),
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: ({ branches, status, mobile }) => {
        const params = new URLSearchParams();

        // Only add parameters if they exist
        if (branches?.length) params.append('branches', branches.join(','));
        if (status) params.append('status', status);
        if (mobile) params.append('mobile', mobile);

        const url = params.toString()
          ? `/a?${params.toString()}`
          : '/a';

        return { url }
      }
    }),
    addComplaint: builder.mutation({
      query: (complaint) => ({
        url: '/addcomplaint',
        method: 'POST',
        body: complaint
      })
    }),
    assignComplaint: builder.mutation({
      query: (id) => ({
        url: `/assigncomplaint/${id}`,
        method: 'PUT',
        body: id,
        headers: {
          'authorization': window.localStorage.getItem('token')
        }
      })
    }),
    acceptComplaint: builder.mutation({
      query: (id) => ({
        url: `/acceptcomplaint/${id}`,
        method: 'PUT',
        body: id,
        headers: {
          'authorization': window.localStorage.getItem('token')
        }
      })
    }),
    solvingComplaint: builder.mutation({
      query: (id) => ({
        url: `/complaintsolved/${id}`,
        method: 'PUT',
        body: id,
        headers: {
          'authorization': window.localStorage.getItem('token')
        }
      })
    }),
    complaintClosed: builder.mutation({
      query: (id) => ({
        url: `/complaintclosed/${id}`,
        method: 'PUT',
        body: id,
        headers: {
          'authorization': window.localStorage.getItem('token')
        }
      })
    }),
    getcomplaintByMobile: builder.query({
      query: (mobile) => ({
        url: '/getcomplaintbymobile',
        method: 'GET',
        params: { mobile }
      })
    }),
    getComplaintsbyBranch: builder.query({
      query: (search) => ({
        url: `/getcomplaintbranch/${search}`,
        method: 'GET'
      })
    })
  }),
})

export const { useGetComplaintsQuery, useAddComplaintMutation, useAssignComplaintMutation, useAcceptComplaintMutation, useSolvingComplaintMutation, useComplaintClosedMutation, useGetcomplaintByMobileQuery, useGetComplaintsbyBranchQuery } = complaintApi;