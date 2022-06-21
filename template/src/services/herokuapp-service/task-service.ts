import { ApiResponse } from "apisauce";
import { Client, getGeneralApiProblem, GetItemsResult, HEROKUAPP_CLIENT_CONFIG, routes } from "services/api";

class TaskService {
  private client: Client;

  constructor() {
    this.client = new Client(HEROKUAPP_CLIENT_CONFIG);
  }

  async getTasks(): Promise<GetItemsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.client.instance.get(routes.herokuapp.task.url);

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) {
          return problem;
        }
      }

      const items = response.data.results;
      return { kind: "ok", data: items };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }
}

const taskService = new TaskService();

export default taskService;