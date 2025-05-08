"use client";
import { SettingForm } from '@/components/settingsform';
import { useGetAuthUserQuery, useUpdateTenantSettingsMutation } from '@/state/api'
import React from 'react'

const TenantSetting = () => {
  const { data: AuthUser, isLoading } = useGetAuthUserQuery();
  console.log("Auth", AuthUser)
  const [updatedTenant] = useUpdateTenantSettingsMutation();
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
      userType='tenant'
    />
  )
}

export default TenantSetting