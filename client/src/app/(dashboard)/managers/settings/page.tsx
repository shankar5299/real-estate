"use client";
import { SettingForm } from '@/components/settingsform';
import { useGetAuthUserQuery, useUpdateManagerSettingsMutation } from '@/state/api'
import React from 'react'

const ManagerSetting = () => {
  const { data: AuthUser, isLoading } = useGetAuthUserQuery();
  console.log("Auth", AuthUser)
  const [updatedTenant] = useUpdateManagerSettingsMutation();
  if (isLoading) return <>Loading...</>

  const initialData = {
    name: AuthUser?.userInfo.name,
    email: AuthUser?.userInfo.email,
    phoneNumber: AuthUser?.userInfo.phoneNumber
  };

  const handleSubmit = async (data: typeof initialData) => {
    await updatedTenant({
      cognitoId: AuthUser?.cognitoInfo?.userId,
      ...data,
    })
  }
  return (
    <SettingForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType='manager'
    />
  )
}

export default ManagerSetting