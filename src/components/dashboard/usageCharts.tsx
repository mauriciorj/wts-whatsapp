"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Globe, MonitorSmartphone, MonitorCog, RefreshCcw } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import { MousePointerClick } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import getWhatsappTracking from "@/actions/getWhatsappTracking/actions";
import { useEffect, useState } from "react";
import getGroupedCounts from "@/lib/formatReport";

export function UsageCharts({ userId }: { userId: string }) {
  const [reportPeriod, setReportPeriod] = useState(7);
  const [reportPerDayData, setReportPerDayData] = useState<any>(null);
  // const [reportPerDeviceSizeData, setReportPerDeviceSizeData] =
  //   useState<any>(null);
  // const [reportPerDeviceSystemData, setReportPerDeviceSystemData] =
  //   useState<any>(null);
  // const [reportPerCountryAndCityData, setreportPerCountryAndCityData] =
  //   useState<any>(null);

  const period = 7;

  const { data } = useQuery({
    queryKey: ["whatsappTracking"],
    queryFn: async () => getWhatsappTracking({ userId, period }),
  });

  useEffect(() => {
    if (data) {
      const {
        reportPerDay,
        // reportPerDeviceSize,
        // reportPerDeviceSystem,
        // reportPerCountryAndCity,
      } = getGroupedCounts(data);
      if (reportPerDay) {
        setReportPerDayData(reportPerDay);
      }
      // if (reportPerDeviceSize) {
      //   setReportPerDeviceSizeData(reportPerDeviceSize);
      // }
      // if (reportPerDeviceSystem) {
      //   setReportPerDeviceSystemData(reportPerDeviceSystem);
      // }
      // if (reportPerCountryAndCity) {
      //   setreportPerCountryAndCityData(reportPerCountryAndCity);
      // }
    }
  }, [data]);
  console.log("reportPerDayData", reportPerDayData);
  return (
    <>
      <div className="w-full h-[300px] bg-card py-6 rounded-lg">
        <div className="w-full flex justify-end mt-6">
          <div className="w-full md:w-fit flex flex-row mb-5 items-center justify-end">
            <div className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm mr-2 hover:bg-accent cursor-pointer">
              <RefreshCcw className="h-5 w-5" />
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

        <div className="w-full flex flex-row justify-between mb-5">
          <div className="flex flex-row items-center mb-4">
            <MousePointerClick className="mr-2 h-8 w-8" />
            <h3 className="text-2xl font-semibold">Cliques por dia</h3>
          </div>
        </div>
        <div className="w-full h-full">
          {reportPerDayData?.length ? (
            <ResponsiveContainer>
              <LineChart data={reportPerDayData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{ color: "black" }}
                  labelStyle={{ color: "black" }}
                  itemStyle={{ color: "black" }}
                />
                <Legend verticalAlign="top" />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full flex flex-col items-center justify-center h-[100px]">
              <div className="border rounded-md py-5 px-7">
                Sem dados para serem mostrados no momento.
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="w-full bg-card p-6 rounded-lg">
        <div className="flex flex-row items-center mb-4">
          <Globe className="mr-2 h-8 w-8" />
          <h3 className="text-2xl font-semibold">Cliques por Região</h3>
        </div>
        {reportPerCountryAndCityData?.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cidade</TableHead>
                  <TableHead>País</TableHead>
                  <TableHead>Cliques</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportPerCountryAndCityData.map((activity: any) => (
                  <TableRow key={`${activity.country}-${activity.city}`}>
                    <TableCell>{activity.city}</TableCell>
                    <TableCell>{activity.country}</TableCell>
                    <TableCell>{activity.clicks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7">
              Sem dados para serem mostrados no momento.
            </div>
          </div>
        )}
      </div> */}
      {/* <div className="w-full bg-card p-6 rounded-lg">
        <div className="flex flex-row items-center mb-4">
          <MonitorSmartphone className="mr-2 h-8 w-8" />
          <h3 className="text-2xl font-semibold">
            Cliques por Tipo de Aparelho
          </h3>
        </div>
        {reportPerDeviceSizeData?.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Devices</TableHead>
                  <TableHead>Cliques</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportPerDeviceSizeData.map((activity: any) => (
                  <TableRow key={activity.device}>
                    <TableCell>{activity.device}</TableCell>
                    <TableCell>{activity.clicks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7">
              Sem dados para serem mostrados no momento.
            </div>
          </div>
        )}
      </div> */}
      {/* <div className="w-full bg-card p-6 rounded-lg">
        <div className="flex flex-row items-center mb-4">
          <MonitorCog className="mr-2 h-8 w-8" />
          <h3 className="text-2xl font-semibold">
            Cliques por Tipo de Sistema
          </h3>
        </div>
        {reportPerDeviceSystemData?.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sistema</TableHead>
                  <TableHead>Cliques</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportPerDeviceSystemData.map((activity: any) => (
                  <TableRow key={activity.device}>
                    <TableCell>{activity.device}</TableCell>
                    <TableCell>{activity.clicks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center h-[100px]">
            <div className="border rounded-md py-5 px-7">
              Sem dados para serem mostrados no momento.
            </div>
          </div>
        )}
      </div> */}
    </>
  );
}
