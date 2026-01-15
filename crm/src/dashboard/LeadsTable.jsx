import { Eye } from "lucide-react";

const LeadsTable = ({ leads, onView, getStageColor }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {lead.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {lead.email}
                  </div>
                </td>

                <td className="px-6 py-4 hidden md:table-cell">
                  {lead.company}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(
                      lead.stage
                    )}`}
                  >
                    {lead.stage}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm hidden sm:table-cell">
                  {lead.source}
                </td>

                <td className="px-6 py-4 hidden lg:table-cell">
                  ${lead.value.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => onView(lead)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}

            {leads.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
