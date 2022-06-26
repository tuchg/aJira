/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的id
 * @param type 'before' | 'after'
 * @param referenceId 参照id
 * @param list 要排序的列表, 比如tasks, kanbans
 */
export const reorder = ({
  fromId,
  type,
  toId,
  list,
}: {
  list: { id: number }[];
  fromId: number;
  type: "after" | "before";
  toId: number;
}) => {
  const clonedList = [...list];
  // 找到fromId对应项目的下标
  const movingItemIndex = clonedList.findIndex((item) => item.id === fromId);
  if (!toId) {
    return insertAfter([...clonedList], movingItemIndex, clonedList.length - 1);
  }
  const targetIndex = clonedList.findIndex((item) => item.id === toId);
  const insert = type === "after" ? insertAfter : insertBefore;
  return insert([...clonedList], movingItemIndex, targetIndex);
};

/**
 * 在list中，把from移到to的前边
 * @param list
 * @param from
 * @param to
 */
const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

/**
 * 在list中，把from放在to的后面
 * @param list
 * @param from
 * @param to
 */
const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};
