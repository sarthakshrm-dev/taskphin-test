import React, { useEffect, useState } from 'react';
import JobCard from './components/JobCard';
import JobFormModal from './components/JobFormModal';
import Loader from './components/Loader';
import axios from 'axios';
import './App.css'

const resetForm = () => ({
  jobTitle: '',
  companyName: '',
  industry: '',
  location: '',
  jobType: '',
  minimumExperience: '',
  maximumExperience: '',
  minimumSalary: '',
  maximumSalary: '',
  totalEmployee: '',
  applyType: 'Quick Apply',
});

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState(resetForm());

  useEffect(() => {
    getJobs();
  }, [])

  useEffect(() => {
    console.log(formData, 'ddddddd');
  }, [formData])

  const getJobs = () => {
    setIsLoading(true)
    axios.get('https://6575fef40febac18d4038c6a.mockapi.io/jobs/add-job').then((res) => {
      setJobs(res.data)
      setIsLoading(false)
    })
  }

  const saveJobs = (data) => {
    console.log('step 3');
    setIsLoading(true)
    console.log('step 4');
    console.log(data, 'dddddddd');
    axios.post('https://6575fef40febac18d4038c6a.mockapi.io/jobs/add-job', data).then((res) => {
      console.log('step 5');
      getJobs();
      console.log('step 6');
    })
  }

  const editJobs = (id, data) => {
    setIsLoading(true)
    axios.put(`https://6575fef40febac18d4038c6a.mockapi.io/jobs/add-job/${id}`, data).then((res) => {
      setEditId(null);
      getJobs();
    })
  }

  const deleteJobs = (id) => {
    setIsLoading(true)
    axios.delete(`https://6575fef40febac18d4038c6a.mockapi.io/jobs/add-job/${id}`).then((res) => {
      getJobs();
    })
  }

  const handleAddJob = (e, job) => {
    console.log(job,' jjjjjjj');
    if (job) {
      setEditId(job.id);
      setFormData(job);
    }
    setStep(1)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(resetForm());
  };

  return (
    <div className="mx-auto px-16">
      <button className="mt-8 px-4 py-2 bg-primary text-white rounded-md" onClick={(e) => handleAddJob(e)}>
        Create A Job
      </button>
      {isLoading ? <Loader /> : jobs.length === 0 ? <div className='text-center text-gray-500 text-2xl font-bold mt-8'>No Jobs Found!</div> : <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 mt-8 mb-12">
        {jobs.map((job, index) => (
          <div key={index} className="sm:col-span-1 lg:col-span-1">
            <JobCard
              job={job}
              deleteJobs={deleteJobs}
              handleAddJob={handleAddJob}
            />
          </div>
        ))}
      </div>}
      <JobFormModal step={step} setStep={setStep} isOpen={isModalOpen} editId={editId} onClose={handleCloseModal}
        saveJobs={saveJobs} editJobs={editJobs} formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default App;
