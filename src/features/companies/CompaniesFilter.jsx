import React from 'react';

function CompaniesFilter({ filters, onFilterChange, locations, industries, sortKey, onSortChange }) {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        value={filters.name}
        onChange={onFilterChange}
      />

      <select name="location" value={filters.location} onChange={onFilterChange}>
        <option value="">All Locations</option>
        {locations.map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>

      <select name="industry" value={filters.industry} onChange={onFilterChange}>
        <option value="">All Industries</option>
        {industries.map(ind => (
          <option key={ind} value={ind}>{ind}</option>
        ))}
      </select>

      {/* Sorting Dropdown */}
      <select value={sortKey} onChange={onSortChange}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="location">Location</option>
        <option value="industry">Industry</option>
      </select>
    </div>
  );
}

export default CompaniesFilter;
