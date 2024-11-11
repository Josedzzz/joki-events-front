import { EventReport } from "../services/reportService";

// Interface for the props of the component
interface AdminReportCardProps {
  report: EventReport;
}

export default function AdminReportCard({ report }: AdminReportCardProps) {
  return (
    <div className="bg-custom-dark rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-blue-400 hover:scale-105 transition duration-300 ease-in-out bounce-in">
      <div className="p-4">
        <h3 className="text-lg font-bold text-custom-white mb-2">
          {report.eventName}
        </h3>
        <p className="text-custom-white">City: {report.eventCity}</p>
        <p className="text-custom-white">
          Total Revenue: ${report.totalRevenue.toFixed(2)}
        </p>

        <div className="mt-3">
          <h4 className="text-custom-white font-semibold mb-2">Localities:</h4>
          {report.localityStats.map((locality, index) => (
            <div
              key={index}
              className="bg-custom-black p-3 rounded-lg mb-2 border border-blue-400 shadow-inner"
            >
              <p className="text-custom-white font-semibold">
                {locality.localityName}
              </p>
              <p className="text-custom-white text-sm">
                Tickets Sold: {locality.ticketsSold}/{locality.totalTickets}
              </p>
              <p className="text-custom-white text-sm">
                Sold Percentage: {locality.soldPercentage.toFixed(2)}%
              </p>
              <p className="text-custom-white text-sm">
                Revenue: ${locality.localityRevenue.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
