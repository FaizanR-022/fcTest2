import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import AlumniCard from "@/components/alumni/AlumniCard";
import { AlumniSearchFilters } from "@/components/alumni/AlumniSearchFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { alumniService } from "@/services/alumniService";
import { CAMPUSES, DEPARTMENTS, YEARS } from "@/constants/authConstants";
import { ROUTES } from "@/constants/constants";

export default function AlumniList() {
  const navigate = useNavigate();

  // Data states
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 12,
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAttribute, setSearchAttribute] = useState("name");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  // Fetch alumni function
  const fetchAlumni = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const queryParams = {
        page,
        limit: pagination.limit,
        searchAttribute,
        searchQuery: searchQuery.trim() || undefined,
        department: departmentFilter !== "all" ? departmentFilter : undefined,
        campus: campusFilter !== "all" ? campusFilter : undefined,
        graduationYear: yearFilter !== "all" ? yearFilter : undefined,
        sortBy: "graduationYear",
        sortOrder: "desc",
      };

      // Remove undefined values
      Object.keys(queryParams).forEach(
        (key) => queryParams[key] === undefined && delete queryParams[key]
      );

      const data = await alumniService.getAllAlumni(queryParams);

      setAlumni(data.alumni);
      setPagination({
        page: data.pagination.page,
        totalPages: data.pagination.totalPages,
        total: data.pagination.total,
        limit: data.pagination.limit,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch alumni data");
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchAlumni();
  }, []);

  // Handle search button click
  const handleSearch = () => {
    fetchAlumni(1); // Reset to page 1 when searching
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    fetchAlumni(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate to alumni detail page
  const handleAlumniClick = (alumni) => {
    navigate(`/user/${alumni.id}`);
  };

  // Transform backend alumni data to match AlumniCard expected format
  const transformAlumniForCard = (alumniData) => {
    return alumniData.map((alum) => ({
      id: alum.publicId,
      name: alum.name,
      email: "",
      phone: null,
      graduationYear: alum.graduationYear.toString(),
      department: alum.department,
      campus: alum.campus,
      currentPosition: alum.currentPosition,
      company: alum.currentCompany,
      location: `${alum.currentCity}, ${alum.currentCountry}`,
      expertise: alum.skills || [],
      previousCompanies: alum.previousCompanies.map((exp) => ({
        companyName: exp.company,
        role: exp.position,
        duration: {
          from: exp.from,
          to: exp.to,
        },
      })),
      avatar: alum.firstName?.[0] + alum.lastName?.[0] || "AL",
      profilePicture: alum.profilePicture,
    }));
  };

  const transformedAlumni = transformAlumniForCard(alumni);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-medium mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground text-lg">
            Connect with FAST-NUCES alumni from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <AlumniSearchFilters
          searchQuery={searchQuery}
          searchAttribute={searchAttribute}
          departmentFilter={departmentFilter}
          campusFilter={campusFilter}
          yearFilter={yearFilter}
          departments={DEPARTMENTS}
          campuses={CAMPUSES}
          years={YEARS}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          onSearchAttributeChange={(e) => setSearchAttribute(e.target.value)}
          onDepartmentChange={(e) => setDepartmentFilter(e.target.value)}
          onCampusChange={(e) => setCampusFilter(e.target.value)}
          onYearChange={(e) => setYearFilter(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-6 text-sm text-destructive bg-destructive/10 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Results Counter */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{pagination.total}</span>{" "}
                alumni found
              </p>
            </div>

            {/* Alumni Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedAlumni.map((alumniItem) => (
                <AlumniCard
                  key={alumniItem.id}
                  alumni={alumniItem}
                  onClick={handleAlumniClick}
                />
              ))}
            </div>

            {/* Empty State */}
            {transformedAlumni.length === 0 && !loading && (
              <div className="text-center py-16">
                <h3 className="text-lg font-semibold mb-2">No alumni found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                        className={pagination.page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        // Show first, last, current, and adjacent pages
                        return page === 1 || 
                               page === pagination.totalPages || 
                               Math.abs(page - pagination.page) <= 1;
                      })
                      .map((page, index, array) => {
                        // Add ellipsis if there's a gap
                        const showEllipsis = index > 0 && page - array[index - 1] > 1;
                        return (
                          <span key={page} className="flex items-center">
                            {showEllipsis && (
                              <PaginationItem>
                                <span className="px-2">...</span>
                              </PaginationItem>
                            )}
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={page === pagination.page}
                                className="cursor-pointer"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          </span>
                        );
                      })}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.page + 1))}
                        className={pagination.page === pagination.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
