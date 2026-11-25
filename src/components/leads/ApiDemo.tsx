
import { useEffect, useState } from "react";
import { Button } from "@fluentui/react-components";
import { getUsers, type ApiUser } from "../../services/leadApi";

function ApiDemo() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const result = await getUsers();
        setUsers(result);
      } catch {
        setError("Unable to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3>API Users</h3>

      {users.map((user) => (
        <div key={user.id}>
          <strong>{user.name}</strong>
          <p>{user.email}</p>
          <span>{user.company.name}</span>
        </div>
      ))}
    </div>
  );
}

export default ApiDemo;
