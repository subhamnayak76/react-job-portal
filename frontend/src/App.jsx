import React from 'react'
import {Route ,createBrowserRouter,createRoutesFromElements,RouterProvider, json} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './layout/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage from './pages/JobPage'
import { JobLoader } from './pages/JobPage'
import AddJob from './pages/AddJob'
import EditJob from './pages/EditJob'

const App = () => {

  
   const addjob = async(newJob) =>{
    const res  = await fetch('/api/jobs',{
      method :'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(newJob),
    })
    return
   }
   const deleteJob = async(id) =>{
    const res  = await fetch(`/api/jobs/${id}`,{
      method :'DELETE',
    })
    return
   }
   const updatedJob = async(job) =>{
    const res  = await fetch(`/api/jobs/${job.id}`,{
      method :'PUT',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(job),
    })
    return
   }
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path = '/' element = {<MainLayout />}>
    <Route index element = {<HomePage />} />
    <Route path='/jobs' element={<JobsPage/>}/>
    <Route path='/add-job' element={<AddJob addJobSubmit = {addjob}/> }/>
    <Route path='jobs/:id' element={<JobPage deleteJob = {deleteJob}/> } loader ={JobLoader}/>
    <Route path='/edit-jobs/:id' element={<EditJob updatedJobSubmit={updatedJob}/> } loader ={JobLoader}/>
    <Route path='*' element={<NotFoundPage/>}/>
    </Route>
    )
  )
  return <RouterProvider router={router} /> 
}
export default App