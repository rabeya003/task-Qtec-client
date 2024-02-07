import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllLists = () => {
  const [Tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/task");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setTasks(jsonData);
        setFilteredTasks(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete task!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/task/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
              });
              const remaining = Tasks.filter((task) => task._id !== id);
              setTasks(remaining);
              setFilteredTasks(remaining);
            }
          });
      }
    });
  };

  const handleCompleted = (id) => {
    const updatedTasks = Tasks.map((task) => {
      if (task._id === id) {
        task.status = "completed";
        fetch(`http://localhost:5000/task/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "completed" }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((error) =>
            console.error("Error updating task status:", error)
          );
      }
      return task;
    });
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handlePriorityFilter = (e) => {
    const selectedPriority = e.target.value;
    setPriorityFilter(selectedPriority);
    if (selectedPriority === "All") {
      setFilteredTasks(Tasks);
    } else {
      const filtered = Tasks.filter(
        (task) => task.priority.toLowerCase() === selectedPriority.toLowerCase()
      );
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="h-screen max-w-7xl mx-auto my-12">
      <div className="mb-4">
        <label htmlFor="priorityFilter" className="mr-2">
          Priority Filter:
        </label>
        <select
          id="priorityFilter"
          className="border rounded p-1"
          onChange={handlePriorityFilter}
          value={priorityFilter}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Task-Name</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr className="text-center" key={task._id}>
                <th>{index + 1}</th>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{task.date}</td>
                <td className="flex gap-4 items-center">
                  {task.status === "completed" ? "Completed" : "Incomplete"}

                  {task.status === "completed" ? null : (
                    <p
                      className="bg-green-500 rounded-lg  hover:bg-green-700 py-2 px-2 text-white"
                      onClick={() => handleCompleted(task._id)}
                    >
                      Mark as Complete
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/edit/${task._id}`}>
                    <button className="bg-blue-700 rounded-lg mb-2 lg:mr-2 hover:bg-blue-800 py-2 px-2 text-white">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-700 rounded-lg hover:bg-red-800 py-2 px-2 text-white"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllLists;
