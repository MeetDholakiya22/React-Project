
import { useCallback, useEffect, useState } from "react";
import type {
  Customer,
  CustomerFormData,
  CustomerListResponse,
} from "../../types";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";

interface CustomerParams {
  search: string;
  status: string;
  type: string;
  sortBy: string;
  order: string;
  page: number;
  limit: number;
}

export function useCustomers(params: CustomerParams) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] =
    useState<CustomerListResponse["pagination"]>({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getCustomers(params);

      setCustomers(result.data);
      setPagination(result.pagination);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load customers"
      );
    } finally {
      setLoading(false);
    }
  }, [
    params.search,
    params.status,
    params.type,
    params.sortBy,
    params.order,
    params.page,
    params.limit,
  ]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const addCustomer = async (data: CustomerFormData) => {
    const customer = await createCustomer(data);
    await loadCustomers();
    return customer;
  };

  const editCustomer = async (
    id: string,
    data: CustomerFormData
  ) => {
    const customer = await updateCustomer(id, data);
    await loadCustomers();
    return customer;
  };

  const removeCustomer = async (id: string) => {
    await deleteCustomer(id);

    // Return to previous page if the last record was deleted
    if (customers.length === 1 && params.page > 1) {
      return "previous-page";
    }

    await loadCustomers();
    return "deleted";
  };

  return {
    customers,
    pagination,
    loading,
    error,
    addCustomer,
    editCustomer,
    removeCustomer,
    refreshCustomers: loadCustomers,
  };
}
