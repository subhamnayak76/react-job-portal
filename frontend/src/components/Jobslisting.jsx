import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import Spinner from './Spinner';

const Jobslisting = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
      try {
        console.log('Fetching jobs from', apiUrl);
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched jobs:', data);
        setJobs(data);
      } catch (error) {
        console.log('Error while fetching data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            jobs.map((job) => <JobList key={job.id} job={job} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobslisting;
