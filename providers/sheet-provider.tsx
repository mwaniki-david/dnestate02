"use client";

import { EditTenantSheet } from "@/features/accounts/components/edit-tenant-sheet ";
import {  NewTenantSheet } from "@/features/accounts/components/new-tenant-sheet";
import { EditinvoiceSheet } from "@/features/billing/components/edit-invoice-sheet ";
import { NewInvoiceSheet } from "@/features/billing/components/new-invoice-sheet";
import { EditBuildingSheet } from "@/features/building/components/edit-building-sheet ";
import { NewBuildingSheet } from "@/features/building/components/new-building-sheet";
import { EditbuildingOwnerSheet } from "@/features/buildingOwner/components/edit-buildingOwner-sheet ";
import { NewBuildingOwnerSheet } from "@/features/buildingOwner/components/new-buildingOwner-sheet";
import { EditHouseSheet } from "@/features/houses/components/edit-house-sheet ";
import { NewHouseSheet } from "@/features/houses/components/new-house-sheet";
import { EditUnitSheet } from "@/features/units/components/edit-unit-sheet ";
import { NewunitSheet } from "@/features/units/components/new-unit-sheet";
import { useEffect, useState } from "react";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
    const isMounted =useMountedState();

    if(!isMounted) return null;
    return (
        <>
        <NewBuildingOwnerSheet/>
        <EditbuildingOwnerSheet/>
        <NewHouseSheet/>
        <EditHouseSheet/>
        <NewunitSheet/>
        <EditUnitSheet/>
        <EditbuildingOwnerSheet/>
        <NewTenantSheet/>
        <EditTenantSheet/>
        <NewBuildingSheet/>
        <EditBuildingSheet/>
        <NewInvoiceSheet/>
        <EditinvoiceSheet/>
        </>
    )
}