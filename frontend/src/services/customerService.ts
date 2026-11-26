
import type {
  Customer,
  CustomerFormData,
  CustomerListResponse,
} from "../types";

const API_URL = "http://localhost:5000/api/customers";

async function handleResponse<T>(response: Response): Promise<T> {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "API request failed");
  }

  return result as T;
}

function normalizeCustomer(customer: any): Customer {
  return {
    ...customer,
    id: customer._id,
  };
}

// GET: Customers with search, filters and pagination
export async function getCustomers(params: {
  search?: string;
  status?: string;
  type?: string;
  sortBy?: string;
  order?: string;
  page?: number;
  limit?: number;
}): Promise<CustomerListResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`${API_URL}?${query.toString()}`);

  const result = await handleResponse<any>(response);

  return {
    ...result,
    data: result.data.map(normalizeCustomer),
  };
}

// GET: Single customer
export async function getCustomerById(
  id: string
): Promise<Customer> {
  const response = await fetch(`${API_URL}/${id}`);
  const result = await handleResponse<any>(response);

  return normalizeCustomer(result);
}

// POST: Create customer
export async function createCustomer(
  data: CustomerFormData
): Promise<Customer> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await handleResponse<any>(response);

  return normalizeCustomer(result);
}

// PUT: Update customer
export async function updateCustomer(
  id: string,
  data: CustomerFormData
): Promise<Customer> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await handleResponse<any>(response);

  return normalizeCustomer(result);
}

// DELETE: Delete customer
export async function deleteCustomer(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse<{ message: string }>(response);
}
