"use client";

import {
  Loader2,
  ChevronDown,
  ChevronUp,
  Server,
  Clock,
  Box,
  HardDrive,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { useGetPods } from "./api";
import { HeaderPods } from "./header";
import { formatDate } from "@/utils/formatDate";

export function Pods() {
  const { data, error, isLoading } = useGetPods();
  const [expandedPods, setExpandedPods] = useState<string[]>([]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
      </div>
    );
  }

  const toggleExpand = (podName: string) => {
    setExpandedPods((prev) =>
      prev.includes(podName)
        ? prev.filter((name) => name !== podName)
        : [...prev, podName]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Running":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Running
          </div>
        );
      case "Pending":
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
            Pending
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            {status}
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <HeaderPods text="Pods List" textClassName="font-semibold text-2xl" />

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          Failed to load pods: {error.message}
        </div>
      )}

      <section className="mt-6 flex flex-col gap-4 max-w-7xl">
        {data?.items.map((pod) => {
          const isExpanded = expandedPods.includes(pod.metadata.name);
          const status = pod.status?.phase || "Tidak Diketahui";

          return (
            <div
              key={pod.metadata.uid}
              className="border w-full rounded-lg shadow-sm hover:shadow-md transition-all bg-white overflow-hidden h-full flex flex-col"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleExpand(pod.metadata.name)}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800 truncate max-w-[180px]">
                      {pod.metadata.name}
                    </span>
                    {getStatusBadge(status)}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {pod.metadata?.namespace || "default"}
                  </span>
                </div>
                <div className="bg-gray-100 rounded-full p-1">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>

              <div
                className={`border-t bg-gray-50 overflow-hidden transition-all duration-300 ${
                  isExpanded ? "max-h-[250px] overflow-y-auto" : "max-h-0"
                }`}
              >
                <div className="p-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">Node: </span>
                    <span className="text-gray-600">
                      {pod.spec?.nodeName || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">Image: </span>
                    <span className="text-gray-600 text-xs break-all">
                      {pod.spec?.containers?.[0]?.image || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">Created: </span>
                    <span className="text-gray-600">
                      {formatDate(pod.status.startTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">
                      Restarts:{" "}
                    </span>
                    <span className="text-gray-600">
                      {pod.status?.containerStatuses?.[0]?.restartCount || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-700">IP: </span>
                    <span className="text-gray-600">
                      {pod.status?.podIP || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
