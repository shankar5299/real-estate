"use client";
import { Card } from "@/components/card";
import { Header } from "@/components/header";
import { LoadingPage } from "@/components/loading";
import { useGetAuthUserQuery, useGetManagerPropertiesQuery} from "@/state/api"

const Properties = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: ManagerProperties, isLoading, isError } = useGetManagerPropertiesQuery(
    authUser?.cognitoInfo?.userId || "",
    { skip: !authUser?.cognitoInfo?.userId }
  );
  if (isLoading) return <LoadingPage />
  if (isError) return <div>Error loading manager properties</div>
  return (
    <div className="dashboard-container">
      <Header
        title="My Properties"
        subtitle="View and manage your property listings"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ManagerProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={false}
            onFavoriteToggle={() => { }}
            showFavoriteButton={false}
            propertyLink={`/managers/properties/${property.id}`}
          />
        ))}
      </div>
      {(!ManagerProperties || ManagerProperties.length === 0) && (
        <p>You  don&lsquo;t manager any properties</p>
      )}
    </div>
  )
}
export default Properties