import { QuestionRepository } from '../repository/QuestionRepository';
import { Question } from '../model/Question';

export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async updateQuestion(id: number, data: Partial<Question>): Promise<Question | null> {
   
    const existingQuestion = await this.questionRepository.findById(id);
    if (!existingQuestion) {
      return null;
    }

    const updatedQuestion = await this.questionRepository.update(id, data);
    return updatedQuestion;
  }


  async deleteQuestion(id: number): Promise<boolean> {
    
    const existingQuestion = await this.questionRepository.findById(id);
    if (!existingQuestion) {
      return false;
    }

    await this.questionRepository.delete(id);
    return true;
  }
}