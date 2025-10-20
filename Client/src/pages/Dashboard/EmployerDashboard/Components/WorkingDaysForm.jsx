import React, { useState } from "react";
import { TextField } from "@mui/material";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const WorkingDaysForm = ({ formData, setFormData, inputStyles }) => {
  const [days, setDays] = useState(formData.workingDays || []);

  const handleChange = (index, field, value) => {
    const updatedDays = [...days];
    if (field === "breakStart") {
      updatedDays[index].break.start = value;
    } else if (field === "breakDuration") {
      updatedDays[index].break.duration = Number(value);
    } else {
      updatedDays[index][field] = value;
    }
    setDays(updatedDays);
    setFormData((prev) => ({ ...prev, workingDays: updatedDays }));
  };

  const addDay = () => {
    const newDay = {
      date: null,
      startTime: null,
      endTime: null,
      break: { start: null, duration: null },
    };
    const updatedDays = [...days, newDay];
    setDays(updatedDays);
    setFormData((prev) => ({ ...prev, workingDays: updatedDays }));
  };

  const removeDay = (index) => {
    const updatedDays = days.filter((_, i) => i !== index);
    setDays(updatedDays);
    setFormData((prev) => ({ ...prev, workingDays: updatedDays }));
  };

  return (
    <div className="w-full mt-6">
      <h2 className="text-lg font-semibold text-[#013573] mb-4">
        Working Days
      </h2>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {days.map((day, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4"
          >
            {/* Date */}
            <DatePicker
              label="Date"
              value={day.date || null}
              onChange={(newValue) => handleChange(index, "date", newValue)}
              slotProps={{
                textField: {
                  sx: inputStyles,
                },
              }}
            />

            {/* Start Time */}
            <TimePicker
              label="Start Time"
              value={day.startTime || null}
              onChange={(newValue) =>
                handleChange(index, "startTime", newValue)
              }
              ampm={false}
              slotProps={{
                textField: {
                  sx: inputStyles,
                },
              }}
            />

            {/* End Time */}
            <TimePicker
              label="End Time"
              value={day.endTime || null}
              onChange={(newValue) => handleChange(index, "endTime", newValue)}
              ampm={false}
              slotProps={{
                textField: {
                  sx: inputStyles,
                },
              }}
            />

            {/* Break Start */}
            <TimePicker
              label="Break Start"
              value={day.break.start || null}
              onChange={(newValue) =>
                handleChange(index, "breakStart", newValue)
              }
              ampm={false}
              slotProps={{
                textField: {
                  sx: inputStyles,
                },
              }}
            />

            {/* Break Duration */}
            <TextField
              label="Break Duration (min)"
              type="number"
              value={day.break.duration || ""}
              onChange={(e) =>
                handleChange(index, "breakDuration", e.target.value)
              }
              sx={inputStyles}
            />

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeDay(index)}
              className="text-red-600 flex items-center justify-center mt-6"
            >
              <AiOutlineMinusCircle size={22} />
            </button>
          </div>
        ))}
      </LocalizationProvider>

      {/* Add Day Button */}
      <button
        type="button"
        onClick={addDay}
        className="mt-2 px-4 py-2 flex items-center gap-2 bg-primary text-white rounded-md font-semibold bg-primary-hover cursor-pointer transition"
      >
        <AiOutlinePlusCircle size={20} /> Add Working Day
      </button>
    </div>
  );
};

export default WorkingDaysForm;
