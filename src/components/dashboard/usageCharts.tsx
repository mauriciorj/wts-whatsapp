"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import getWhatsappTracking from "@/actions/getWhatsappTracking/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getGroupedCounts from "@/lib/formatReport";
import { useQuery } from "@tanstack/react-query";
import LineChart from "./lineChart";
import TableDeviceSystem from "./tableDeviceSystem";
import TableDeviceType from "./tableDeviceType";
import TableRegion from "./tableRegion";

export function UsageCharts({ userId }: { userId: string }) {
  const [reportPeriod, setReportPeriod] = useState<number>(7);
  const [reportPerDayData, setReportPerDayData] = useState<any>(null);
  const [reportPerDeviceSizeData, setReportPerDeviceSizeData] =
    useState<any>(null);
  const [reportPerDeviceSystemData, setReportPerDeviceSystemData] =
    useState<any>(null);
  const [reportPerCountryAndCityData, setreportPerCountryAndCityData] =
    useState<any>(null);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["whatsappTracking", reportPeriod],
    queryFn: async () => getWhatsappTracking({ userId, period: reportPeriod }),
  });

  useEffect(() => {
    if (data) {
      const {
        reportPerDay,
        reportPerDeviceSize,
        reportPerDeviceSystem,
        reportPerCountryAndCity,
      } = getGroupedCounts(data);
      if (reportPerDay) {
        setReportPerDayData(reportPerDay);
      }
      if (reportPerDeviceSize) {
        setReportPerDeviceSizeData(reportPerDeviceSize);
      }
      if (reportPerDeviceSystem) {
        setReportPerDeviceSystemData(reportPerDeviceSystem);
      }
      if (reportPerCountryAndCity) {
        setreportPerCountryAndCityData(reportPerCountryAndCity);
      }
    }
  }, [data]);

  return (
    <div className="w-full bg-card py-6 rounded-lg mt-10">
      <div className="w-full flex justify-end mt-6">
        <div className="w-full md:w-fit flex flex-row mb-5 items-center justify-end">
          <div
            onClick={() => refetch()}
            className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm mr-2 hover:bg-accent cursor-pointer"
          >
            <RefreshCcw
              className={`${isFetching ? "animate-spin" : null} h-5 w-5`}
            />
          </div>
          <Select
            onValueChange={(e) => setReportPeriod(parseInt(e))}
            defaultValue={reportPeriod.toString()}
          >
            <SelectTrigger>
              <SelectValue placeholder="7 dias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Periodo: 7 dias</SelectItem>
              <SelectItem value="14">Periodo: 14 dias</SelectItem>
              <SelectItem value="30">Periodo: 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <LineChart data={reportPerDayData} isLoading={isFetching} />
      <TableRegion data={reportPerCountryAndCityData} isLoading={isFetching} />
      <TableDeviceType data={reportPerDeviceSizeData} isLoading={isFetching} />
      <TableDeviceSystem
        data={reportPerDeviceSystemData}
        isLoading={isFetching}
      />
    </div>
  );
}
