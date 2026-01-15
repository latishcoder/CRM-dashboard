import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  X,
} from "lucide-react";
import LeadStageChart from "./LeadStageChart";

const LeadDetailsModal = ({ lead, allLeads, onClose, getStageColor }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Lead Details
            </h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT: Lead Info */}
            <div className="space-y-4">
              <DetailItem icon={<User />} label="Name" value={lead.name} />
              <DetailItem icon={<Mail />} label="Email" value={lead.email} />
              <DetailItem icon={<Phone />} label="Phone" value={lead.phone} />
              <DetailItem
                icon={<Building />}
                label="Company"
                value={lead.company}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Stage</p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStageColor(
                      lead.stage
                    )}`}
                  >
                    {lead.stage}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Source</p>
                  <p className="font-semibold mt-2">{lead.source}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Deal Value</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  ${lead.value.toLocaleString()}
                </p>
              </div>

              <DetailItem
                icon={<Calendar />}
                label="Created"
                value={new Date(lead.createdAt).toLocaleDateString()}
              />

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Notes</p>
                <p>{lead.notes}</p>
              </div>
            </div>

            {/* RIGHT: Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <LeadStageChart leads={allLeads} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
    <span className="text-gray-600">{icon}</span>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

export default LeadDetailsModal;
