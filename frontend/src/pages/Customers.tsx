
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";

import {
  AddRegular,
  ArrowClockwiseRegular,
} from "@fluentui/react-icons";

import type {
  Customer,
  CustomerFormData,
} from "../types";

import { useCustomers } from "../features/customers/useCustomers";

import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerFilters from "../components/customers/CustomerFilters";
import CustomerDetails from "../components/customers/CustomerDetails";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [viewCustomer, setViewCustomer] =
    useState<Customer | null>(null);

  const {
    customers,
    pagination,
    loading,
    error,
    addCustomer,
    editCustomer,
    removeCustomer,
    refreshCustomers,
  } = useCustomers({
    search: debouncedSearch,
    status,
    type,
    sortBy,
    order,
    page,
    limit,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, type, sortBy, order]);

  const handleSave = async (data: CustomerFormData) => {
    if (selectedCustomer) {
      await editCustomer(selectedCustomer.id, data);
    } else {
      await addCustomer(data);

      // Show newly added customer on first page
      setPage(1);
    }
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setFormOpen(true);
  };

  const handleDelete = async (customer: Customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${customer.name}?`
    );

    if (!confirmed) return;

    try {
      const result = await removeCustomer(customer.id);

      if (result === "previous-page") {
        setPage((previous) => previous - 1);
      }
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete customer"
      );
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Customers</h1>
          <p style={{ color: "gray" }}>
            Manage and track all your customers.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Button
            appearance="primary"
            icon={<AddRegular />}
            onClick={handleAdd}
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Card>
          <p>Total Customers</p>
          <h2>{pagination.total}</h2>
        </Card>

        <Card>
          <p>Active Filters</p>
          <h2>
            {(status ? 1 : 0) + (type ? 1 : 0)}
          </h2>
        </Card>

        <Card>
          <p>Current Page</p>
          <h2>{pagination.totalPages ? page : 0}</h2>
        </Card>
      </div>

      {/* Error Message */}
      {error && (
        <MessageBar intent="error" style={{ marginBottom: 16 }}>
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}

      {/* Filters */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ padding: 16 }}>
          <CustomerFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            type={type}
            setType={setType}
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
          />
        </div>
      </Card>

      {/* Customer Table */}
      <Card>
        <div style={{ padding: 16 }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center" 
          }}>
            <h3>Customer List</h3>

            <Button
              icon={<ArrowClockwiseRegular />}
              onClick={refreshCustomers}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
          <CustomerTable
            customers={customers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={setViewCustomer}
          />

          {/* Pagination */}
          {!loading && pagination.total > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              <span>
                Showing{" "}
                {(page - 1) * limit + 1} -{" "}
                {Math.min(page * limit, pagination.total)}{" "}
                of {pagination.total} customers
              </span>

              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>

                <Button appearance="primary">
                  {page}
                </Button>

                <Button
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <CustomerForm
        open={formOpen}
        customer={selectedCustomer}
        onClose={() => {
          setFormOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleSave}
      />

      {/* Customer Details Dialog */}
      <CustomerDetails
        customer={viewCustomer}
        onClose={() => setViewCustomer(null)}
      />
    </div>
  );
}
