import Question from '../models/questionModel.js';
import Result from '../models/resultModel.js';

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get questions by category
export const getQuestionsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save quiz result
export const saveResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    const savedResult = await result.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all results
export const getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all results
export const deleteAllResults = async (req, res) => {
  try {
    await Result.deleteMany({});
    res.json({ msg: "All results deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete one result by ID
export const deleteResultById = async (req, res) => {
  try {
    const id = req.params.id;
    await Result.findByIdAndDelete(id);
    res.json({ msg: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete result" });
  }
};
