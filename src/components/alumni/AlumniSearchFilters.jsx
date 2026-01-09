import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AlumniSearchFilters = ({
  searchQuery,
  searchAttribute,
  departmentFilter,
  campusFilter,
  yearFilter,
  departments,
  campuses,
  years,
  onSearchChange,
  onSearchAttributeChange,
  onDepartmentChange,
  onCampusChange,
  onYearChange,
  onSearch,
  loading,
}) => {
  const searchAttributes = [
    { value: "name", label: "Name" },
    { value: "company", label: "Company" },
    { value: "position", label: "Position" },
    { value: "city", label: "City" },
    { value: "country", label: "Country" },
    { value: "expertise", label: "Expertise" },
  ];

  // Handle Enter key press in search field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-card border rounded-xl p-4 md:p-6 mb-6">
      <div className="flex flex-col gap-4">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Field */}
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <Input
                placeholder={`Search by ${searchAttribute}...`}
                value={searchQuery}
                onChange={onSearchChange}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Select value={searchAttribute} onValueChange={(val) => onSearchAttributeChange({ target: { value: val } })}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchAttributes.map((attr) => (
                  <SelectItem key={attr.value} value={attr.value}>
                    {attr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Department Filter */}
          <div className="flex-1">
            <Select value={departmentFilter} onValueChange={(val) => onDepartmentChange({ target: { value: val } })}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campus Filter */}
          <div className="flex-1">
            <Select value={campusFilter} onValueChange={(val) => onCampusChange({ target: { value: val } })}>
              <SelectTrigger>
                <SelectValue placeholder="All Campuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campuses</SelectItem>
                {campuses.map((campus) => (
                  <SelectItem key={campus} value={campus}>
                    {campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="flex-1">
            <Select value={yearFilter} onValueChange={(val) => onYearChange({ target: { value: val } })}>
              <SelectTrigger>
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button onClick={onSearch} disabled={loading} className="sm:w-auto">
            {loading ? "..." : "Search"}
          </Button>
        </div>
      </div>
    </div>
  );
};
