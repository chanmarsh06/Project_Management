import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasksList: [],
  selectedTask: {},
  isLoading: false,
  error: "",
};

const BASE_URL = "http://localhost:4000/api/tasks";

// GET =>  read data  (THUNK ACTION CREATOR)
export const getTaskFromServer = createAsyncThunk(
  "tasks/getTaskFromServer", // type
  async (_, { rejectWithValue }) => {
    //payload creater (API) => this have ARGS and THUNK API
    const response = await fetch(BASE_URL);

    if (response.ok) {
      const covertJson = response.json();
      return covertJson;
    } else {
      return rejectWithValue({ error: "no task found" });
    }
  }
);

// POST create data  (THUNK ACTION CREATOR)
export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskFromServer",
  async (task,{rejectWithValue})=>{
    const options = {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(BASE_URL,options);
    if(response.ok){
      const convertJson = response.json()
      return convertJson;
    } else {
      return rejectWithValue ({error: 'task not added'})
    }
  }
  );

  //  PATCH => update data  (THUNK ACTION CREATOR)
  export const UpdateDataFromServer = createAsyncThunk(
    // type - string
    "tasks/UpdateDataFromServer",
    async (task,{rejectWithValue})=>{
      const options = {
        method: 'PATCH',
        body: JSON.stringify(task),
        headers:{
          "Content-type" : "application/json; charset=UTF-8"
        }
      }
        const response = await fetch(BASE_URL + "/" + task._id, options);
        if (response.ok) {
          const convertJson = await response.json();
          return convertJson;
        }
       else  {
        return rejectWithValue({ error: "data not updted" });
      }
    }
  );

   //  DELETE => Delete data  (THUNK ACTION CREATOR)
  export const DeleteDataFromServer = createAsyncThunk(
    // type - string
    "tasks/DeleteDataFromServer",
    async (task,{rejectWithValue})=>{// action payload with args and thunk api
      const options = {
        method:"DELETE",
      }
      const response = await fetch ( BASE_URL + "/" + task._id, options)
      if(response.ok){
        const convertJson = await response.json()
        return convertJson;
      }else {
        return rejectWithValue ({error: "data not deleted"})
      }
    }

  );

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    // add
    addTaskToList: (state, action) => {
      const id = Math.random() * 100;
      let task = {...action.payload, id };
      state.tasksList.push(task);
    },
    // delete
    removeTaskFromList: (state, action) => {
      // let removeTask = state.tasksList.filter((task)=>{task.id !== action.payload.id})
      // state.tasksList.push(removeTask);

      state.tasksList = state.tasksList.filter(
        (task) => task._id !== action.payload._id
      );
    },
    //update
    updateTaskInList: (state, action) => {
      state.tasksList = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },

    // select task
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },

  // life cycle of async operation (pending , fullfiled, rejected)
  extraReducers: (builder) => {
    builder
      //getTaskFromServer
      // Pending
      .addCase(getTaskFromServer.pending, (state, action) => {
        state.isLoading = true;
      })
      // fullfiled
      .addCase(getTaskFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList = action.payload;
      })
      //rejected
      .addCase(getTaskFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        state.tasksList = [];
      })
      // addTaskToServer
      // Pending
      .addCase(addTaskToServer.pending, (state, action) => {
        state.isLoading = true;
      })
      // fullfiled
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.tasksList.push(action.payload);
      })
      //rejected
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //UpdateDataFromServer
      // Pending
      .addCase(UpdateDataFromServer.pending, (state, action) => {
        state.isLoading = true;
      })
      // fullfiled
      .addCase(UpdateDataFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""; // sucess that why no error
        state.tasksList = state.tasksList.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      //rejected
      .addCase(UpdateDataFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })

      //DeleteDataFromServer
      // Pending
      .addCase(DeleteDataFromServer.pending, (state) => {
        state.isLoading = true;
      })
      // fullfiled
      .addCase(DeleteDataFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = ""; // sucess that why no error
      })
      //rejected
      .addCase(DeleteDataFromServer.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      });
  },
});

export const {
  addTaskToList,
  removeTaskFromList,
  updateTaskInList,
  setSelectedTask,
} = taskSlice.actions;

export default taskSlice.reducer;
