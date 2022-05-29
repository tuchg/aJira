import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

/**
 * 切片对应每一个需要全局状态管理的Reducer（真正处理state的地方）
 */
interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      // 违背纯函数理念，内部使用immer.js实现了shadow,以方便的不干净操作操作了干净的状态
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});
export const projectListActions = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
