import { useAuth } from "@/contexts/authContext";
import { Dialog } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

function EventModel({ open, setOpen }) {
  const { user ,token } = useAuth(); // Assuming `useAuth` provides a `user` object with an organization ID
  const organizationId = user.id; // Replace with the actual field from your auth context

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleUploadEvent = async () => {
    if (!organizationId) {
      alert("Organization ID is required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("location", eventData.location);
    formData.append("date", eventData.date);
    formData.append("organization", organizationId); 
    if (eventData.logo) {
      formData.append("logo", eventData.logo);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_KEY}/event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Event uploaded:", response.data);
      setOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error uploading event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      {/* Modal content */}
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <form>
          <div className="space-y-4">
            <div className="border-b border-gray-900/10 pb-4">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Create Event
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="eventTitle"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Event Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="eventTitle"
                      name="title"
                      type="text"
                      placeholder="Event title"
                      value={eventData.title}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="Description"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="Description"
                      name="description"
                      rows={3}
                      value={eventData.description}
                      onChange={handleChange}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      id="photo"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-900"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="location"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={eventData.location}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={eventData.date}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          onClick={handleUploadEvent}
          disabled={loading}
          className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm sm:ml-3 sm:w-auto ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-500"
          }`}
        >
          {loading ? "Uploading..." : "Create Event"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
}

export default EventModel;
