import { Examen, ExamenAvecQuestions } from "../model/Examen";
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
import { StudentRepository } from "../repository/StudentRepository";

export class ExamenService { 
    private questionRepository = new QuestionRepository ;
    private examenRepository = new ExamenRepository ; 
    private soumissionRepository = new SoumissionRepository; 
    private responseRepository = new ResponseRepository;
    private responseEtudiantRepository =new ResponsesEtudiantRepository;
    private studentRepository = new StudentRepository;
    
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

    async AddQuestion(nouvelleQuestion: Omit<QuestionAvecReponses,'id'>):Promise <ExamenAvecQuestions> {
    
    const soumissions = await this.soumissionRepository.findByExamen(nouvelleQuestion.examenId);
    if (soumissions.length > 0) {
        throw new HttpError(409, "Quelqu'un a déjà rendu son sujet.");
    }
    
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
    if (nombreReponsesVraies > 1) { 
        throw new HttpError(422, "La question doit contenir qu'une réponse correcte.");
    }

    const Question = await this.questionRepository.Save(nouvelleQuestion);
    
    for (const rep of nouvelleQuestion.reponses) {
        await this.responseRepository.CreateReponseWithHisQuestions(rep, Question.id);
    }

    const recupExam = await this.examenRepository.getExamenById(nouvelleQuestion.examenId);

    const QuestionsExamExist = await this.questionRepository.findByExamenId(nouvelleQuestion.examenId);

    const questionsAvecReponses = [];
    for (const q of QuestionsExamExist) {
        const reponsesDeLaQuestion = await this.responseRepository.findByQuestionId(q.id);
        questionsAvecReponses.push({
            ...q,
            reponses: reponsesDeLaQuestion
        });
    }

    return {
        examen: recupExam,
        questions: questionsAvecReponses
    };}

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
                NomEtudiant: (await this.studentRepository.findById(soumission.userId)).nom,
                note: note,   
                total: barèmeTotal,
                examenTitre:  "matiere",
                });
            }

        return listResultat;
            }

    async submitExamen(examenId: number, userId: number, reponses: { questionId: number; reponseId: number }[]) {
        const soumissionsExamen = await this.soumissionRepository.findByExamen(examenId);
        const dejaSoumis = soumissionsExamen.some(s => s.userId === userId);

        if (dejaSoumis) {
            throw new HttpError(400, "Vous avez déjà soumis cet examen.");
        }

        const examen = await this.examenRepository.getExamenById(examenId);
        if (!examen) {
            throw new HttpError(404, "Examen non trouvé.");
        }

        const nouvelleSoumission = await this.soumissionRepository.create({
            examenId: examenId,
            userId: userId,
            dateSoumission: new Date()
        });

        for (const rep of reponses) {
    await this.responseEtudiantRepository.CreateReponsesBySoumissionId(
        nouvelleSoumission.id,
        {
            soumissionId: nouvelleSoumission.id,
            questionId: rep.questionId,
            reponseId: rep.reponseId
        }
    );
}
        
        return nouvelleSoumission;
    }
}
