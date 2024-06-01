
import Hero from '../components/Hero'
import HomeCard from '../components/Homecard'
import JobListings from '../components/Jobslisting'
import ViewAllJobs from '../components/ViewAlljobs'
const HomePage = () => {
  return (
    <>
    <Hero />
    <HomeCard />
    <JobListings isHome={true} />
    <ViewAllJobs />
    </>
  )
}

export default HomePage