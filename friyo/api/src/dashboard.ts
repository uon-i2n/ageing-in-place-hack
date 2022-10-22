import { Express, Request, Response } from 'express';
import { Job, scheduleJob } from 'node-schedule';

type Medication = {
    name: string
    count: number
}

type History = {
    takenAt: string | Date
    status: AdministerStatus
}

type AdministerStatus = 'Missed' | 'Taken';

// Daily
type Schedule = {
    id: number
    intakeTime: string
    frequency: number
}

type Patient = {
    id: number
    name: string
    medication?: Medication
    schedule: Schedule[]
    prescriptionCount?: number
}


export const Dashboard = (app: Express) => {
    let count = 0;

    const patientData: Patient[] = [
        {
            id: count++,
            name: "Mr. Elder One",
            schedule: []

        },
        {
            id: count++,
            name: "Mrs. Elder Two",
            schedule: []
        }

    ];

    app.get('/dashboard/patients', (req: Request, res: Response) => {
        return res.json({
            status: 'success',
            data: patientData
        });
    });

    app.get('/dashboard/patients/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params['id']);
        const patient = patientData.find( p => p.id === id)
        return res.json({
            status: 'success',
            data: patient
        });
    });

    // Register a patient
    app.post('/dashboard/patients', (req: Request, res: Response) => {

        const body = req.body;
        const newPatient: Patient = {
            id: count++,
            name: body.name,
            schedule: []
        };
        patientData.push(newPatient);

        return res.json({
            status: 'success',
            data: newPatient
        });
    });

    // Get all the schedules
    app.get('/dashboard/patients/:id/schedules', (req: Request, res:Response) => {
        return res.json({
            status: 'error',
            data: {
                description: 'API not implemented yet'
            }
        });
    });

    // set a Schedule for a patient
    app.post('/dashboard/patients/:id/schedules', (req: Request, res: Response) => {
        const patientId = parseInt(req.params['id']);
        const schedData = req.body;

        const patient = patientData
            .filter( p => p.id === patientId)
            .map( patient => {
                patient.schedule.push({
                    id: patient.schedule.length++,
                    frequency: parseInt(schedData['frequency']),
                    intakeTime: schedData['intakeTime']
                });
                return patient;
            });

        // console.log(JSON.stringify(patientData));
        return res.json({
            status: 'success',
            data: patient[0].schedule
        });
    });

}

// const startScheduler = (patientData: Patient[]) => {
//     setInterval( () => {
//         console.log('running scheduler');
// 
//         const schedule = [
//             {
//             }
//         ]
// 
//         /**
//          * 
//          * if dateDiff(timeNow(), time + offset) <= 0 then add a trackingRecord
//          * 
//          */
// 
//         // loop for each patient data
//         // check
// 
//     }, 500);
// }