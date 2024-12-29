import React, { useEffect, useState } from 'react'
import { useGetComplaintsByBranchQuery } from '../../services/schoolZonalApi'
import { useAssignComplaintMutation, useGetcomplaintByMobileQuery, useGetComplaintsQuery } from '../../services/complaintApi';
import { useGetbranchesQuery } from '../../services/schoolApi';

function FirstZonal() {
  var {isLoading,data} = useGetComplaintsByBranchQuery();
  console.log(isLoading,data);
  var {isLoading:cLoading,data:cdata} = useGetComplaintsQuery();
  var [selBranch,setSelBranch] = useState([]);
  var [assignFn] = useAssignComplaintMutation();
  var [search,setSearch] = useState('');
  var [selectbranch,setSelectBranch] = useState([]);
  var [selstatus,setSelStatus] = useState('all');
  var {isLoading:bLoading,data:bdata} = useGetbranchesQuery();

        var {isLoading:mLoading,data:mdata} = useGetcomplaintByMobileQuery;

  function assignCom(id){
    assignFn(id).then((res)=>{
      console.log(res);
    })
  }
  useEffect(()=>{
    if(data){
      var fil = data.filter( f => f.branch === 'Kukatpally' || f.branch === 'KPHB Colony' || f.branch === 'Paprayudu Nagar Colony');
      setSelBranch(fil);
    }
  },[data])

  function MobileFil(m){
     return (
     (m.mobile && String(m.mobile).includes(search)) && 
     (selectbranch.length === 0 || selectbranch.includes(m.branch))
     )
  }
  
  var MobileFiltered = selBranch?.filter(MobileFil);
  var StatusFiltered = MobileFiltered.filter((complaint)=>{
    if(selstatus === 'all'){
      return true;
    }else{
      return complaint.status.some((status) => { return status.code === selstatus})
    }
  })
  function handlebranch(e){
       var { value,checked } = e.target;
       var checkupdates;
       if(checked){
           checkupdates = [...selectbranch,value]
       }
       else{
           checkupdates = selectbranch.filter((b)=>{ return b !== value})
       }
       setSelectBranch(checkupdates);
  }

  function handleStatus(e){
    setSelStatus(e.target.value)
  }

  return (
    <div>
      <h4 className='text-center my-4'>FIRST ZONAL OFFICER</h4>
      <input type="text" className='form-control p-2 mb-3 w-25' placeholder='Mobile Number'
      value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{marginLeft:'580px'}}/>
      <div className='d-flex p-3'>
          <div className='w-25'>
             {
                !bLoading && bdata?.map((d,i)=>{
                    return (
                      <div>
                         <input type="checkbox" value={d.branchname} className='form-check-input'
                         checked={selectbranch.includes(d.branchname)} onChange={handlebranch}/>
                         <label htmlFor={d.branchname} className='form-check-label ms-3 mb-2'>
                           {d.branchname}
                         </label>
                      </div>
                    )
                })
             }
          </div>
          <div className='w-75'>
              <div className='mb-4'>
                      <div>
                        <h5>Filter by Status:</h5>
                        <label>
                            <input type="radio" value='all' checked={selstatus === 'all'} onChange={handleStatus} className='ms-3' /> All
                        </label>
                        <label>
                            <input type="radio" value='assigned' checked={selstatus === 'assigned'} onChange={handleStatus}className='ms-3' /> Assigned
                        </label>
                        <label>
                            <input type="radio" value='accepted' checked={selstatus === 'accepted'} onChange={handleStatus} className='ms-3' /> Pending
                        </label>
                        <label>
                            <input type="radio" value='solved' checked={selstatus === 'solved'} onChange={handleStatus} className='ms-3' /> Solved
                        </label>
                        <label>
                            <input type="radio" value='closed' checked={selstatus === 'closed'} onChange={handleStatus} className='ms-3' /> Closed
                        </label>
                      </div> 
              </div>
            <div>
                <table className='table table-bordered text-center container shadow-sm'>
                  <thead>
                        <tr>
                              <th>Student Name</th>
                              <th>Mobile</th>
                              <th>Branch</th>
                              <th>Complaint</th>
                              <th>Status</th>
                              <th>Action</th>
                        </tr>
                  </thead>
                  <tbody>
                        {
                           !mLoading && mdata?.map((b,i)=>{
                                return (
                                    <tr key={i}>
                                        <td>{b.studentname}</td>
                                        <td>{b.mobile}</td>
                                        <td>{b.branch}</td>
                                        <td>{b.complaint}</td>
                                        <td>
                                            { [...b.status].sort((a,b)=>{ return a.timestamp<b.timestamp ? 1:-1})[0].code}
                                        </td>
                                        <td>
                                            {
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'registered'
                                                && <>
                                                  <button className='btn btn-warning' onClick={()=>{assignCom(b._id)}}>Assign To Principal</button>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'assigned'
                                                && <>
                                                  <b>Waiting for Acceptance</b>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=> { return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'accepted'
                                                && <>
                                                    <b>Processing</b>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'solved'
                                                && <>
                                                    <b>Waiting for Closed</b>
                                                </>
                                            }
                                            {
                                                [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'closed'
                                                && <>
                                                  <b>Complaint Closed</b>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  )
}

export default FirstZonal