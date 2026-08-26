import { Examen } from "../model/Examen";
import { HttpError } from '../Security/HttpError';
import { CreateQuestion, Question, QuestionAvecReponses } from "../model/Question";
import { ExamenRepository } from "../repository/ExamenRepository";
import { QuestionRepository } from "../repository/QuestionRepository";
import { Resultat} from '../model/Resultat'
import { SoumissionRepository } from '../repository/SoumissionRepository';
import { ResponseRepository } from '../repository/ResponseRepository';
import { ResponsesEtudiantRepository } from "../repository/ResponsesEtudiantRepository";
import { ResponsesEtudiant } from "../model/ResponsesEtudiant";
import { Reponse } from "../model/Response";
import { throws } from "node:assert";
import { error } from "node:console";

export class ExamenService { 
    private questionRepository = new QuestionRepository ;
    private examenRepository = new ExamenRepository ; 
    private soumissionRepository = new SoumissionRepository; 
    private responseRepository = new ResponseRepository;
    private responseEtudiantRepository =new ResponsesEtudiantRepository;
    
    async getAllExamens():Promise<Examen[]>{
        const Examens = this.examenRepository.findAll();
     return Examens ;
    }

    async getAllQuestions(Examen: number ): Promise<Question[]> {
        const Questions = this.questionRepository.findByExamenId(Examen);
    
     return Questions;
    }

    async getExamById (Examen: number ): Promise<Examen> {
        const Exam = this.examenRepository.getExamenById(Examen);

     return Exam;
    }

    async updateExam(id: number, data: Partial<Examen>): Promise<Examen | null> {
    if (data.dateDebut && data.dateFin && new Date(data.dateDebut) > new Date(data.dateFin)) {
      throw new Error("La date de début ne peut pas être supérieure à la date de fin.");
    }
    return await this.examenRepository.update(id, data);
  }

    async AddQuestion(nouvelleQuestion: Omit<QuestionAvecReponses,'id'>): Promise<void> {
    
    if (!nouvelleQuestion.reponses || nouvelleQuestion.reponses.length < 2 || nouvelleQuestion.reponses.length > 6) {
        throw new HttpError(400, "Une question doit comporter entre 2 et 6 choix de réponses.");
    }

    let nombreReponsesVraies = 0;
    for (const rep of nouvelleQuestion.reponses) {
        if (rep.estCorrecte === true) {
        nombreReponsesVraies++;
        }
    }

    if (nombreReponsesVraies === 0) {
        throw new HttpError(400, "La question doit contenir au moins une réponse correcte.");
    }
    const Question = await this.questionRepository.Save(nouvelleQuestion);

    for (const rep of nouvelleQuestion.reponses) {
        await this.responseRepository.CreateReponseWithHisQuestions(rep, Question.id);
    }
    
    ;
    }
    async deleteExam(ExamId: number) : Promise <boolean>{ 
        return this.examenRepository.delete(ExamId);
    }

    async getAllResuslts(examenId: number): Promise <Resultat[]>{
        const toutSoumission = await this.soumissionRepository.findByExamen(examenId);
        const LesQuestions = await this.questionRepository.findByExamenId(examenId);
        const bonnesReponses = new Map<number, number>();
        let barèmeTotal = 0;

        
        for (const question of LesQuestions) {
            const bonneReponse = await this.responseRepository.findCorrectAnswerByQuestionId(question.id);
            barèmeTotal= barèmeTotal + question.points;
            if (bonneReponse) {
            bonnesReponses.set(question.id, bonneReponse.id);
            }
        }
        const listResultat: Resultat[] = [];
            for (const soumission of toutSoumission) {
                const reponsesSoumission: ResponsesEtudiant[] =
                await this.responseEtudiantRepository.findBySoumissionId(soumission.id);

                let note = 0;

                for (const reponse of reponsesSoumission) {
                const bonneReponseId = bonnesReponses.get(reponse.questionId);
                if (bonneReponseId !== undefined && reponse.reponseId === bonneReponseId) {
                    const noteQuestion = this.questionRepository.findById(reponse.questionId);
                    note = note + (await noteQuestion).points;
                }
                }

                // ce format est encore provisoire
                listResultat.push({
                idExamen: soumission.examenId, 
                EtudiantId: soumission.userId, 
                note: note,   
                total: barèmeTotal,
                examenTitre:  "matiere"
                });
            }

        return listResultat;
            }
}
