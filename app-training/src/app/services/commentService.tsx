import apiService from "./ApiService";
import { Comment, CreateCommentDTO } from "../types/comment";

export const getComment = async (id: number): Promise<Comment> => {
  const res = await apiService.get(`/movie/${id}/comments`);
  return res.data;
};

export const createComment = async (
  id: number,
  data: CreateCommentDTO
): Promise<Comment> => {
  const res = await apiService.post(`/movie/${id}/comments`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
