import { DatePicker, Stack } from "rsuite";
import Swal from "sweetalert2";
const Addtask = () => {
  const handleAddtask = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const priority = form.priority.value;
    const newTask = { name, date, priority };

    console.log(newTask);
    // // Send data to the server
    fetch("http://localhost:5000/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "Task added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
        e.target.reset();
      });
  };
  return (
    <div className="h-screen max-w-7xl mx-auto">
      <div className="bg-[#F4F3F0] my-24 p-24">
        <div>
          <div className="flex justify-center items-center gap-3">
            {" "}
            <h3 className="text-5xl text-center font-extrabold font-rancho">
              Add New Task
            </h3>
            <img
              className="w-16"
              src="https://i.ibb.co/wNP6pb2/to-do-list.png"
              alt=""
            />
          </div>
        </div>

        <form onSubmit={handleAddtask}>
          <div>
            {" "}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Task Name</span>
              </label>
              <label className="input-group">
                <input
                  required
                  autoComplete="off"
                  type="text"
                  name="name"
                  placeholder="task name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pick your date</span>
              </label>

              {/* <DatePicker name="date" format="dd.MM.yyyy" /> */}
              <input className="p-3 rounded-lg" type="date" name="date" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <label className="input-group">
                <select
                  name="priority"
                  className="w-full p-3 rounded-lg outline-none"
                  id=""
                >
                  <option value="select">Select an option</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High </option>
                </select>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <input
            type="submit"
            value="Add Task"
            className="mt-4 btn btn-block bg-[#B55EEA] hover:bg-[#382147] text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Addtask;
