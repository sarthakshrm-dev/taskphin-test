import React, { useEffect, useState } from 'react';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

const JobCard = ({ job, deleteJobs, handleAddJob }) => {
    const [employeeStrength, setEmployeeStrength] = useState('')

    useEffect(() => {
        if (Number(job.totalEmployee) < 10) {
            setEmployeeStrength('1-10')
        } else if (10 < Number(job.totalEmployee) && Number(job.totalEmployee) < 51) {
            setEmployeeStrength('11-50')
        } else if (50 < Number(job.totalEmployee) && Number(job.totalEmployee) < 201) {
            setEmployeeStrength('51-200')
        } else if (200 < Number(job.totalEmployee) && Number(job.totalEmployee) < 501) {
            setEmployeeStrength('201-500')
        } else if (500 < Number(job.totalEmployee) && Number(job.totalEmployee) < 1001) {
            setEmployeeStrength('501-1000')
        } else if (1000 < Number(job.totalEmployee)) {
            setEmployeeStrength('1001+')
        } else {
            setEmployeeStrength('0')
        }
    }, [job])

    return (
        <div className="px-6 py-4 bg-white border rounded-lg relative flex">
            <div className='flex absolute right-5'>
                <PencilSquareIcon onClick={(e) => handleAddJob(e, job)} className="h-5 w-5 text-gray-500 cursor-pointer" />
                <TrashIcon onClick={() => deleteJobs(job.id)} className="h-5 w-5 ms-2 text-gray-500 cursor-pointer" />
            </div>
            <img src={require('../images/avatar.png')} className='h-12 w-12 me-2' alt="avatar" />
            <div>
            <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
            <h2 className="text-md font-semibold">{job.companyName} - {job.industry}</h2>
            <p className="text-sm text-gray-600">{job.location} ({job.jobType})</p>
            <h2 className="mt-6 text-sm font-semibold">
                Experience (
                {job.minimumExperience === '' && job.maximumExperience === '' ? 0 :
                    job.minimumExperience !== '' && job.maximumExperience !== '' ? (
                        job.minimumExperience === job.maximumExperience ? (
                            job.minimumExperience
                        ) : (
                            job.minimumExperience + ' - ' + job.maximumExperience
                        )
                    ) : (
                        job.minimumExperience !== '' ? job.minimumExperience : job.maximumExperience
                    )} years)
            </h2>
            <h2 className="mt-2 text-sm font-semibold">
                INR (₹) (
                {job.minimumSalary === '' && job.maximumSalary === '' ? 0 :
                    job.minimumSalary !== '' && job.maximumSalary !== '' ? (
                        job.minimumSalary === job.maximumSalary ? (
                            Number(job.minimumSalary).toLocaleString()
                        ) : (
                            Number(job.minimumSalary).toLocaleString() + ' - ' + Number(job.maximumSalary).toLocaleString()
                        )
                    ) : (
                        job.minimumSalary !== '' ? Number(job.minimumSalary).toLocaleString() : Number(job.axnimumSalary).toLocaleString()
                    )} / Month)
            </h2>
            <h2 className="mt-2 text-sm font-semibold">{employeeStrength} employees</h2>
            {job.applyType === "Quick Apply" ? <button className="mt-6 px-4 py-2 bg-primary text-white rounded-md">
                Apply Now
            </button> :
                <button className="mt-6 px-4 py-2 bg-white text-primary border border-primary rounded-md">
                    External Apply
                </button>}
            </div>
        </div>
    );
};

export default JobCard;