export const PLUS_VOTE = "upVote";
export const MINUS_VOTE = "downVote";

export function sortByField(list, field) {
    if (!list) {
      return list;
    }
    list = list.sort((a, b) => b[field] - a[field]);

    return list;
  }