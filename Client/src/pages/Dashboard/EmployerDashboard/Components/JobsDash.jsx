import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { MyPostedJobs } from "../../../../lib/APIs/jobApis";
import { formattedTime } from "../../../../utils/DateTimeFormat";

const JobsDash = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPostedJobs = async () => {
    try {
      setLoading(true);
      const response = await MyPostedJobs();
      setPostedJobs(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const filteredJobs = postedJobs.filter((item) =>
    item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex gap-4 justify-end w-full p-4">
        <input
          type="text"
          placeholder="Search Jobs"
          className="border py-1 px-2 text-sm rounded-md w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link
          to="/employer/post-job"
          className="w-fit py-1 px-4 text-center rounded-md font-semibold text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
        >
          Post Job
        </Link>
      </div>
      <div>
        {/* Jobs */}
        {loading ? (
          <div>Loading...</div>
        ) : postedJobs && postedJobs.length > 0 ? (
          <div className="m-4 p-2 rounded-xl bg-white">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((item, index) => (
                <div
                  key={index}
                  className="mt-2 border-b border-gray-200 flex p-4 px-8 items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div>
                      <img
                        src={item?.companyImage}
                        alt="logo"
                        className="w-24 h-24 object-cover"
                        draggable="false"
                      />
                    </div>
                    <div>
                      <h1 className="font-semibold text-lg">{item.jobTitle}</h1>
                      <p className="text-sm text-gray-600">
                        {item.companyName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.location?.workplace} • {item.location?.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p>{item?.hourlyRate} €/val</p>
                    <p>Apie: {item?.hourlyRate * item?.daysOfWork} €</p>
                    <p>
                      {formattedTime(item?.time?.from)} -{" "}
                      {formattedTime(item?.time?.to)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No jobs match your search
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6">
            No jobs found at the moment
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsDash;
