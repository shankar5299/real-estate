import { Card } from "@/components/card";
import { CardCompact } from "@/components/Cardcompact";
import { LoadingPage } from "@/components/loading";
import { useAddFavoritePropertyMutation, useGetAuthUserQuery, useGetPropertiesQuery, useGetTenantQuery, useRemoveFavoritePropertyMutation } from "@/state/api"
import { useAppSelector } from "@/state/redux";
import { Property } from "@/types/prismaTypes";

export const Listings = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const { data: tenant } = useGetTenantQuery(
        authUser?.cognitoInfo?.userId || "",
        {
            skip: !authUser?.cognitoInfo?.userId
        }
    )
    const [addFavorite] = useAddFavoritePropertyMutation();
    const [removeFavorite] = useRemoveFavoritePropertyMutation();
    const viewMode = useAppSelector((state) => state.global.viewMode);
    const filters = useAppSelector((state) => state.global.filters);

    const { data: properties, isLoading, isError } = useGetPropertiesQuery(filters);

    const handleFavoriteToogle = async (propertyId: number) => {
        if (!authUser) return;
        const isFavorite = tenant?.favorites?.some(
            (fav: Property) => fav.id === propertyId
        );
        if (isFavorite) {
            await removeFavorite({
                cognitoId: authUser.cognitoInfo.userId,
                propertyId
            })
        } else {
            await addFavorite({
                cognitoId: authUser.cognitoInfo.userId,
                propertyId
            })
        }
    };
    if (isLoading) return <><LoadingPage /></>;
    if (isError || !properties) return <div>Failed to fetch properties</div>
    return (
        <div className="w-full">
            <h3 className="text-sm px-4 font-bold">
                {properties.length}{" "}
                <span>
                    Places is {filters.location}
                </span>
            </h3>
            <div className="flex">
                <div className="p-4 w-full">
                    {properties?.map((property) =>
                        viewMode === "grid" ? <Card key={property.id} property={property}
                            isFavorite={
                                tenant?.favorites?.some(
                                    (fav: Property) => fav.id === property.id
                                ) || false
                            }
                            onFavoriteToggle={() => handleFavoriteToogle(property.id)}
                            showFavoriteButton={!!authUser}
                            propertyLink={`/search/${property.id}`}
                        />
                            : <CardCompact key={property.id} property={property}
                                isFavorite={
                                    tenant?.favorites?.some(
                                        (fav: Property) => fav.id === property.id
                                    ) || false
                                }
                                onFavoriteToggle={() => handleFavoriteToogle(property.id)}
                                showFavoriteButton={!!authUser}
                                propertyLink={`/search/${property.id}`}
                            />
                    )}
                </div>
            </div>
        </div>
    )
}