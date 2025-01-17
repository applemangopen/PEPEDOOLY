const boardRepository = require("./board.repository");
const db = require("../lib/db.js");
const Likes = db.Likes;

const getBoardList = async () => {
  return await boardRepository.getBoardList();
};

const createBoard = async (boardData) => {
  return await boardRepository.createBoard(boardData);
};

const getBoardById = async (id) => {
  const board = await boardRepository.getBoardById(id);
  if (!board) return null;

  // 추천수 계산
  const recommendCount = await Likes.count({
    where: {
      Boards_id: id,
      isDislike: false,
    },
  });

  // 비추천수 계산
  const nonRecommendCount = await Likes.count({
    where: {
      Boards_id: id,
      isDislike: true,
    },
  });

  board.Boards_views++;
  await board.save();

  return {
    ...board.dataValues, // 기존 게시글 정보
    recommendCount,
    nonRecommendCount,
  };
};

const updateBoard = async (id, boardData) => {
  return await boardRepository.updateBoard(id, boardData);
};

const deleteBoard = async (id) => {
  return await boardRepository.deleteBoard(id);
};

module.exports = {
  createBoard,
  getBoardList,
  getBoardById,
  updateBoard,
  deleteBoard,
};
