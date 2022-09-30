import { HiChevronRight } from "react-icons/hi";

export default function InfoRow({ children, icon }) {
  return (
    <div className="info-row mb-4 items-center w-full">
      <div className="bg-white icon-holder text-primary">
        {icon}
      </div>
      <div className="flex-1">
        {children}
      </div>
      <div>
        <HiChevronRight className="w-6 h-6 text-muted" />
      </div>
    </div>
  )
}