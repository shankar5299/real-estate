"use client";
import { ApplicationCard } from '@/components/applicationcard';
import { Header } from '@/components/header';
import { LoadingPage } from '@/components/loading';
import { useGetApplicationQuery, useGetAuthUserQuery } from '@/state/api'
import { CircleCheckBig, Clock, Download, XCircle } from 'lucide-react';
import React from 'react'

const ApplicationPage = () => {
  const { data: authUser } = useGetAuthUserQuery();

  const { data: application, isLoading, isError } = useGetApplicationQuery(
    {
      userId: authUser?.cognitoInfo?.userId,
      userType: "tenant"
    },
  );

  if (isLoading) return <LoadingPage />;
  if (isError || !application) return <div>Error fetching applications</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="Applications"
        subtitle="Track and manage your properties rental applications"
      />

      <div className='w-full'>
        {application?.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            userType="tenant"
          >
            <div className='flex justify-between gap-5 w-full pb-4 px-4'>
              {application.status === "Approved" ? (
                <div className="bg-green-100 p-4 text-green-700 grow flex items-center">
                  <CircleCheckBig className="w-5 h-5 mr-2" />
                  The property is being rented by you until{" "}
                  {new Date(application.lease?.endDate).toLocaleDateString()}
                </div>
              ) : application.status === "Pending" ? (
                <div className="bg-yellow-100 p-4 text-yellow-700 grow flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Your application is pending approval
                </div>
              ) : (
                <div className="bg-red-100 p-4 text-red-700 grow flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Your application has been denied
                </div>
              )}

              <button
                className={`bg-white border border-gray-300 text-gray-700 py-2 px-4
                          rounded-md flex items-center justify-center hover:bg-primary-700 hover:text-primary-50`}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Agreement
              </button>
            </div>
          </ApplicationCard>
        ))}
      </div>
    </div>
  )
}

export default ApplicationPage