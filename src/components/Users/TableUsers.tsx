import { useAppContext } from "../../api/context/context";
import { useSorting } from "../../hooks/useSorting";
import { formatRelativeTime, formatExactTime } from "../../utils/dateUtils";

const COLUMNS = [
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "last_login", label: "Last seen" },
  { key: "blocked", label: "Status" },
] as const;

export default function TableUsers() {
  const { users, userId, setUserId } = useAppContext();
  const { sortField, sortDirection, toggleSort, sortUsers } = useSorting();

  const sortedUsers = sortUsers(users);

  const handleCheckboxChange = (id: number) => {
    if (userId.includes(id)) {
      setUserId(userId.filter((userId) => userId !== id));
    } else {
      setUserId([...userId, id]);
    }
  };

  const getSortIcon = (field: typeof sortField) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-75">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                className="form-check-input"
                checked={userId.length === users.length}
                onChange={() => {
                  if (userId.length === users.length) {
                    setUserId([]);
                  } else {
                    setUserId(users.map((user) => user.id));
                  }
                }}
              />
            </th>
            {COLUMNS.map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                onClick={() => toggleSort(key)}
                style={{ cursor: "pointer" }}
              >
                {label} {getSortIcon(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              className={user.blocked ? "text-muted" : ""}
              style={
                user.blocked
                  ? { textDecoration: "line-through", opacity: 0.7 }
                  : {}
              }
            >
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={userId.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td title={formatExactTime(user.last_login)}>
                {formatRelativeTime(user.last_login)}
              </td>
              <td>{user.blocked ? "Blocked" : "Active"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
