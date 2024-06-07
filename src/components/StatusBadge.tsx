import React, { FC } from "react";

export enum Colors {
  PENDING = 'bg-gray-50 text-gray-600 ring-gray-500/10',
  AGREE = 'bg-green-50 text-green-700 ring-green-600/20',
  DISPUTE = 'bg-red-50 text-red-700 ring-red-600/10',
}

interface IStatusBadge {
  status: string;
  color?: string;
};

const StatusBadge:FC<IStatusBadge> = ({
  status,
  color = 'gray',
}: IStatusBadge) => {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${color}`}
    >
      {status}
    </span>
  )
};

export default StatusBadge;
export { StatusBadge };
