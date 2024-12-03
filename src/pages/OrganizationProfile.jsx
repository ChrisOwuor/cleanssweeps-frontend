import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Typography } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import EventGallery from "@/widgets/layout/EventGallery";
import { useAuth } from "@/contexts/authContext";

export function OrganizationProfile() {
  const { user, loading: authLoading, token } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || authLoading) return;

    const fetchOrganization = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_KEY}/auth/organizations/${
            user.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrganization(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch organization details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [user, authLoading]);

  if (loading || authLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center " />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="relative flex gap-6 items-start">
                <div className="-mt-20 w-40">
                  <Avatar
                    src={organization.avatar || "/img/team-5.png"}
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <Typography variant="h4" color="blue-gray">
                    {organization.name}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="gray"
                    className="!mt-0 font-normal"
                  >
                    {organization.email}
                  </Typography>
                </div>
              </div>
              <div className="mt-10 mb-10 flex lg:flex-col justify-between items-center lg:justify-end lg:mb-0 lg:px-4 flex-wrap lg:-mt-5">
                <div className="flex justify-start py-4 pt-8 lg:pt-4">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      {organization.events?.length || 0}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Events
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {organization.location || "No location provided"}
                </Typography>
              </div>
            </div>
            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  {organization.description ||
                    "This organization has not provided a description."}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white ">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          {/* <div className="container mx-auto">
            <div className="">
              <Typography variant="h4" color="blue-gray">
                Past Events
              </Typography>{" "}
            </div>
            <EventGallery events={organization.events || []} />
          </div> */}
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default OrganizationProfile;
