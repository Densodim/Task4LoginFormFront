import { useAppContext } from "../../api/context/context";
import { useUserActions } from "../../hooks/useUserActions";

export default function HeaderUsers() {
  const { userId, setUsers } = useAppContext();
  const {
    isLoading,
    notification,
    handleBlocked,
    handleUnblocked,
    handleDelete,
  } = useUserActions(setUsers);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-start">
          <div className="d-flex flex-column me-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => handleBlocked(userId)}
              disabled={isLoading || !userId.length}
            >
              <i className="bi bi-lock"></i> "Block"
            </button>
            {notification && (
              <div
                className={`alert alert-${
                  notification.type === "success" ? "success" : "danger"
                } py-1 mt-1 mb-0`}
              >
                {notification.message}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => handleUnblocked(userId)}
            disabled={isLoading || !userId.length}
          >
            <i className="bi bi-unlock"></i> "Unblock"
          </button>
          <button
            type="button"
            className="btn btn-outline-danger ms-2"
            onClick={() => handleDelete(userId)}
            disabled={isLoading || !userId.length}
          >
            <i className="bi bi-trash"></i> "Delete"
          </button>
        </div>
        <div className="input-group mb-3 w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Filter"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </>
  );
}
