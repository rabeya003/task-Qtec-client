import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllLists = () => {
  const [Tasks, setTasks] = useState([]);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/task");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setTasks(jsonData);
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
            }
          });
      }
    });
  };
  return (
    <div className="h-screen max-w-7xl mx-auto">
      {" "}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Task-Name</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Tasks.map((task, index) => (
                <tr className="text-center" key={task._id}>
                  <th>{index + 1}</th>
                  <td>{task.name}</td>
                  <td>{task.priority}</td>
                  <td>{task.date}</td>

                  <td>
                    <Link to={`/edit/${task._id}`}>
                      {" "}
                      <button className="bg-blue-700 rounded-lg mr-2 hover:bg-blue-800 py-2 px-2 text-white">
                        Edit
                      </button>
                    </Link>
                    {/* </td>
                  <td> */}
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
    </div>
  );
};

export default AllLists;
