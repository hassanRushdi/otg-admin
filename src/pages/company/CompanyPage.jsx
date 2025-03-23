import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getCompanies } from "src/api/company/companyAPI";
import { Columns } from "./Columns";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      console.log("Fetched Companies:", data);
  
      if (data) {
        setCompanies(
          data.map((company) => ({
            key: company.id, 
            company_id: company.id, 
            company_name: company.name, 
            company_sector: company.sector || "N/A", 
            company_status: company.status ? "Verified" : "Unverified",   
          }))
        );
      } else {
        message.error("Failed to load companies.");
        setCompanies([]);
      }
    } catch (error) {
      message.error("Error fetching companies.");
      setCompanies([]);
    }
    setLoading(false);
  };

  return (
    <Table
      columns={Columns()}
      dataSource={companies}
      rowKey="company_id"
      pagination={5}
      loading={loading}
    />
  );
};

export default CompanyPage;
