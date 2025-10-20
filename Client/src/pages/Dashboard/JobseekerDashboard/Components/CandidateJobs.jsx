import React, { useState, useEffect } from "react";
import { GetJobs } from "../../../../lib/APIs/jobApis";
import { formattedTime } from "../../../../utils/DateTimeFormat";

const CandidateJobs = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      setFetchLoading(true);
      const response = await GetJobs();
      setJobs(response);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      {fetchLoading ? (
        <div>Loading...</div>
      ) : jobs.length <= 0 ? (
        <div>No Jobs Found</div>
      ) : (
        <div className="w-full min-h-screen bg-white flex pt-10">
          {/* Jobs List */}

          <div className="w-full mx-8">
            {jobs.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 border-b border-gray-300 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item?.companyImage}
                    alt="logo"
                    className="w-16 h-16 object-cover rounded-md"
                    draggable="false"
                  />
                  <div className="text-sm">
                    <p className="font-semibold">{item?.jobTitle}</p>
                    <p>{item?.companyName}</p>
                    <p className="text-gray-500">{item?.location?.workplace}</p>
                  </div>
                </div>
                <div className="text-sm text-right">
                  <p>{item?.hourlyRate} €/val</p>
                  <p>Apie: {item?.hourlyRate * item?.daysOfWork} €</p>
                  <p>
                    {formattedTime(item?.time?.from)} -{" "}
                    {formattedTime(item?.time?.to)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CandidateJobs;
