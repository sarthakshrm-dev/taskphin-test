import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function MyModal({ isOpen, onClose, step, setStep, saveJobs, editJobs, formData, setFormData, editId }) {
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['jobTitle', 'companyName', 'industry'];
    const hasErrors = requiredFields.some((field) => !formData[field]);

    if (step === 1) {
      if (hasErrors) {
        const newErrors = requiredFields.reduce((errors, field) => {
          if (!formData[field]) {
            return { ...errors, [field]: `${field === 'jobTitle' ? 'Job title' : field === 'companyName' ? 'Company name' : field.charAt(0).toUpperCase() + field.slice(0)} is required` };
          }
          return errors;
        }, {});
        setFormErrors(newErrors);
        return;
      }
      setFormErrors({});
      setStep(2);
    } else if (step === 2) {
      if (formData.minimumExperience && formData.maximumExperience) {
        if (Number(formData.minimumExperience) > Number(formData.maximumExperience)) {
          setFormErrors(pValue => {
            return {
              ...pValue,
              maximumExperience: "Value should be greater than minimum experience"
            }
          })
          return;
        }  else {
          setFormErrors(pValue => {
            return {
              ...pValue,
              maximumExperience: ""
            }
          })
        }
      }
      if (formData.minimumSalary && formData.maximumSalary) {
        if (Number(formData.minimumSalary) > Number(formData.maximumSalary)) {
          setFormErrors(pValue => {
            return {
              ...pValue,
              maximumSalary: "Value should be greater than minimum salary"
            }
          })
          return;
        } else {
          setFormErrors(pValue => {
            return {
              ...pValue,
              maximumSalary: ""
            }
          })
        }
      }
      console.log('step 1');
      if (editId) {
        editJobs(editId, formData)
      } else {
        console.log('step 2');
        saveJobs(formData);
      }
      setFormErrors({});
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
        setFormErrors({});
        onClose();
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full md:max-w-2xl lg:max-w-2xl transform overflow-hidden rounded-lg bg-white p-8 text-left align-middle shadow-xl transition-all">
                {step === 1 && (
                  <>
                    <Dialog.Title
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                    >
                      <span>Create a job</span>
                      <span>Step 1</span>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div class="grid grid-cols-2 gap-6">
                        <div className="mt-6 col-span-2">
                          <label className='font-semibold'>Job Title<span className='text-red-500'>*</span></label>
                          <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            placeholder="ex. UX UI Designer"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                          {formErrors.jobTitle && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.jobTitle}</p>
                          )}
                        </div>
                        <div className="col-span-2">
                          <label className='font-semibold'>Company Name<span className='text-red-500'>*</span></label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="ex. Google"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                          {formErrors.companyName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.companyName}</p>
                          )}
                        </div>
                        <div className="col-span-2">
                          <label className='font-semibold'>Industry<span className='text-red-500'>*</span></label>
                          <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            placeholder="ex. Information Technology"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                          {formErrors.industry && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.industry}</p>
                          )}
                        </div>
                        <div className="col-span-1">
                          <label className='font-semibold'>Location</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="ex. Chennai"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className='font-semibold'>Remote Type</label>
                          <input
                            type="text"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            placeholder="ex. In-office"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                        </div>
                      </div>
                      <div className="mt-24 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {step === 2 && (
                  <>
                    <Dialog.Title
                      className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                    >
                      <span>Create a job</span>
                      <span>Step 2</span>
                    </Dialog.Title>
                    <form onSubmit={handleSubmit}>
                      <div class="grid grid-cols-2 gap-6">
                        <div className="mt-6 col-span-1">
                          <label className='font-semibold'>Experience</label>
                          <input
                            type="number"
                            name="minimumExperience"
                            value={formData.minimumExperience}
                            onChange={handleInputChange}
                            placeholder="Minimum"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                        </div>
                        <div className="col-span-1 mt-12">
                          <input
                            type="number"
                            name="maximumExperience"
                            value={formData.maximumExperience}
                            onChange={handleInputChange}
                            placeholder="Maximum"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                          {formErrors.maximumExperience && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.maximumExperience}</p>
                          )}
                        </div>
                        <div className="col-span-1">
                          <label className='font-semibold'>Salary</label>
                          <input
                            type="number"
                            name="minimumSalary"
                            value={formData.minimumSalary}
                            onChange={handleInputChange}
                            placeholder="Minimum"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                        </div>
                        <div className="col-span-1 mt-6">
                          <input
                            type="number"
                            name="maximumSalary"
                            value={formData.maximumSalary}
                            onChange={handleInputChange}
                            placeholder="Maximum"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                          {formErrors.maximumSalary && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.maximumSalary}</p>
                          )}
                        </div>
                        <div className="col-span-2">
                          <label className='font-semibold'>Total Employee<span className='text-red-500'>*</span></label>
                          <input
                            type="number"
                            name="totalEmployee"
                            value={formData.totalEmployee}
                            onChange={handleInputChange}
                            placeholder="ex. 100"
                            className="w-full border rounded-md py-2 px-3 mt-1"
                          />
                        </div>
                        <div className="col-span-2 flex flex-col">
                          <label className='font-semibold'>Apply Type</label>
                          <div className='flex align-center'>
                            <input className='mt-1' type="radio" id="quickApply" name="applyType" value="Quick Apply" checked={formData.applyType === 'Quick Apply'}
                              onChange={handleInputChange} />
                            <label className='ms-1 mt-1' for="male">Quick Apply</label>
                            <input className='ms-4 mt-1' type="radio" id="externalApply" name="applyType" value="External Apply" checked={formData.applyType === 'External Apply'}
                              onChange={handleInputChange} />
                            <label className='ms-1 mt-1' for="female">External Apply</label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-24 flex justify-end">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
