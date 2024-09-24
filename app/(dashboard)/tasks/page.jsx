import { getTasks, deleteTask } from "@/app/actions/tasks";
import TaskTable from "./TaskTable";
import { getLeadById } from "@/app/actions/leads";

const page = async () => {
  const taskData = await getTasks();
  const tasks = taskData.data;
  return (
    <TaskTable
      tasks={JSON.parse(JSON.stringify(tasks))}
      deleteTask={deleteTask}
      getLeadById={getLeadById}
    />
  );
};

export default page;
