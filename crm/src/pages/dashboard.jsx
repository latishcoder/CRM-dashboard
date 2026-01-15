import { useEffect, useState } from "react";
import Header from "../dashboard/Header";
import AnalyticsCards from "../dashboard/AnalyticsCards";
import SearchFilters from "../dashboard/SearchFilters";
import LeadsTable from "../dashboard/LeadsTable";
import LeadDetailsModal from "../dashboard/LeadDetailsModal";
import Pagination from "../ui/Pagination";
import { fetchLeads } from "../services/leadService";
import { getStageColor } from "../utils/helpers";

const Dashboard = ({ user, onLogout }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  // 🔍 Search & Filters
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ stage: "", source: "" });
  const [showFilters, setShowFilters] = useState(false);

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // ⏳ Loading (optional but recommended)
  const [loading, setLoading] = useState(false);

  // 🔁 Fetch data from backend
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true);

        const data = await fetchLeads({
          page,
          limit,
          search,
          stage: filters.stage,
          source: filters.source,
        });

        setLeads(data.leads);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [page, search, filters]);

  // 🔄 Reset page when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <AnalyticsCards leads={leads} />

        <SearchFilters
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />

        <LeadsTable
          leads={leads}
          onView={setSelectedLead}
          getStageColor={getStageColor}
          loading={loading}
        />

        {/* 📄 Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          allLeads={leads}
          onClose={() => setSelectedLead(null)}
          getStageColor={getStageColor}
        />
      )}
    </div>
  );
};

export default Dashboard;
