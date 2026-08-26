

import { Examen, ExamenAvecQuestionsEtLesReponses, ExamenPublique } from "../model/Examen";
import { CreateSoumissionDTO, Soumission } from "../model/Soumission";
import { Question, QuestionAvecReponses, QuestionPublique } from "../model/Question";
import { Reponse, toReponsesPubliques } from "../model/Response";
import { Resultat } from "../model/Resultat";
import { ExamenRepository } from "../repository/ExamenRepository";
import { QuestionRepository } from "../repository/QuestionRepository";
import { ResponseRepository } from "../repository/ResponseRepository";
import { SoumissionRepository } from "../repository/SoumissionRepository";
import { ResponsesEtudiantRepository } from "../repository/ResponsesEtudiantRepository";
import { ResponsesEtudiant } from "../model/ResponsesEtudiant";
import { CompteRepository } from "../repository/CompteRepository";




export class MyService{ 
    private compteRepository = new CompteRepository ;
    private examenRepository = new ExamenRepository;
    private questionRepository = new QuestionRepository;
    private reponseRepository = new ResponseRepository;
    private soumissionRepository = new SoumissionRepository;
    private responsesEtudiantRepository = new ResponsesEtudiantRepository;

    private async buildExamenPublique(examen: Examen): Promise<ExamenPublique> {
        const questions = await this.questionRepository.findByExamenId(examen.id);

        const questionsPubliques = await Promise.all(
            questions.map(async (q: Question): Promise<QuestionPublique> => {
            const reponses = await this.reponseRepository.findByQuestionId(q.id);
            return { ...q, reponses: toReponsesPubliques(reponses) };
            })
        );
        

        return { ...examen, questions: questionsPubliques };
    }
    private async buildExamenAvecQuestions(examen: Examen): Promise<ExamenAvecQuestionsEtLesReponses> {
        const questions = await this.questionRepository.findByExamenId(examen.id);

        const questionsAvecReponses = await Promise.all(
            questions.map(async (q: Question): Promise<QuestionAvecReponses> => {
            const reponses = await this.reponseRepository.findByQuestionId(q.id);
            return { ...q, reponses };
            })
        );

        return { ...examen, questions: questionsAvecReponses };
    }
    // getExamsDisponibles(req.user!.id)
    // getExamPourEtudiant(examId)
    // soumettreExamen(studentId, examId, reponses)
    // getResultatsParEtudiant(req.user!.id)

    async getExamsDisponibles(studentId: number , groupeId: number): Promise<Examen[]> {
        const [examens, soumissions] = await Promise.all([
            this.examenRepository.findExamOfGroupe(groupeId),
            this.soumissionRepository.findByUserId(studentId),
        ]);

        const examIdsSoumis: Set<number> = new Set(
        soumissions.map((s: Soumission): number => s.examenId)
        );

        return examens.filter((examen: Examen): boolean => !examIdsSoumis.has(examen.id))
    }

    async getMyExamById(id: number): Promise<Examen | ExamenPublique | ExamenAvecQuestionsEtLesReponses | null> {
        const examen = await this.examenRepository.getExamenById(id);
        if (!examen) return null;

        const maintenant = new Date();

        if (maintenant < examen.dateDebut) {
            return examen; 
        }

        if (maintenant >= examen.dateDebut && maintenant <= examen.dateFin) {           
            return this.buildExamenPublique(examen); 
        }

        return this.buildExamenAvecQuestions(examen); 
    }

    async submitExamen(data: CreateSoumissionDTO, id: number): Promise<CreateSoumissionDTO | null> {
        const examen = await this.examenRepository.getExamenById(id);
        if (examen == null) return null;

        const dejaSoumis = await this.soumissionRepository.findByUserAndExamen(data.userId, id);
        if (dejaSoumis) {
            throw new Error('Cet examen a déjà été soumis.');
        }

        const soumission = await this.soumissionRepository.create({
            userId: data.userId,
            examenId: id,
            dateSoumission: new Date(),
        });

        return soumission; 
    }


   async getMyResults(studentId: number): Promise<Resultat[]> {
    const soumissions: Soumission[] = await this.soumissionRepository.findByUserId(studentId);

    return Promise.all(
        soumissions.map(async (soumission: Soumission): Promise<Resultat> => {
            
            const [reponsesEtudiant, listQuestions, examen] = await Promise.all([
                this.responsesEtudiantRepository.findBySoumissionId(soumission.id),
                this.questionRepository.findByExamenId(soumission.examenId),
                this.examenRepository.getExamenById(soumission.examenId),
            ]);

            const reponsesCocheesIds = new Set<number>(
                reponsesEtudiant.map((re: ResponsesEtudiant) => re.reponseId)
            );

            let note = 0;
            let barèmeTotal = 0;

            for (const question of listQuestions) {
                
                barèmeTotal += question.points;

                const bonneReponse: Reponse = 
                    await this.reponseRepository.findCorrectAnswerByQuestionId(question.id);

                if (bonneReponse && reponsesCocheesIds.has(bonneReponse.id)) {
                    note += question.points;
                }
            }

            return {
                idExamen: soumission.examenId,
                EtudiantId: studentId,
                NomEtudiant: (await this.compteRepository.findById(studentId))?.nom ?? 'Étudiant inconnu',
                note: note,
                total: barèmeTotal,
                examenTitre: examen?.titre ?? 'Examen supprimé',
            };
        })
    );
}
        
}